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
    // display.fill(game.world.background_color);// Clear background to game's background color.
    // display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
    // noteDrop();
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
  };

  var noteDrop = function noteDrop() {
    display.fill(game.world.background_color);
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
    display.render();
  };

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
    document.getElementById('score-container').classList.remove('playing');
    setInterval(function () {
      return noteDrop();
    }, 1);
  });
  document.getElementById('naruto').addEventListener('click', function () {
    game.world.restartGame();
    game.world.song = 'naruto';
    game.world.fillNarutoNote();
    game.world.backgroundTrack.pause();
    document.getElementById('start-menu').classList.add('playing');
    document.getElementById('pixel-logo').classList.add('playing');
    document.getElementById('tremor').classList.add('playing');
    document.getElementById('naruto').classList.add('playing');
    document.getElementById('score-container').classList.remove('playing');
    setInterval(function () {
      return noteDrop();
    }, 1);
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
    'd.mp3', 'a3.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', //123
    'e.mp3', 'a3.mp3', 'cs.mp3', 'e.mp3', 'g.mp3', 'fs.mp3', 'e.mp3', 'fs.mp3', //131
    'e.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //139
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'fs.mp3', //144
    'd.mp3', 'a3.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', //152
    'e.mp3', 'a3.mp3', 'cs.mp3', 'e.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'fs.mp3', //162
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
    narutoEightArr: [],
    narutoXPosArr: [50, 45, 50, 60, 45, 50, 45, 50, 60, 45, 50, 60, 45, 60, 65, 45, 65, 75, 80, 75, 65, 60, 115, 110, 100, 115, 110, 100, 115, 110, 100, 105, 110, 95, 75, 60, 65, 75, 60, 75, 75, 65, 60, 65, 85, 85, 65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60, 75, 60, 65, 65, 75, 60, 60, 75, 65, 60, 65, 85, 85, 65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60, 50, 75, 75, 60, 60, 75, 75, 60, 60, 90, 85, 75, 60, 50, 55, 60, 60, 55, 60, 65, 65, 65, 75, 65, 60, 65, 60, 45, 60, 75, 75, 65, 60, 65, 65, 45, 55, 65, 80, 75, 65, 75, 65, 60, 90, 85, 60, 90, 85, 60],
    narutoxBassPosArr: [],
    narutoxEightPosArr: [],
    fillNarutoNote: function fillNarutoNote() {
      var y = 0;
      var count = 0;

      while (this.noteArr.length < this.narutoMelodyArr.length) {
        this.noteArr.push(new Game.Note(this.narutoXPosArr[count], y, this.narutoMelodyArr[count]));
        count += 1;

        if (count < 4 || count === 73 || count === 90 || count === 94 || count === 98 || count === 100 || count >= 121 && count <= 122 || count >= 129 && count <= 130) {
          y -= 5;
        } else if (count === 4 || count === 25 || count === 26 || count === 29 || count === 30 || count === 32 || count === 33 || count === 46 || count === 74 || count === 92 || count === 96) {
          y -= 15;
        } else if (count >= 5 && count <= 8 || count === 10 || count === 20 || count === 21 || count >= 40 && count <= 43 || count === 45 || count >= 64 && count <= 65 || count >= 67 && count <= 68 || count >= 70 && count <= 71) {
          y -= 5;
        } else if (count === 9 || count >= 11 && count <= 12 || count >= 14 && count <= 15 || count === 17 || count === 18 || count === 19 || count === 22 || count === 23) {
          y -= 15;
        } else if (count === 13 || count === 16 || count === 24 || count === 27 || count === 31 || count >= 34 && count <= 37 || count === 39 || count === 44 || count >= 47 && count <= 49 || count >= 51 && count <= 52 || count >= 54 && count <= 55 || count >= 58 && count <= 63) {
          y -= 10;
        } else if (count === 28 || count === 38 || count == 66) {
          y -= 30;
        } else if (count === 50 || count === 53 || count >= 56 && count <= 57 || count === 78 || count === 81 || count >= 84 && count <= 85 || count === 89 || count === 102 || count >= 105 && count <= 106 || count >= 109 && count <= 111 || count === 123 || count === 133 || count === 136 || count === 139) {
          y -= 20;
        } else if (count === 69 || count === 72 || count >= 75 && count <= 77 || count >= 79 && count <= 80 || count >= 82 && count <= 83 || count >= 86 && count <= 88 || count === 91 || count === 93 || count === 95 || count === 97 || count === 99 || count === 101 || count >= 103 && count <= 104 || count >= 107 && count <= 108 || count >= 112 && count <= 120 || count >= 124 && count <= 128 || count >= 131 && count <= 132 || count >= 134 && count <= 135 || count >= 137 && count <= 138) {
          y -= 10;
        }
      }
    },
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

      if (this.score >= 100) {
        message = 'WOW! PERFECT SCORE! PRESS SPACEBAR TO TRY AGAIN';
      } else if (this.score >= 90 && this.score < 100) {
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
        this.score += 100 / (this.narutoMelodyArr.length + this.narutoBassArr.length + this.narutoEightArr.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby1wZWFrLW1ldGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiRGlzcGxheSIsIkVuZ2luZSIsIkdhbWUiLCJ3ZWJBdWRpb1BlYWtNZXRlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duVXAiLCJjb250cm9sbGVyIiwidHlwZSIsImtleUNvZGUiLCJyZXNpemUiLCJkaXNwbGF5IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJ0b0ZpeGVkIiwidG9TdHJpbmciLCJub3RlQXJyIiwiZm9yRWFjaCIsIm5vdGUiLCJ4IiwicGxheWVyIiwieSIsImhpdCIsInNjb3JlVXBkYXRlIiwic291bmQiLCJwbGF5IiwiaGl0Tm90ZSIsImJhc3NOb3RlQXJyIiwiZWlnaHROb3RlQXJyIiwidXBkYXRlIiwibGVmdCIsImFjdGl2ZSIsIm1vdmVMZWZ0IiwicmlnaHQiLCJtb3ZlUmlnaHQiLCJub3RlRHJvcCIsImZpbGwiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiZHJhd05vdGUiLCJsZW5ndGgiLCJnYW1lRW5kTWVzc2FnZSIsImdhbWVFbmQiLCJiYWNrZ3JvdW5kVHJhY2siLCJkcmF3UmVjdGFuZ2xlIiwiY29sb3IiLCJxdWVyeVNlbGVjdG9yIiwiZW5naW5lIiwiYnVmZmVyIiwiY2FudmFzIiwid2luZG93IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keSIsIm9ua2V5dXAiLCJyZXN0YXJ0R2FtZSIsInJlbW92ZSIsImNvbnRhaW5zIiwicGF1c2VkIiwicGF1c2UiLCJzb25nIiwiZmlsbE5vdGVBcnIiLCJmaWxsQmFzc0FyciIsImZpbGxFaWdodEFyciIsInNldEludGVydmFsIiwiZmlsbE5hcnV0b05vdGUiLCJsb29wIiwidm9sdW1lIiwic3RhcnQiLCJCdXR0b25JbnB1dCIsInVwIiwia2V5X2NvZGUiLCJkb3duIiwiZ2V0SW5wdXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29udGV4dCIsImNvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIk1hdGgiLCJmbG9vciIsImRyYXdJbWFnZSIsImhlaWdodF93aWR0aF9yYXRpbyIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsInRpbWVfc3RlcCIsImFjY3VtdWxhdGVkX3RpbWUiLCJhbmltYXRpb25fZnJhbWVfcmVxdWVzdCIsInVuZGVmaW5lZCIsInRpbWUiLCJ1cGRhdGVkIiwicnVuIiwidGltZV9zdGFtcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImhhbmRsZVJ1biIsInBlcmZvcm1hbmNlIiwibm93Iiwic3RvcCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZnJpY3Rpb24iLCJncmF2aXR5IiwiUGxheWVyIiwiQXVkaW8iLCJtZWxvZHlBcnIiLCJiYXNzQXJyIiwiZWlnaHRBcnIiLCJ4UG9zQXJyIiwieEJhc3NQb3NBcnIiLCJ4RWlnaHRQb3NBcnIiLCJuYXJ1dG9NZWxvZHlBcnIiLCJuYXJ1dG9CYXNzQXJyIiwibmFydXRvRWlnaHRBcnIiLCJuYXJ1dG9YUG9zQXJyIiwibmFydXRveEJhc3NQb3NBcnIiLCJuYXJ1dG94RWlnaHRQb3NBcnIiLCJjb3VudCIsInB1c2giLCJOb3RlIiwibWVzc2FnZSIsImNvbGxpZGVPYmplY3QiLCJvYmplY3QiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJhbmRvbSIsImF1ZGlvRmlsZSIsInNsaWNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUREO0FBRWxCMUYsUUFBTSxFQUFFLGtCQUFVO0FBQ2QsU0FBS1IsQ0FBTCxJQUFVLEtBQUt1RyxVQUFmO0FBQ0g7QUFKaUIsQ0FBdEI7QUFTQWpELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBGLElBQWpCLEM7Ozs7Ozs7Ozs7O0FDOWJBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIGJvcmRlclNpemU6IDIsXG4gICAgZm9udFNpemU6IDksXG4gICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgIHRpY2tDb2xvcjogJyNkZGQnLFxuICAgIGdyYWRpZW50OiBbJ3JlZCAxJScsICcjZmYwIDE2JScsICdsaW1lIDQ1JScsICcjMDgwIDEwMCUnXSxcbiAgICBkYlJhbmdlOiA0OCxcbiAgICBkYlRpY2tTaXplOiA2LFxuICAgIG1hc2tUcmFuc2l0aW9uOiAnaGVpZ2h0IDAuMXMnXG4gIH07XG4gIHZhciB0aWNrV2lkdGg7XG4gIHZhciBlbGVtZW50V2lkdGg7XG4gIHZhciBlbGVtZW50SGVpZ2h0O1xuICB2YXIgbWV0ZXJIZWlnaHQ7XG4gIHZhciBtZXRlcldpZHRoO1xuICB2YXIgbWV0ZXJUb3A7XG4gIHZhciB2ZXJ0aWNhbCA9IHRydWU7XG4gIHZhciBjaGFubmVsQ291bnQgPSAxO1xuICB2YXIgY2hhbm5lbE1hc2tzID0gW107XG4gIHZhciBjaGFubmVsUGVha3MgPSBbXTtcbiAgdmFyIGNoYW5uZWxQZWFrTGFiZWxzID0gW107XG5cbiAgdmFyIGdldEJhc2VMb2cgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiBNYXRoLmxvZyh5KSAvIE1hdGgubG9nKHgpO1xuICB9O1xuXG4gIHZhciBkYkZyb21GbG9hdCA9IGZ1bmN0aW9uIChmbG9hdFZhbCkge1xuICAgIHJldHVybiBnZXRCYXNlTG9nKDEwLCBmbG9hdFZhbCkgKiAyMDtcbiAgfTtcblxuICB2YXIgc2V0T3B0aW9ucyA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICAgIGZvciAodmFyIGsgaW4gdXNlck9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnNba10gPSB1c2VyT3B0aW9uc1trXTtcbiAgICB9XG5cbiAgICB0aWNrV2lkdGggPSBvcHRpb25zLmZvbnRTaXplICogMi4wO1xuICAgIG1ldGVyVG9wID0gb3B0aW9ucy5mb250U2l6ZSAqIDEuNSArIG9wdGlvbnMuYm9yZGVyU2l6ZTtcbiAgfTtcblxuICB2YXIgY3JlYXRlTWV0ZXJOb2RlID0gZnVuY3Rpb24gKHNvdXJjZU5vZGUsIGF1ZGlvQ3R4KSB7XG4gICAgdmFyIGMgPSBzb3VyY2VOb2RlLmNoYW5uZWxDb3VudDtcbiAgICB2YXIgbWV0ZXJOb2RlID0gYXVkaW9DdHguY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIGMsIGMpO1xuICAgIHNvdXJjZU5vZGUuY29ubmVjdChtZXRlck5vZGUpO1xuICAgIG1ldGVyTm9kZS5jb25uZWN0KGF1ZGlvQ3R4LmRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gbWV0ZXJOb2RlO1xuICB9O1xuXG4gIHZhciBjcmVhdGVDb250YWluZXJEaXYgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgdmFyIG1ldGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLndpZHRoID0gZWxlbWVudFdpZHRoICsgJ3B4JztcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gZWxlbWVudEhlaWdodCArICdweCc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChtZXRlckVsZW1lbnQpO1xuICAgIHJldHVybiBtZXRlckVsZW1lbnQ7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1ldGVyID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQsIG1ldGVyTm9kZSwgb3B0aW9uc092ZXJyaWRlcykge1xuICAgIHNldE9wdGlvbnMob3B0aW9uc092ZXJyaWRlcyk7XG4gICAgZWxlbWVudFdpZHRoID0gZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBlbGVtZW50SGVpZ2h0ID0gZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgdmFyIG1ldGVyRWxlbWVudCA9IGNyZWF0ZUNvbnRhaW5lckRpdihkb21FbGVtZW50KTtcblxuICAgIGlmIChlbGVtZW50V2lkdGggPiBlbGVtZW50SGVpZ2h0KSB7XG4gICAgICB2ZXJ0aWNhbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG1ldGVySGVpZ2h0ID0gZWxlbWVudEhlaWdodCAtIG1ldGVyVG9wIC0gb3B0aW9ucy5ib3JkZXJTaXplO1xuICAgIG1ldGVyV2lkdGggPSBlbGVtZW50V2lkdGggLSB0aWNrV2lkdGggLSBvcHRpb25zLmJvcmRlclNpemU7XG4gICAgY3JlYXRlVGlja3MobWV0ZXJFbGVtZW50KTtcbiAgICBjcmVhdGVSYWluYm93KG1ldGVyRWxlbWVudCwgbWV0ZXJXaWR0aCwgbWV0ZXJIZWlnaHQsIG1ldGVyVG9wLCB0aWNrV2lkdGgpO1xuICAgIGNoYW5uZWxDb3VudCA9IG1ldGVyTm9kZS5jaGFubmVsQ291bnQ7XG4gICAgdmFyIGNoYW5uZWxXaWR0aCA9IG1ldGVyV2lkdGggLyBjaGFubmVsQ291bnQ7XG4gICAgdmFyIGNoYW5uZWxMZWZ0ID0gdGlja1dpZHRoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgY3JlYXRlQ2hhbm5lbE1hc2sobWV0ZXJFbGVtZW50LCBvcHRpb25zLmJvcmRlclNpemUsIG1ldGVyVG9wLCBjaGFubmVsTGVmdCwgZmFsc2UpO1xuICAgICAgY2hhbm5lbE1hc2tzW2ldID0gY3JlYXRlQ2hhbm5lbE1hc2sobWV0ZXJFbGVtZW50LCBjaGFubmVsV2lkdGgsIG1ldGVyVG9wLCBjaGFubmVsTGVmdCwgb3B0aW9ucy5tYXNrVHJhbnNpdGlvbik7XG4gICAgICBjaGFubmVsUGVha3NbaV0gPSAwLjA7XG4gICAgICBjaGFubmVsUGVha0xhYmVsc1tpXSA9IGNyZWF0ZVBlYWtMYWJlbChtZXRlckVsZW1lbnQsIGNoYW5uZWxXaWR0aCwgY2hhbm5lbExlZnQpO1xuICAgICAgY2hhbm5lbExlZnQgKz0gY2hhbm5lbFdpZHRoO1xuICAgIH1cblxuICAgIG1ldGVyTm9kZS5vbmF1ZGlvcHJvY2VzcyA9IHVwZGF0ZU1ldGVyO1xuICAgIG1ldGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgICAgY2hhbm5lbFBlYWtzW2ldID0gMC4wO1xuICAgICAgICBjaGFubmVsUGVha0xhYmVsc1tpXS50ZXh0Q29udGVudCA9ICct4oieJztcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVRpY2tzID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgIHZhciBudW1UaWNrcyA9IE1hdGguZmxvb3Iob3B0aW9ucy5kYlJhbmdlIC8gb3B0aW9ucy5kYlRpY2tTaXplKTtcbiAgICB2YXIgZGJUaWNrTGFiZWwgPSAwO1xuICAgIHZhciBkYlRpY2tUb3AgPSBvcHRpb25zLmZvbnRTaXplICsgb3B0aW9ucy5ib3JkZXJTaXplO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1UaWNrczsgaSsrKSB7XG4gICAgICB2YXIgZGJUaWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZGJUaWNrKTtcbiAgICAgIGRiVGljay5zdHlsZS53aWR0aCA9IHRpY2tXaWR0aCArICdweCc7XG4gICAgICBkYlRpY2suc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgIGRiVGljay5zdHlsZS5jb2xvciA9IG9wdGlvbnMudGlja0NvbG9yO1xuICAgICAgZGJUaWNrLnN0eWxlLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZSArICdweCc7XG4gICAgICBkYlRpY2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZGJUaWNrLnN0eWxlLnRvcCA9IGRiVGlja1RvcCArICdweCc7XG4gICAgICBkYlRpY2sudGV4dENvbnRlbnQgPSBkYlRpY2tMYWJlbCArICcnO1xuICAgICAgZGJUaWNrTGFiZWwgLT0gb3B0aW9ucy5kYlRpY2tTaXplO1xuICAgICAgZGJUaWNrVG9wICs9IG1ldGVySGVpZ2h0IC8gbnVtVGlja3M7XG4gICAgfVxuICB9O1xuXG4gIHZhciBjcmVhdGVSYWluYm93ID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIGhlaWdodCwgdG9wLCBsZWZ0KSB7XG4gICAgdmFyIHJhaW5ib3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocmFpbmJvdyk7XG4gICAgcmFpbmJvdy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICByYWluYm93LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgcmFpbmJvdy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgcmFpbmJvdy5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgIHJhaW5ib3cuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIHZhciBncmFkaWVudFN0eWxlID0gJ2xpbmVhci1ncmFkaWVudCgnICsgb3B0aW9ucy5ncmFkaWVudC5qb2luKCcsICcpICsgJyknO1xuICAgIHJhaW5ib3cuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRTdHlsZTtcbiAgICByZXR1cm4gcmFpbmJvdztcbiAgfTtcblxuICB2YXIgY3JlYXRlUGVha0xhYmVsID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIGxlZnQpIHtcbiAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGxhYmVsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gb3B0aW9ucy50aWNrQ29sb3I7XG4gICAgbGFiZWwuc3R5bGUuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgbGFiZWwuc3R5bGUudG9wID0gb3B0aW9ucy5ib3JkZXJTaXplICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSAnLeKInic7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9O1xuXG4gIHZhciBjcmVhdGVDaGFubmVsTWFzayA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCB0b3AsIGxlZnQsIHRyYW5zaXRpb24pIHtcbiAgICB2YXIgY2hhbm5lbE1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hhbm5lbE1hc2spO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLmhlaWdodCA9IG1ldGVySGVpZ2h0ICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgY2hhbm5lbE1hc2suc3R5bGUudHJhbnNpdGlvbiA9IG9wdGlvbnMubWFza1RyYW5zaXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoYW5uZWxNYXNrO1xuICB9O1xuXG4gIHZhciBtYXNrU2l6ZSA9IGZ1bmN0aW9uIChmbG9hdFZhbCkge1xuICAgIGlmIChmbG9hdFZhbCA9PT0gMC4wKSB7XG4gICAgICByZXR1cm4gbWV0ZXJIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkID0gb3B0aW9ucy5kYlJhbmdlICogLTE7XG4gICAgICB2YXIgcmV0dXJuVmFsID0gTWF0aC5mbG9vcihkYkZyb21GbG9hdChmbG9hdFZhbCkgKiBtZXRlckhlaWdodCAvIGQpO1xuXG4gICAgICBpZiAocmV0dXJuVmFsID4gbWV0ZXJIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIG1ldGVySGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHVwZGF0ZU1ldGVyID0gZnVuY3Rpb24gKGF1ZGlvUHJvY2Vzc2luZ0V2ZW50KSB7XG4gICAgdmFyIGlucHV0QnVmZmVyID0gYXVkaW9Qcm9jZXNzaW5nRXZlbnQuaW5wdXRCdWZmZXI7XG4gICAgdmFyIGk7XG4gICAgdmFyIGNoYW5uZWxEYXRhID0gW107XG4gICAgdmFyIGNoYW5uZWxNYXhlcyA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICBjaGFubmVsRGF0YVtpXSA9IGlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKGkpO1xuICAgICAgY2hhbm5lbE1heGVzW2ldID0gMC4wO1xuICAgIH1cblxuICAgIGZvciAodmFyIHNhbXBsZSA9IDA7IHNhbXBsZSA8IGlucHV0QnVmZmVyLmxlbmd0aDsgc2FtcGxlKyspIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoY2hhbm5lbERhdGFbaV1bc2FtcGxlXSkgPiBjaGFubmVsTWF4ZXNbaV0pIHtcbiAgICAgICAgICBjaGFubmVsTWF4ZXNbaV0gPSBNYXRoLmFicyhjaGFubmVsRGF0YVtpXVtzYW1wbGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgdmFyIHRoaXNNYXNrU2l6ZSA9IG1hc2tTaXplKGNoYW5uZWxNYXhlc1tpXSwgbWV0ZXJIZWlnaHQpO1xuICAgICAgY2hhbm5lbE1hc2tzW2ldLnN0eWxlLmhlaWdodCA9IHRoaXNNYXNrU2l6ZSArICdweCc7XG5cbiAgICAgIGlmIChjaGFubmVsTWF4ZXNbaV0gPiBjaGFubmVsUGVha3NbaV0pIHtcbiAgICAgICAgY2hhbm5lbFBlYWtzW2ldID0gY2hhbm5lbE1heGVzW2ldO1xuICAgICAgICB2YXIgbGFiZWxUZXh0ID0gZGJGcm9tRmxvYXQoY2hhbm5lbFBlYWtzW2ldKS50b0ZpeGVkKDEpO1xuICAgICAgICBjaGFubmVsUGVha0xhYmVsc1tpXS50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVNZXRlck5vZGU6IGNyZWF0ZU1ldGVyTm9kZSxcbiAgICBjcmVhdGVNZXRlcjogY3JlYXRlTWV0ZXJcbiAgfTtcbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSB3ZWJBdWRpb1BlYWtNZXRlcjsiLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5jb25zdCBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zY3JpcHRzL2NvbnRyb2xsZXInKTtcclxuY29uc3QgRGlzcGxheSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9kaXNwbGF5Jyk7XHJcbmNvbnN0IEVuZ2luZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9lbmdpbmUnKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9nYW1lJyk7XHJcbnZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IHJlcXVpcmUoJ3dlYi1hdWRpby1wZWFrLW1ldGVyJyk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IChnYW1lLndvcmxkLnNjb3JlID09PSAwKSA/IChcclxuICAgICAgICAgICAgJzAlJ1xyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIChnYW1lLndvcmxkLnNjb3JlLnRvRml4ZWQoMikpLnRvU3RyaW5nKCkgKyAnJSdcclxuICAgICAgICApIFxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihjb250cm9sbGVyLmxlZnQuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIucmlnaHQuYWN0aXZlKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmKGNvbnRyb2xsZXIudXAuYWN0aXZlKXtcclxuICAgICAgICAvLyAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIC8vICAgICBjb250cm9sbGVyLnVwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG5vdGVEcm9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihnYW1lLndvcmxkLm5vdGVBcnJbZ2FtZS53b3JsZC5ub3RlQXJyLmxlbmd0aCAtIDFdLnkgPiAxMTgpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuXHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgZGlzcGxheSA9IG5ldyBEaXNwbGF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKTtcclxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGxldCBlbmdpbmUgPSBuZXcgRW5naW5lKDEwMDAvMzAsIHJlbmRlciwgdXBkYXRlKTtcclxuXHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMuaGVpZ2h0ID0gZ2FtZS53b3JsZC5oZWlnaHQ7XHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMud2lkdGggPSBnYW1lLndvcmxkLndpZHRoO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcclxuXHJcbiAgICByZXNpemUoKTtcclxuICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgXHJcbiAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5vbmtleXVwID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzMil7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSA4MCkge1xyXG4gICAgICAgICAgICBpZighZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2VkKXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5zb25nID0gJ3RyZW1vcic7XHJcblxyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxOb3RlQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEJhc3NBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsRWlnaHRBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBub3RlRHJvcCgpLCAxKTtcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5zb25nID0gJ25hcnV0byc7XHJcblxyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxOYXJ1dG9Ob3RlKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2subG9vcCA9IHRydWU7XHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay52b2x1bWUgPSAwLjM7XHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICBcclxuICAgIC8vIHZhciBteU1ldGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1wZWFrLW1ldGVyJyk7XHJcbiAgICAvLyB2YXIgYXVkaW9DdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuICAgIC8vIHZhciBzb3VyY2VOb2RlID0gYXVkaW9DdHguY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrKTtcclxuICAgIC8vIHNvdXJjZU5vZGUuY29ubmVjdChhdWRpb0N0eC5kZXN0aWF0aW9uKTtcclxuICAgIC8vIHZhciBtZXRlck5vZGUgPSB3ZWJBdWRpb1BlYWtNZXRlci5jcmVhdGVNZXRlck5vZGUoc291cmNlTm9kZSwgYXVkaW9DdHgpO1xyXG4gICAgLy8gd2ViQXVkaW9QZWFrTWV0ZXIuY3JlYXRlTWV0ZXIobXlNZXRlckVsZW1lbnQsIG1ldGVyTm9kZSwge30pO1xyXG5cclxuICAgIGVuZ2luZS5zdGFydCgpO1xyXG5cclxufSk7IiwiXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubGVmdCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnJpZ2h0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMudXAgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG5cclxuICAgIHRoaXMua2V5RG93blVwID0gZnVuY3Rpb24odHlwZSwga2V5X2NvZGUpIHtcclxuICAgICAgICBsZXQgZG93biA9ICh0eXBlID09PSAna2V5ZG93bicpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBzd2l0Y2goa2V5X2NvZGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQuZ2V0SW5wdXQoZG93bik7ICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM4OiBcclxuICAgICAgICAgICAgICAgIHRoaXMudXAuZ2V0SW5wdXQoZG93bik7ICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodC5nZXRJbnB1dChkb3duKTtcclxuICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyXHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuZG93biA9IGZhbHNlO1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQsXHJcblxyXG4gICAgZ2V0SW5wdXQgOiBmdW5jdGlvbihkb3duKSB7XHJcbiAgICAgICAgaWYodGhpcy5kb3duICE9IGRvd24pIHRoaXMuYWN0aXZlID0gZG93bjtcclxuICAgICAgICB0aGlzLmRvd24gPSBkb3duO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyOyIsImNvbnN0IERpc3BsYXkgPSBmdW5jdGlvbihjYW52YXMpe1xyXG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgdGhpcy5kcmF3UmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcyBpcyBkcmF3Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZHJhd05vdGUgPSBmdW5jdGlvbihub3RlKSB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciB9ID0gbm90ZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbGwgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlci5jYW52YXMsIDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCwgMCwgMCwgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgaWYoaGVpZ2h0IC8gd2lkdGggPiBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IHdpZHRoICogaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSBoZWlnaHQgLyBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgXHJcbn07XHJcblxyXG5EaXNwbGF5LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRGlzcGxheVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5OyIsIlxyXG5jb25zdCBFbmdpbmUgPSBmdW5jdGlvbih0aW1lX3N0ZXAsIHVwZGF0ZSwgcmVuZGVyKSB7XHJcbiAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSAwO1xyXG4gICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZSA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZV9zdGVwID0gdGltZV9zdGVwLFxyXG5cclxuICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcblxyXG4gICAgdGhpcy5ydW4gPSBmdW5jdGlvbih0aW1lX3N0YW1wKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lICs9IHRpbWVfc3RhbXAgLSB0aGlzLnRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGltZV9zdGFtcDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCAqIDMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXApIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lIC09IHRoaXMudGltZV9zdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodGltZV9zdGFtcCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy51cGRhdGVkKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRpbWVfc3RhbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZVJ1biA9ICh0aW1lX3N0ZXApID0+IHtcclxuICAgICAgICB0aGlzLnJ1bih0aW1lX3N0ZXApO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVuZ2luZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEVuZ2luZSxcclxuXHJcbiAgICBzdGFydDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB0aGlzLnRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsImNvbnN0IEdhbWUgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLndvcmxkID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBmcmljdGlvbjogMC45LFxyXG4gICAgICAgIGdyYXZpdHk6IDMsXHJcbiAgICAgICAgcGxheWVyOiBuZXcgR2FtZS5QbGF5ZXIoKSxcclxuICAgICAgICBub3RlQXJyOiBbXSxcclxuICAgICAgICBiYXNzTm90ZUFycjogW10sXHJcbiAgICAgICAgZWlnaHROb3RlQXJyOiBbXSxcclxuICAgICAgICBoZWlnaHQ6IDEyOCxcclxuICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgIHNjb3JlOiAwLFxyXG4gICAgICAgIGJhY2tncm91bmRUcmFjazogbmV3IEF1ZGlvKCdFcmljIFNraWZmIC0gQSBOaWdodCBPZiBEaXp6eSBTcGVsbHMubXAzJyksXHJcbiAgICAgICAgc29uZzogJycsXHJcblxyXG4gICAgICAgIG1lbG9keUFycjogW1xyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJywgXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnZDUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJyxcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCBcclxuXHJcbiAgICAgICAgICAgICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsIFxyXG5cclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsIFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJyxcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2Q1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBiYXNzQXJyOiBbXHJcbiAgICAgICAgICAgICdmczMubXAzJywgJ2UzLm1wMycsICdkczMubXAzJywgJ2QzLm1wMycsICdlMy5tcDMnLCBcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAgICAgJ2ZzMy5tcDMnLCAnZTMubXAzJywgJ2RzMy5tcDMnLCAnZDMubXAzJywgJ2UzLm1wMycsIFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZWlnaHRBcnI6IFtcclxuICAgICAgICAgICAgJ2E1Lm1wMycsICdnczUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2ZzNS5tcDMnLCAnZ3M1Lm1wMycsJ2E1Lm1wMycsICdmczUubXAzJywgJ2ZzNi5tcDMnLFxyXG4gICAgICAgICAgICAnZnM1Lm1wMycsICdlNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdiLm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcbiAgICAgICAgICAgICdhNS5tcDMnLCAnZ3M1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdmczUubXAzJywgJ2dzNS5tcDMnLCdhNS5tcDMnLCAnZnM1Lm1wMycsICdmczYubXAzJyxcclxuICAgICAgICAgICAgJ2ZzNS5tcDMnLCAnZTUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnZDYubXAzJywgJ2NzNi5tcDMnLCAnYjUubXAzJywgJ2E1Lm1wMycsICdmczUubXAzJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhQb3NBcnI6IFtcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCAzNSwgNDUsIDM1LCAyNSwgMTUsIFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgODAsIDc1LCA3MywgNzAsIDU1LFxyXG5cclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgMjUsIDM1LCA0NSwgMzUsIDI1LCBcclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgMjUsIDM1LCA0NSwgMzUsIDI1LCBcclxuXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDQ1LCAzNSwgNDUsIDM1LCA0NSwgXHJcblxyXG4gICAgICAgICAgICA0NSwgNDUsIDQ1LCA0NSwgNDUsIDQ1LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCAzNSwgNDUsIDM1LCAyNSwgMTUsXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgODAsIDc1LCA3MywgNzAsIDU1LFxyXG4gICAgICAgICAgICAxNTAsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4QmFzc1Bvc0FycjogW1xyXG4gICAgICAgICAgICA2NSwgNTAsIDY1LCA0NSwgMjUsXHJcbiAgICAgICAgICAgIDM1LCAzNSwgMzUsIDM1LCAzNSwgMzUsXHJcbiAgICAgICAgICAgIDY1LCA1MCwgNjUsIDQ1LCAyNSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhFaWdodFBvc0FycjogW1xyXG4gICAgICAgICAgICA3NSwgNzAsIDY1LCA2MCwgNjAsIDcwLCA3NSwgNjAsIDk1LFxyXG4gICAgICAgICAgICA2MCwgNTUsIDUwLCA0MCwgNDAsIDUwLCA0MCwgMzAsIDIwLFxyXG4gICAgICAgICAgICA3NSwgNzAsIDY1LCA2MCwgNjAsIDcwLCA3NSwgNjAsIDk1LFxyXG4gICAgICAgICAgICA2MCwgNTUsIDUwLCA0MCwgODUsIDgwLCA3OCwgNzUsIDYwLFxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG5hcnV0b01lbG9keUFycjogW1xyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2EzLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJyxcclxuICAgICAgICAgICAgJ2c1Lm1wMycsICdmczUubXAzJywgJ2Q1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdkNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZDUubXAzJywgJ2U1Lm1wMycsICdmczUubXAzJywgLy8zM1xyXG5cclxuICAgICAgICAgICAgJ2NzNS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2EubXAzJywgJ2EubXAzJywgLy80NlxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy81NlxyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vNjFcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2EubXAzJywgJ2EubXAzJywgLy83NFxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy84NFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy84OVxyXG5cclxuICAgICAgICAgICAgJ2IzLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgLy8xMDJcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsICAvLzExNVxyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8xMjNcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTMxXHJcblxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzEzOVxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTQ0XHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzE1MlxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAvLzE2MlxyXG4gICAgICAgICAgICAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzE2OFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTczXHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzE4MVxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdlLm1wMycsICdnLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzE5MVxyXG4gICAgICAgICAgICAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzE5N1xyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8yMDJcclxuXHJcbiAgICAgICAgICAgICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2IubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjE0XHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjIxXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgLy8yMzFcclxuICAgICAgICAgICAgJ2EzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8yMzZcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b0Jhc3NBcnI6IFtcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG9FaWdodEFycjogW1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b1hQb3NBcnI6IFtcclxuICAgICAgICAgICAgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCwgNDUsIDUwLCA2MCwgNDUsIDUwLFxyXG4gICAgICAgICAgICA2MCwgNDUsIDYwLCA2NSwgNDUsIDY1LCA3NSwgODAsIDc1LCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDExNSwgMTEwLCAxMDAsIDExNSwgMTEwLCAxMDAsIDExNSwgMTEwLCAxMDAsIDEwNSwgMTEwLFxyXG5cclxuICAgICAgICAgICAgOTUsIDc1LCA2MCwgNjUsIDc1LCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LCA4NSwgODUsXHJcbiAgICAgICAgICAgIDY1LCA1NSwgNjUsIDYwLCA5MCwgODUsIDYwLCA5MCwgODUsIDYwLFxyXG5cclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLFxyXG4gICAgICAgICAgICA3NSwgNjAsIDY1LCA2NSwgNzUsIDYwLCA2MCwgNzUsIDY1LCA2MCwgNjUsIDg1LCA4NSxcclxuICAgICAgICAgICAgNjUsIDU1LCA2NSwgNjAsIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsIFxyXG4gICAgICAgICAgICA2MCwgNTUsIDYwLCA2NSwgNjAsXHJcblxyXG4gICAgICAgICAgICA1MCwgNzUsIDc1LCA2MCwgNjAsIDc1LCA3NSwgNjAsIDYwLCA5MCwgODUsIDc1LCA2MCxcclxuICAgICAgICAgICAgNTAsIDU1LCA2MCwgNjAsIDU1LCA2MCwgNjUsIDY1LCA2NSwgNzUsIDY1LCA2MCwgNjUsXHJcblxyXG4gICAgICAgICAgICA2MCwgNDUsIDYwLCA3NSwgNzUsIDY1LCA2MCwgNjUsXHJcbiAgICAgICAgICAgIDY1LCA0NSwgNTUsIDY1LCA4MCwgNzUsIDY1LCA3NSxcclxuXHJcbiAgICAgICAgICAgIDY1LCA2MCwgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b3hCYXNzUG9zQXJyOltcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG94RWlnaHRQb3NBcnI6W1xyXG5cclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBmaWxsTmFydXRvTm90ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgeSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMubm90ZUFyci5sZW5ndGggPCB0aGlzLm5hcnV0b01lbG9keUFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLm5hcnV0b1hQb3NBcnJbY291bnRdLCB5LCB0aGlzLm5hcnV0b01lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPCA0IHx8IGNvdW50ID09PSA3MyB8fCBjb3VudCA9PT0gOTAgfHwgY291bnQgPT09IDk0IHx8IGNvdW50ID09PSA5OCB8fCBjb3VudCA9PT0gMTAwICB8fCAoY291bnQgPj0gMTIxICYmIGNvdW50IDw9IDEyMikgfHwgKGNvdW50ID49IDEyOSAmJiBjb3VudCA8PSAxMzApKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDQgfHwgY291bnQgPT09IDI1IHx8IGNvdW50ID09PSAyNiB8fCBjb3VudCA9PT0gMjkgfHwgY291bnQgPT09IDMwIHx8IGNvdW50ID09PSAzMiB8fCBjb3VudCA9PT0gMzMgfHwgY291bnQgPT09IDQ2IHx8IGNvdW50ID09PSA3NCB8fCBjb3VudCA9PT0gOTIgfHwgY291bnQgPT09IDk2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSA1ICYmIGNvdW50IDw9IDgpIHx8IGNvdW50ID09PSAxMCB8fCBjb3VudCA9PT0gMjAgfHwgY291bnQgPT09IDIxIHx8IChjb3VudCA+PSA0MCAmJiBjb3VudCA8PSA0MykgfHwgY291bnQgPT09IDQ1IHx8IChjb3VudCA+PSA2NCAmJiBjb3VudCA8PSA2NSkgfHwgKGNvdW50ID49IDY3ICYmIGNvdW50IDw9IDY4KSB8fCAoY291bnQgPj0gNzAgJiYgY291bnQgPD0gNzEpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgKGNvdW50ID49IDExICYmIGNvdW50IDw9IDEyKSB8fCAoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTUpIHx8IGNvdW50ID09PSAxNyB8fCBjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDE5IHx8IGNvdW50ID09PSAyMiB8fCBjb3VudCA9PT0gMjMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSAxMyB8fCBjb3VudCA9PT0gMTYgfHwgY291bnQgPT09IDI0IHx8IGNvdW50ID09PSAyNyB8fCBjb3VudCA9PT0gMzEgfHwgKGNvdW50ID49IDM0ICYmIGNvdW50IDw9IDM3KSB8fCBjb3VudCA9PT0gMzkgfHwgY291bnQgPT09IDQ0IHx8IChjb3VudCA+PSA0NyAmJiBjb3VudCA8PSA0OSkgfHwgKGNvdW50ID49IDUxICYmIGNvdW50IDw9IDUyKSB8fCAoY291bnQgPj0gNTQgJiYgY291bnQgPD0gNTUpIHx8IChjb3VudCA+PSA1OCAmJiBjb3VudCA8PSA2MykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMjggfHwgY291bnQgPT09IDM4IHx8IGNvdW50ID09IDY2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNTAgfHwgY291bnQgPT09IDUzIHx8IChjb3VudCA+PSA1NiAmJiBjb3VudCA8PSA1NykgfHwgY291bnQgPT09IDc4IHx8IGNvdW50ID09PSA4MSB8fCAoY291bnQgPj0gODQgJiYgY291bnQgPD0gODUpIHx8IGNvdW50ID09PSA4OSB8fCBjb3VudCA9PT0gMTAyIHx8IChjb3VudCA+PSAxMDUgJiYgY291bnQgPD0gMTA2KSB8fCAoY291bnQgPj0gMTA5ICYmIGNvdW50IDw9IDExMSkgfHwgY291bnQgPT09IDEyMyB8fCBjb3VudCA9PT0gMTMzIHx8IGNvdW50ID09PSAxMzYgfHwgY291bnQgPT09IDEzOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjkgfHwgY291bnQgPT09IDcyIHx8IChjb3VudCA+PSA3NSAmJiBjb3VudCA8PSA3NykgfHwgKGNvdW50ID49IDc5ICYmIGNvdW50IDw9IDgwKSB8fCAoY291bnQgPj0gODIgJiYgY291bnQgPD0gODMpIHx8IChjb3VudCA+PSA4NiAmJiBjb3VudCA8PSA4OCkgfHwgY291bnQgPT09IDkxIHx8IGNvdW50ID09PSA5MyB8fCBjb3VudCA9PT0gOTUgfHwgY291bnQgPT09IDk3IHx8IGNvdW50ID09PSA5OSB8fCBjb3VudCA9PT0gMTAxIHx8IChjb3VudCA+PSAxMDMgJiYgY291bnQgPD0gMTA0KSB8fCAoY291bnQgPj0gMTA3ICYmIGNvdW50IDw9IDEwOCkgfHwgKGNvdW50ID49IDExMiAmJiBjb3VudCA8PSAxMjApIHx8IChjb3VudCA+PSAxMjQgJiYgY291bnQgPD0gMTI4KSB8fCAoY291bnQgPj0gMTMxICYmIGNvdW50IDw9IDEzMikgfHwgKGNvdW50ID49IDEzNCAmJiBjb3VudCA8PSAxMzUpIHx8IChjb3VudCA+PSAxMzcgJiYgY291bnQgPD0gMTM4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3RhcnRHYW1lOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm5vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lRW5kOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmRNZXNzYWdlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjb3JlID49IDEwMCl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dPVyEgUEVSRkVDVCBTQ09SRSEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA5MCAmJiB0aGlzLnNjb3JlIDwgMTAwKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU08gQ0xPU0UgVE8gUEVSRkVDVElPTiEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA4MCAmJiB0aGlzLnNjb3JlIDw9IDg5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BSRVRUWSBHT09ELCBCVVQgSSBCRVQgWU9VIENBTiBETyBCRVRURVIuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gNzAgJiYgdGhpcy5zY29yZSA8PTc5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ09IIE1BTiwgTUFZQkUgWU9VIFNIT1VMRCBQUkFDVElDRSBBIExJVFRMRSBNT1JFLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlIDw9IDY5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSVMgWU9VUiBNT05JVE9SIE9OPyBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbE5vdGVBcnI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubWVsb2R5QXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhQb3NBcnJbY291bnRdLCB5LCB0aGlzLm1lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKGNvdW50IDw9IDQpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA3MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkgfHwgKGNvdW50ID49IDcxICYmIGNvdW50IDw9IDc0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKSB8fCAoY291bnQgPj0gNzYgJiYgY291bnQgPD0gNzkpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE3KSB8fCAoY291bnQgPj0gODAgJiYgY291bnQgPD0gODMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDg0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikgfHwgKGNvdW50ID49IDg1ICYmIGNvdW50IDw9IDg4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB8fCAoY291bnQgPj0gODkgJiYgY291bnQgPD0gOTIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDkzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHx8IChjb3VudCA+PSA5NCAmJiBjb3VudCA8PSA5NykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMzIgJiYgY291bnQgPD0gMzYpIHx8IChjb3VudCA+PSA5OCAmJiBjb3VudCA8PSAxMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPj0gMzcgJiYgY291bnQgPD0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDYzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2Nil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlsbEJhc3NBcnI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5iYXNzTm90ZUFyci5sZW5ndGggPCB0aGlzLmJhc3NBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhCYXNzUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5iYXNzQXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnJbY291bnQgLSAxXS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSAzIHx8IChjb3VudCA+PSAxMiAmJiBjb3VudCA8PSAxNCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDYwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEVpZ2h0QXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gLTg4NTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5laWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5laWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjb3JlVXBkYXRlOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5zb25nID09PSAndHJlbW9yJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5tZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5iYXNzQXJyLmxlbmd0aCArIHRoaXMuZWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdGhpcy5zb25nID09PSAnbmFydXRvJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5uYXJ1dG9NZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5uYXJ1dG9CYXNzQXJyLmxlbmd0aCArIHRoaXMubmFydXRvRWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGhpcy5zY29yZSArPSAxO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbGxpZGVPYmplY3Q6ZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgICAgICAgICAgaWYob2JqZWN0LnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihvYmplY3QueCArIG9iamVjdC53aWR0aCA+IHRoaXMud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC54ID0gdGhpcy53aWR0aCAtIG9iamVjdC53aWR0aDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC52ZWxvY2l0eV94ID0gMDtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKG9iamVjdC55IDwgMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2UgaWYob2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0ID4gdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC5qdW1waW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QueSA9IHRoaXMuaGVpZ2h0IC0gb2JqZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeSArPSB0aGlzLmdyYXZpdHk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV94ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKj0gdGhpcy5mcmljdGlvbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xsaWRlT2JqZWN0KHRoaXMucGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy53b3JsZC51cGRhdGUoKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5HYW1lLnByb3RvdHlwZSA9IHsgY29uc3RydWN0b3IgOiBHYW1lIH07XHJcblxyXG5HYW1lLlBsYXllciA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHRoaXMuY29sb3IgPSAnI2ZmMDAwMCc7XHJcbiAgICB0aGlzLmhlaWdodCA9IDQ7XHJcbiAgICAvLyB0aGlzLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy52ZWxvY2l0eV94ID0gMDtcclxuICAgIC8vIHRoaXMudmVsb2NpdHlfeSA9IDA7XHJcbiAgICB0aGlzLndpZHRoID0gMjQ7XHJcbiAgICB0aGlzLnggPSA2MDtcclxuICAgIHRoaXMueSA9IDExMDtcclxufTtcclxuXHJcbkdhbWUuUGxheWVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5QbGF5ZXIsXHJcblxyXG4gICAgLy8ganVtcDpmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICBpZighdGhpcy5qdW1waW5nKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcblxyXG4gICAgLy8gICAgICAgICBpZih0aGlzLmNvbG9yLmxlbmd0aCAhPSA3KXtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgdGhpcy52ZWxvY2l0eV95IC09IDE1O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0sXHJcblxyXG4gICAgaGl0Tm90ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW92ZUxlZnQ6ZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgIHRoaXMudmVsb2NpdHlfeCAtPSAwLjc1O1xyXG4gICAgfSxcclxuICAgIG1vdmVSaWdodDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggKz0gMC43NTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHlfeDtcclxuICAgICAgICAvLyB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eV95O1xyXG4gICAgfVxyXG59XHJcblxyXG5HYW1lLk5vdGUgPSBmdW5jdGlvbih4LCB5LCBhdWRpb0ZpbGUpe1xyXG4gICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcblxyXG4gICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3Iuc2xpY2UoMCwgMSkgKyAnMCcgKyB0aGlzLmNvbG9yLnNsaWNlKDEsIDYpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gMjtcclxuICAgIHRoaXMud2lkdGggPSAyO1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eV95ID0gMTtcclxuXHJcbiAgICB0aGlzLmhpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbyhhdWRpb0ZpbGUpO1xyXG59XHJcblxyXG5HYW1lLk5vdGUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBHYW1lLk5vdGUsXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==