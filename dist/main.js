/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/web-audio-peak-meter/index.js":
/*!****************************************************!*\
  !*** ./node_modules/web-audio-peak-meter/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var webAudioPeakMeter = function () {
  'use strict';

  var options = {
    borderSize: 2,
    fontSize: 9,
    backgroundColor: 'black',
    tickColor: '#ddd',
    gradient: ['red 1%', '#ff0 16%', 'lime 45%', '#080 100%'],
    dbRange: 48,
    dbTickSize: 6,
    maskTransition: 'height 0.1s'
  };
  var tickWidth;
  var elementWidth;
  var elementHeight;
  var meterHeight;
  var meterWidth;
  var meterTop;
  var vertical = true;
  var channelCount = 1;
  var channelMasks = [];
  var channelPeaks = [];
  var channelPeakLabels = [];

  var getBaseLog = function (x, y) {
    return Math.log(y) / Math.log(x);
  };

  var dbFromFloat = function (floatVal) {
    return getBaseLog(10, floatVal) * 20;
  };

  var setOptions = function (userOptions) {
    for (var k in userOptions) {
      options[k] = userOptions[k];
    }

    tickWidth = options.fontSize * 2.0;
    meterTop = options.fontSize * 1.5 + options.borderSize;
  };

  var createMeterNode = function (sourceNode, audioCtx) {
    var c = sourceNode.channelCount;
    var meterNode = audioCtx.createScriptProcessor(2048, c, c);
    sourceNode.connect(meterNode);
    meterNode.connect(audioCtx.destination);
    return meterNode;
  };

  var createContainerDiv = function (parent) {
    var meterElement = document.createElement('div');
    meterElement.style.position = 'relative';
    meterElement.style.width = elementWidth + 'px';
    meterElement.style.height = elementHeight + 'px';
    meterElement.style.backgroundColor = options.backgroundColor;
    parent.appendChild(meterElement);
    return meterElement;
  };

  var createMeter = function (domElement, meterNode, optionsOverrides) {
    setOptions(optionsOverrides);
    elementWidth = domElement.clientWidth;
    elementHeight = domElement.clientHeight;
    var meterElement = createContainerDiv(domElement);

    if (elementWidth > elementHeight) {
      vertical = false;
    }

    meterHeight = elementHeight - meterTop - options.borderSize;
    meterWidth = elementWidth - tickWidth - options.borderSize;
    createTicks(meterElement);
    createRainbow(meterElement, meterWidth, meterHeight, meterTop, tickWidth);
    channelCount = meterNode.channelCount;
    var channelWidth = meterWidth / channelCount;
    var channelLeft = tickWidth;

    for (var i = 0; i < channelCount; i++) {
      createChannelMask(meterElement, options.borderSize, meterTop, channelLeft, false);
      channelMasks[i] = createChannelMask(meterElement, channelWidth, meterTop, channelLeft, options.maskTransition);
      channelPeaks[i] = 0.0;
      channelPeakLabels[i] = createPeakLabel(meterElement, channelWidth, channelLeft);
      channelLeft += channelWidth;
    }

    meterNode.onaudioprocess = updateMeter;
    meterElement.addEventListener('click', function () {
      for (var i = 0; i < channelCount; i++) {
        channelPeaks[i] = 0.0;
        channelPeakLabels[i].textContent = '-∞';
      }
    }, false);
  };

  var createTicks = function (parent) {
    var numTicks = Math.floor(options.dbRange / options.dbTickSize);
    var dbTickLabel = 0;
    var dbTickTop = options.fontSize + options.borderSize;

    for (var i = 0; i < numTicks; i++) {
      var dbTick = document.createElement('div');
      parent.appendChild(dbTick);
      dbTick.style.width = tickWidth + 'px';
      dbTick.style.textAlign = 'right';
      dbTick.style.color = options.tickColor;
      dbTick.style.fontSize = options.fontSize + 'px';
      dbTick.style.position = 'absolute';
      dbTick.style.top = dbTickTop + 'px';
      dbTick.textContent = dbTickLabel + '';
      dbTickLabel -= options.dbTickSize;
      dbTickTop += meterHeight / numTicks;
    }
  };

  var createRainbow = function (parent, width, height, top, left) {
    var rainbow = document.createElement('div');
    parent.appendChild(rainbow);
    rainbow.style.width = width + 'px';
    rainbow.style.height = height + 'px';
    rainbow.style.position = 'absolute';
    rainbow.style.top = top + 'px';
    rainbow.style.left = left + 'px';
    var gradientStyle = 'linear-gradient(' + options.gradient.join(', ') + ')';
    rainbow.style.backgroundImage = gradientStyle;
    return rainbow;
  };

  var createPeakLabel = function (parent, width, left) {
    var label = document.createElement('div');
    parent.appendChild(label);
    label.style.width = width + 'px';
    label.style.textAlign = 'center';
    label.style.color = options.tickColor;
    label.style.fontSize = options.fontSize + 'px';
    label.style.position = 'absolute';
    label.style.top = options.borderSize + 'px';
    label.style.left = left + 'px';
    label.textContent = '-∞';
    return label;
  };

  var createChannelMask = function (parent, width, top, left, transition) {
    var channelMask = document.createElement('div');
    parent.appendChild(channelMask);
    channelMask.style.width = width + 'px';
    channelMask.style.height = meterHeight + 'px';
    channelMask.style.position = 'absolute';
    channelMask.style.top = top + 'px';
    channelMask.style.left = left + 'px';
    channelMask.style.backgroundColor = options.backgroundColor;

    if (transition) {
      channelMask.style.transition = options.maskTransition;
    }

    return channelMask;
  };

  var maskSize = function (floatVal) {
    if (floatVal === 0.0) {
      return meterHeight;
    } else {
      var d = options.dbRange * -1;
      var returnVal = Math.floor(dbFromFloat(floatVal) * meterHeight / d);

      if (returnVal > meterHeight) {
        return meterHeight;
      } else {
        return returnVal;
      }
    }
  };

  var updateMeter = function (audioProcessingEvent) {
    var inputBuffer = audioProcessingEvent.inputBuffer;
    var i;
    var channelData = [];
    var channelMaxes = [];

    for (i = 0; i < channelCount; i++) {
      channelData[i] = inputBuffer.getChannelData(i);
      channelMaxes[i] = 0.0;
    }

    for (var sample = 0; sample < inputBuffer.length; sample++) {
      for (i = 0; i < channelCount; i++) {
        if (Math.abs(channelData[i][sample]) > channelMaxes[i]) {
          channelMaxes[i] = Math.abs(channelData[i][sample]);
        }
      }
    }

    for (i = 0; i < channelCount; i++) {
      var thisMaskSize = maskSize(channelMaxes[i], meterHeight);
      channelMasks[i].style.height = thisMaskSize + 'px';

      if (channelMaxes[i] > channelPeaks[i]) {
        channelPeaks[i] = channelMaxes[i];
        var labelText = dbFromFloat(channelPeaks[i]).toFixed(1);
        channelPeakLabels[i].textContent = labelText;
      }
    }
  };

  return {
    createMeterNode: createMeterNode,
    createMeter: createMeter
  };
}();

module.exports = webAudioPeakMeter;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.scss */ "./src/styles/index.scss");
/* harmony import */ var _styles_index_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_index_scss__WEBPACK_IMPORTED_MODULE_0__);


var Controller = __webpack_require__(/*! ./scripts/controller */ "./src/scripts/controller.js");

var Display = __webpack_require__(/*! ./scripts/display */ "./src/scripts/display.js");

var Engine = __webpack_require__(/*! ./scripts/engine */ "./src/scripts/engine.js");

var Game = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");

var webAudioPeakMeter = __webpack_require__(/*! web-audio-peak-meter */ "./node_modules/web-audio-peak-meter/index.js");

document.addEventListener('DOMContentLoaded', function (e) {
  var keyDownUp = function keyDownUp(e) {
    controller.keyDownUp(e.type, e.keyCode);
  };

  var resize = function resize(e) {
    display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
    display.render();
  };

  var render = function render() {
    display.fill(game.world.background_color); // Clear background to game's background color.
    // display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
    // noteDrop();

    game.world.noteArr.forEach(function (note) {
      if (note.y < 120 && !note.hit) {
        display.drawNote(note);
      } else if (game.world.noteArr[game.world.noteArr.length - 1].y > 118) {
        game.world.gameEndMessage();
        game.world.gameEnd();
        game.world.backgroundTrack.play();
      }
    });
    game.world.bassNoteArr.forEach(function (note) {
      if (note.y < 120 && !note.hit) {
        display.drawNote(note);
      }
    });
    game.world.eightNoteArr.forEach(function (note) {
      if (note.y < 120 && !note.hit) {
        display.drawNote(note);
      }
    });
    display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
    document.getElementById('score-container').innerHTML = game.world.score === 0 ? '0%' : game.world.score.toFixed(2).toString() + '%';
    game.world.noteArr.forEach(function (note) {
      if (note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit) {
        game.world.scoreUpdate();
        note.hit = true;
        note.sound.play();
        game.world.player.hitNote();
      }
    });
    game.world.bassNoteArr.forEach(function (note) {
      if (note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit) {
        game.world.scoreUpdate();
        note.hit = true;
        note.sound.play();
        game.world.player.hitNote();
      }
    });
    game.world.eightNoteArr.forEach(function (note) {
      if (note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit) {
        game.world.scoreUpdate();
        note.hit = true;
        note.sound.play();
        game.world.player.hitNote();
      }
    });
    display.render();
  };

  var update = function update() {
    if (controller.left.active) {
      game.world.player.moveLeft(); // console.log(game.world.player.x);
      // console.log(game.world.player.x + 14);
      // console.log(game.world.noteArr[1].y)
    }

    if (controller.right.active) {
      game.world.player.moveRight(); // console.log(game.world.player.x);
      // console.log(game.world.player.x + 14);
      // console.log(game.world.noteArr[1].y)
    } // if(controller.up.active){
    //     game.world.player.jump();
    //     controller.up.active = false;
    // }


    game.update();
  }; // let noteDrop = function() {
  // display.fill(game.world.background_color);
  // game.world.noteArr.forEach(note => {
  //     if(note.y < 120 && !note.hit){
  //         display.drawNote(note);
  //     } else if(game.world.noteArr[game.world.noteArr.length - 1].y > 118){
  //         game.world.gameEndMessage();
  //         game.world.gameEnd();
  //         game.world.backgroundTrack.play();
  //     }
  // })
  // game.world.bassNoteArr.forEach(note => {
  //     if(note.y < 120 && !note.hit) {
  //         display.drawNote(note);
  //     }
  // })
  // game.world.eightNoteArr.forEach(note => {
  //     if(note.y < 120 && !note.hit) {
  //         display.drawNote(note);
  //     }
  // })
  // display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
  // display.render();
  // }


  var controller = new Controller();
  var display = new Display(document.querySelector('canvas'));
  var game = new Game();
  var engine = new Engine(1000 / 30, render, update);
  display.buffer.canvas.height = game.world.height;
  display.buffer.canvas.width = game.world.width;
  window.addEventListener('keydown', keyDownUp);
  window.addEventListener('keyup', keyDownUp);
  window.addEventListener('resize', resize);
  resize(); // debugger;

  display.fill(game.world.background_color);
  document.getElementById('score-container').classList.add('playing');
  document.getElementById('end-menu').classList.add('playing');
  document.getElementById('tremor').classList.add('playing');
  document.getElementById('naruto').classList.add('playing');

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      game.world.restartGame();
      document.getElementById('start-menu').classList.add('playing');
      document.getElementById('tremor').classList.remove('playing');
      document.getElementById('naruto').classList.remove('playing');

      if (document.getElementById('pixel-logo').classList.contains('playing')) {
        document.getElementById('pixel-logo').classList.remove('playing');
      }

      if (!document.getElementById('end-menu').classList.contains('playing')) {
        document.getElementById('end-menu').classList.add('playing');
      }

      if (game.world.backgroundTrack.paused) {
        game.world.backgroundTrack.play();
      }

      if (!document.getElementById('score-container').classList.contains('playing')) {
        document.getElementById('score-container').classList.add('playing');
      }
    }

    if (e.keyCode === 80) {
      if (!game.world.backgroundTrack.paused) {
        game.world.backgroundTrack.pause();
      } else {
        game.world.backgroundTrack.play();
      }
    }
  };

  document.getElementById('tremor').addEventListener('click', function () {
    game.world.restartGame();
    game.world.song = 'tremor';
    game.world.fillNoteArr();
    game.world.fillBassArr();
    game.world.fillEightArr();
    game.world.backgroundTrack.pause();
    document.getElementById('start-menu').classList.add('playing');
    document.getElementById('pixel-logo').classList.add('playing');
    document.getElementById('tremor').classList.add('playing');
    document.getElementById('naruto').classList.add('playing');
    document.getElementById('score-container').classList.remove('playing'); // setInterval(() => noteDrop(), 1);
  });
  document.getElementById('naruto').addEventListener('click', function () {
    game.world.restartGame();
    game.world.song = 'naruto';
    game.world.fillNarutoNote(); // game.world.fillNarutoEight();

    game.world.backgroundTrack.pause();
    document.getElementById('start-menu').classList.add('playing');
    document.getElementById('pixel-logo').classList.add('playing');
    document.getElementById('tremor').classList.add('playing');
    document.getElementById('naruto').classList.add('playing');
    document.getElementById('score-container').classList.remove('playing'); // setInterval(() => noteDrop(), 1);
  });
  game.world.backgroundTrack.loop = true;
  game.world.backgroundTrack.volume = 0.3;
  game.world.backgroundTrack.play(); // var myMeterElement = document.getElementById('my-peak-meter');
  // var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  // var sourceNode = audioCtx.createMediaElementSource(game.world.backgroundTrack);
  // sourceNode.connect(audioCtx.destiation);
  // var meterNode = webAudioPeakMeter.createMeterNode(sourceNode, audioCtx);
  // webAudioPeakMeter.createMeter(myMeterElement, meterNode, {});

  engine.start();
});

/***/ }),

/***/ "./src/scripts/controller.js":
/*!***********************************!*\
  !*** ./src/scripts/controller.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Controller = function Controller() {
  this.left = new Controller.ButtonInput();
  this.right = new Controller.ButtonInput();
  this.up = new Controller.ButtonInput();

  this.keyDownUp = function (type, key_code) {
    var down = type === 'keydown' ? true : false;

    switch (key_code) {
      case 37:
        this.left.getInput(down);
        break;

      case 38:
        this.up.getInput(down);
        break;

      case 39:
        this.right.getInput(down);
    }
  };
};

Controller.prototype = {
  constructor: Controller
};

Controller.ButtonInput = function () {
  this.active = this.down = false;
};

Controller.ButtonInput.prototype = {
  constructor: Controller.ButtonInput,
  getInput: function getInput(down) {
    if (this.down != down) this.active = down;
    this.down = down;
  }
};
module.exports = Controller;

/***/ }),

/***/ "./src/scripts/display.js":
/*!********************************!*\
  !*** ./src/scripts/display.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Display = function Display(canvas) {
  this.buffer = document.createElement('canvas').getContext('2d'), this.context = canvas.getContext('2d');

  this.drawRectangle = function (x, y, width, height, color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height); // console.log('this is draw');
  };

  this.drawNote = function (note) {
    var x = note.x,
        y = note.y,
        width = note.width,
        height = note.height,
        color = note.color;
    this.buffer.fillStyle = color;
    this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height); // console.log(y);
  };

  this.fill = function (color) {
    this.buffer.fillStyle = color;
    this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
  };

  this.render = function () {
    this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
  };

  this.resize = function (width, height, height_width_ratio) {
    if (height / width > height_width_ratio) {
      this.context.canvas.height = width * height_width_ratio;
      this.context.canvas.width = width;
    } else {
      this.context.canvas.height = height;
      this.context.canvas.width = height / height_width_ratio;
    }

    this.context.imageSmoothingEnabled = false;
  };
};

Display.prototype = {
  constructor: Display
};
module.exports = Display;

/***/ }),

/***/ "./src/scripts/engine.js":
/*!*******************************!*\
  !*** ./src/scripts/engine.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Engine = function Engine(time_step, update, render) {
  var _this = this;

  this.accumulated_time = 0;
  this.animation_frame_request = undefined, this.time = undefined, this.time_step = time_step, this.updated = false;
  this.update = update;
  this.render = render;

  this.run = function (time_stamp) {
    this.accumulated_time += time_stamp - this.time;
    this.time = time_stamp;

    if (this.accumulated_time >= this.time_step * 3) {
      this.accumulated_time = this.time_step;
    }

    while (this.accumulated_time >= this.time_step) {
      this.accumulated_time -= this.time_step;
      this.update(time_stamp);
      this.updated = true;
    }

    if (this.updated) {
      this.updated = false;
      this.render(time_stamp);
    }

    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
  };

  this.handleRun = function (time_step) {
    _this.run(time_step);
  };
};

Engine.prototype = {
  constructor: Engine,
  start: function start() {
    this.accumulated_time = this.time_step;
    this.time = window.performance.now();
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
  },
  stop: function stop() {
    window.cancelAnimationFrame(this.animation_frame_request);
  }
};
module.exports = Engine;

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var Game = function Game() {
  this.world = {
    background_color: '#000000',
    friction: 0.9,
    gravity: 3,
    player: new Game.Player(),
    noteArr: [],
    bassNoteArr: [],
    eightNoteArr: [],
    height: 128,
    width: 150,
    score: 0,
    backgroundTrack: new Audio('Eric Skiff - A Night Of Dizzy Spells.mp3'),
    song: '',
    melodyArr: ['a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3', 'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'd5.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3', 'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'd5.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3'],
    bassArr: ['fs3.mp3', 'e3.mp3', 'ds3.mp3', 'd3.mp3', 'e3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'fs3.mp3', 'e3.mp3', 'ds3.mp3', 'd3.mp3', 'e3.mp3'],
    eightArr: ['a5.mp3', 'gs5.mp3', 'g5.mp3', 'fs5.mp3', 'fs5.mp3', 'gs5.mp3', 'a5.mp3', 'fs5.mp3', 'fs6.mp3', 'fs5.mp3', 'e5.mp3', 'cs5.mp3', 'b.mp3', 'b.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3', 'a5.mp3', 'gs5.mp3', 'g5.mp3', 'fs5.mp3', 'fs5.mp3', 'gs5.mp3', 'a5.mp3', 'fs5.mp3', 'fs6.mp3', 'fs5.mp3', 'e5.mp3', 'cs5.mp3', 'b.mp3', 'd6.mp3', 'cs6.mp3', 'b5.mp3', 'a5.mp3', 'fs5.mp3'],
    xPosArr: [70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 35, 45, 35, 25, 15, 70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 80, 75, 73, 70, 55, 35, 45, 35, 25, 35, 45, 35, 25, 35, 45, 35, 25, 35, 45, 35, 25, 35, 45, 35, 45, 35, 45, 35, 45, 45, 45, 45, 45, 45, 45, 70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 35, 45, 35, 25, 15, 70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 80, 75, 73, 70, 55, 150],
    xBassPosArr: [65, 50, 65, 45, 25, 35, 35, 35, 35, 35, 35, 65, 50, 65, 45, 25],
    xEightPosArr: [75, 70, 65, 60, 60, 70, 75, 60, 95, 60, 55, 50, 40, 40, 50, 40, 30, 20, 75, 70, 65, 60, 60, 70, 75, 60, 95, 60, 55, 50, 40, 85, 80, 78, 75, 60],
    narutoMelodyArr: ['b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', 'a3.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', 'a3.mp3', 'd.mp3', 'e.mp3', 'a3.mp3', 'e.mp3', 'fs.mp3', 'g.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'g5.mp3', 'fs5.mp3', 'd5.mp3', 'g5.mp3', 'fs5.mp3', 'd5.mp3', 'g5.mp3', 'fs5.mp3', 'd5.mp3', 'e5.mp3', 'fs5.mp3', //33
    'cs5.mp3', 'fs.mp3', 'd.mp3', 'e.mp3', 'fs.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', 'a.mp3', 'a.mp3', //46
    'e.mp3', 'cs.mp3', 'e.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //56
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'd.mp3', //61
    'fs.mp3', 'd.mp3', 'e.mp3', 'e.mp3', 'fs.mp3', 'd.mp3', 'd.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', 'a.mp3', 'a.mp3', //74
    'e.mp3', 'cs.mp3', 'e.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //84
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'd.mp3', //89
    'b3.mp3', 'fs.mp3', 'fs.mp3', 'd.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'd.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'fs.mp3', 'd.mp3', //102
    'b3.mp3', 'cs.mp3', 'd.mp3', 'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'e.mp3', 'e.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', //115
    'd.mp3', 'a3.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', //123 EIGHTS START HERE
    'e.mp3', 'a3.mp3', 'cs.mp3', 'e.mp3', 'g.mp3', 'fs.mp3', 'e.mp3', 'fs.mp3', //131
    'e.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //139
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'fs.mp3', //144
    'd.mp3', 'a3.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', //152
    'e.mp3', 'a3.mp3', 'cs.mp3', 'e.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', //162
    'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //168
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'fs.mp3', //173
    'd.mp3', 'a3.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', //181
    'e.mp3', 'a3.mp3', 'cs.mp3', 'e.mp3', 'e.mp3', 'g.mp3', 'a.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', //191
    'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //197
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'd.mp3', //202
    'a.mp3', 'fs.mp3', 'e.mp3', 'e.mp3', 'a.mp3', 'fs.mp3', 'e.mp3', 'e.mp3', 'b.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', //214
    'b3.mp3', 'cs.mp3', 'd.mp3', 'd.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', //221
    'b3.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', 'a3.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', //231
    'a3.mp3', 'b3.mp3', 'a3.mp3', 'd.mp3', 'e.mp3' //236
    ],
    narutoBassArr: [],
    // narutoEightArr: [
    //     'a3.mp3', 'd3.mp3', 'a3.mp3', 'd.mp3', 'd.mp3', 'd3.mp3', 'b3.mp3', 
    //     'b3.mp3', 'e3.mp3', 'a3.mp3', 'cs.mp3', 'cs.mp3', 'fs3.mp3', 'b3.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3',
    //     'd.mp3', 'd.mp3', 'a3.mp3', 'd3.mp3', 'd.mp3', 'd.mp3', 'a3.mp3', 'd3.mp3', 
    //     'a3.mp3', 'a3.mp3', 'e3.mp3', 'b3.mp3', 'b3.mp3', 'a3.mp3', 'd3.mp3', 'a3.mp3', 
    //     'd.mp3', 'd.mp3', 'd3.mp3', 'b3.mp3', 'b3.mp3', 'e3.mp3', 'a3.mp3', 'cs.mp3', 'cs.mp3', 'fs3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3', 
    //     'd.mp3', 'd.mp3', 'a3.mp3', 'd3.mp3', 'd.mp3', 'd.mp3', 'a3.mp3', 'd3.mp3',
    //     'a3.mp3', 'a3.mp3', 'e3.mp3', 'b3.mp3', 'b3.mp3', 'a3.mp3', 'd3.mp3', 'a3.mp3', 
    //     'd.mp3', 'd.mp3', 'd3.mp3', 'b3.mp3', 'b3.mp3', 'e3.mp3', 'a3.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3', 
    //     'd.mp3', 'd.mp3', 'a3.mp3', 'd3.mp3', 'd.mp3', 'd.mp3', 'a3.mp3', 'd3.mp3', 
    //     'a3.mp3', 'a3.mp3', 'e3.mp3', 'b3.mp3', 'b3.mp3',
    // ],
    // narutoxEightPosArr:[
    //     55, 40, 55, 70, 70, 60, 60, 
    //     60, 40, 50, 60, 75, 70, 70, 
    //     60, 55, 50, 85, 80, 55, 50, 85, 80, 55, 50,
    // ],
    narutoXPosArr: [50, 45, 50, 60, 45, 50, 45, 50, 60, 45, 50, 60, 45, 60, 65, 45, 65, 75, 80, 75, 65, 60, 115, 110, 100, 115, 110, 100, 115, 110, 100, 105, 110, 95, 75, 60, 65, 75, 60, 75, 75, 65, 60, 65, 85, 85, 65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60, 75, 60, 65, 65, 75, 60, 60, 75, 65, 60, 65, 85, 85, 65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60, 50, 75, 75, 60, 60, 75, 75, 60, 60, 90, 85, 75, 60, 50, 55, 60, 60, 55, 60, 65, 65, 65, 75, 65, 60, 65, 60, 45, 60, 75, 75, 65, 60, 65, 65, 45, 55, 65, 80, 75, 65, 75, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 75, 60, 45, 60, 75, 75, 65, 60, 65, 65, 45, 55, 65, 80, 75, 75, 75, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 75, 60, 50, 60, 75, 75, 65, 60, 65, 65, 45, 55, 65, 65, 80, 85, 75, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60, 85, 75, 65, 65, 85, 75, 65, 65, 90, 75, 65, 60, 50, 55, 60, 60, 75, 65, 60, 50, 50, 45, 50, 60, 45, 50, 45, 50, 60, 45, 50, 45, 60, 65],
    narutoxBassPosArr: [],
    fillNarutoNote: function fillNarutoNote() {
      var y = 0;
      var count = 0;

      while (this.noteArr.length < this.narutoMelodyArr.length) {
        this.noteArr.push(new Game.Note(this.narutoXPosArr[count], y, this.narutoMelodyArr[count]));
        count += 1;

        if (count < 4 || count === 73 || count === 90 || count === 94 || count === 98 || count === 100 || count >= 121 && count <= 122 || count >= 129 && count <= 130 || count >= 150 && count <= 151 || count >= 158 && count <= 159 || count >= 179 && count <= 180 || count >= 185 && count <= 186 || count === 203 || count === 207 || count === 211 || count >= 223 && count <= 225 || count >= 227 && count <= 230 || count >= 232 && count <= 235) {
          y -= 5;
        } else if (count === 4 || count === 25 || count === 26 || count === 29 || count === 30 || count === 32 || count === 33 || count === 46 || count === 74 || count === 92 || count === 96 || count === 204 || count === 208 || count === 212 || count === 226) {
          y -= 15;
        } else if (count >= 5 && count <= 8 || count === 10 || count === 20 || count === 21 || count >= 40 && count <= 43 || count === 45 || count >= 64 && count <= 65 || count >= 67 && count <= 68 || count >= 70 && count <= 71) {
          y -= 5;
        } else if (count === 9 || count >= 11 && count <= 12 || count >= 14 && count <= 15 || count === 17 || count === 18 || count === 19 || count === 22 || count === 23) {
          y -= 15;
        } else if (count === 13 || count === 16 || count === 24 || count === 27 || count === 31 || count >= 34 && count <= 37 || count === 39 || count === 44 || count >= 47 && count <= 49 || count >= 51 && count <= 52 || count >= 54 && count <= 55 || count >= 58 && count <= 63) {
          y -= 10;
        } else if (count === 28 || count === 38 || count == 66) {
          y -= 30;
        } else if (count === 50 || count === 53 || count >= 56 && count <= 57 || count === 78 || count === 81 || count >= 84 && count <= 85 || count === 89 || count === 102 || count >= 105 && count <= 106 || count >= 109 && count <= 111 || count === 123 || count === 133 || count === 136 || count >= 139 && count <= 140 || count === 152 || count === 162 || count === 165 || count >= 168 && count <= 169 || count === 181 || count === 191 || count === 194 || count >= 197 && count <= 198 || count === 202 || count === 214 || count >= 217 && count <= 218) {
          y -= 20;
        } else if (count === 69 || count === 72 || count >= 75 && count <= 77 || count >= 79 && count <= 80 || count >= 82 && count <= 83 || count >= 86 && count <= 88 || count === 91 || count === 93 || count === 95 || count === 97 || count === 99 || count === 101 || count >= 103 && count <= 104 || count >= 107 && count <= 108 || count >= 112 && count <= 120 || count >= 124 && count <= 128 || count >= 131 && count <= 132 || count >= 134 && count <= 135 || count >= 137 && count <= 138 || count >= 141 && count <= 149 || count >= 153 && count <= 157 || count >= 160 && count <= 161 || count >= 163 && count <= 164 || count >= 166 && count <= 167 || count >= 170 && count <= 178 || count >= 182 && count <= 184 || count >= 187 && count <= 190 || count >= 192 && count <= 193 || count >= 195 && count <= 196 || count >= 199 && count <= 201 || count >= 205 && count <= 206 || count >= 209 && count <= 210 || count === 213 || count >= 215 && count <= 216 || count >= 219 && count <= 222 || count === 231 || count === 236) {
          y -= 10;
        }
      }
    },
    // fillNarutoEight:function(){
    //     let y = -1335;
    //     let count = 0;
    //     while (this.eightNoteArr.length < this.narutoEightArr.length){
    //         this.eightNoteArr.push(new Game.Note(this.narutoxEightPosArr[count], y, this.narutoEightArr[count]));
    //         count += 1;
    //         if(count < 7 || (count >= 8 && count <= 19) || (count >= 21 && count <= 23) || count === 25 || (count >= 27 && count <= 36)) {
    //             y -= 10;
    //         } else if(count === 7 || count === 26){
    //             y -= 20;
    //         } else if(count === 20 || count === 24){
    //             y -= 15;
    //         }
    //     }
    // },
    restartGame: function restartGame() {
      this.noteArr = [];
      this.bassNoteArr = [];
      this.eightNoteArr = [];
      this.score = 0;
    },
    gameEnd: function gameEnd() {
      document.getElementById('end-menu').classList.remove('playing');
    },
    gameEndMessage: function gameEndMessage() {
      var message = ''; // debugger;

      if (this.score >= 99.8) {
        message = 'WOW! PERFECT SCORE! PRESS SPACEBAR TO TRY AGAIN';
      } else if (this.score >= 90 && this.score < 99.8) {
        message = 'SO CLOSE TO PERFECTION! PRESS SPACEBAR TO TRY AGAIN';
      } else if (this.score >= 80 && this.score <= 89) {
        message = 'PRETTY GOOD, BUT I BET YOU CAN DO BETTER. PRESS SPACEBAR TO TRY AGAIN';
      } else if (this.score >= 70 && this.score <= 79) {
        message = 'OH MAN, MAYBE YOU SHOULD PRACTICE A LITTLE MORE. PRESS SPACEBAR TO TRY AGAIN';
      } else if (this.score <= 69) {
        message = 'IS YOUR MONITOR ON? PRESS SPACEBAR TO TRY AGAIN';
      }

      document.getElementById('end-menu').innerHTML = message;
    },
    fillNoteArr: function fillNoteArr() {
      var y = 0;
      var count = 0;

      while (this.noteArr.length < this.melodyArr.length) {
        this.noteArr.push(new Game.Note(this.xPosArr[count], y, this.melodyArr[count]));
        count += 1;

        if (count <= 4 || count >= 67 && count <= 70) {
          y -= 20;
        } else if (count >= 5 && count <= 8 || count >= 71 && count <= 74) {
          y -= 10;
        } else if (count === 9 || count === 75) {
          y -= 30;
        } else if (count >= 10 && count <= 13 || count >= 76 && count <= 79) {
          y -= 20;
        } else if (count >= 14 && count <= 17 || count >= 80 && count <= 83) {
          y -= 10;
        } else if (count === 18 || count === 84) {
          y -= 30;
        } else if (count >= 19 && count <= 22 || count >= 85 && count <= 88) {
          y -= 20;
        } else if (count >= 23 && count <= 26 || count >= 89 && count <= 92) {
          y -= 10;
        } else if (count === 27 || count === 93) {
          y -= 30;
        } else if (count >= 28 && count <= 31 || count >= 94 && count <= 97) {
          y -= 20;
        } else if (count >= 32 && count <= 36 || count >= 98 && count <= 102) {
          y -= 10;
        } else if (count >= 37 && count <= 60) {
          y -= 10;
        } else if (count === 61) {
          y -= 5;
        } else if (count === 62) {
          y -= 10;
        } else if (count === 63) {
          y -= 5;
        } else if (count === 64) {
          y -= 10;
        } else if (count === 65) {
          y -= 5;
        } else if (count === 66) {
          y -= 30;
        }
      }
    },
    fillBassArr: function fillBassArr() {
      // debugger;
      var y = 0;
      var count = 0;

      while (this.bassNoteArr.length < this.bassArr.length) {
        this.bassNoteArr.push(new Game.Note(this.xBassPosArr[count], y, this.bassArr[count]));
        count += 1; // console.log(this.bassNoteArr[count - 1].sound);

        if (count <= 3 || count >= 12 && count <= 14) {
          y -= 150;
        } else if (count === 4 || count === 15) {
          y -= 60;
        } else if (count === 5) {
          y -= 310;
        } else if (count === 6) {
          y -= 5;
        } else if (count === 7) {
          y -= 10;
        } else if (count === 8) {
          y -= 5;
        } else if (count === 9) {
          y -= 10;
        } else if (count === 10) {
          y -= 5;
        } else if (count === 11) {
          y -= 30;
        }
      } // console.log(this.bassNoteArr);

    },
    fillEightArr: function fillEightArr() {
      var y = -885;
      var count = 0;

      while (this.eightNoteArr.length < this.eightArr.length) {
        this.eightNoteArr.push(new Game.Note(this.xEightPosArr[count], y, this.eightArr[count]));
        count += 1;

        if (count <= 4) {
          y -= 20;
        } else if (count >= 5 && count <= 8) {
          y -= 10;
        } else if (count === 9 || count === 75) {
          y -= 30;
        } else if (count >= 10 && count <= 13) {
          y -= 20;
        } else if (count >= 14 && count <= 17) {
          y -= 10;
        } else if (count === 18 || count === 84) {
          y -= 30;
        } else if (count >= 19 && count <= 22) {
          y -= 20;
        } else if (count >= 23 && count <= 26) {
          y -= 10;
        } else if (count === 27) {
          y -= 30;
        } else if (count >= 28 && count <= 31) {
          y -= 20;
        } else if (count >= 32 && count <= 36) {
          y -= 10;
        }
      }
    },
    scoreUpdate: function scoreUpdate() {
      if (this.song === 'tremor') {
        this.score += 100 / (this.melodyArr.length + this.bassArr.length + this.eightArr.length);
      } else if (this.song === 'naruto') {
        this.score += 100 / this.narutoMelodyArr.length;
      } // this.score += 1;

    },
    collideObject: function collideObject(object) {
      if (object.x < 0) {
        object.x = 0;
        object.velocity_x = 0;
      } else if (object.x + object.width > this.width) {
        object.x = this.width - object.width;
        object.velocity_x = 0;
      } // if(object.y < 0) {
      //     object.y = 0;
      //     object.velocity_y = 0;
      // } else if(object.y + object.height > this.height) {
      //     object.jumping = false;
      //     object.y = this.height - object.height;
      //     object.velocity_y = 0;
      // }

    },
    update: function update() {
      this.player.velocity_y += this.gravity;
      this.player.velocity_x *= this.friction;
      this.player.velocity_y *= this.friction;
      this.player.update();
      this.noteArr.forEach(function (note) {
        note.update();
      });
      this.bassNoteArr.forEach(function (note) {
        note.update();
      });
      this.eightNoteArr.forEach(function (note) {
        note.update();
      });
      this.collideObject(this.player);
    }
  };

  this.update = function () {
    this.world.update();
  };
};

Game.prototype = {
  constructor: Game
};

Game.Player = function (x, y) {
  this.color = '#ff0000';
  this.height = 4; // this.jumping = true;

  this.velocity_x = 0; // this.velocity_y = 0;

  this.width = 24;
  this.x = 60;
  this.y = 110;
};

Game.Player.prototype = {
  constructor: Game.Player,
  // jump:function() {
  //     if(!this.jumping){
  //         this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);
  //         if(this.color.length != 7){
  //             this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6);
  //         }
  //         this.jumping = true;
  //         this.velocity_y -= 15;
  //     }
  // },
  hitNote: function hitNote() {
    this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);
  },
  moveLeft: function moveLeft() {
    this.velocity_x -= 0.75;
  },
  moveRight: function moveRight() {
    this.velocity_x += 0.75;
  },
  update: function update() {
    this.x += this.velocity_x; // this.y += this.velocity_y;
  }
};

Game.Note = function (x, y, audioFile) {
  this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);

  if (this.color.length != 7) {
    this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6);
  }

  this.height = 2;
  this.width = 2;
  this.x = x;
  this.y = y;
  this.velocity_y = 1;
  this.hit = false;
  this.sound = new Audio(audioFile);
};

Game.Note.prototype = {
  constructor: Game.Note,
  update: function update() {
    this.y += this.velocity_y;
  }
};
module.exports = Game;

/***/ }),

/***/ "./src/styles/index.scss":
/*!*******************************!*\
  !*** ./src/styles/index.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby1wZWFrLW1ldGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiRGlzcGxheSIsIkVuZ2luZSIsIkdhbWUiLCJ3ZWJBdWRpb1BlYWtNZXRlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duVXAiLCJjb250cm9sbGVyIiwidHlwZSIsImtleUNvZGUiLCJyZXNpemUiLCJkaXNwbGF5IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsImZpbGwiLCJiYWNrZ3JvdW5kX2NvbG9yIiwibm90ZUFyciIsImZvckVhY2giLCJub3RlIiwieSIsImhpdCIsImRyYXdOb3RlIiwibGVuZ3RoIiwiZ2FtZUVuZE1lc3NhZ2UiLCJnYW1lRW5kIiwiYmFja2dyb3VuZFRyYWNrIiwicGxheSIsImJhc3NOb3RlQXJyIiwiZWlnaHROb3RlQXJyIiwiZHJhd1JlY3RhbmdsZSIsInBsYXllciIsIngiLCJjb2xvciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJ0b0ZpeGVkIiwidG9TdHJpbmciLCJzY29yZVVwZGF0ZSIsInNvdW5kIiwiaGl0Tm90ZSIsInVwZGF0ZSIsImxlZnQiLCJhY3RpdmUiLCJtb3ZlTGVmdCIsInJpZ2h0IiwibW92ZVJpZ2h0IiwicXVlcnlTZWxlY3RvciIsImVuZ2luZSIsImJ1ZmZlciIsImNhbnZhcyIsIndpbmRvdyIsImNsYXNzTGlzdCIsImFkZCIsImJvZHkiLCJvbmtleXVwIiwicmVzdGFydEdhbWUiLCJyZW1vdmUiLCJjb250YWlucyIsInBhdXNlZCIsInBhdXNlIiwic29uZyIsImZpbGxOb3RlQXJyIiwiZmlsbEJhc3NBcnIiLCJmaWxsRWlnaHRBcnIiLCJmaWxsTmFydXRvTm90ZSIsImxvb3AiLCJ2b2x1bWUiLCJzdGFydCIsIkJ1dHRvbklucHV0IiwidXAiLCJrZXlfY29kZSIsImRvd24iLCJnZXRJbnB1dCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwiaGVpZ2h0X3dpZHRoX3JhdGlvIiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwidGltZV9zdGVwIiwiYWNjdW11bGF0ZWRfdGltZSIsImFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0IiwidW5kZWZpbmVkIiwidGltZSIsInVwZGF0ZWQiLCJydW4iLCJ0aW1lX3N0YW1wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGFuZGxlUnVuIiwicGVyZm9ybWFuY2UiLCJub3ciLCJzdG9wIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmcmljdGlvbiIsImdyYXZpdHkiLCJQbGF5ZXIiLCJBdWRpbyIsIm1lbG9keUFyciIsImJhc3NBcnIiLCJlaWdodEFyciIsInhQb3NBcnIiLCJ4QmFzc1Bvc0FyciIsInhFaWdodFBvc0FyciIsIm5hcnV0b01lbG9keUFyciIsIm5hcnV0b0Jhc3NBcnIiLCJuYXJ1dG9YUG9zQXJyIiwibmFydXRveEJhc3NQb3NBcnIiLCJjb3VudCIsInB1c2giLCJOb3RlIiwibWVzc2FnZSIsImNvbGxpZGVPYmplY3QiLCJvYmplY3QiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJhbmRvbSIsImF1ZGlvRmlsZSIsInNsaWNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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SCxJQUFMLENBQVU1QyxTQUFWLEdBQXNCO0FBQ2xCQyxhQUFXLEVBQUdoRixJQUFJLENBQUMySCxJQUREO0FBRWxCN0UsUUFBTSxFQUFFLGtCQUFVO0FBQ2QsU0FBS3RCLENBQUwsSUFBVSxLQUFLd0csVUFBZjtBQUNIO0FBSmlCLENBQXRCO0FBU0EvQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsRixJQUFqQixDOzs7Ozs7Ozs7OztBQzdlQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJ2YXIgd2ViQXVkaW9QZWFrTWV0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBib3JkZXJTaXplOiAyLFxuICAgIGZvbnRTaXplOiA5LFxuICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICB0aWNrQ29sb3I6ICcjZGRkJyxcbiAgICBncmFkaWVudDogWydyZWQgMSUnLCAnI2ZmMCAxNiUnLCAnbGltZSA0NSUnLCAnIzA4MCAxMDAlJ10sXG4gICAgZGJSYW5nZTogNDgsXG4gICAgZGJUaWNrU2l6ZTogNixcbiAgICBtYXNrVHJhbnNpdGlvbjogJ2hlaWdodCAwLjFzJ1xuICB9O1xuICB2YXIgdGlja1dpZHRoO1xuICB2YXIgZWxlbWVudFdpZHRoO1xuICB2YXIgZWxlbWVudEhlaWdodDtcbiAgdmFyIG1ldGVySGVpZ2h0O1xuICB2YXIgbWV0ZXJXaWR0aDtcbiAgdmFyIG1ldGVyVG9wO1xuICB2YXIgdmVydGljYWwgPSB0cnVlO1xuICB2YXIgY2hhbm5lbENvdW50ID0gMTtcbiAgdmFyIGNoYW5uZWxNYXNrcyA9IFtdO1xuICB2YXIgY2hhbm5lbFBlYWtzID0gW107XG4gIHZhciBjaGFubmVsUGVha0xhYmVscyA9IFtdO1xuXG4gIHZhciBnZXRCYXNlTG9nID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeSkgLyBNYXRoLmxvZyh4KTtcbiAgfTtcblxuICB2YXIgZGJGcm9tRmxvYXQgPSBmdW5jdGlvbiAoZmxvYXRWYWwpIHtcbiAgICByZXR1cm4gZ2V0QmFzZUxvZygxMCwgZmxvYXRWYWwpICogMjA7XG4gIH07XG5cbiAgdmFyIHNldE9wdGlvbnMgPSBmdW5jdGlvbiAodXNlck9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrIGluIHVzZXJPcHRpb25zKSB7XG4gICAgICBvcHRpb25zW2tdID0gdXNlck9wdGlvbnNba107XG4gICAgfVxuXG4gICAgdGlja1dpZHRoID0gb3B0aW9ucy5mb250U2l6ZSAqIDIuMDtcbiAgICBtZXRlclRvcCA9IG9wdGlvbnMuZm9udFNpemUgKiAxLjUgKyBvcHRpb25zLmJvcmRlclNpemU7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1ldGVyTm9kZSA9IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCBhdWRpb0N0eCkge1xuICAgIHZhciBjID0gc291cmNlTm9kZS5jaGFubmVsQ291bnQ7XG4gICAgdmFyIG1ldGVyTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCBjLCBjKTtcbiAgICBzb3VyY2VOb2RlLmNvbm5lY3QobWV0ZXJOb2RlKTtcbiAgICBtZXRlck5vZGUuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7XG4gICAgcmV0dXJuIG1ldGVyTm9kZTtcbiAgfTtcblxuICB2YXIgY3JlYXRlQ29udGFpbmVyRGl2ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgIHZhciBtZXRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS53aWR0aCA9IGVsZW1lbnRXaWR0aCArICdweCc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IGVsZW1lbnRIZWlnaHQgKyAncHgnO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvcjtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobWV0ZXJFbGVtZW50KTtcbiAgICByZXR1cm4gbWV0ZXJFbGVtZW50O1xuICB9O1xuXG4gIHZhciBjcmVhdGVNZXRlciA9IGZ1bmN0aW9uIChkb21FbGVtZW50LCBtZXRlck5vZGUsIG9wdGlvbnNPdmVycmlkZXMpIHtcbiAgICBzZXRPcHRpb25zKG9wdGlvbnNPdmVycmlkZXMpO1xuICAgIGVsZW1lbnRXaWR0aCA9IGRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgZWxlbWVudEhlaWdodCA9IGRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHZhciBtZXRlckVsZW1lbnQgPSBjcmVhdGVDb250YWluZXJEaXYoZG9tRWxlbWVudCk7XG5cbiAgICBpZiAoZWxlbWVudFdpZHRoID4gZWxlbWVudEhlaWdodCkge1xuICAgICAgdmVydGljYWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBtZXRlckhlaWdodCA9IGVsZW1lbnRIZWlnaHQgLSBtZXRlclRvcCAtIG9wdGlvbnMuYm9yZGVyU2l6ZTtcbiAgICBtZXRlcldpZHRoID0gZWxlbWVudFdpZHRoIC0gdGlja1dpZHRoIC0gb3B0aW9ucy5ib3JkZXJTaXplO1xuICAgIGNyZWF0ZVRpY2tzKG1ldGVyRWxlbWVudCk7XG4gICAgY3JlYXRlUmFpbmJvdyhtZXRlckVsZW1lbnQsIG1ldGVyV2lkdGgsIG1ldGVySGVpZ2h0LCBtZXRlclRvcCwgdGlja1dpZHRoKTtcbiAgICBjaGFubmVsQ291bnQgPSBtZXRlck5vZGUuY2hhbm5lbENvdW50O1xuICAgIHZhciBjaGFubmVsV2lkdGggPSBtZXRlcldpZHRoIC8gY2hhbm5lbENvdW50O1xuICAgIHZhciBjaGFubmVsTGVmdCA9IHRpY2tXaWR0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgIGNyZWF0ZUNoYW5uZWxNYXNrKG1ldGVyRWxlbWVudCwgb3B0aW9ucy5ib3JkZXJTaXplLCBtZXRlclRvcCwgY2hhbm5lbExlZnQsIGZhbHNlKTtcbiAgICAgIGNoYW5uZWxNYXNrc1tpXSA9IGNyZWF0ZUNoYW5uZWxNYXNrKG1ldGVyRWxlbWVudCwgY2hhbm5lbFdpZHRoLCBtZXRlclRvcCwgY2hhbm5lbExlZnQsIG9wdGlvbnMubWFza1RyYW5zaXRpb24pO1xuICAgICAgY2hhbm5lbFBlYWtzW2ldID0gMC4wO1xuICAgICAgY2hhbm5lbFBlYWtMYWJlbHNbaV0gPSBjcmVhdGVQZWFrTGFiZWwobWV0ZXJFbGVtZW50LCBjaGFubmVsV2lkdGgsIGNoYW5uZWxMZWZ0KTtcbiAgICAgIGNoYW5uZWxMZWZ0ICs9IGNoYW5uZWxXaWR0aDtcbiAgICB9XG5cbiAgICBtZXRlck5vZGUub25hdWRpb3Byb2Nlc3MgPSB1cGRhdGVNZXRlcjtcbiAgICBtZXRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICAgIGNoYW5uZWxQZWFrc1tpXSA9IDAuMDtcbiAgICAgICAgY2hhbm5lbFBlYWtMYWJlbHNbaV0udGV4dENvbnRlbnQgPSAnLeKInic7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9O1xuXG4gIHZhciBjcmVhdGVUaWNrcyA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICB2YXIgbnVtVGlja3MgPSBNYXRoLmZsb29yKG9wdGlvbnMuZGJSYW5nZSAvIG9wdGlvbnMuZGJUaWNrU2l6ZSk7XG4gICAgdmFyIGRiVGlja0xhYmVsID0gMDtcbiAgICB2YXIgZGJUaWNrVG9wID0gb3B0aW9ucy5mb250U2l6ZSArIG9wdGlvbnMuYm9yZGVyU2l6ZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVGlja3M7IGkrKykge1xuICAgICAgdmFyIGRiVGljayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGRiVGljayk7XG4gICAgICBkYlRpY2suc3R5bGUud2lkdGggPSB0aWNrV2lkdGggKyAncHgnO1xuICAgICAgZGJUaWNrLnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCc7XG4gICAgICBkYlRpY2suc3R5bGUuY29sb3IgPSBvcHRpb25zLnRpY2tDb2xvcjtcbiAgICAgIGRiVGljay5zdHlsZS5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgKyAncHgnO1xuICAgICAgZGJUaWNrLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGRiVGljay5zdHlsZS50b3AgPSBkYlRpY2tUb3AgKyAncHgnO1xuICAgICAgZGJUaWNrLnRleHRDb250ZW50ID0gZGJUaWNrTGFiZWwgKyAnJztcbiAgICAgIGRiVGlja0xhYmVsIC09IG9wdGlvbnMuZGJUaWNrU2l6ZTtcbiAgICAgIGRiVGlja1RvcCArPSBtZXRlckhlaWdodCAvIG51bVRpY2tzO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY3JlYXRlUmFpbmJvdyA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCBoZWlnaHQsIHRvcCwgbGVmdCkge1xuICAgIHZhciByYWluYm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHJhaW5ib3cpO1xuICAgIHJhaW5ib3cuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgcmFpbmJvdy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIHJhaW5ib3cuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHJhaW5ib3cuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICByYWluYm93LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICB2YXIgZ3JhZGllbnRTdHlsZSA9ICdsaW5lYXItZ3JhZGllbnQoJyArIG9wdGlvbnMuZ3JhZGllbnQuam9pbignLCAnKSArICcpJztcbiAgICByYWluYm93LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGdyYWRpZW50U3R5bGU7XG4gICAgcmV0dXJuIHJhaW5ib3c7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVBlYWtMYWJlbCA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCBsZWZ0KSB7XG4gICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBsYWJlbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBsYWJlbC5zdHlsZS5jb2xvciA9IG9wdGlvbnMudGlja0NvbG9yO1xuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZSArICdweCc7XG4gICAgbGFiZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGxhYmVsLnN0eWxlLnRvcCA9IG9wdGlvbnMuYm9yZGVyU2l6ZSArICdweCc7XG4gICAgbGFiZWwuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gJy3iiJ4nO1xuICAgIHJldHVybiBsYWJlbDtcbiAgfTtcblxuICB2YXIgY3JlYXRlQ2hhbm5lbE1hc2sgPSBmdW5jdGlvbiAocGFyZW50LCB3aWR0aCwgdG9wLCBsZWZ0LCB0cmFuc2l0aW9uKSB7XG4gICAgdmFyIGNoYW5uZWxNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNoYW5uZWxNYXNrKTtcbiAgICBjaGFubmVsTWFzay5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5oZWlnaHQgPSBtZXRlckhlaWdodCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgIGNoYW5uZWxNYXNrLnN0eWxlLnRyYW5zaXRpb24gPSBvcHRpb25zLm1hc2tUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBjaGFubmVsTWFzaztcbiAgfTtcblxuICB2YXIgbWFza1NpemUgPSBmdW5jdGlvbiAoZmxvYXRWYWwpIHtcbiAgICBpZiAoZmxvYXRWYWwgPT09IDAuMCkge1xuICAgICAgcmV0dXJuIG1ldGVySGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZCA9IG9wdGlvbnMuZGJSYW5nZSAqIC0xO1xuICAgICAgdmFyIHJldHVyblZhbCA9IE1hdGguZmxvb3IoZGJGcm9tRmxvYXQoZmxvYXRWYWwpICogbWV0ZXJIZWlnaHQgLyBkKTtcblxuICAgICAgaWYgKHJldHVyblZhbCA+IG1ldGVySGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBtZXRlckhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciB1cGRhdGVNZXRlciA9IGZ1bmN0aW9uIChhdWRpb1Byb2Nlc3NpbmdFdmVudCkge1xuICAgIHZhciBpbnB1dEJ1ZmZlciA9IGF1ZGlvUHJvY2Vzc2luZ0V2ZW50LmlucHV0QnVmZmVyO1xuICAgIHZhciBpO1xuICAgIHZhciBjaGFubmVsRGF0YSA9IFtdO1xuICAgIHZhciBjaGFubmVsTWF4ZXMgPSBbXTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgY2hhbm5lbERhdGFbaV0gPSBpbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YShpKTtcbiAgICAgIGNoYW5uZWxNYXhlc1tpXSA9IDAuMDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBzYW1wbGUgPSAwOyBzYW1wbGUgPCBpbnB1dEJ1ZmZlci5sZW5ndGg7IHNhbXBsZSsrKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGNoYW5uZWxEYXRhW2ldW3NhbXBsZV0pID4gY2hhbm5lbE1heGVzW2ldKSB7XG4gICAgICAgICAgY2hhbm5lbE1heGVzW2ldID0gTWF0aC5hYnMoY2hhbm5lbERhdGFbaV1bc2FtcGxlXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgIHZhciB0aGlzTWFza1NpemUgPSBtYXNrU2l6ZShjaGFubmVsTWF4ZXNbaV0sIG1ldGVySGVpZ2h0KTtcbiAgICAgIGNoYW5uZWxNYXNrc1tpXS5zdHlsZS5oZWlnaHQgPSB0aGlzTWFza1NpemUgKyAncHgnO1xuXG4gICAgICBpZiAoY2hhbm5lbE1heGVzW2ldID4gY2hhbm5lbFBlYWtzW2ldKSB7XG4gICAgICAgIGNoYW5uZWxQZWFrc1tpXSA9IGNoYW5uZWxNYXhlc1tpXTtcbiAgICAgICAgdmFyIGxhYmVsVGV4dCA9IGRiRnJvbUZsb2F0KGNoYW5uZWxQZWFrc1tpXSkudG9GaXhlZCgxKTtcbiAgICAgICAgY2hhbm5lbFBlYWtMYWJlbHNbaV0udGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlTWV0ZXJOb2RlOiBjcmVhdGVNZXRlck5vZGUsXG4gICAgY3JlYXRlTWV0ZXI6IGNyZWF0ZU1ldGVyXG4gIH07XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2ViQXVkaW9QZWFrTWV0ZXI7IiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcclxuY29uc3QgQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vc2NyaXB0cy9jb250cm9sbGVyJyk7XHJcbmNvbnN0IERpc3BsYXkgPSByZXF1aXJlKCcuL3NjcmlwdHMvZGlzcGxheScpO1xyXG5jb25zdCBFbmdpbmUgPSByZXF1aXJlKCcuL3NjcmlwdHMvZW5naW5lJyk7XHJcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL3NjcmlwdHMvZ2FtZScpO1xyXG52YXIgd2ViQXVkaW9QZWFrTWV0ZXIgPSByZXF1aXJlKCd3ZWItYXVkaW8tcGVhay1tZXRlcicpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBsZXQga2V5RG93blVwID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnRyb2xsZXIua2V5RG93blVwKGUudHlwZSwgZS5rZXlDb2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlc2l6ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBkaXNwbGF5LnJlc2l6ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAzMiwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDMyLCBnYW1lLndvcmxkLmhlaWdodCAvIGdhbWUud29ybGQud2lkdGgpO1xyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7Ly8gQ2xlYXIgYmFja2dyb3VuZCB0byBnYW1lJ3MgYmFja2dyb3VuZCBjb2xvci5cclxuICAgICAgICAvLyBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG4gICAgICAgIC8vIG5vdGVEcm9wKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihnYW1lLndvcmxkLm5vdGVBcnJbZ2FtZS53b3JsZC5ub3RlQXJyLmxlbmd0aCAtIDFdLnkgPiAxMTgpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5pbm5lckhUTUwgPSAoZ2FtZS53b3JsZC5zY29yZSA9PT0gMCkgPyAoXHJcbiAgICAgICAgICAgICcwJSdcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAoZ2FtZS53b3JsZC5zY29yZS50b0ZpeGVkKDIpKS50b1N0cmluZygpICsgJyUnXHJcbiAgICAgICAgKSBcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoY29udHJvbGxlci5sZWZ0LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCArIDE0KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5ub3RlQXJyWzFdLnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb250cm9sbGVyLnJpZ2h0LmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCArIDE0KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5ub3RlQXJyWzFdLnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZihjb250cm9sbGVyLnVwLmFjdGl2ZSl7XHJcbiAgICAgICAgLy8gICAgIGdhbWUud29ybGQucGxheWVyLmp1bXAoKTtcclxuICAgICAgICAvLyAgICAgY29udHJvbGxlci51cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGdhbWUudXBkYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGxldCBub3RlRHJvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIGRpc3BsYXkuZmlsbChnYW1lLndvcmxkLmJhY2tncm91bmRfY29sb3IpO1xyXG5cclxuICAgICAgICAvLyBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAvLyAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgLy8gICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgIC8vICAgICB9IGVsc2UgaWYoZ2FtZS53b3JsZC5ub3RlQXJyW2dhbWUud29ybGQubm90ZUFyci5sZW5ndGggLSAxXS55ID4gMTE4KXtcclxuICAgICAgICAvLyAgICAgICAgIGdhbWUud29ybGQuZ2FtZUVuZE1lc3NhZ2UoKTtcclxuICAgICAgICAvLyAgICAgICAgIGdhbWUud29ybGQuZ2FtZUVuZCgpO1xyXG4gICAgICAgIC8vICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gZ2FtZS53b3JsZC5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAvLyAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcblxyXG4gICAgICAgIC8vIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGRpc3BsYXkgPSBuZXcgRGlzcGxheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSk7XHJcbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgICBsZXQgZW5naW5lID0gbmV3IEVuZ2luZSgxMDAwLzMwLCByZW5kZXIsIHVwZGF0ZSk7XHJcblxyXG4gICAgZGlzcGxheS5idWZmZXIuY2FudmFzLmhlaWdodCA9IGdhbWUud29ybGQuaGVpZ2h0O1xyXG4gICAgZGlzcGxheS5idWZmZXIuY2FudmFzLndpZHRoID0gZ2FtZS53b3JsZC53aWR0aDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXlEb3duVXApO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XHJcblxyXG4gICAgcmVzaXplKCk7XHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuICAgIFxyXG4gICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkub25rZXl1cCA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMzIpe1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gODApIHtcclxuICAgICAgICAgICAgaWYoIWdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlZCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuc29uZyA9ICd0cmVtb3InO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTm90ZUFycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxCYXNzQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEVpZ2h0QXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuc29uZyA9ICduYXJ1dG8nO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTmFydXRvTm90ZSgpO1xyXG4gICAgICAgICAgICAvLyBnYW1lLndvcmxkLmZpbGxOYXJ1dG9FaWdodCgpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldEludGVydmFsKCgpID0+IG5vdGVEcm9wKCksIDEpO1xyXG4gICAgfSlcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLmxvb3AgPSB0cnVlO1xyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sudm9sdW1lID0gMC4zO1xyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgXHJcbiAgICAvLyB2YXIgbXlNZXRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktcGVhay1tZXRlcicpO1xyXG4gICAgLy8gdmFyIGF1ZGlvQ3R4ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAvLyB2YXIgc291cmNlTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjayk7XHJcbiAgICAvLyBzb3VyY2VOb2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGlhdGlvbik7XHJcbiAgICAvLyB2YXIgbWV0ZXJOb2RlID0gd2ViQXVkaW9QZWFrTWV0ZXIuY3JlYXRlTWV0ZXJOb2RlKHNvdXJjZU5vZGUsIGF1ZGlvQ3R4KTtcclxuICAgIC8vIHdlYkF1ZGlvUGVha01ldGVyLmNyZWF0ZU1ldGVyKG15TWV0ZXJFbGVtZW50LCBtZXRlck5vZGUsIHt9KTtcclxuXHJcbiAgICBlbmdpbmUuc3RhcnQoKTtcclxuXHJcbn0pOyIsIlxyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxlZnQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy5yaWdodCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnVwID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuXHJcbiAgICB0aGlzLmtleURvd25VcCA9IGZ1bmN0aW9uKHR5cGUsIGtleV9jb2RlKSB7XHJcbiAgICAgICAgbGV0IGRvd24gPSAodHlwZSA9PT0gJ2tleWRvd24nKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoKGtleV9jb2RlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0LmdldElucHV0KGRvd24pOyAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzODogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwLmdldElucHV0KGRvd24pOyAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM5OiBcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHQuZ2V0SW5wdXQoZG93bik7XHJcbiAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5Db250cm9sbGVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlclxyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLmRvd24gPSBmYWxzZTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyLkJ1dHRvbklucHV0LFxyXG5cclxuICAgIGdldElucHV0IDogZnVuY3Rpb24oZG93bikge1xyXG4gICAgICAgIGlmKHRoaXMuZG93biAhPSBkb3duKSB0aGlzLmFjdGl2ZSA9IGRvd247XHJcbiAgICAgICAgdGhpcy5kb3duID0gZG93bjtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlcjsiLCJjb25zdCBEaXNwbGF5ID0gZnVuY3Rpb24oY2FudmFzKXtcclxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSxcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIHRoaXMuZHJhd1JlY3RhbmdsZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgZHJhdycpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRyYXdOb3RlID0gZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IgfSA9IG5vdGU7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWxsID0gZnVuY3Rpb24oY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdCgwLCAwLCB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIuY2FudmFzLCAwLCAwLCB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQsIDAsIDAsIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgIGlmKGhlaWdodCAvIHdpZHRoID4gaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSB3aWR0aCAqIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gaGVpZ2h0IC8gaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIFxyXG59O1xyXG5cclxuRGlzcGxheS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IERpc3BsYXlcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheTsiLCJcclxuY29uc3QgRW5naW5lID0gZnVuY3Rpb24odGltZV9zdGVwLCB1cGRhdGUsIHJlbmRlcikge1xyXG4gICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gMDtcclxuICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWUgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWVfc3RlcCA9IHRpbWVfc3RlcCxcclxuXHJcbiAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG5cclxuICAgIHRoaXMucnVuID0gZnVuY3Rpb24odGltZV9zdGFtcCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSArPSB0aW1lX3N0YW1wIC0gdGhpcy50aW1lO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWVfc3RhbXA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXAgKiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSAtPSB0aGlzLnRpbWVfc3RlcDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHRpbWVfc3RhbXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudXBkYXRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aW1lX3N0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5oYW5kbGVSdW4gPSAodGltZV9zdGVwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ydW4odGltZV9zdGVwKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5FbmdpbmUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBFbmdpbmUsXHJcblxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgdGhpcy50aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTsiLCJjb25zdCBHYW1lID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy53b3JsZCA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgZnJpY3Rpb246IDAuOSxcclxuICAgICAgICBncmF2aXR5OiAzLFxyXG4gICAgICAgIHBsYXllcjogbmV3IEdhbWUuUGxheWVyKCksXHJcbiAgICAgICAgbm90ZUFycjogW10sXHJcbiAgICAgICAgYmFzc05vdGVBcnI6IFtdLFxyXG4gICAgICAgIGVpZ2h0Tm90ZUFycjogW10sXHJcbiAgICAgICAgaGVpZ2h0OiAxMjgsXHJcbiAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICBzY29yZTogMCxcclxuICAgICAgICBiYWNrZ3JvdW5kVHJhY2s6IG5ldyBBdWRpbygnRXJpYyBTa2lmZiAtIEEgTmlnaHQgT2YgRGl6enkgU3BlbGxzLm1wMycpLFxyXG4gICAgICAgIHNvbmc6ICcnLFxyXG5cclxuICAgICAgICBtZWxvZHlBcnI6IFtcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsIFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJyxcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2Q1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcblxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgXHJcblxyXG4gICAgICAgICAgICAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCBcclxuXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLCBcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdkNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYmFzc0FycjogW1xyXG4gICAgICAgICAgICAnZnMzLm1wMycsICdlMy5tcDMnLCAnZHMzLm1wMycsICdkMy5tcDMnLCAnZTMubXAzJywgXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsXHJcbiAgICAgICAgICAgICdmczMubXAzJywgJ2UzLm1wMycsICdkczMubXAzJywgJ2QzLm1wMycsICdlMy5tcDMnLCBcclxuICAgICAgICBdLFxyXG4gICAgICAgIGVpZ2h0QXJyOiBbXHJcbiAgICAgICAgICAgICdhNS5tcDMnLCAnZ3M1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdmczUubXAzJywgJ2dzNS5tcDMnLCdhNS5tcDMnLCAnZnM1Lm1wMycsICdmczYubXAzJyxcclxuICAgICAgICAgICAgJ2ZzNS5tcDMnLCAnZTUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYi5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG4gICAgICAgICAgICAnYTUubXAzJywgJ2dzNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZnM1Lm1wMycsICdnczUubXAzJywnYTUubXAzJywgJ2ZzNS5tcDMnLCAnZnM2Lm1wMycsXHJcbiAgICAgICAgICAgICdmczUubXAzJywgJ2U1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2Q2Lm1wMycsICdjczYubXAzJywgJ2I1Lm1wMycsICdhNS5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4UG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgMzUsIDQ1LCAzNSwgMjUsIDE1LCBcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCxcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDgwLCA3NSwgNzMsIDcwLCA1NSxcclxuXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDI1LCAzNSwgNDUsIDM1LCAyNSwgXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDI1LCAzNSwgNDUsIDM1LCAyNSwgXHJcblxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCA0NSwgMzUsIDQ1LCAzNSwgNDUsIFxyXG5cclxuICAgICAgICAgICAgNDUsIDQ1LCA0NSwgNDUsIDQ1LCA0NSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgMzUsIDQ1LCAzNSwgMjUsIDE1LFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDgwLCA3NSwgNzMsIDcwLCA1NSxcclxuICAgICAgICAgICAgMTUwLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeEJhc3NQb3NBcnI6IFtcclxuICAgICAgICAgICAgNjUsIDUwLCA2NSwgNDUsIDI1LFxyXG4gICAgICAgICAgICAzNSwgMzUsIDM1LCAzNSwgMzUsIDM1LFxyXG4gICAgICAgICAgICA2NSwgNTAsIDY1LCA0NSwgMjUsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4RWlnaHRQb3NBcnI6IFtcclxuICAgICAgICAgICAgNzUsIDcwLCA2NSwgNjAsIDYwLCA3MCwgNzUsIDYwLCA5NSxcclxuICAgICAgICAgICAgNjAsIDU1LCA1MCwgNDAsIDQwLCA1MCwgNDAsIDMwLCAyMCxcclxuICAgICAgICAgICAgNzUsIDcwLCA2NSwgNjAsIDYwLCA3MCwgNzUsIDYwLCA5NSxcclxuICAgICAgICAgICAgNjAsIDU1LCA1MCwgNDAsIDg1LCA4MCwgNzgsIDc1LCA2MCxcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBuYXJ1dG9NZWxvZHlBcnI6IFtcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdhMy5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsXHJcbiAgICAgICAgICAgICdnNS5tcDMnLCAnZnM1Lm1wMycsICdkNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZDUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2Q1Lm1wMycsICdlNS5tcDMnLCAnZnM1Lm1wMycsIC8vMzNcclxuXHJcbiAgICAgICAgICAgICdjczUubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsICdhLm1wMycsICdhLm1wMycsIC8vNDZcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vNTZcclxuXHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzYxXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsICdhLm1wMycsICdhLm1wMycsIC8vNzRcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vODRcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vODlcclxuXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsIC8vMTAyXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdlLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAgLy8xMTVcclxuXHJcbiAgICAgICAgICAgICdkLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsIC8vMTIzIEVJR0hUUyBTVEFSVCBIRVJFXHJcbiAgICAgICAgICAgICdlLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAvLzEzMVxyXG5cclxuICAgICAgICAgICAgJ2UubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy8xMzlcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAvLzE0NFxyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8xNTJcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzE2MlxyXG4gICAgICAgICAgICAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzE2OFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTczXHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzE4MVxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdlLm1wMycsICdnLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzE5MVxyXG4gICAgICAgICAgICAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzE5N1xyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8yMDJcclxuXHJcbiAgICAgICAgICAgICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2IubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjE0XHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjIxXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgLy8yMzFcclxuICAgICAgICAgICAgJ2EzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8yMzZcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b0Jhc3NBcnI6IFtcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBuYXJ1dG9FaWdodEFycjogW1xyXG4gICAgICAgIC8vICAgICAnYTMubXAzJywgJ2QzLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnZDMubXAzJywgJ2IzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnYjMubXAzJywgJ2UzLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdmczMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdhMy5tcDMnLCAnYTMubXAzJywgJ2UzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCAnYTMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdkMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdlMy5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnZnMzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLFxyXG4gICAgICAgIC8vICAgICAnYTMubXAzJywgJ2EzLm1wMycsICdlMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2EzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnZDMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnZTMubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdhMy5tcDMnLCAnYTMubXAzJywgJ2UzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAvLyBdLFxyXG4gICAgICAgIC8vIG5hcnV0b3hFaWdodFBvc0FycjpbXHJcbiAgICAgICAgLy8gICAgIDU1LCA0MCwgNTUsIDcwLCA3MCwgNjAsIDYwLCBcclxuICAgICAgICAvLyAgICAgNjAsIDQwLCA1MCwgNjAsIDc1LCA3MCwgNzAsIFxyXG4gICAgICAgIC8vICAgICA2MCwgNTUsIDUwLCA4NSwgODAsIDU1LCA1MCwgODUsIDgwLCA1NSwgNTAsXHJcbiAgICAgICAgLy8gXSxcclxuICAgICAgICBuYXJ1dG9YUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDUwLCA0NSwgNTAsIDYwLCA0NSwgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCxcclxuICAgICAgICAgICAgNjAsIDQ1LCA2MCwgNjUsIDQ1LCA2NSwgNzUsIDgwLCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICAxMTUsIDExMCwgMTAwLCAxMTUsIDExMCwgMTAwLCAxMTUsIDExMCwgMTAwLCAxMDUsIDExMCxcclxuXHJcbiAgICAgICAgICAgIDk1LCA3NSwgNjAsIDY1LCA3NSwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSwgODUsIDg1LFxyXG4gICAgICAgICAgICA2NSwgNTUsIDY1LCA2MCwgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA2MCxcclxuICAgICAgICAgICAgNzUsIDYwLCA2NSwgNjUsIDc1LCA2MCwgNjAsIDc1LCA2NSwgNjAsIDY1LCA4NSwgODUsXHJcbiAgICAgICAgICAgIDY1LCA1NSwgNjUsIDYwLCA5MCwgODUsIDYwLCA5MCwgODUsIDYwLCBcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLFxyXG5cclxuICAgICAgICAgICAgNTAsIDc1LCA3NSwgNjAsIDYwLCA3NSwgNzUsIDYwLCA2MCwgOTAsIDg1LCA3NSwgNjAsXHJcbiAgICAgICAgICAgIDUwLCA1NSwgNjAsIDYwLCA1NSwgNjAsIDY1LCA2NSwgNjUsIDc1LCA2NSwgNjAsIDY1LFxyXG5cclxuICAgICAgICAgICAgNjAsIDQ1LCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LFxyXG4gICAgICAgICAgICA2NSwgNDUsIDU1LCA2NSwgODAsIDc1LCA2NSwgNzUsXHJcblxyXG4gICAgICAgICAgICA2NSwgNjAsIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA3NSxcclxuXHJcbiAgICAgICAgICAgIDYwLCA0NSwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSxcclxuICAgICAgICAgICAgNjUsIDQ1LCA1NSwgNjUsIDgwLCA3NSwgNzUsIDc1ICwgNjUsIDYwLFxyXG4gICAgICAgICAgICA5MCwgODUsIDYwLCA5MCwgODUsIDYwLCBcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDc1LFxyXG5cclxuICAgICAgICAgICAgNjAsIDUwLCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LFxyXG4gICAgICAgICAgICA2NSwgNDUsIDU1LCA2NSwgNjUsIDgwLCA4NSwgNzUsIDY1LCA2MCxcclxuICAgICAgICAgICAgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLCBcclxuXHJcbiAgICAgICAgICAgIDg1LCA3NSwgNjUsIDY1LCA4NSwgNzUsIDY1LCA2NSwgOTAsIDc1LCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDUwLCA1NSwgNjAsIDYwLCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICA1MCwgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCwgNDUsIDUwLCA2MCxcclxuICAgICAgICAgICAgNDUsIDUwLCA0NSwgNjAsIDY1XHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRveEJhc3NQb3NBcnI6W1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICBcclxuXHJcbiAgICAgICAgZmlsbE5hcnV0b05vdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLm5vdGVBcnIubGVuZ3RoIDwgdGhpcy5uYXJ1dG9NZWxvZHlBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy5uYXJ1dG9YUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5uYXJ1dG9NZWxvZHlBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDwgNCB8fCBjb3VudCA9PT0gNzMgfHwgY291bnQgPT09IDkwIHx8IGNvdW50ID09PSA5NCB8fCBjb3VudCA9PT0gOTggfHwgY291bnQgPT09IDEwMCAgfHwgKGNvdW50ID49IDEyMSAmJiBjb3VudCA8PSAxMjIpIHx8IChjb3VudCA+PSAxMjkgJiYgY291bnQgPD0gMTMwKSB8fCAoY291bnQgPj0gMTUwICYmIGNvdW50IDw9IDE1MSkgfHwgKGNvdW50ID49IDE1OCAmJiBjb3VudCA8PSAxNTkpIHx8IChjb3VudCA+PSAxNzkgJiYgY291bnQgPD0gMTgwKSB8fCAoY291bnQgPj0gMTg1ICYmIGNvdW50IDw9IDE4NikgfHwgY291bnQgPT09IDIwMyB8fCBjb3VudCA9PT0gMjA3IHx8IGNvdW50ID09PSAyMTEgfHwgKGNvdW50ID49IDIyMyAmJiBjb3VudCA8PSAyMjUpIHx8IChjb3VudCA+PSAyMjcgJiYgIGNvdW50IDw9IDIzMCkgfHwgKGNvdW50ID49IDIzMiAmJiAgY291bnQgPD0gMjM1KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA0IHx8IGNvdW50ID09PSAyNSB8fCBjb3VudCA9PT0gMjYgfHwgY291bnQgPT09IDI5IHx8IGNvdW50ID09PSAzMCB8fCBjb3VudCA9PT0gMzIgfHwgY291bnQgPT09IDMzIHx8IGNvdW50ID09PSA0NiB8fCBjb3VudCA9PT0gNzQgfHwgY291bnQgPT09IDkyIHx8IGNvdW50ID09PSA5NiB8fCBjb3VudCA9PT0gMjA0IHx8IGNvdW50ID09PSAyMDggfHwgY291bnQgPT09IDIxMiB8fCBjb3VudCA9PT0gMjI2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSA1ICYmIGNvdW50IDw9IDgpIHx8IGNvdW50ID09PSAxMCB8fCBjb3VudCA9PT0gMjAgfHwgY291bnQgPT09IDIxIHx8IChjb3VudCA+PSA0MCAmJiBjb3VudCA8PSA0MykgfHwgY291bnQgPT09IDQ1IHx8IChjb3VudCA+PSA2NCAmJiBjb3VudCA8PSA2NSkgfHwgKGNvdW50ID49IDY3ICYmIGNvdW50IDw9IDY4KSB8fCAoY291bnQgPj0gNzAgJiYgY291bnQgPD0gNzEpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgKGNvdW50ID49IDExICYmIGNvdW50IDw9IDEyKSB8fCAoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTUpIHx8IGNvdW50ID09PSAxNyB8fCBjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDE5IHx8IGNvdW50ID09PSAyMiB8fCBjb3VudCA9PT0gMjMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSAxMyB8fCBjb3VudCA9PT0gMTYgfHwgY291bnQgPT09IDI0IHx8IGNvdW50ID09PSAyNyB8fCBjb3VudCA9PT0gMzEgfHwgKGNvdW50ID49IDM0ICYmIGNvdW50IDw9IDM3KSB8fCBjb3VudCA9PT0gMzkgfHwgY291bnQgPT09IDQ0IHx8IChjb3VudCA+PSA0NyAmJiBjb3VudCA8PSA0OSkgfHwgKGNvdW50ID49IDUxICYmIGNvdW50IDw9IDUyKSB8fCAoY291bnQgPj0gNTQgJiYgY291bnQgPD0gNTUpIHx8IChjb3VudCA+PSA1OCAmJiBjb3VudCA8PSA2MykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMjggfHwgY291bnQgPT09IDM4IHx8IGNvdW50ID09IDY2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNTAgfHwgY291bnQgPT09IDUzIHx8IChjb3VudCA+PSA1NiAmJiBjb3VudCA8PSA1NykgfHwgY291bnQgPT09IDc4IHx8IGNvdW50ID09PSA4MSB8fCAoY291bnQgPj0gODQgJiYgY291bnQgPD0gODUpIHx8IGNvdW50ID09PSA4OSB8fCBjb3VudCA9PT0gMTAyIHx8IChjb3VudCA+PSAxMDUgJiYgY291bnQgPD0gMTA2KSB8fCAoY291bnQgPj0gMTA5ICYmIGNvdW50IDw9IDExMSkgfHwgY291bnQgPT09IDEyMyB8fCBjb3VudCA9PT0gMTMzIHx8IGNvdW50ID09PSAxMzYgfHwgKGNvdW50ID49IDEzOSAmJiBjb3VudCA8PSAxNDApIHx8IGNvdW50ID09PSAxNTIgfHwgY291bnQgPT09IDE2MiB8fCBjb3VudCA9PT0gMTY1IHx8IChjb3VudCA+PSAxNjggJiYgY291bnQgPD0gMTY5KSB8fCBjb3VudCA9PT0gMTgxIHx8IGNvdW50ID09PSAxOTEgfHwgY291bnQgPT09IDE5NCB8fCAoY291bnQgPj0gMTk3ICYmIGNvdW50IDw9IDE5OCkgfHwgY291bnQgPT09IDIwMiB8fCBjb3VudCA9PT0gMjE0IHx8IChjb3VudCA+PSAyMTcgJiYgY291bnQgPD0gMjE4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjkgfHwgY291bnQgPT09IDcyIHx8IChjb3VudCA+PSA3NSAmJiBjb3VudCA8PSA3NykgfHwgKGNvdW50ID49IDc5ICYmIGNvdW50IDw9IDgwKSB8fCAoY291bnQgPj0gODIgJiYgY291bnQgPD0gODMpIHx8IChjb3VudCA+PSA4NiAmJiBjb3VudCA8PSA4OCkgfHwgY291bnQgPT09IDkxIHx8IGNvdW50ID09PSA5MyB8fCBjb3VudCA9PT0gOTUgfHwgY291bnQgPT09IDk3IHx8IGNvdW50ID09PSA5OSB8fCBjb3VudCA9PT0gMTAxIHx8IChjb3VudCA+PSAxMDMgJiYgY291bnQgPD0gMTA0KSB8fCAoY291bnQgPj0gMTA3ICYmIGNvdW50IDw9IDEwOCkgfHwgKGNvdW50ID49IDExMiAmJiBjb3VudCA8PSAxMjApIHx8IChjb3VudCA+PSAxMjQgJiYgY291bnQgPD0gMTI4KSB8fCAoY291bnQgPj0gMTMxICYmIGNvdW50IDw9IDEzMikgfHwgKGNvdW50ID49IDEzNCAmJiBjb3VudCA8PSAxMzUpIHx8IChjb3VudCA+PSAxMzcgJiYgY291bnQgPD0gMTM4KSB8fCAoY291bnQgPj0gMTQxICYmIGNvdW50IDw9IDE0OSkgfHwgKGNvdW50ID49IDE1MyAmJiBjb3VudCA8PSAxNTcpIHx8IChjb3VudCA+PSAxNjAgJiYgY291bnQgPD0gMTYxKSB8fCAoY291bnQgPj0gMTYzICYmIGNvdW50IDw9IDE2NCkgfHwgKGNvdW50ID49IDE2NiAmJiBjb3VudCA8PSAxNjcpIHx8IChjb3VudCA+PSAxNzAgJiYgY291bnQgPD0gMTc4KSB8fCAoY291bnQgPj0gMTgyICYmIGNvdW50IDw9IDE4NCkgfHwgKGNvdW50ID49IDE4NyAmJiBjb3VudCA8PSAxOTApIHx8IChjb3VudCA+PSAxOTIgJiYgY291bnQgPD0gMTkzKSB8fCAoY291bnQgPj0gMTk1ICYmIGNvdW50IDw9IDE5NikgfHwgKGNvdW50ID49IDE5OSAmJiBjb3VudCA8PSAyMDEpIHx8IChjb3VudCA+PSAyMDUgJiYgY291bnQgPD0gMjA2KSB8fCAoY291bnQgPj0gMjA5ICYmIGNvdW50IDw9IDIxMCkgfHwgY291bnQgPT09IDIxMyB8fCAoY291bnQgPj0gMjE1ICYmIGNvdW50IDw9IDIxNikgfHwgKGNvdW50ID49IDIxOSAmJiBjb3VudCA8PSAyMjIpIHx8IGNvdW50ID09PSAyMzEgfHwgY291bnQgPT09IDIzNil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGZpbGxOYXJ1dG9FaWdodDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vICAgICBsZXQgeSA9IC0xMzM1O1xyXG4gICAgICAgIC8vICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIC8vICAgICB3aGlsZSAodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5uYXJ1dG9FaWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMubmFydXRveEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5uYXJ1dG9FaWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAvLyAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYoY291bnQgPCA3IHx8IChjb3VudCA+PSA4ICYmIGNvdW50IDw9IDE5KSB8fCAoY291bnQgPj0gMjEgJiYgY291bnQgPD0gMjMpIHx8IGNvdW50ID09PSAyNSB8fCAoY291bnQgPj0gMjcgJiYgY291bnQgPD0gMzYpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNyB8fCBjb3VudCA9PT0gMjYpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgLy8gICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDIwIHx8IGNvdW50ID09PSAyNCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgeSAtPSAxNTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG5cclxuICAgICAgICByZXN0YXJ0R2FtZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5ub3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2FtZUVuZDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJylcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lRW5kTWVzc2FnZTpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYodGhpcy5zY29yZSA+PSA5OS44KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV09XISBQRVJGRUNUIFNDT1JFISBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDkwICYmIHRoaXMuc2NvcmUgPCA5OS44KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU08gQ0xPU0UgVE8gUEVSRkVDVElPTiEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA4MCAmJiB0aGlzLnNjb3JlIDw9IDg5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BSRVRUWSBHT09ELCBCVVQgSSBCRVQgWU9VIENBTiBETyBCRVRURVIuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gNzAgJiYgdGhpcy5zY29yZSA8PTc5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ09IIE1BTiwgTUFZQkUgWU9VIFNIT1VMRCBQUkFDVElDRSBBIExJVFRMRSBNT1JFLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlIDw9IDY5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSVMgWU9VUiBNT05JVE9SIE9OPyBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbE5vdGVBcnI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubWVsb2R5QXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhQb3NBcnJbY291bnRdLCB5LCB0aGlzLm1lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKGNvdW50IDw9IDQpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA3MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkgfHwgKGNvdW50ID49IDcxICYmIGNvdW50IDw9IDc0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKSB8fCAoY291bnQgPj0gNzYgJiYgY291bnQgPD0gNzkpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE3KSB8fCAoY291bnQgPj0gODAgJiYgY291bnQgPD0gODMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDg0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikgfHwgKGNvdW50ID49IDg1ICYmIGNvdW50IDw9IDg4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB8fCAoY291bnQgPj0gODkgJiYgY291bnQgPD0gOTIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDkzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHx8IChjb3VudCA+PSA5NCAmJiBjb3VudCA8PSA5NykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMzIgJiYgY291bnQgPD0gMzYpIHx8IChjb3VudCA+PSA5OCAmJiBjb3VudCA8PSAxMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPj0gMzcgJiYgY291bnQgPD0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDYzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2Nil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlsbEJhc3NBcnI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5iYXNzTm90ZUFyci5sZW5ndGggPCB0aGlzLmJhc3NBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhCYXNzUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5iYXNzQXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnJbY291bnQgLSAxXS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSAzIHx8IChjb3VudCA+PSAxMiAmJiBjb3VudCA8PSAxNCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDYwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEVpZ2h0QXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gLTg4NTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5laWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5laWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjb3JlVXBkYXRlOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5zb25nID09PSAndHJlbW9yJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5tZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5iYXNzQXJyLmxlbmd0aCArIHRoaXMuZWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdGhpcy5zb25nID09PSAnbmFydXRvJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5uYXJ1dG9NZWxvZHlBcnIubGVuZ3RoICkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NvcmUgKz0gMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsaWRlT2JqZWN0OmZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICAgICAgICAgIGlmKG9iamVjdC54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqZWN0LnggKyBvYmplY3Qud2lkdGggPiB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IHRoaXMud2lkdGggLSBvYmplY3Qud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvLyBpZihvYmplY3QueSA8IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gMDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmKG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSB0aGlzLmhlaWdodCAtIG9iamVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeCAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZU9iamVjdCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud29ybGQudXBkYXRlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuR2FtZS5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yIDogR2FtZSB9O1xyXG5cclxuR2FtZS5QbGF5ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmNvbG9yID0gJyNmZjAwMDAnO1xyXG4gICAgdGhpcy5oZWlnaHQgPSA0O1xyXG4gICAgLy8gdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAvLyB0aGlzLnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IDI0O1xyXG4gICAgdGhpcy54ID0gNjA7XHJcbiAgICB0aGlzLnkgPSAxMTA7XHJcbn07XHJcblxyXG5HYW1lLlBsYXllci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuUGxheWVyLFxyXG5cclxuICAgIC8vIGp1bXA6ZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYoIXRoaXMuanVtcGluZyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmVsb2NpdHlfeSAtPSAxNTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIGhpdE5vdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVMZWZ0OmZ1bmN0aW9uKCkgeyBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggLT0gMC43NTtcclxuICAgIH0sXHJcbiAgICBtb3ZlUmlnaHQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94ICs9IDAuNzU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5X3g7XHJcbiAgICAgICAgLy8gdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuR2FtZS5Ob3RlID0gZnVuY3Rpb24oeCwgeSwgYXVkaW9GaWxlKXtcclxuICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDI7XHJcbiAgICB0aGlzLndpZHRoID0gMjtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlfeSA9IDE7XHJcblxyXG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oYXVkaW9GaWxlKTtcclxufVxyXG5cclxuR2FtZS5Ob3RlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5Ob3RlLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=