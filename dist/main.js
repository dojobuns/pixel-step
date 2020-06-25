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
    'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'd.mp3' //89
    ],
    narutoBassArr: [],
    narutoEightArr: [],
    narutoXPosArr: [50, 45, 50, 60, 45, 50, 45, 50, 60, 45, 50, 60, 45, 60, 65, 45, 65, 75, 80, 75, 65, 60, 115, 110, 100, 115, 110, 100, 115, 110, 100, 105, 110, 95, 75, 60, 65, 75, 60, 75, 75, 65, 60, 65, 85, 85, 65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60, 75, 60, 65, 65, 75, 60, 60, 75, 65, 60, 65, 85, 85, 65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 60, 55, 60, 65, 60],
    narutoxBassPosArr: [],
    narutoxEightPosArr: [],
    fillNarutoNote: function fillNarutoNote() {
      var y = 0;
      var count = 0;

      while (this.noteArr.length < this.narutoMelodyArr.length) {
        this.noteArr.push(new Game.Note(this.narutoXPosArr[count], y, this.narutoMelodyArr[count]));
        count += 1;

        if (count < 4 || count === 73) {
          y -= 5;
        } else if (count === 4 || count === 25 || count === 26 || count === 29 || count === 30 || count === 32 || count === 33 || count === 46 || count === 74) {
          y -= 15;
        } else if (count >= 5 && count <= 8 || count === 10 || count === 20 || count === 21 || count >= 40 && count <= 43 || count === 45 || count >= 64 && count <= 65 || count >= 67 && count <= 68 || count >= 70 && count <= 71) {
          y -= 5;
        } else if (count === 9 || count >= 11 && count <= 12 || count >= 14 && count <= 15 || count === 17 || count === 18 || count === 19 || count === 22 || count === 23) {
          y -= 15;
        } else if (count === 13 || count === 16 || count === 24 || count === 27 || count === 31 || count >= 34 && count <= 37 || count === 39 || count === 44 || count >= 47 && count <= 49 || count >= 51 && count <= 52 || count >= 54 && count <= 55 || count >= 58 && count <= 63) {
          y -= 10;
        } else if (count === 28 || count === 38 || count == 66) {
          y -= 30;
        } else if (count === 50 || count === 53 || count >= 56 && count <= 57 || count === 78 || count === 81 || count >= 84 && count <= 85 || count === 89) {
          y -= 20;
        } else if (count === 69 || count === 72 || count >= 75 && count <= 77 || count >= 79 && count <= 80 || count >= 82 && count <= 83 || count >= 86 && count <= 88) {
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

      if (this.score > 99) {
        message = 'WOW! PERFECT SCORE! PRESS SPACEBAR TO TRY AGAIN';
      } else if (this.score >= 90 && this.score <= 99) {
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
      this.score += 100 / (this.melodyArr.length + this.bassArr.length + this.eightArr.length); // this.score += 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby1wZWFrLW1ldGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiRGlzcGxheSIsIkVuZ2luZSIsIkdhbWUiLCJ3ZWJBdWRpb1BlYWtNZXRlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duVXAiLCJjb250cm9sbGVyIiwidHlwZSIsImtleUNvZGUiLCJyZXNpemUiLCJkaXNwbGF5IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJ0b0ZpeGVkIiwidG9TdHJpbmciLCJub3RlQXJyIiwiZm9yRWFjaCIsIm5vdGUiLCJ4IiwicGxheWVyIiwieSIsImhpdCIsInNjb3JlVXBkYXRlIiwic291bmQiLCJwbGF5IiwiaGl0Tm90ZSIsImJhc3NOb3RlQXJyIiwiZWlnaHROb3RlQXJyIiwidXBkYXRlIiwibGVmdCIsImFjdGl2ZSIsIm1vdmVMZWZ0IiwicmlnaHQiLCJtb3ZlUmlnaHQiLCJub3RlRHJvcCIsImZpbGwiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiZHJhd05vdGUiLCJsZW5ndGgiLCJnYW1lRW5kTWVzc2FnZSIsImdhbWVFbmQiLCJiYWNrZ3JvdW5kVHJhY2siLCJkcmF3UmVjdGFuZ2xlIiwiY29sb3IiLCJxdWVyeVNlbGVjdG9yIiwiZW5naW5lIiwiYnVmZmVyIiwiY2FudmFzIiwid2luZG93IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keSIsIm9ua2V5dXAiLCJyZXN0YXJ0R2FtZSIsInJlbW92ZSIsImNvbnRhaW5zIiwicGF1c2VkIiwicGF1c2UiLCJmaWxsTm90ZUFyciIsImZpbGxCYXNzQXJyIiwiZmlsbEVpZ2h0QXJyIiwic2V0SW50ZXJ2YWwiLCJmaWxsTmFydXRvTm90ZSIsImxvb3AiLCJ2b2x1bWUiLCJzdGFydCIsIkJ1dHRvbklucHV0IiwidXAiLCJrZXlfY29kZSIsImRvd24iLCJnZXRJbnB1dCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwiaGVpZ2h0X3dpZHRoX3JhdGlvIiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwidGltZV9zdGVwIiwiYWNjdW11bGF0ZWRfdGltZSIsImFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0IiwidW5kZWZpbmVkIiwidGltZSIsInVwZGF0ZWQiLCJydW4iLCJ0aW1lX3N0YW1wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGFuZGxlUnVuIiwicGVyZm9ybWFuY2UiLCJub3ciLCJzdG9wIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmcmljdGlvbiIsImdyYXZpdHkiLCJQbGF5ZXIiLCJBdWRpbyIsIm1lbG9keUFyciIsImJhc3NBcnIiLCJlaWdodEFyciIsInhQb3NBcnIiLCJ4QmFzc1Bvc0FyciIsInhFaWdodFBvc0FyciIsIm5hcnV0b01lbG9keUFyciIsIm5hcnV0b0Jhc3NBcnIiLCJuYXJ1dG9FaWdodEFyciIsIm5hcnV0b1hQb3NBcnIiLCJuYXJ1dG94QmFzc1Bvc0FyciIsIm5hcnV0b3hFaWdodFBvc0FyciIsImNvdW50IiwicHVzaCIsIk5vdGUiLCJtZXNzYWdlIiwiY29sbGlkZU9iamVjdCIsIm9iamVjdCIsInZlbG9jaXR5X3giLCJ2ZWxvY2l0eV95IiwicmFuZG9tIiwiYXVkaW9GaWxlIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBaUNBbEksSUFBSSxDQUFDOEgsSUFBTCxHQUFZLFVBQVNuRyxDQUFULEVBQVlFLENBQVosRUFBZXdHLFNBQWYsRUFBeUI7QUFDakMsT0FBS2pGLEtBQUwsR0FBYSxNQUFNcUMsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQzJDLE1BQUwsS0FBZ0IsUUFBM0IsRUFBcUM3RyxRQUFyQyxDQUE4QyxFQUE5QyxDQUFuQjs7QUFFQSxNQUFHLEtBQUs2QixLQUFMLENBQVdMLE1BQVgsSUFBcUIsQ0FBeEIsRUFBMEI7QUFDdEIsU0FBS0ssS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV2tGLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsSUFBeUIsR0FBekIsR0FBK0IsS0FBS2xGLEtBQUwsQ0FBV2tGLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBNUM7QUFDSDs7QUFFRCxPQUFLdEgsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtVLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUtFLENBQUwsR0FBU0EsQ0FBVDtBQUVBLE9BQUtzRyxVQUFMLEdBQWtCLENBQWxCO0FBRUEsT0FBS3JHLEdBQUwsR0FBVyxLQUFYO0FBQ0EsT0FBS0UsS0FBTCxHQUFhLElBQUkrRSxLQUFKLENBQVVzQixTQUFWLENBQWI7QUFDSCxDQWhCRDs7QUFrQkFySSxJQUFJLENBQUM4SCxJQUFMLENBQVU5QyxTQUFWLEdBQXNCO0FBQ2xCQyxhQUFXLEVBQUdqRixJQUFJLENBQUM4SCxJQUREO0FBRWxCekYsUUFBTSxFQUFFLGtCQUFVO0FBQ2QsU0FBS1IsQ0FBTCxJQUFVLEtBQUtzRyxVQUFmO0FBQ0g7QUFKaUIsQ0FBdEI7QUFTQWpELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5GLElBQWpCLEM7Ozs7Ozs7Ozs7O0FDeFpBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIGJvcmRlclNpemU6IDIsXG4gICAgZm9udFNpemU6IDksXG4gICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgIHRpY2tDb2xvcjogJyNkZGQnLFxuICAgIGdyYWRpZW50OiBbJ3JlZCAxJScsICcjZmYwIDE2JScsICdsaW1lIDQ1JScsICcjMDgwIDEwMCUnXSxcbiAgICBkYlJhbmdlOiA0OCxcbiAgICBkYlRpY2tTaXplOiA2LFxuICAgIG1hc2tUcmFuc2l0aW9uOiAnaGVpZ2h0IDAuMXMnXG4gIH07XG4gIHZhciB0aWNrV2lkdGg7XG4gIHZhciBlbGVtZW50V2lkdGg7XG4gIHZhciBlbGVtZW50SGVpZ2h0O1xuICB2YXIgbWV0ZXJIZWlnaHQ7XG4gIHZhciBtZXRlcldpZHRoO1xuICB2YXIgbWV0ZXJUb3A7XG4gIHZhciB2ZXJ0aWNhbCA9IHRydWU7XG4gIHZhciBjaGFubmVsQ291bnQgPSAxO1xuICB2YXIgY2hhbm5lbE1hc2tzID0gW107XG4gIHZhciBjaGFubmVsUGVha3MgPSBbXTtcbiAgdmFyIGNoYW5uZWxQZWFrTGFiZWxzID0gW107XG5cbiAgdmFyIGdldEJhc2VMb2cgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiBNYXRoLmxvZyh5KSAvIE1hdGgubG9nKHgpO1xuICB9O1xuXG4gIHZhciBkYkZyb21GbG9hdCA9IGZ1bmN0aW9uIChmbG9hdFZhbCkge1xuICAgIHJldHVybiBnZXRCYXNlTG9nKDEwLCBmbG9hdFZhbCkgKiAyMDtcbiAgfTtcblxuICB2YXIgc2V0T3B0aW9ucyA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICAgIGZvciAodmFyIGsgaW4gdXNlck9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnNba10gPSB1c2VyT3B0aW9uc1trXTtcbiAgICB9XG5cbiAgICB0aWNrV2lkdGggPSBvcHRpb25zLmZvbnRTaXplICogMi4wO1xuICAgIG1ldGVyVG9wID0gb3B0aW9ucy5mb250U2l6ZSAqIDEuNSArIG9wdGlvbnMuYm9yZGVyU2l6ZTtcbiAgfTtcblxuICB2YXIgY3JlYXRlTWV0ZXJOb2RlID0gZnVuY3Rpb24gKHNvdXJjZU5vZGUsIGF1ZGlvQ3R4KSB7XG4gICAgdmFyIGMgPSBzb3VyY2VOb2RlLmNoYW5uZWxDb3VudDtcbiAgICB2YXIgbWV0ZXJOb2RlID0gYXVkaW9DdHguY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIGMsIGMpO1xuICAgIHNvdXJjZU5vZGUuY29ubmVjdChtZXRlck5vZGUpO1xuICAgIG1ldGVyTm9kZS5jb25uZWN0KGF1ZGlvQ3R4LmRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gbWV0ZXJOb2RlO1xuICB9O1xuXG4gIHZhciBjcmVhdGVDb250YWluZXJEaXYgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgdmFyIG1ldGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLndpZHRoID0gZWxlbWVudFdpZHRoICsgJ3B4JztcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gZWxlbWVudEhlaWdodCArICdweCc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChtZXRlckVsZW1lbnQpO1xuICAgIHJldHVybiBtZXRlckVsZW1lbnQ7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1ldGVyID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQsIG1ldGVyTm9kZSwgb3B0aW9uc092ZXJyaWRlcykge1xuICAgIHNldE9wdGlvbnMob3B0aW9uc092ZXJyaWRlcyk7XG4gICAgZWxlbWVudFdpZHRoID0gZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBlbGVtZW50SGVpZ2h0ID0gZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgdmFyIG1ldGVyRWxlbWVudCA9IGNyZWF0ZUNvbnRhaW5lckRpdihkb21FbGVtZW50KTtcblxuICAgIGlmIChlbGVtZW50V2lkdGggPiBlbGVtZW50SGVpZ2h0KSB7XG4gICAgICB2ZXJ0aWNhbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG1ldGVySGVpZ2h0ID0gZWxlbWVudEhlaWdodCAtIG1ldGVyVG9wIC0gb3B0aW9ucy5ib3JkZXJTaXplO1xuICAgIG1ldGVyV2lkdGggPSBlbGVtZW50V2lkdGggLSB0aWNrV2lkdGggLSBvcHRpb25zLmJvcmRlclNpemU7XG4gICAgY3JlYXRlVGlja3MobWV0ZXJFbGVtZW50KTtcbiAgICBjcmVhdGVSYWluYm93KG1ldGVyRWxlbWVudCwgbWV0ZXJXaWR0aCwgbWV0ZXJIZWlnaHQsIG1ldGVyVG9wLCB0aWNrV2lkdGgpO1xuICAgIGNoYW5uZWxDb3VudCA9IG1ldGVyTm9kZS5jaGFubmVsQ291bnQ7XG4gICAgdmFyIGNoYW5uZWxXaWR0aCA9IG1ldGVyV2lkdGggLyBjaGFubmVsQ291bnQ7XG4gICAgdmFyIGNoYW5uZWxMZWZ0ID0gdGlja1dpZHRoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgY3JlYXRlQ2hhbm5lbE1hc2sobWV0ZXJFbGVtZW50LCBvcHRpb25zLmJvcmRlclNpemUsIG1ldGVyVG9wLCBjaGFubmVsTGVmdCwgZmFsc2UpO1xuICAgICAgY2hhbm5lbE1hc2tzW2ldID0gY3JlYXRlQ2hhbm5lbE1hc2sobWV0ZXJFbGVtZW50LCBjaGFubmVsV2lkdGgsIG1ldGVyVG9wLCBjaGFubmVsTGVmdCwgb3B0aW9ucy5tYXNrVHJhbnNpdGlvbik7XG4gICAgICBjaGFubmVsUGVha3NbaV0gPSAwLjA7XG4gICAgICBjaGFubmVsUGVha0xhYmVsc1tpXSA9IGNyZWF0ZVBlYWtMYWJlbChtZXRlckVsZW1lbnQsIGNoYW5uZWxXaWR0aCwgY2hhbm5lbExlZnQpO1xuICAgICAgY2hhbm5lbExlZnQgKz0gY2hhbm5lbFdpZHRoO1xuICAgIH1cblxuICAgIG1ldGVyTm9kZS5vbmF1ZGlvcHJvY2VzcyA9IHVwZGF0ZU1ldGVyO1xuICAgIG1ldGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgICAgY2hhbm5lbFBlYWtzW2ldID0gMC4wO1xuICAgICAgICBjaGFubmVsUGVha0xhYmVsc1tpXS50ZXh0Q29udGVudCA9ICct4oieJztcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVRpY2tzID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgIHZhciBudW1UaWNrcyA9IE1hdGguZmxvb3Iob3B0aW9ucy5kYlJhbmdlIC8gb3B0aW9ucy5kYlRpY2tTaXplKTtcbiAgICB2YXIgZGJUaWNrTGFiZWwgPSAwO1xuICAgIHZhciBkYlRpY2tUb3AgPSBvcHRpb25zLmZvbnRTaXplICsgb3B0aW9ucy5ib3JkZXJTaXplO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1UaWNrczsgaSsrKSB7XG4gICAgICB2YXIgZGJUaWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZGJUaWNrKTtcbiAgICAgIGRiVGljay5zdHlsZS53aWR0aCA9IHRpY2tXaWR0aCArICdweCc7XG4gICAgICBkYlRpY2suc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgIGRiVGljay5zdHlsZS5jb2xvciA9IG9wdGlvbnMudGlja0NvbG9yO1xuICAgICAgZGJUaWNrLnN0eWxlLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZSArICdweCc7XG4gICAgICBkYlRpY2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZGJUaWNrLnN0eWxlLnRvcCA9IGRiVGlja1RvcCArICdweCc7XG4gICAgICBkYlRpY2sudGV4dENvbnRlbnQgPSBkYlRpY2tMYWJlbCArICcnO1xuICAgICAgZGJUaWNrTGFiZWwgLT0gb3B0aW9ucy5kYlRpY2tTaXplO1xuICAgICAgZGJUaWNrVG9wICs9IG1ldGVySGVpZ2h0IC8gbnVtVGlja3M7XG4gICAgfVxuICB9O1xuXG4gIHZhciBjcmVhdGVSYWluYm93ID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIGhlaWdodCwgdG9wLCBsZWZ0KSB7XG4gICAgdmFyIHJhaW5ib3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocmFpbmJvdyk7XG4gICAgcmFpbmJvdy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICByYWluYm93LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgcmFpbmJvdy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgcmFpbmJvdy5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgIHJhaW5ib3cuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIHZhciBncmFkaWVudFN0eWxlID0gJ2xpbmVhci1ncmFkaWVudCgnICsgb3B0aW9ucy5ncmFkaWVudC5qb2luKCcsICcpICsgJyknO1xuICAgIHJhaW5ib3cuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRTdHlsZTtcbiAgICByZXR1cm4gcmFpbmJvdztcbiAgfTtcblxuICB2YXIgY3JlYXRlUGVha0xhYmVsID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIGxlZnQpIHtcbiAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGxhYmVsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gb3B0aW9ucy50aWNrQ29sb3I7XG4gICAgbGFiZWwuc3R5bGUuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgbGFiZWwuc3R5bGUudG9wID0gb3B0aW9ucy5ib3JkZXJTaXplICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSAnLeKInic7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9O1xuXG4gIHZhciBjcmVhdGVDaGFubmVsTWFzayA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCB0b3AsIGxlZnQsIHRyYW5zaXRpb24pIHtcbiAgICB2YXIgY2hhbm5lbE1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hhbm5lbE1hc2spO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLmhlaWdodCA9IG1ldGVySGVpZ2h0ICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgY2hhbm5lbE1hc2suc3R5bGUudHJhbnNpdGlvbiA9IG9wdGlvbnMubWFza1RyYW5zaXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoYW5uZWxNYXNrO1xuICB9O1xuXG4gIHZhciBtYXNrU2l6ZSA9IGZ1bmN0aW9uIChmbG9hdFZhbCkge1xuICAgIGlmIChmbG9hdFZhbCA9PT0gMC4wKSB7XG4gICAgICByZXR1cm4gbWV0ZXJIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkID0gb3B0aW9ucy5kYlJhbmdlICogLTE7XG4gICAgICB2YXIgcmV0dXJuVmFsID0gTWF0aC5mbG9vcihkYkZyb21GbG9hdChmbG9hdFZhbCkgKiBtZXRlckhlaWdodCAvIGQpO1xuXG4gICAgICBpZiAocmV0dXJuVmFsID4gbWV0ZXJIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIG1ldGVySGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHVwZGF0ZU1ldGVyID0gZnVuY3Rpb24gKGF1ZGlvUHJvY2Vzc2luZ0V2ZW50KSB7XG4gICAgdmFyIGlucHV0QnVmZmVyID0gYXVkaW9Qcm9jZXNzaW5nRXZlbnQuaW5wdXRCdWZmZXI7XG4gICAgdmFyIGk7XG4gICAgdmFyIGNoYW5uZWxEYXRhID0gW107XG4gICAgdmFyIGNoYW5uZWxNYXhlcyA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICBjaGFubmVsRGF0YVtpXSA9IGlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKGkpO1xuICAgICAgY2hhbm5lbE1heGVzW2ldID0gMC4wO1xuICAgIH1cblxuICAgIGZvciAodmFyIHNhbXBsZSA9IDA7IHNhbXBsZSA8IGlucHV0QnVmZmVyLmxlbmd0aDsgc2FtcGxlKyspIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoY2hhbm5lbERhdGFbaV1bc2FtcGxlXSkgPiBjaGFubmVsTWF4ZXNbaV0pIHtcbiAgICAgICAgICBjaGFubmVsTWF4ZXNbaV0gPSBNYXRoLmFicyhjaGFubmVsRGF0YVtpXVtzYW1wbGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgdmFyIHRoaXNNYXNrU2l6ZSA9IG1hc2tTaXplKGNoYW5uZWxNYXhlc1tpXSwgbWV0ZXJIZWlnaHQpO1xuICAgICAgY2hhbm5lbE1hc2tzW2ldLnN0eWxlLmhlaWdodCA9IHRoaXNNYXNrU2l6ZSArICdweCc7XG5cbiAgICAgIGlmIChjaGFubmVsTWF4ZXNbaV0gPiBjaGFubmVsUGVha3NbaV0pIHtcbiAgICAgICAgY2hhbm5lbFBlYWtzW2ldID0gY2hhbm5lbE1heGVzW2ldO1xuICAgICAgICB2YXIgbGFiZWxUZXh0ID0gZGJGcm9tRmxvYXQoY2hhbm5lbFBlYWtzW2ldKS50b0ZpeGVkKDEpO1xuICAgICAgICBjaGFubmVsUGVha0xhYmVsc1tpXS50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVNZXRlck5vZGU6IGNyZWF0ZU1ldGVyTm9kZSxcbiAgICBjcmVhdGVNZXRlcjogY3JlYXRlTWV0ZXJcbiAgfTtcbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSB3ZWJBdWRpb1BlYWtNZXRlcjsiLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5jb25zdCBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zY3JpcHRzL2NvbnRyb2xsZXInKTtcclxuY29uc3QgRGlzcGxheSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9kaXNwbGF5Jyk7XHJcbmNvbnN0IEVuZ2luZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9lbmdpbmUnKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9nYW1lJyk7XHJcbnZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IHJlcXVpcmUoJ3dlYi1hdWRpby1wZWFrLW1ldGVyJyk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IChnYW1lLndvcmxkLnNjb3JlID09PSAwKSA/IChcclxuICAgICAgICAgICAgJzAlJ1xyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIChnYW1lLndvcmxkLnNjb3JlLnRvRml4ZWQoMikpLnRvU3RyaW5nKCkgKyAnJSdcclxuICAgICAgICApIFxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihjb250cm9sbGVyLmxlZnQuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIucmlnaHQuYWN0aXZlKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmKGNvbnRyb2xsZXIudXAuYWN0aXZlKXtcclxuICAgICAgICAvLyAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIC8vICAgICBjb250cm9sbGVyLnVwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG5vdGVEcm9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihnYW1lLndvcmxkLm5vdGVBcnJbZ2FtZS53b3JsZC5ub3RlQXJyLmxlbmd0aCAtIDFdLnkgPiAxMTgpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuXHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgZGlzcGxheSA9IG5ldyBEaXNwbGF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKTtcclxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGxldCBlbmdpbmUgPSBuZXcgRW5naW5lKDEwMDAvMzAsIHJlbmRlciwgdXBkYXRlKTtcclxuXHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMuaGVpZ2h0ID0gZ2FtZS53b3JsZC5oZWlnaHQ7XHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMud2lkdGggPSBnYW1lLndvcmxkLndpZHRoO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcclxuXHJcbiAgICByZXNpemUoKTtcclxuICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgXHJcbiAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5vbmtleXVwID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzMil7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZihnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSA4MCkge1xyXG4gICAgICAgICAgICBpZighZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2VkKXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTm90ZUFycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxCYXNzQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEVpZ2h0QXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbE5hcnV0b05vdGUoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBub3RlRHJvcCgpLCAxKTtcclxuICAgIH0pXHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5sb29wID0gdHJ1ZTtcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnZvbHVtZSA9IDAuMztcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgIFxyXG4gICAgLy8gdmFyIG15TWV0ZXJFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LXBlYWstbWV0ZXInKTtcclxuICAgIC8vIHZhciBhdWRpb0N0eCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpO1xyXG4gICAgLy8gdmFyIHNvdXJjZU5vZGUgPSBhdWRpb0N0eC5jcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2spO1xyXG4gICAgLy8gc291cmNlTm9kZS5jb25uZWN0KGF1ZGlvQ3R4LmRlc3RpYXRpb24pO1xyXG4gICAgLy8gdmFyIG1ldGVyTm9kZSA9IHdlYkF1ZGlvUGVha01ldGVyLmNyZWF0ZU1ldGVyTm9kZShzb3VyY2VOb2RlLCBhdWRpb0N0eCk7XHJcbiAgICAvLyB3ZWJBdWRpb1BlYWtNZXRlci5jcmVhdGVNZXRlcihteU1ldGVyRWxlbWVudCwgbWV0ZXJOb2RlLCB7fSk7XHJcblxyXG4gICAgZW5naW5lLnN0YXJ0KCk7XHJcblxyXG59KTsiLCJcclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sZWZ0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMucmlnaHQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy51cCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcblxyXG4gICAgdGhpcy5rZXlEb3duVXAgPSBmdW5jdGlvbih0eXBlLCBrZXlfY29kZSkge1xyXG4gICAgICAgIGxldCBkb3duID0gKHR5cGUgPT09ICdrZXlkb3duJykgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXlfY29kZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdC5nZXRJbnB1dChkb3duKTsgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzg6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cC5nZXRJbnB1dChkb3duKTsgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOTogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0LmdldElucHV0KGRvd24pO1xyXG4gICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXJcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5kb3duID0gZmFsc2U7XHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlci5CdXR0b25JbnB1dCxcclxuXHJcbiAgICBnZXRJbnB1dCA6IGZ1bmN0aW9uKGRvd24pIHtcclxuICAgICAgICBpZih0aGlzLmRvd24gIT0gZG93bikgdGhpcy5hY3RpdmUgPSBkb3duO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGRvd247XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xsZXI7IiwiY29uc3QgRGlzcGxheSA9IGZ1bmN0aW9uKGNhbnZhcyl7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyksXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB0aGlzLmRyYXdSZWN0YW5nbGUgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIGRyYXcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kcmF3Tm90ZSA9IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yIH0gPSBub3RlO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsbCA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLmNhbnZhcywgMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0LCAwLCAwLCB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICBpZihoZWlnaHQgLyB3aWR0aCA+IGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gd2lkdGggKiBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IGhlaWdodCAvIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICBcclxufTtcclxuXHJcbkRpc3BsYXkucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBEaXNwbGF5XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BsYXk7IiwiXHJcbmNvbnN0IEVuZ2luZSA9IGZ1bmN0aW9uKHRpbWVfc3RlcCwgdXBkYXRlLCByZW5kZXIpIHtcclxuICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IDA7XHJcbiAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gdW5kZWZpbmVkLFxyXG4gICAgdGhpcy50aW1lID0gdW5kZWZpbmVkLFxyXG4gICAgdGhpcy50aW1lX3N0ZXAgPSB0aW1lX3N0ZXAsXHJcblxyXG4gICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XHJcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuXHJcbiAgICB0aGlzLnJ1biA9IGZ1bmN0aW9uKHRpbWVfc3RhbXApIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgKz0gdGltZV9zdGFtcCAtIHRoaXMudGltZTtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lX3N0YW1wO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwICogMykge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgLT0gdGhpcy50aW1lX3N0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lX3N0YW1wKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnVwZGF0ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGltZV9zdGFtcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlUnVuID0gKHRpbWVfc3RlcCkgPT4ge1xyXG4gICAgICAgIHRoaXMucnVuKHRpbWVfc3RlcCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW5naW5lLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRW5naW5lLFxyXG5cclxuICAgIHN0YXJ0OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmU7IiwiY29uc3QgR2FtZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMud29ybGQgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGZyaWN0aW9uOiAwLjksXHJcbiAgICAgICAgZ3Jhdml0eTogMyxcclxuICAgICAgICBwbGF5ZXI6IG5ldyBHYW1lLlBsYXllcigpLFxyXG4gICAgICAgIG5vdGVBcnI6IFtdLFxyXG4gICAgICAgIGJhc3NOb3RlQXJyOiBbXSxcclxuICAgICAgICBlaWdodE5vdGVBcnI6IFtdLFxyXG4gICAgICAgIGhlaWdodDogMTI4LFxyXG4gICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgYmFja2dyb3VuZFRyYWNrOiBuZXcgQXVkaW8oJ0VyaWMgU2tpZmYgLSBBIE5pZ2h0IE9mIERpenp5IFNwZWxscy5tcDMnKSxcclxuXHJcbiAgICAgICAgbWVsb2R5QXJyOiBbXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLCBcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdkNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG5cclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsIFxyXG5cclxuICAgICAgICAgICAgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgXHJcblxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJywgXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnZDUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGJhc3NBcnI6IFtcclxuICAgICAgICAgICAgJ2ZzMy5tcDMnLCAnZTMubXAzJywgJ2RzMy5tcDMnLCAnZDMubXAzJywgJ2UzLm1wMycsIFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLFxyXG4gICAgICAgICAgICAnZnMzLm1wMycsICdlMy5tcDMnLCAnZHMzLm1wMycsICdkMy5tcDMnLCAnZTMubXAzJywgXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlaWdodEFycjogW1xyXG4gICAgICAgICAgICAnYTUubXAzJywgJ2dzNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZnM1Lm1wMycsICdnczUubXAzJywnYTUubXAzJywgJ2ZzNS5tcDMnLCAnZnM2Lm1wMycsXHJcbiAgICAgICAgICAgICdmczUubXAzJywgJ2U1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2IubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuICAgICAgICAgICAgJ2E1Lm1wMycsICdnczUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2ZzNS5tcDMnLCAnZ3M1Lm1wMycsJ2E1Lm1wMycsICdmczUubXAzJywgJ2ZzNi5tcDMnLFxyXG4gICAgICAgICAgICAnZnM1Lm1wMycsICdlNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdkNi5tcDMnLCAnY3M2Lm1wMycsICdiNS5tcDMnLCAnYTUubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeFBvc0FycjogW1xyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDM1LCA0NSwgMzUsIDI1LCAxNSwgXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCA4MCwgNzUsIDczLCA3MCwgNTUsXHJcblxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCAyNSwgMzUsIDQ1LCAzNSwgMjUsIFxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCAyNSwgMzUsIDQ1LCAzNSwgMjUsIFxyXG5cclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgNDUsIDM1LCA0NSwgMzUsIDQ1LCBcclxuXHJcbiAgICAgICAgICAgIDQ1LCA0NSwgNDUsIDQ1LCA0NSwgNDUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDM1LCA0NSwgMzUsIDI1LCAxNSxcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCA4MCwgNzUsIDczLCA3MCwgNTUsXHJcbiAgICAgICAgICAgIDE1MCxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhCYXNzUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDY1LCA1MCwgNjUsIDQ1LCAyNSxcclxuICAgICAgICAgICAgMzUsIDM1LCAzNSwgMzUsIDM1LCAzNSxcclxuICAgICAgICAgICAgNjUsIDUwLCA2NSwgNDUsIDI1LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeEVpZ2h0UG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDc1LCA3MCwgNjUsIDYwLCA2MCwgNzAsIDc1LCA2MCwgOTUsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNTAsIDQwLCA0MCwgNTAsIDQwLCAzMCwgMjAsXHJcbiAgICAgICAgICAgIDc1LCA3MCwgNjUsIDYwLCA2MCwgNzAsIDc1LCA2MCwgOTUsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNTAsIDQwLCA4NSwgODAsIDc4LCA3NSwgNjAsXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgbmFydXRvTWVsb2R5QXJyOiBbXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsXHJcbiAgICAgICAgICAgICdkLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnYTMubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLFxyXG4gICAgICAgICAgICAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZDUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2Q1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdkNS5tcDMnLCAnZTUubXAzJywgJ2ZzNS5tcDMnLCAvLzMzXHJcblxyXG4gICAgICAgICAgICAnY3M1Lm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnYS5tcDMnLCAvLzQ2XHJcbiAgICAgICAgICAgICdlLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzU2XHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy82MVxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnYS5tcDMnLCAvLzc0XHJcbiAgICAgICAgICAgICdlLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzg0XHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzg5XHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG9CYXNzQXJyOiBbXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRvRWlnaHRBcnI6IFtcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG9YUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDUwLCA0NSwgNTAsIDYwLCA0NSwgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCxcclxuICAgICAgICAgICAgNjAsIDQ1LCA2MCwgNjUsIDQ1LCA2NSwgNzUsIDgwLCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICAxMTUsIDExMCwgMTAwLCAxMTUsIDExMCwgMTAwLCAxMTUsIDExMCwgMTAwLCAxMDUsIDExMCxcclxuXHJcbiAgICAgICAgICAgIDk1LCA3NSwgNjAsIDY1LCA3NSwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSwgODUsIDg1LFxyXG4gICAgICAgICAgICA2NSwgNTUsIDY1LCA2MCwgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA2MCxcclxuICAgICAgICAgICAgNzUsIDYwLCA2NSwgNjUsIDc1LCA2MCwgNjAsIDc1LCA2NSwgNjAsIDY1LCA4NSwgODUsXHJcbiAgICAgICAgICAgIDY1LCA1NSwgNjUsIDYwLCA5MCwgODUsIDYwLCA5MCwgODUsIDYwLCBcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRveEJhc3NQb3NBcnI6W1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b3hFaWdodFBvc0FycjpbXHJcblxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIGZpbGxOYXJ1dG9Ob3RlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubmFydXRvTWVsb2R5QXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMubmFydXRvWFBvc0Fycltjb3VudF0sIHksIHRoaXMubmFydXRvTWVsb2R5QXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8IDQgfHwgY291bnQgPT09IDczKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDQgfHwgY291bnQgPT09IDI1IHx8IGNvdW50ID09PSAyNiB8fCBjb3VudCA9PT0gMjkgfHwgY291bnQgPT09IDMwIHx8IGNvdW50ID09PSAzMiB8fCBjb3VudCA9PT0gMzMgfHwgY291bnQgPT09IDQ2IHx8IGNvdW50ID09PSA3NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB8fCBjb3VudCA9PT0gMTAgfHwgY291bnQgPT09IDIwIHx8IGNvdW50ID09PSAyMSB8fCAoY291bnQgPj0gNDAgJiYgY291bnQgPD0gNDMpIHx8IGNvdW50ID09PSA0NSB8fCAoY291bnQgPj0gNjQgJiYgY291bnQgPD0gNjUpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA2OCkgfHwgKGNvdW50ID49IDcwICYmIGNvdW50IDw9IDcxKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5IHx8IChjb3VudCA+PSAxMSAmJiBjb3VudCA8PSAxMikgfHwgKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE1KSB8fCBjb3VudCA9PT0gMTcgfHwgY291bnQgPT09IDE4IHx8IGNvdW50ID09PSAxOSB8fCBjb3VudCA9PT0gMjIgfHwgY291bnQgPT09IDIzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMTMgfHwgY291bnQgPT09IDE2IHx8IGNvdW50ID09PSAyNCB8fCBjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDMxIHx8IChjb3VudCA+PSAzNCAmJiBjb3VudCA8PSAzNykgfHwgY291bnQgPT09IDM5IHx8IGNvdW50ID09PSA0NCB8fCAoY291bnQgPj0gNDcgJiYgY291bnQgPD0gNDkpIHx8IChjb3VudCA+PSA1MSAmJiBjb3VudCA8PSA1MikgfHwgKGNvdW50ID49IDU0ICYmIGNvdW50IDw9IDU1KSB8fCAoY291bnQgPj0gNTggJiYgY291bnQgPD0gNjMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDI4IHx8IGNvdW50ID09PSAzOCB8fCBjb3VudCA9PSA2Nikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDUwIHx8IGNvdW50ID09PSA1MyB8fCAoY291bnQgPj0gNTYgJiYgY291bnQgPD0gNTcpIHx8IGNvdW50ID09PSA3OCB8fCBjb3VudCA9PT0gODEgfHwgKGNvdW50ID49IDg0ICYmIGNvdW50IDw9IDg1KSB8fCBjb3VudCA9PT0gODkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY5IHx8IGNvdW50ID09PSA3MiB8fCAoY291bnQgPj0gNzUgJiYgY291bnQgPD0gNzcpIHx8IChjb3VudCA+PSA3OSAmJiBjb3VudCA8PSA4MCkgfHwgKGNvdW50ID49IDgyICYmIGNvdW50IDw9IDgzKSB8fCAoY291bnQgPj0gODYgJiYgY291bnQgPD0gODgpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdGFydEdhbWU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2FtZUVuZE1lc3NhZ2U6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NvcmUgPiA5OSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dPVyEgUEVSRkVDVCBTQ09SRSEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA5MCAmJiB0aGlzLnNjb3JlIDw9IDk5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU08gQ0xPU0UgVE8gUEVSRkVDVElPTiEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA4MCAmJiB0aGlzLnNjb3JlIDw9IDg5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BSRVRUWSBHT09ELCBCVVQgSSBCRVQgWU9VIENBTiBETyBCRVRURVIuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gNzAgJiYgdGhpcy5zY29yZSA8PTc5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ09IIE1BTiwgTUFZQkUgWU9VIFNIT1VMRCBQUkFDVElDRSBBIExJVFRMRSBNT1JFLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlIDw9IDY5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSVMgWU9VUiBNT05JVE9SIE9OPyBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbE5vdGVBcnI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubWVsb2R5QXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhQb3NBcnJbY291bnRdLCB5LCB0aGlzLm1lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKGNvdW50IDw9IDQpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA3MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkgfHwgKGNvdW50ID49IDcxICYmIGNvdW50IDw9IDc0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKSB8fCAoY291bnQgPj0gNzYgJiYgY291bnQgPD0gNzkpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE3KSB8fCAoY291bnQgPj0gODAgJiYgY291bnQgPD0gODMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDg0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikgfHwgKGNvdW50ID49IDg1ICYmIGNvdW50IDw9IDg4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB8fCAoY291bnQgPj0gODkgJiYgY291bnQgPD0gOTIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDkzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHx8IChjb3VudCA+PSA5NCAmJiBjb3VudCA8PSA5NykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMzIgJiYgY291bnQgPD0gMzYpIHx8IChjb3VudCA+PSA5OCAmJiBjb3VudCA8PSAxMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPj0gMzcgJiYgY291bnQgPD0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDYzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2Nil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlsbEJhc3NBcnI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5iYXNzTm90ZUFyci5sZW5ndGggPCB0aGlzLmJhc3NBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhCYXNzUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5iYXNzQXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnJbY291bnQgLSAxXS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSAzIHx8IChjb3VudCA+PSAxMiAmJiBjb3VudCA8PSAxNCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDYwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEVpZ2h0QXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gLTg4NTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5laWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5laWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjb3JlVXBkYXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5tZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5iYXNzQXJyLmxlbmd0aCArIHRoaXMuZWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NvcmUgKz0gMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsaWRlT2JqZWN0OmZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICAgICAgICAgIGlmKG9iamVjdC54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqZWN0LnggKyBvYmplY3Qud2lkdGggPiB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IHRoaXMud2lkdGggLSBvYmplY3Qud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvLyBpZihvYmplY3QueSA8IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gMDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmKG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSB0aGlzLmhlaWdodCAtIG9iamVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeCAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZU9iamVjdCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud29ybGQudXBkYXRlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuR2FtZS5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yIDogR2FtZSB9O1xyXG5cclxuR2FtZS5QbGF5ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmNvbG9yID0gJyNmZjAwMDAnO1xyXG4gICAgdGhpcy5oZWlnaHQgPSA0O1xyXG4gICAgLy8gdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAvLyB0aGlzLnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IDI0O1xyXG4gICAgdGhpcy54ID0gNjA7XHJcbiAgICB0aGlzLnkgPSAxMTA7XHJcbn07XHJcblxyXG5HYW1lLlBsYXllci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuUGxheWVyLFxyXG5cclxuICAgIC8vIGp1bXA6ZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYoIXRoaXMuanVtcGluZyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmVsb2NpdHlfeSAtPSAxNTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIGhpdE5vdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVMZWZ0OmZ1bmN0aW9uKCkgeyBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggLT0gMC43NTtcclxuICAgIH0sXHJcbiAgICBtb3ZlUmlnaHQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94ICs9IDAuNzU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5X3g7XHJcbiAgICAgICAgLy8gdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuR2FtZS5Ob3RlID0gZnVuY3Rpb24oeCwgeSwgYXVkaW9GaWxlKXtcclxuICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDI7XHJcbiAgICB0aGlzLndpZHRoID0gMjtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlfeSA9IDE7XHJcblxyXG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oYXVkaW9GaWxlKTtcclxufVxyXG5cclxuR2FtZS5Ob3RlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5Ob3RlLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=