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
  document.getElementById('top-rule').classList.add('playing');
  document.getElementById('bottom-rule').classList.add('playing');

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      game.world.restartGame();
      document.getElementById('start-menu').classList.add('playing');
      document.getElementById('tremor').classList.remove('playing');
      document.getElementById('naruto').classList.remove('playing');
      document.getElementById('top-rule').classList.remove('playing');
      document.getElementById('bottom-rule').classList.remove('playing');

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
    document.getElementById('top-rule').classList.add('playing');
    document.getElementById('bottom-rule').classList.add('playing');
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
    document.getElementById('top-rule').classList.add('playing');
    document.getElementById('bottom-rule').classList.add('playing');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby1wZWFrLW1ldGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsiQ29udHJvbGxlciIsInJlcXVpcmUiLCJEaXNwbGF5IiwiRW5naW5lIiwiR2FtZSIsIndlYkF1ZGlvUGVha01ldGVyIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleURvd25VcCIsImNvbnRyb2xsZXIiLCJ0eXBlIiwia2V5Q29kZSIsInJlc2l6ZSIsImRpc3BsYXkiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImdhbWUiLCJ3b3JsZCIsImhlaWdodCIsIndpZHRoIiwicmVuZGVyIiwiZmlsbCIsImJhY2tncm91bmRfY29sb3IiLCJub3RlQXJyIiwiZm9yRWFjaCIsIm5vdGUiLCJ5IiwiaGl0IiwiZHJhd05vdGUiLCJsZW5ndGgiLCJnYW1lRW5kTWVzc2FnZSIsImdhbWVFbmQiLCJiYWNrZ3JvdW5kVHJhY2siLCJwbGF5IiwiYmFzc05vdGVBcnIiLCJlaWdodE5vdGVBcnIiLCJkcmF3UmVjdGFuZ2xlIiwicGxheWVyIiwieCIsImNvbG9yIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzY29yZSIsInRvRml4ZWQiLCJ0b1N0cmluZyIsInNjb3JlVXBkYXRlIiwic291bmQiLCJoaXROb3RlIiwidXBkYXRlIiwibGVmdCIsImFjdGl2ZSIsIm1vdmVMZWZ0IiwicmlnaHQiLCJtb3ZlUmlnaHQiLCJxdWVyeVNlbGVjdG9yIiwiZW5naW5lIiwiYnVmZmVyIiwiY2FudmFzIiwid2luZG93IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keSIsIm9ua2V5dXAiLCJyZXN0YXJ0R2FtZSIsInJlbW92ZSIsImNvbnRhaW5zIiwicGF1c2VkIiwicGF1c2UiLCJzb25nIiwiZmlsbE5vdGVBcnIiLCJmaWxsQmFzc0FyciIsImZpbGxFaWdodEFyciIsImZpbGxOYXJ1dG9Ob3RlIiwibG9vcCIsInZvbHVtZSIsInN0YXJ0IiwiQnV0dG9uSW5wdXQiLCJ1cCIsImtleV9jb2RlIiwiZG93biIsImdldElucHV0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJtb2R1bGUiLCJleHBvcnRzIiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJjb250ZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJNYXRoIiwiZmxvb3IiLCJkcmF3SW1hZ2UiLCJoZWlnaHRfd2lkdGhfcmF0aW8iLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJ0aW1lX3N0ZXAiLCJhY2N1bXVsYXRlZF90aW1lIiwiYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QiLCJ1bmRlZmluZWQiLCJ0aW1lIiwidXBkYXRlZCIsInJ1biIsInRpbWVfc3RhbXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoYW5kbGVSdW4iLCJwZXJmb3JtYW5jZSIsIm5vdyIsInN0b3AiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImZyaWN0aW9uIiwiZ3Jhdml0eSIsIlBsYXllciIsIkF1ZGlvIiwibWVsb2R5QXJyIiwiYmFzc0FyciIsImVpZ2h0QXJyIiwieFBvc0FyciIsInhCYXNzUG9zQXJyIiwieEVpZ2h0UG9zQXJyIiwibmFydXRvTWVsb2R5QXJyIiwibmFydXRvQmFzc0FyciIsIm5hcnV0b1hQb3NBcnIiLCJuYXJ1dG94QmFzc1Bvc0FyciIsImNvdW50IiwicHVzaCIsIk5vdGUiLCJtZXNzYWdlIiwiY29sbGlkZU9iamVjdCIsIm9iamVjdCIsInZlbG9jaXR5X3giLCJ2ZWxvY2l0eV95IiwicmFuZG9tIiwiYXVkaW9GaWxlIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7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SUFBTCxHQUFZLFVBQVN2RixDQUFULEVBQVlaLENBQVosRUFBZTBHLFNBQWYsRUFBeUI7QUFDakMsT0FBSzdGLEtBQUwsR0FBYSxNQUFNbUQsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ3lDLE1BQUwsS0FBZ0IsUUFBM0IsRUFBcUN2RixRQUFyQyxDQUE4QyxFQUE5QyxDQUFuQjs7QUFFQSxNQUFHLEtBQUtMLEtBQUwsQ0FBV1YsTUFBWCxJQUFxQixDQUF4QixFQUEwQjtBQUN0QixTQUFLVSxLQUFMLEdBQWEsS0FBS0EsS0FBTCxDQUFXOEYsS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixJQUF5QixHQUF6QixHQUErQixLQUFLOUYsS0FBTCxDQUFXOEYsS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixDQUE1QztBQUNIOztBQUVELE9BQUtuSCxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS21CLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUtaLENBQUwsR0FBU0EsQ0FBVDtBQUVBLE9BQUt3RyxVQUFMLEdBQWtCLENBQWxCO0FBRUEsT0FBS3ZHLEdBQUwsR0FBVyxLQUFYO0FBQ0EsT0FBS21CLEtBQUwsR0FBYSxJQUFJa0UsS0FBSixDQUFVb0IsU0FBVixDQUFiO0FBQ0gsQ0FoQkQ7O0FBa0JBbEksSUFBSSxDQUFDMkgsSUFBTCxDQUFVNUMsU0FBVixHQUFzQjtBQUNsQkMsYUFBVyxFQUFHaEYsSUFBSSxDQUFDMkgsSUFERDtBQUVsQjdFLFFBQU0sRUFBRSxrQkFBVTtBQUNkLFNBQUt0QixDQUFMLElBQVUsS0FBS3dHLFVBQWY7QUFDSDtBQUppQixDQUF0QjtBQVNBL0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbEYsSUFBakIsQzs7Ozs7Ozs7Ozs7QUM3ZUEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwidmFyIHdlYkF1ZGlvUGVha01ldGVyID0gZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgYm9yZGVyU2l6ZTogMixcbiAgICBmb250U2l6ZTogOSxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgdGlja0NvbG9yOiAnI2RkZCcsXG4gICAgZ3JhZGllbnQ6IFsncmVkIDElJywgJyNmZjAgMTYlJywgJ2xpbWUgNDUlJywgJyMwODAgMTAwJSddLFxuICAgIGRiUmFuZ2U6IDQ4LFxuICAgIGRiVGlja1NpemU6IDYsXG4gICAgbWFza1RyYW5zaXRpb246ICdoZWlnaHQgMC4xcydcbiAgfTtcbiAgdmFyIHRpY2tXaWR0aDtcbiAgdmFyIGVsZW1lbnRXaWR0aDtcbiAgdmFyIGVsZW1lbnRIZWlnaHQ7XG4gIHZhciBtZXRlckhlaWdodDtcbiAgdmFyIG1ldGVyV2lkdGg7XG4gIHZhciBtZXRlclRvcDtcbiAgdmFyIHZlcnRpY2FsID0gdHJ1ZTtcbiAgdmFyIGNoYW5uZWxDb3VudCA9IDE7XG4gIHZhciBjaGFubmVsTWFza3MgPSBbXTtcbiAgdmFyIGNoYW5uZWxQZWFrcyA9IFtdO1xuICB2YXIgY2hhbm5lbFBlYWtMYWJlbHMgPSBbXTtcblxuICB2YXIgZ2V0QmFzZUxvZyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgcmV0dXJuIE1hdGgubG9nKHkpIC8gTWF0aC5sb2coeCk7XG4gIH07XG5cbiAgdmFyIGRiRnJvbUZsb2F0ID0gZnVuY3Rpb24gKGZsb2F0VmFsKSB7XG4gICAgcmV0dXJuIGdldEJhc2VMb2coMTAsIGZsb2F0VmFsKSAqIDIwO1xuICB9O1xuXG4gIHZhciBzZXRPcHRpb25zID0gZnVuY3Rpb24gKHVzZXJPcHRpb25zKSB7XG4gICAgZm9yICh2YXIgayBpbiB1c2VyT3B0aW9ucykge1xuICAgICAgb3B0aW9uc1trXSA9IHVzZXJPcHRpb25zW2tdO1xuICAgIH1cblxuICAgIHRpY2tXaWR0aCA9IG9wdGlvbnMuZm9udFNpemUgKiAyLjA7XG4gICAgbWV0ZXJUb3AgPSBvcHRpb25zLmZvbnRTaXplICogMS41ICsgb3B0aW9ucy5ib3JkZXJTaXplO1xuICB9O1xuXG4gIHZhciBjcmVhdGVNZXRlck5vZGUgPSBmdW5jdGlvbiAoc291cmNlTm9kZSwgYXVkaW9DdHgpIHtcbiAgICB2YXIgYyA9IHNvdXJjZU5vZGUuY2hhbm5lbENvdW50O1xuICAgIHZhciBtZXRlck5vZGUgPSBhdWRpb0N0eC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoMjA0OCwgYywgYyk7XG4gICAgc291cmNlTm9kZS5jb25uZWN0KG1ldGVyTm9kZSk7XG4gICAgbWV0ZXJOb2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGluYXRpb24pO1xuICAgIHJldHVybiBtZXRlck5vZGU7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUNvbnRhaW5lckRpdiA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICB2YXIgbWV0ZXJFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUud2lkdGggPSBlbGVtZW50V2lkdGggKyAncHgnO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBlbGVtZW50SGVpZ2h0ICsgJ3B4JztcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKG1ldGVyRWxlbWVudCk7XG4gICAgcmV0dXJuIG1ldGVyRWxlbWVudDtcbiAgfTtcblxuICB2YXIgY3JlYXRlTWV0ZXIgPSBmdW5jdGlvbiAoZG9tRWxlbWVudCwgbWV0ZXJOb2RlLCBvcHRpb25zT3ZlcnJpZGVzKSB7XG4gICAgc2V0T3B0aW9ucyhvcHRpb25zT3ZlcnJpZGVzKTtcbiAgICBlbGVtZW50V2lkdGggPSBkb21FbGVtZW50LmNsaWVudFdpZHRoO1xuICAgIGVsZW1lbnRIZWlnaHQgPSBkb21FbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICB2YXIgbWV0ZXJFbGVtZW50ID0gY3JlYXRlQ29udGFpbmVyRGl2KGRvbUVsZW1lbnQpO1xuXG4gICAgaWYgKGVsZW1lbnRXaWR0aCA+IGVsZW1lbnRIZWlnaHQpIHtcbiAgICAgIHZlcnRpY2FsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgbWV0ZXJIZWlnaHQgPSBlbGVtZW50SGVpZ2h0IC0gbWV0ZXJUb3AgLSBvcHRpb25zLmJvcmRlclNpemU7XG4gICAgbWV0ZXJXaWR0aCA9IGVsZW1lbnRXaWR0aCAtIHRpY2tXaWR0aCAtIG9wdGlvbnMuYm9yZGVyU2l6ZTtcbiAgICBjcmVhdGVUaWNrcyhtZXRlckVsZW1lbnQpO1xuICAgIGNyZWF0ZVJhaW5ib3cobWV0ZXJFbGVtZW50LCBtZXRlcldpZHRoLCBtZXRlckhlaWdodCwgbWV0ZXJUb3AsIHRpY2tXaWR0aCk7XG4gICAgY2hhbm5lbENvdW50ID0gbWV0ZXJOb2RlLmNoYW5uZWxDb3VudDtcbiAgICB2YXIgY2hhbm5lbFdpZHRoID0gbWV0ZXJXaWR0aCAvIGNoYW5uZWxDb3VudDtcbiAgICB2YXIgY2hhbm5lbExlZnQgPSB0aWNrV2lkdGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICBjcmVhdGVDaGFubmVsTWFzayhtZXRlckVsZW1lbnQsIG9wdGlvbnMuYm9yZGVyU2l6ZSwgbWV0ZXJUb3AsIGNoYW5uZWxMZWZ0LCBmYWxzZSk7XG4gICAgICBjaGFubmVsTWFza3NbaV0gPSBjcmVhdGVDaGFubmVsTWFzayhtZXRlckVsZW1lbnQsIGNoYW5uZWxXaWR0aCwgbWV0ZXJUb3AsIGNoYW5uZWxMZWZ0LCBvcHRpb25zLm1hc2tUcmFuc2l0aW9uKTtcbiAgICAgIGNoYW5uZWxQZWFrc1tpXSA9IDAuMDtcbiAgICAgIGNoYW5uZWxQZWFrTGFiZWxzW2ldID0gY3JlYXRlUGVha0xhYmVsKG1ldGVyRWxlbWVudCwgY2hhbm5lbFdpZHRoLCBjaGFubmVsTGVmdCk7XG4gICAgICBjaGFubmVsTGVmdCArPSBjaGFubmVsV2lkdGg7XG4gICAgfVxuXG4gICAgbWV0ZXJOb2RlLm9uYXVkaW9wcm9jZXNzID0gdXBkYXRlTWV0ZXI7XG4gICAgbWV0ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgICBjaGFubmVsUGVha3NbaV0gPSAwLjA7XG4gICAgICAgIGNoYW5uZWxQZWFrTGFiZWxzW2ldLnRleHRDb250ZW50ID0gJy3iiJ4nO1xuICAgICAgfVxuICAgIH0sIGZhbHNlKTtcbiAgfTtcblxuICB2YXIgY3JlYXRlVGlja3MgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgdmFyIG51bVRpY2tzID0gTWF0aC5mbG9vcihvcHRpb25zLmRiUmFuZ2UgLyBvcHRpb25zLmRiVGlja1NpemUpO1xuICAgIHZhciBkYlRpY2tMYWJlbCA9IDA7XG4gICAgdmFyIGRiVGlja1RvcCA9IG9wdGlvbnMuZm9udFNpemUgKyBvcHRpb25zLmJvcmRlclNpemU7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVRpY2tzOyBpKyspIHtcbiAgICAgIHZhciBkYlRpY2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChkYlRpY2spO1xuICAgICAgZGJUaWNrLnN0eWxlLndpZHRoID0gdGlja1dpZHRoICsgJ3B4JztcbiAgICAgIGRiVGljay5zdHlsZS50ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgZGJUaWNrLnN0eWxlLmNvbG9yID0gb3B0aW9ucy50aWNrQ29sb3I7XG4gICAgICBkYlRpY2suc3R5bGUuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplICsgJ3B4JztcbiAgICAgIGRiVGljay5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBkYlRpY2suc3R5bGUudG9wID0gZGJUaWNrVG9wICsgJ3B4JztcbiAgICAgIGRiVGljay50ZXh0Q29udGVudCA9IGRiVGlja0xhYmVsICsgJyc7XG4gICAgICBkYlRpY2tMYWJlbCAtPSBvcHRpb25zLmRiVGlja1NpemU7XG4gICAgICBkYlRpY2tUb3AgKz0gbWV0ZXJIZWlnaHQgLyBudW1UaWNrcztcbiAgICB9XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVJhaW5ib3cgPSBmdW5jdGlvbiAocGFyZW50LCB3aWR0aCwgaGVpZ2h0LCB0b3AsIGxlZnQpIHtcbiAgICB2YXIgcmFpbmJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChyYWluYm93KTtcbiAgICByYWluYm93LnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIHJhaW5ib3cuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICByYWluYm93LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICByYWluYm93LnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgcmFpbmJvdy5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgdmFyIGdyYWRpZW50U3R5bGUgPSAnbGluZWFyLWdyYWRpZW50KCcgKyBvcHRpb25zLmdyYWRpZW50LmpvaW4oJywgJykgKyAnKSc7XG4gICAgcmFpbmJvdy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBncmFkaWVudFN0eWxlO1xuICAgIHJldHVybiByYWluYm93O1xuICB9O1xuXG4gIHZhciBjcmVhdGVQZWFrTGFiZWwgPSBmdW5jdGlvbiAocGFyZW50LCB3aWR0aCwgbGVmdCkge1xuICAgIHZhciBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChsYWJlbCk7XG4gICAgbGFiZWwuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgbGFiZWwuc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgbGFiZWwuc3R5bGUuY29sb3IgPSBvcHRpb25zLnRpY2tDb2xvcjtcbiAgICBsYWJlbC5zdHlsZS5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgKyAncHgnO1xuICAgIGxhYmVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBsYWJlbC5zdHlsZS50b3AgPSBvcHRpb25zLmJvcmRlclNpemUgKyAncHgnO1xuICAgIGxhYmVsLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICBsYWJlbC50ZXh0Q29udGVudCA9ICct4oieJztcbiAgICByZXR1cm4gbGFiZWw7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZUNoYW5uZWxNYXNrID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIHRvcCwgbGVmdCwgdHJhbnNpdGlvbikge1xuICAgIHZhciBjaGFubmVsTWFzayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGFubmVsTWFzayk7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUuaGVpZ2h0ID0gbWV0ZXJIZWlnaHQgKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjaGFubmVsTWFzay5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvcjtcblxuICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICBjaGFubmVsTWFzay5zdHlsZS50cmFuc2l0aW9uID0gb3B0aW9ucy5tYXNrVHJhbnNpdGlvbjtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhbm5lbE1hc2s7XG4gIH07XG5cbiAgdmFyIG1hc2tTaXplID0gZnVuY3Rpb24gKGZsb2F0VmFsKSB7XG4gICAgaWYgKGZsb2F0VmFsID09PSAwLjApIHtcbiAgICAgIHJldHVybiBtZXRlckhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGQgPSBvcHRpb25zLmRiUmFuZ2UgKiAtMTtcbiAgICAgIHZhciByZXR1cm5WYWwgPSBNYXRoLmZsb29yKGRiRnJvbUZsb2F0KGZsb2F0VmFsKSAqIG1ldGVySGVpZ2h0IC8gZCk7XG5cbiAgICAgIGlmIChyZXR1cm5WYWwgPiBtZXRlckhlaWdodCkge1xuICAgICAgICByZXR1cm4gbWV0ZXJIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgdXBkYXRlTWV0ZXIgPSBmdW5jdGlvbiAoYXVkaW9Qcm9jZXNzaW5nRXZlbnQpIHtcbiAgICB2YXIgaW5wdXRCdWZmZXIgPSBhdWRpb1Byb2Nlc3NpbmdFdmVudC5pbnB1dEJ1ZmZlcjtcbiAgICB2YXIgaTtcbiAgICB2YXIgY2hhbm5lbERhdGEgPSBbXTtcbiAgICB2YXIgY2hhbm5lbE1heGVzID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgIGNoYW5uZWxEYXRhW2ldID0gaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoaSk7XG4gICAgICBjaGFubmVsTWF4ZXNbaV0gPSAwLjA7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgc2FtcGxlID0gMDsgc2FtcGxlIDwgaW5wdXRCdWZmZXIubGVuZ3RoOyBzYW1wbGUrKykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICAgIGlmIChNYXRoLmFicyhjaGFubmVsRGF0YVtpXVtzYW1wbGVdKSA+IGNoYW5uZWxNYXhlc1tpXSkge1xuICAgICAgICAgIGNoYW5uZWxNYXhlc1tpXSA9IE1hdGguYWJzKGNoYW5uZWxEYXRhW2ldW3NhbXBsZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICB2YXIgdGhpc01hc2tTaXplID0gbWFza1NpemUoY2hhbm5lbE1heGVzW2ldLCBtZXRlckhlaWdodCk7XG4gICAgICBjaGFubmVsTWFza3NbaV0uc3R5bGUuaGVpZ2h0ID0gdGhpc01hc2tTaXplICsgJ3B4JztcblxuICAgICAgaWYgKGNoYW5uZWxNYXhlc1tpXSA+IGNoYW5uZWxQZWFrc1tpXSkge1xuICAgICAgICBjaGFubmVsUGVha3NbaV0gPSBjaGFubmVsTWF4ZXNbaV07XG4gICAgICAgIHZhciBsYWJlbFRleHQgPSBkYkZyb21GbG9hdChjaGFubmVsUGVha3NbaV0pLnRvRml4ZWQoMSk7XG4gICAgICAgIGNoYW5uZWxQZWFrTGFiZWxzW2ldLnRleHRDb250ZW50ID0gbGFiZWxUZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZU1ldGVyTm9kZTogY3JlYXRlTWV0ZXJOb2RlLFxuICAgIGNyZWF0ZU1ldGVyOiBjcmVhdGVNZXRlclxuICB9O1xufSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdlYkF1ZGlvUGVha01ldGVyOyIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XHJcbmNvbnN0IENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3NjcmlwdHMvY29udHJvbGxlcicpO1xyXG5jb25zdCBEaXNwbGF5ID0gcmVxdWlyZSgnLi9zY3JpcHRzL2Rpc3BsYXknKTtcclxuY29uc3QgRW5naW5lID0gcmVxdWlyZSgnLi9zY3JpcHRzL2VuZ2luZScpO1xyXG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9zY3JpcHRzL2dhbWUnKTtcclxudmFyIHdlYkF1ZGlvUGVha01ldGVyID0gcmVxdWlyZSgnd2ViLWF1ZGlvLXBlYWstbWV0ZXInKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbihlKSB7XHJcblxyXG4gICAgbGV0IGtleURvd25VcCA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBjb250cm9sbGVyLmtleURvd25VcChlLnR5cGUsIGUua2V5Q29kZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCByZXNpemUgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZGlzcGxheS5yZXNpemUoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIC0gMzIsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSAzMiwgZ2FtZS53b3JsZC5oZWlnaHQgLyBnYW1lLndvcmxkLndpZHRoKTtcclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGRpc3BsYXkuZmlsbChnYW1lLndvcmxkLmJhY2tncm91bmRfY29sb3IpOy8vIENsZWFyIGJhY2tncm91bmQgdG8gZ2FtZSdzIGJhY2tncm91bmQgY29sb3IuXHJcbiAgICAgICAgLy8gZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuICAgICAgICAvLyBub3RlRHJvcCgpO1xyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZ2FtZS53b3JsZC5ub3RlQXJyW2dhbWUud29ybGQubm90ZUFyci5sZW5ndGggLSAxXS55ID4gMTE4KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuZ2FtZUVuZE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuZ2FtZUVuZCgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcblxyXG5cclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuaW5uZXJIVE1MID0gKGdhbWUud29ybGQuc2NvcmUgPT09IDApID8gKFxyXG4gICAgICAgICAgICAnMCUnXHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgKGdhbWUud29ybGQuc2NvcmUudG9GaXhlZCgyKSkudG9TdHJpbmcoKSArICclJ1xyXG4gICAgICAgICkgXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICBcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIubGVmdC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLnggKyAxNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQubm90ZUFyclsxXS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY29udHJvbGxlci5yaWdodC5hY3RpdmUpe1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLnggKyAxNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQubm90ZUFyclsxXS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYoY29udHJvbGxlci51cC5hY3RpdmUpe1xyXG4gICAgICAgIC8vICAgICBnYW1lLndvcmxkLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRyb2xsZXIudXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBsZXQgbm90ZURyb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICAgICAgLy8gZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIGlmKGdhbWUud29ybGQubm90ZUFycltnYW1lLndvcmxkLm5vdGVBcnIubGVuZ3RoIC0gMV0ueSA+IDExOCl7XHJcbiAgICAgICAgLy8gICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmQoKTtcclxuICAgICAgICAvLyAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vIGdhbWUud29ybGQuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAvLyAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vIGdhbWUud29ybGQuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAvLyAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGxldCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoKTtcclxuICAgIGxldCBkaXNwbGF5ID0gbmV3IERpc3BsYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykpO1xyXG4gICAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gICAgbGV0IGVuZ2luZSA9IG5ldyBFbmdpbmUoMTAwMC8zMCwgcmVuZGVyLCB1cGRhdGUpO1xyXG5cclxuICAgIGRpc3BsYXkuYnVmZmVyLmNhbnZhcy5oZWlnaHQgPSBnYW1lLndvcmxkLmhlaWdodDtcclxuICAgIGRpc3BsYXkuYnVmZmVyLmNhbnZhcy53aWR0aCA9IGdhbWUud29ybGQud2lkdGg7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duVXApO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xyXG5cclxuICAgIHJlc2l6ZSgpO1xyXG4gICAgLy8gZGVidWdnZXI7XHJcbiAgICBcclxuICAgIGRpc3BsYXkuZmlsbChnYW1lLndvcmxkLmJhY2tncm91bmRfY29sb3IpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3R0b20tcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5Lm9ua2V5dXAgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDMyKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC1ydWxlJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm90dG9tLXJ1bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSA4MCkge1xyXG4gICAgICAgICAgICBpZighZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2VkKXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5zb25nID0gJ3RyZW1vcic7XHJcblxyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxOb3RlQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEJhc3NBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsRWlnaHRBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm90dG9tLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuc29uZyA9ICduYXJ1dG8nO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTmFydXRvTm90ZSgpO1xyXG4gICAgICAgICAgICAvLyBnYW1lLndvcmxkLmZpbGxOYXJ1dG9FaWdodCgpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3R0b20tcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiBub3RlRHJvcCgpLCAxKTtcclxuICAgIH0pXHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5sb29wID0gdHJ1ZTtcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnZvbHVtZSA9IDAuMztcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgIFxyXG4gICAgLy8gdmFyIG15TWV0ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LXBlYWstbWV0ZXInKTtcclxuICAgIC8vIHZhciBhdWRpb0N0eCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpO1xyXG4gICAgLy8gdmFyIHNvdXJjZU5vZGUgPSBhdWRpb0N0eC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2spO1xyXG4gICAgLy8gc291cmNlTm9kZS5jb25uZWN0KGF1ZGlvQ3R4LmRlc3RpYXRpb24pO1xyXG4gICAgLy8gdmFyIG1ldGVyTm9kZSA9IHdlYkF1ZGlvUGVha01ldGVyLmNyZWF0ZU1ldGVyTm9kZShzb3VyY2VOb2RlLCBhdWRpb0N0eCk7XHJcbiAgICAvLyB3ZWJBdWRpb1BlYWtNZXRlci5jcmVhdGVNZXRlcihteU1ldGVyRWxlbWVudCwgbWV0ZXJOb2RlLCB7fSk7XHJcblxyXG4gICAgZW5naW5lLnN0YXJ0KCk7XHJcblxyXG59KTsiLCJcclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sZWZ0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMucmlnaHQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy51cCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcblxyXG4gICAgdGhpcy5rZXlEb3duVXAgPSBmdW5jdGlvbih0eXBlLCBrZXlfY29kZSkge1xyXG4gICAgICAgIGxldCBkb3duID0gKHR5cGUgPT09ICdrZXlkb3duJykgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXlfY29kZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdC5nZXRJbnB1dChkb3duKTsgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzg6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cC5nZXRJbnB1dChkb3duKTsgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOTogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0LmdldElucHV0KGRvd24pO1xyXG4gICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXJcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5kb3duID0gZmFsc2U7XHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlci5CdXR0b25JbnB1dCxcclxuXHJcbiAgICBnZXRJbnB1dCA6IGZ1bmN0aW9uKGRvd24pIHtcclxuICAgICAgICBpZih0aGlzLmRvd24gIT0gZG93bikgdGhpcy5hY3RpdmUgPSBkb3duO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGRvd247XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xsZXI7IiwiY29uc3QgRGlzcGxheSA9IGZ1bmN0aW9uKGNhbnZhcyl7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyksXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB0aGlzLmRyYXdSZWN0YW5nbGUgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIGRyYXcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kcmF3Tm90ZSA9IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yIH0gPSBub3RlO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsbCA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLmNhbnZhcywgMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0LCAwLCAwLCB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICBpZihoZWlnaHQgLyB3aWR0aCA+IGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gd2lkdGggKiBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IGhlaWdodCAvIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICBcclxufTtcclxuXHJcbkRpc3BsYXkucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBEaXNwbGF5XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BsYXk7IiwiXHJcbmNvbnN0IEVuZ2luZSA9IGZ1bmN0aW9uKHRpbWVfc3RlcCwgdXBkYXRlLCByZW5kZXIpIHtcclxuICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IDA7XHJcbiAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gdW5kZWZpbmVkLFxyXG4gICAgdGhpcy50aW1lID0gdW5kZWZpbmVkLFxyXG4gICAgdGhpcy50aW1lX3N0ZXAgPSB0aW1lX3N0ZXAsXHJcblxyXG4gICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XHJcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuXHJcbiAgICB0aGlzLnJ1biA9IGZ1bmN0aW9uKHRpbWVfc3RhbXApIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgKz0gdGltZV9zdGFtcCAtIHRoaXMudGltZTtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lX3N0YW1wO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwICogMykge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgLT0gdGhpcy50aW1lX3N0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lX3N0YW1wKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnVwZGF0ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGltZV9zdGFtcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlUnVuID0gKHRpbWVfc3RlcCkgPT4ge1xyXG4gICAgICAgIHRoaXMucnVuKHRpbWVfc3RlcCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW5naW5lLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRW5naW5lLFxyXG5cclxuICAgIHN0YXJ0OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmU7IiwiY29uc3QgR2FtZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMud29ybGQgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGZyaWN0aW9uOiAwLjksXHJcbiAgICAgICAgZ3Jhdml0eTogMyxcclxuICAgICAgICBwbGF5ZXI6IG5ldyBHYW1lLlBsYXllcigpLFxyXG4gICAgICAgIG5vdGVBcnI6IFtdLFxyXG4gICAgICAgIGJhc3NOb3RlQXJyOiBbXSxcclxuICAgICAgICBlaWdodE5vdGVBcnI6IFtdLFxyXG4gICAgICAgIGhlaWdodDogMTI4LFxyXG4gICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgYmFja2dyb3VuZFRyYWNrOiBuZXcgQXVkaW8oJ0VyaWMgU2tpZmYgLSBBIE5pZ2h0IE9mIERpenp5IFNwZWxscy5tcDMnKSxcclxuICAgICAgICBzb25nOiAnJyxcclxuXHJcbiAgICAgICAgbWVsb2R5QXJyOiBbXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLCBcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdkNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG5cclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsIFxyXG5cclxuICAgICAgICAgICAgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgXHJcblxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJywgXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnZDUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGJhc3NBcnI6IFtcclxuICAgICAgICAgICAgJ2ZzMy5tcDMnLCAnZTMubXAzJywgJ2RzMy5tcDMnLCAnZDMubXAzJywgJ2UzLm1wMycsIFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLFxyXG4gICAgICAgICAgICAnZnMzLm1wMycsICdlMy5tcDMnLCAnZHMzLm1wMycsICdkMy5tcDMnLCAnZTMubXAzJywgXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlaWdodEFycjogW1xyXG4gICAgICAgICAgICAnYTUubXAzJywgJ2dzNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZnM1Lm1wMycsICdnczUubXAzJywnYTUubXAzJywgJ2ZzNS5tcDMnLCAnZnM2Lm1wMycsXHJcbiAgICAgICAgICAgICdmczUubXAzJywgJ2U1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2IubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuICAgICAgICAgICAgJ2E1Lm1wMycsICdnczUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2ZzNS5tcDMnLCAnZ3M1Lm1wMycsJ2E1Lm1wMycsICdmczUubXAzJywgJ2ZzNi5tcDMnLFxyXG4gICAgICAgICAgICAnZnM1Lm1wMycsICdlNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdkNi5tcDMnLCAnY3M2Lm1wMycsICdiNS5tcDMnLCAnYTUubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeFBvc0FycjogW1xyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDM1LCA0NSwgMzUsIDI1LCAxNSwgXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCA4MCwgNzUsIDczLCA3MCwgNTUsXHJcblxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCAyNSwgMzUsIDQ1LCAzNSwgMjUsIFxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCAyNSwgMzUsIDQ1LCAzNSwgMjUsIFxyXG5cclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgNDUsIDM1LCA0NSwgMzUsIDQ1LCBcclxuXHJcbiAgICAgICAgICAgIDQ1LCA0NSwgNDUsIDQ1LCA0NSwgNDUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDM1LCA0NSwgMzUsIDI1LCAxNSxcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCA4MCwgNzUsIDczLCA3MCwgNTUsXHJcbiAgICAgICAgICAgIDE1MCxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhCYXNzUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDY1LCA1MCwgNjUsIDQ1LCAyNSxcclxuICAgICAgICAgICAgMzUsIDM1LCAzNSwgMzUsIDM1LCAzNSxcclxuICAgICAgICAgICAgNjUsIDUwLCA2NSwgNDUsIDI1LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeEVpZ2h0UG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDc1LCA3MCwgNjUsIDYwLCA2MCwgNzAsIDc1LCA2MCwgOTUsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNTAsIDQwLCA0MCwgNTAsIDQwLCAzMCwgMjAsXHJcbiAgICAgICAgICAgIDc1LCA3MCwgNjUsIDYwLCA2MCwgNzAsIDc1LCA2MCwgOTUsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNTAsIDQwLCA4NSwgODAsIDc4LCA3NSwgNjAsXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbmFydXRvTWVsb2R5QXJyOiBbXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsXHJcbiAgICAgICAgICAgICdkLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnYTMubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLFxyXG4gICAgICAgICAgICAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZDUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2Q1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdkNS5tcDMnLCAnZTUubXAzJywgJ2ZzNS5tcDMnLCAvLzMzXHJcblxyXG4gICAgICAgICAgICAnY3M1Lm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnYS5tcDMnLCAvLzQ2XHJcbiAgICAgICAgICAgICdlLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzU2XHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy82MVxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnYS5tcDMnLCAvLzc0XHJcbiAgICAgICAgICAgICdlLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzg0XHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzg5XHJcblxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAvLzEwMlxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgIC8vMTE1XHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzEyMyBFSUdIVFMgU1RBUlQgSEVSRVxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgLy8xMzFcclxuXHJcbiAgICAgICAgICAgICdlLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vMTM5XHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgLy8xNDRcclxuXHJcbiAgICAgICAgICAgICdkLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsIC8vMTUyXHJcbiAgICAgICAgICAgICdlLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8xNjJcclxuICAgICAgICAgICAgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy8xNjhcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAvLzE3M1xyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8xODFcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnZy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8xOTFcclxuICAgICAgICAgICAgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy8xOTdcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjAyXHJcblxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdlLm1wMycsICdiLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzIxNFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzIyMVxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdkLm1wMycsIC8vMjMxXHJcbiAgICAgICAgICAgICdhMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdlLm1wMycsIC8vMjM2XHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG9CYXNzQXJyOiBbXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgLy8gbmFydXRvRWlnaHRBcnI6IFtcclxuICAgICAgICAvLyAgICAgJ2EzLm1wMycsICdkMy5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2QzLm1wMycsICdiMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2IzLm1wMycsICdlMy5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnZnMzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAvLyAgICAgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnYTMubXAzJywgJ2EzLm1wMycsICdlMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2EzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnZDMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnZTMubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2ZzMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJyxcclxuICAgICAgICAvLyAgICAgJ2EzLm1wMycsICdhMy5tcDMnLCAnZTMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdhMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2QubXAzJywgJ2QubXAzJywgJ2QzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2UzLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnYTMubXAzJywgJ2EzLm1wMycsICdlMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsXHJcbiAgICAgICAgLy8gXSxcclxuICAgICAgICAvLyBuYXJ1dG94RWlnaHRQb3NBcnI6W1xyXG4gICAgICAgIC8vICAgICA1NSwgNDAsIDU1LCA3MCwgNzAsIDYwLCA2MCwgXHJcbiAgICAgICAgLy8gICAgIDYwLCA0MCwgNTAsIDYwLCA3NSwgNzAsIDcwLCBcclxuICAgICAgICAvLyAgICAgNjAsIDU1LCA1MCwgODUsIDgwLCA1NSwgNTAsIDg1LCA4MCwgNTUsIDUwLFxyXG4gICAgICAgIC8vIF0sXHJcbiAgICAgICAgbmFydXRvWFBvc0FycjogW1xyXG4gICAgICAgICAgICA1MCwgNDUsIDUwLCA2MCwgNDUsIDUwLCA0NSwgNTAsIDYwLCA0NSwgNTAsXHJcbiAgICAgICAgICAgIDYwLCA0NSwgNjAsIDY1LCA0NSwgNjUsIDc1LCA4MCwgNzUsIDY1LCA2MCxcclxuICAgICAgICAgICAgMTE1LCAxMTAsIDEwMCwgMTE1LCAxMTAsIDEwMCwgMTE1LCAxMTAsIDEwMCwgMTA1LCAxMTAsXHJcblxyXG4gICAgICAgICAgICA5NSwgNzUsIDYwLCA2NSwgNzUsIDYwLCA3NSwgNzUsIDY1LCA2MCwgNjUsIDg1LCA4NSxcclxuICAgICAgICAgICAgNjUsIDU1LCA2NSwgNjAsIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsXHJcblxyXG4gICAgICAgICAgICA2MCwgNTUsIDYwLCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDc1LCA2MCwgNjUsIDY1LCA3NSwgNjAsIDYwLCA3NSwgNjUsIDYwLCA2NSwgODUsIDg1LFxyXG4gICAgICAgICAgICA2NSwgNTUsIDY1LCA2MCwgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCwgXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA2MCxcclxuXHJcbiAgICAgICAgICAgIDUwLCA3NSwgNzUsIDYwLCA2MCwgNzUsIDc1LCA2MCwgNjAsIDkwLCA4NSwgNzUsIDYwLFxyXG4gICAgICAgICAgICA1MCwgNTUsIDYwLCA2MCwgNTUsIDYwLCA2NSwgNjUsIDY1LCA3NSwgNjUsIDYwLCA2NSxcclxuXHJcbiAgICAgICAgICAgIDYwLCA0NSwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSxcclxuICAgICAgICAgICAgNjUsIDQ1LCA1NSwgNjUsIDgwLCA3NSwgNjUsIDc1LFxyXG5cclxuICAgICAgICAgICAgNjUsIDYwLCA5MCwgODUsIDYwLCA5MCwgODUsIDYwLFxyXG4gICAgICAgICAgICA2MCwgNTUsIDYwLCA2NSwgNzUsXHJcblxyXG4gICAgICAgICAgICA2MCwgNDUsIDYwLCA3NSwgNzUsIDY1LCA2MCwgNjUsXHJcbiAgICAgICAgICAgIDY1LCA0NSwgNTUsIDY1LCA4MCwgNzUsIDc1LCA3NSAsIDY1LCA2MCxcclxuICAgICAgICAgICAgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCwgXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA3NSxcclxuXHJcbiAgICAgICAgICAgIDYwLCA1MCwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSxcclxuICAgICAgICAgICAgNjUsIDQ1LCA1NSwgNjUsIDY1LCA4MCwgODUsIDc1LCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA2MCwgXHJcblxyXG4gICAgICAgICAgICA4NSwgNzUsIDY1LCA2NSwgODUsIDc1LCA2NSwgNjUsIDkwLCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICA1MCwgNTUsIDYwLCA2MCwgNzUsIDY1LCA2MCxcclxuICAgICAgICAgICAgNTAsIDUwLCA0NSwgNTAsIDYwLCA0NSwgNTAsIDQ1LCA1MCwgNjAsXHJcbiAgICAgICAgICAgIDQ1LCA1MCwgNDUsIDYwLCA2NVxyXG5cclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b3hCYXNzUG9zQXJyOltcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgXHJcblxyXG4gICAgICAgIGZpbGxOYXJ1dG9Ob3RlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubmFydXRvTWVsb2R5QXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMubmFydXRvWFBvc0Fycltjb3VudF0sIHksIHRoaXMubmFydXRvTWVsb2R5QXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8IDQgfHwgY291bnQgPT09IDczIHx8IGNvdW50ID09PSA5MCB8fCBjb3VudCA9PT0gOTQgfHwgY291bnQgPT09IDk4IHx8IGNvdW50ID09PSAxMDAgIHx8IChjb3VudCA+PSAxMjEgJiYgY291bnQgPD0gMTIyKSB8fCAoY291bnQgPj0gMTI5ICYmIGNvdW50IDw9IDEzMCkgfHwgKGNvdW50ID49IDE1MCAmJiBjb3VudCA8PSAxNTEpIHx8IChjb3VudCA+PSAxNTggJiYgY291bnQgPD0gMTU5KSB8fCAoY291bnQgPj0gMTc5ICYmIGNvdW50IDw9IDE4MCkgfHwgKGNvdW50ID49IDE4NSAmJiBjb3VudCA8PSAxODYpIHx8IGNvdW50ID09PSAyMDMgfHwgY291bnQgPT09IDIwNyB8fCBjb3VudCA9PT0gMjExIHx8IChjb3VudCA+PSAyMjMgJiYgY291bnQgPD0gMjI1KSB8fCAoY291bnQgPj0gMjI3ICYmICBjb3VudCA8PSAyMzApIHx8IChjb3VudCA+PSAyMzIgJiYgIGNvdW50IDw9IDIzNSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMjUgfHwgY291bnQgPT09IDI2IHx8IGNvdW50ID09PSAyOSB8fCBjb3VudCA9PT0gMzAgfHwgY291bnQgPT09IDMyIHx8IGNvdW50ID09PSAzMyB8fCBjb3VudCA9PT0gNDYgfHwgY291bnQgPT09IDc0IHx8IGNvdW50ID09PSA5MiB8fCBjb3VudCA9PT0gOTYgfHwgY291bnQgPT09IDIwNCB8fCBjb3VudCA9PT0gMjA4IHx8IGNvdW50ID09PSAyMTIgfHwgY291bnQgPT09IDIyNil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB8fCBjb3VudCA9PT0gMTAgfHwgY291bnQgPT09IDIwIHx8IGNvdW50ID09PSAyMSB8fCAoY291bnQgPj0gNDAgJiYgY291bnQgPD0gNDMpIHx8IGNvdW50ID09PSA0NSB8fCAoY291bnQgPj0gNjQgJiYgY291bnQgPD0gNjUpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA2OCkgfHwgKGNvdW50ID49IDcwICYmIGNvdW50IDw9IDcxKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5IHx8IChjb3VudCA+PSAxMSAmJiBjb3VudCA8PSAxMikgfHwgKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE1KSB8fCBjb3VudCA9PT0gMTcgfHwgY291bnQgPT09IDE4IHx8IGNvdW50ID09PSAxOSB8fCBjb3VudCA9PT0gMjIgfHwgY291bnQgPT09IDIzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMTMgfHwgY291bnQgPT09IDE2IHx8IGNvdW50ID09PSAyNCB8fCBjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDMxIHx8IChjb3VudCA+PSAzNCAmJiBjb3VudCA8PSAzNykgfHwgY291bnQgPT09IDM5IHx8IGNvdW50ID09PSA0NCB8fCAoY291bnQgPj0gNDcgJiYgY291bnQgPD0gNDkpIHx8IChjb3VudCA+PSA1MSAmJiBjb3VudCA8PSA1MikgfHwgKGNvdW50ID49IDU0ICYmIGNvdW50IDw9IDU1KSB8fCAoY291bnQgPj0gNTggJiYgY291bnQgPD0gNjMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDI4IHx8IGNvdW50ID09PSAzOCB8fCBjb3VudCA9PSA2Nikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDUwIHx8IGNvdW50ID09PSA1MyB8fCAoY291bnQgPj0gNTYgJiYgY291bnQgPD0gNTcpIHx8IGNvdW50ID09PSA3OCB8fCBjb3VudCA9PT0gODEgfHwgKGNvdW50ID49IDg0ICYmIGNvdW50IDw9IDg1KSB8fCBjb3VudCA9PT0gODkgfHwgY291bnQgPT09IDEwMiB8fCAoY291bnQgPj0gMTA1ICYmIGNvdW50IDw9IDEwNikgfHwgKGNvdW50ID49IDEwOSAmJiBjb3VudCA8PSAxMTEpIHx8IGNvdW50ID09PSAxMjMgfHwgY291bnQgPT09IDEzMyB8fCBjb3VudCA9PT0gMTM2IHx8IChjb3VudCA+PSAxMzkgJiYgY291bnQgPD0gMTQwKSB8fCBjb3VudCA9PT0gMTUyIHx8IGNvdW50ID09PSAxNjIgfHwgY291bnQgPT09IDE2NSB8fCAoY291bnQgPj0gMTY4ICYmIGNvdW50IDw9IDE2OSkgfHwgY291bnQgPT09IDE4MSB8fCBjb3VudCA9PT0gMTkxIHx8IGNvdW50ID09PSAxOTQgfHwgKGNvdW50ID49IDE5NyAmJiBjb3VudCA8PSAxOTgpIHx8IGNvdW50ID09PSAyMDIgfHwgY291bnQgPT09IDIxNCB8fCAoY291bnQgPj0gMjE3ICYmIGNvdW50IDw9IDIxOCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY5IHx8IGNvdW50ID09PSA3MiB8fCAoY291bnQgPj0gNzUgJiYgY291bnQgPD0gNzcpIHx8IChjb3VudCA+PSA3OSAmJiBjb3VudCA8PSA4MCkgfHwgKGNvdW50ID49IDgyICYmIGNvdW50IDw9IDgzKSB8fCAoY291bnQgPj0gODYgJiYgY291bnQgPD0gODgpIHx8IGNvdW50ID09PSA5MSB8fCBjb3VudCA9PT0gOTMgfHwgY291bnQgPT09IDk1IHx8IGNvdW50ID09PSA5NyB8fCBjb3VudCA9PT0gOTkgfHwgY291bnQgPT09IDEwMSB8fCAoY291bnQgPj0gMTAzICYmIGNvdW50IDw9IDEwNCkgfHwgKGNvdW50ID49IDEwNyAmJiBjb3VudCA8PSAxMDgpIHx8IChjb3VudCA+PSAxMTIgJiYgY291bnQgPD0gMTIwKSB8fCAoY291bnQgPj0gMTI0ICYmIGNvdW50IDw9IDEyOCkgfHwgKGNvdW50ID49IDEzMSAmJiBjb3VudCA8PSAxMzIpIHx8IChjb3VudCA+PSAxMzQgJiYgY291bnQgPD0gMTM1KSB8fCAoY291bnQgPj0gMTM3ICYmIGNvdW50IDw9IDEzOCkgfHwgKGNvdW50ID49IDE0MSAmJiBjb3VudCA8PSAxNDkpIHx8IChjb3VudCA+PSAxNTMgJiYgY291bnQgPD0gMTU3KSB8fCAoY291bnQgPj0gMTYwICYmIGNvdW50IDw9IDE2MSkgfHwgKGNvdW50ID49IDE2MyAmJiBjb3VudCA8PSAxNjQpIHx8IChjb3VudCA+PSAxNjYgJiYgY291bnQgPD0gMTY3KSB8fCAoY291bnQgPj0gMTcwICYmIGNvdW50IDw9IDE3OCkgfHwgKGNvdW50ID49IDE4MiAmJiBjb3VudCA8PSAxODQpIHx8IChjb3VudCA+PSAxODcgJiYgY291bnQgPD0gMTkwKSB8fCAoY291bnQgPj0gMTkyICYmIGNvdW50IDw9IDE5MykgfHwgKGNvdW50ID49IDE5NSAmJiBjb3VudCA8PSAxOTYpIHx8IChjb3VudCA+PSAxOTkgJiYgY291bnQgPD0gMjAxKSB8fCAoY291bnQgPj0gMjA1ICYmIGNvdW50IDw9IDIwNikgfHwgKGNvdW50ID49IDIwOSAmJiBjb3VudCA8PSAyMTApIHx8IGNvdW50ID09PSAyMTMgfHwgKGNvdW50ID49IDIxNSAmJiBjb3VudCA8PSAyMTYpIHx8IChjb3VudCA+PSAyMTkgJiYgY291bnQgPD0gMjIyKSB8fCBjb3VudCA9PT0gMjMxIHx8IGNvdW50ID09PSAyMzYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICAvLyBmaWxsTmFydXRvRWlnaHQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyAgICAgbGV0IHkgPSAtMTMzNTtcclxuICAgICAgICAvLyAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAvLyAgICAgd2hpbGUgKHRoaXMuZWlnaHROb3RlQXJyLmxlbmd0aCA8IHRoaXMubmFydXRvRWlnaHRBcnIubGVuZ3RoKXtcclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLm5hcnV0b3hFaWdodFBvc0Fycltjb3VudF0sIHksIHRoaXMubmFydXRvRWlnaHRBcnJbY291bnRdKSk7XHJcbiAgICAgICAgLy8gICAgICAgICBjb3VudCArPSAxO1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIGlmKGNvdW50IDwgNyB8fCAoY291bnQgPj0gOCAmJiBjb3VudCA8PSAxOSkgfHwgKGNvdW50ID49IDIxICYmIGNvdW50IDw9IDIzKSB8fCBjb3VudCA9PT0gMjUgfHwgKGNvdW50ID49IDI3ICYmIGNvdW50IDw9IDM2KSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgLy8gICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDcgfHwgY291bnQgPT09IDI2KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyMCB8fCBjb3VudCA9PT0gMjQpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHkgLT0gMTU7XHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSxcclxuXHJcbiAgICAgICAgcmVzdGFydEdhbWU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2FtZUVuZE1lc3NhZ2U6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NvcmUgPj0gOTkuOCl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dPVyEgUEVSRkVDVCBTQ09SRSEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA5MCAmJiB0aGlzLnNjb3JlIDwgOTkuOCl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1NPIENMT1NFIFRPIFBFUkZFQ1RJT04hIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gODAgJiYgdGhpcy5zY29yZSA8PSA4OSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdQUkVUVFkgR09PRCwgQlVUIEkgQkVUIFlPVSBDQU4gRE8gQkVUVEVSLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDcwICYmIHRoaXMuc2NvcmUgPD03OSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdPSCBNQU4sIE1BWUJFIFlPVSBTSE9VTEQgUFJBQ1RJQ0UgQSBMSVRUTEUgTU9SRS4gUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA8PSA2OSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0lTIFlPVVIgTU9OSVRPUiBPTj8gUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxOb3RlQXJyOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgeSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMubm90ZUFyci5sZW5ndGggPCB0aGlzLm1lbG9keUFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy54UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5tZWxvZHlBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKChjb3VudCA8PSA0KSB8fCAoY291bnQgPj0gNjcgJiYgY291bnQgPD0gNzApKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSA1ICYmIGNvdW50IDw9IDgpIHx8IChjb3VudCA+PSA3MSAmJiBjb3VudCA8PSA3NCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5IHx8IGNvdW50ID09PSA3NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDsgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxMCAmJiBjb3VudCA8PSAxMykgfHwgKGNvdW50ID49IDc2ICYmIGNvdW50IDw9IDc5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykgfHwgKGNvdW50ID49IDgwICYmIGNvdW50IDw9IDgzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMTkgJiYgY291bnQgPD0gMjIpIHx8IChjb3VudCA+PSA4NSAmJiBjb3VudCA8PSA4OCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAyMyAmJiBjb3VudCA8PSAyNikgfHwgKGNvdW50ID49IDg5ICYmIGNvdW50IDw9IDkyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDI3IHx8IGNvdW50ID09PSA5Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggKGNvdW50ID49IDI4ICYmIGNvdW50IDw9IDMxKSB8fCAoY291bnQgPj0gOTQgJiYgY291bnQgPD0gOTcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggKGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB8fCAoY291bnQgPj0gOTggJiYgY291bnQgPD0gMTAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDM3ICYmIGNvdW50IDw9IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDYxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID09PSA2Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZpbGxCYXNzQXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgeSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMuYmFzc05vdGVBcnIubGVuZ3RoIDwgdGhpcy5iYXNzQXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy54QmFzc1Bvc0Fycltjb3VudF0sIHksIHRoaXMuYmFzc0Fycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJhc3NOb3RlQXJyW2NvdW50IC0gMV0uc291bmQpO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPD0gMyB8fCAoY291bnQgPj0gMTIgJiYgY291bnQgPD0gMTQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxNTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDQgfHwgY291bnQgPT09IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA2MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDUgKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxFaWdodEFycjpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgeSA9IC04ODU7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMuZWlnaHROb3RlQXJyLmxlbmd0aCA8IHRoaXMuZWlnaHRBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhFaWdodFBvc0Fycltjb3VudF0sIHksIHRoaXMuZWlnaHRBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGNvdW50ID09PSA5IHx8IGNvdW50ID09PSA3NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDsgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTcpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxOCB8fCBjb3VudCA9PT0gODQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTkgJiYgY291bnQgPD0gMjIpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA+PSAzMiAmJiBjb3VudCA8PSAzNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzY29yZVVwZGF0ZTpmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuc29uZyA9PT0gJ3RyZW1vcicpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSAoMTAwIC8gKHRoaXMubWVsb2R5QXJyLmxlbmd0aCArIHRoaXMuYmFzc0Fyci5sZW5ndGggKyB0aGlzLmVpZ2h0QXJyLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoIHRoaXMuc29uZyA9PT0gJ25hcnV0bycpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY29yZSArPSAoMTAwIC8gKHRoaXMubmFydXRvTWVsb2R5QXJyLmxlbmd0aCApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyB0aGlzLnNjb3JlICs9IDE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sbGlkZU9iamVjdDpmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgICAgICAgICBpZihvYmplY3QueCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC54ID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC52ZWxvY2l0eV94ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKG9iamVjdC54ICsgb2JqZWN0LndpZHRoID4gdGhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSB0aGlzLndpZHRoIC0gb2JqZWN0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgLy8gaWYob2JqZWN0LnkgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QueSA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZihvYmplY3QueSArIG9iamVjdC5oZWlnaHQgPiB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0Lmp1bXBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gdGhpcy5oZWlnaHQgLSBvYmplY3QuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICs9IHRoaXMuZ3Jhdml0eTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3ggKj0gdGhpcy5mcmljdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeSAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVPYmplY3QodGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLndvcmxkLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkdhbWUucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvciA6IEdhbWUgfTtcclxuXHJcbkdhbWUuUGxheWVyID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdGhpcy5jb2xvciA9ICcjZmYwMDAwJztcclxuICAgIHRoaXMuaGVpZ2h0ID0gNDtcclxuICAgIC8vIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICB0aGlzLnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgLy8gdGhpcy52ZWxvY2l0eV95ID0gMDtcclxuICAgIHRoaXMud2lkdGggPSAyNDtcclxuICAgIHRoaXMueCA9IDYwO1xyXG4gICAgdGhpcy55ID0gMTEwO1xyXG59O1xyXG5cclxuR2FtZS5QbGF5ZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBHYW1lLlBsYXllcixcclxuXHJcbiAgICAvLyBqdW1wOmZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIGlmKCF0aGlzLmp1bXBpbmcpe1xyXG4gICAgLy8gICAgICAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3Iuc2xpY2UoMCwgMSkgKyAnMCcgKyB0aGlzLmNvbG9yLnNsaWNlKDEsIDYpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICB0aGlzLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnZlbG9jaXR5X3kgLT0gMTU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBoaXROb3RlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb3ZlTGVmdDpmdW5jdGlvbigpIHsgXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94IC09IDAuNzU7XHJcbiAgICB9LFxyXG4gICAgbW92ZVJpZ2h0OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHlfeCArPSAwLjc1O1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eV94O1xyXG4gICAgICAgIC8vIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdhbWUuTm90ZSA9IGZ1bmN0aW9uKHgsIHksIGF1ZGlvRmlsZSl7XHJcbiAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuXHJcbiAgICBpZih0aGlzLmNvbG9yLmxlbmd0aCAhPSA3KXtcclxuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAyO1xyXG4gICAgdGhpcy53aWR0aCA9IDI7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLnZlbG9jaXR5X3kgPSAxO1xyXG5cclxuICAgIHRoaXMuaGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNvdW5kID0gbmV3IEF1ZGlvKGF1ZGlvRmlsZSk7XHJcbn1cclxuXHJcbkdhbWUuTm90ZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuTm90ZSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eV95O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9