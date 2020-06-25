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
  document.getElementById('end-menu').classList.add('playing');
  document.getElementById('tremor').classList.add('playing');
  document.getElementById('naruto').classList.add('playing');

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      game.world.restartGame();
      document.getElementById('start-menu').classList.add('playing');
      document.getElementById('tremor').classList.remove('playing');
      document.getElementById('naruto').classList.remove('playing');

      if (!document.getElementById('end-menu').classList.contains('playing')) {
        document.getElementById('end-menu').classList.add('playing');
      }

      if (game.world.backgroundTrack.paused) {
        game.world.backgroundTrack.play();
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
    document.getElementById('tremor').classList.add('playing');
    document.getElementById('naruto').classList.add('playing');
    setInterval(function () {
      return noteDrop();
    }, 1);
  });
  document.getElementById('naruto').addEventListener('click', function () {
    game.world.restartGame();
    game.world.fillNarutoNote();
    game.world.backgroundTrack.pause();
    document.getElementById('start-menu').classList.add('playing');
    document.getElementById('tremor').classList.add('playing');
    document.getElementById('naruto').classList.add('playing');
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
    narutoMelodyArr: ['b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3'],
    narutoBassArr: [],
    narutoEightArr: [],
    narutoXPosArr: [70, 65, 70, 80],
    narutoxBassPosArr: [],
    narutoxEightPosArr: [],
    fillNarutoNote: function fillNarutoNote() {
      var y = 0;
      var count = 0;

      while (this.noteArr.length < this.narutoMelodyArr.length) {
        this.noteArr.push(new Game.Note(this.narutoXPosArr[count], y, this.narutoMelodyArr[count]));
        count += 1;

        if (count < 4) {
          y -= 5;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby1wZWFrLW1ldGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJyZXF1aXJlIiwiRGlzcGxheSIsIkVuZ2luZSIsIkdhbWUiLCJ3ZWJBdWRpb1BlYWtNZXRlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duVXAiLCJjb250cm9sbGVyIiwidHlwZSIsImtleUNvZGUiLCJyZXNpemUiLCJkaXNwbGF5IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJ0b0ZpeGVkIiwidG9TdHJpbmciLCJub3RlQXJyIiwiZm9yRWFjaCIsIm5vdGUiLCJ4IiwicGxheWVyIiwieSIsImhpdCIsInNjb3JlVXBkYXRlIiwic291bmQiLCJwbGF5IiwiaGl0Tm90ZSIsImJhc3NOb3RlQXJyIiwiZWlnaHROb3RlQXJyIiwidXBkYXRlIiwibGVmdCIsImFjdGl2ZSIsIm1vdmVMZWZ0IiwicmlnaHQiLCJtb3ZlUmlnaHQiLCJub3RlRHJvcCIsImZpbGwiLCJiYWNrZ3JvdW5kX2NvbG9yIiwiZHJhd05vdGUiLCJsZW5ndGgiLCJnYW1lRW5kTWVzc2FnZSIsImdhbWVFbmQiLCJiYWNrZ3JvdW5kVHJhY2siLCJkcmF3UmVjdGFuZ2xlIiwiY29sb3IiLCJxdWVyeVNlbGVjdG9yIiwiZW5naW5lIiwiYnVmZmVyIiwiY2FudmFzIiwid2luZG93IiwiY2xhc3NMaXN0IiwiYWRkIiwiYm9keSIsIm9ua2V5dXAiLCJyZXN0YXJ0R2FtZSIsInJlbW92ZSIsImNvbnRhaW5zIiwicGF1c2VkIiwicGF1c2UiLCJmaWxsTm90ZUFyciIsImZpbGxCYXNzQXJyIiwiZmlsbEVpZ2h0QXJyIiwic2V0SW50ZXJ2YWwiLCJmaWxsTmFydXRvTm90ZSIsImxvb3AiLCJ2b2x1bWUiLCJzdGFydCIsIkJ1dHRvbklucHV0IiwidXAiLCJrZXlfY29kZSIsImRvd24iLCJnZXRJbnB1dCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwiaGVpZ2h0X3dpZHRoX3JhdGlvIiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwidGltZV9zdGVwIiwiYWNjdW11bGF0ZWRfdGltZSIsImFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0IiwidW5kZWZpbmVkIiwidGltZSIsInVwZGF0ZWQiLCJydW4iLCJ0aW1lX3N0YW1wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGFuZGxlUnVuIiwicGVyZm9ybWFuY2UiLCJub3ciLCJzdG9wIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmcmljdGlvbiIsImdyYXZpdHkiLCJQbGF5ZXIiLCJBdWRpbyIsIm1lbG9keUFyciIsImJhc3NBcnIiLCJlaWdodEFyciIsInhQb3NBcnIiLCJ4QmFzc1Bvc0FyciIsInhFaWdodFBvc0FyciIsIm5hcnV0b01lbG9keUFyciIsIm5hcnV0b0Jhc3NBcnIiLCJuYXJ1dG9FaWdodEFyciIsIm5hcnV0b1hQb3NBcnIiLCJuYXJ1dG94QmFzc1Bvc0FyciIsIm5hcnV0b3hFaWdodFBvc0FyciIsImNvdW50IiwicHVzaCIsIk5vdGUiLCJtZXNzYWdlIiwiY29sbGlkZU9iamVjdCIsIm9iamVjdCIsInZlbG9jaXR5X3giLCJ2ZWxvY2l0eV95IiwicmFuZG9tIiwiYXVkaW9GaWxlIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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SSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQzJDLE1BQUwsS0FBZ0IsUUFBM0IsRUFBcUM3RyxRQUFyQyxDQUE4QyxFQUE5QyxDQUFuQjs7QUFFQSxNQUFHLEtBQUs2QixLQUFMLENBQVdMLE1BQVgsSUFBcUIsQ0FBeEIsRUFBMEI7QUFDdEIsU0FBS0ssS0FBTCxHQUFhLEtBQUtBLEtBQUwsQ0FBV2tGLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsSUFBeUIsR0FBekIsR0FBK0IsS0FBS2xGLEtBQUwsQ0FBV2tGLEtBQVgsQ0FBaUIsQ0FBakIsRUFBb0IsQ0FBcEIsQ0FBNUM7QUFDSDs7QUFFRCxPQUFLdEgsTUFBTCxHQUFjLENBQWQ7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtVLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUtFLENBQUwsR0FBU0EsQ0FBVDtBQUVBLE9BQUtzRyxVQUFMLEdBQWtCLENBQWxCO0FBRUEsT0FBS3JHLEdBQUwsR0FBVyxLQUFYO0FBQ0EsT0FBS0UsS0FBTCxHQUFhLElBQUkrRSxLQUFKLENBQVVzQixTQUFWLENBQWI7QUFDSCxDQWhCRDs7QUFrQkFySSxJQUFJLENBQUM4SCxJQUFMLENBQVU5QyxTQUFWLEdBQXNCO0FBQ2xCQyxhQUFXLEVBQUdqRixJQUFJLENBQUM4SCxJQUREO0FBRWxCekYsUUFBTSxFQUFFLGtCQUFVO0FBQ2QsU0FBS1IsQ0FBTCxJQUFVLEtBQUtzRyxVQUFmO0FBQ0g7QUFKaUIsQ0FBdEI7QUFTQWpELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQm5GLElBQWpCLEM7Ozs7Ozs7Ozs7O0FDdFhBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsInZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBvcHRpb25zID0ge1xuICAgIGJvcmRlclNpemU6IDIsXG4gICAgZm9udFNpemU6IDksXG4gICAgYmFja2dyb3VuZENvbG9yOiAnYmxhY2snLFxuICAgIHRpY2tDb2xvcjogJyNkZGQnLFxuICAgIGdyYWRpZW50OiBbJ3JlZCAxJScsICcjZmYwIDE2JScsICdsaW1lIDQ1JScsICcjMDgwIDEwMCUnXSxcbiAgICBkYlJhbmdlOiA0OCxcbiAgICBkYlRpY2tTaXplOiA2LFxuICAgIG1hc2tUcmFuc2l0aW9uOiAnaGVpZ2h0IDAuMXMnXG4gIH07XG4gIHZhciB0aWNrV2lkdGg7XG4gIHZhciBlbGVtZW50V2lkdGg7XG4gIHZhciBlbGVtZW50SGVpZ2h0O1xuICB2YXIgbWV0ZXJIZWlnaHQ7XG4gIHZhciBtZXRlcldpZHRoO1xuICB2YXIgbWV0ZXJUb3A7XG4gIHZhciB2ZXJ0aWNhbCA9IHRydWU7XG4gIHZhciBjaGFubmVsQ291bnQgPSAxO1xuICB2YXIgY2hhbm5lbE1hc2tzID0gW107XG4gIHZhciBjaGFubmVsUGVha3MgPSBbXTtcbiAgdmFyIGNoYW5uZWxQZWFrTGFiZWxzID0gW107XG5cbiAgdmFyIGdldEJhc2VMb2cgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHJldHVybiBNYXRoLmxvZyh5KSAvIE1hdGgubG9nKHgpO1xuICB9O1xuXG4gIHZhciBkYkZyb21GbG9hdCA9IGZ1bmN0aW9uIChmbG9hdFZhbCkge1xuICAgIHJldHVybiBnZXRCYXNlTG9nKDEwLCBmbG9hdFZhbCkgKiAyMDtcbiAgfTtcblxuICB2YXIgc2V0T3B0aW9ucyA9IGZ1bmN0aW9uICh1c2VyT3B0aW9ucykge1xuICAgIGZvciAodmFyIGsgaW4gdXNlck9wdGlvbnMpIHtcbiAgICAgIG9wdGlvbnNba10gPSB1c2VyT3B0aW9uc1trXTtcbiAgICB9XG5cbiAgICB0aWNrV2lkdGggPSBvcHRpb25zLmZvbnRTaXplICogMi4wO1xuICAgIG1ldGVyVG9wID0gb3B0aW9ucy5mb250U2l6ZSAqIDEuNSArIG9wdGlvbnMuYm9yZGVyU2l6ZTtcbiAgfTtcblxuICB2YXIgY3JlYXRlTWV0ZXJOb2RlID0gZnVuY3Rpb24gKHNvdXJjZU5vZGUsIGF1ZGlvQ3R4KSB7XG4gICAgdmFyIGMgPSBzb3VyY2VOb2RlLmNoYW5uZWxDb3VudDtcbiAgICB2YXIgbWV0ZXJOb2RlID0gYXVkaW9DdHguY3JlYXRlU2NyaXB0UHJvY2Vzc29yKDIwNDgsIGMsIGMpO1xuICAgIHNvdXJjZU5vZGUuY29ubmVjdChtZXRlck5vZGUpO1xuICAgIG1ldGVyTm9kZS5jb25uZWN0KGF1ZGlvQ3R4LmRlc3RpbmF0aW9uKTtcbiAgICByZXR1cm4gbWV0ZXJOb2RlO1xuICB9O1xuXG4gIHZhciBjcmVhdGVDb250YWluZXJEaXYgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgdmFyIG1ldGVyRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLndpZHRoID0gZWxlbWVudFdpZHRoICsgJ3B4JztcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gZWxlbWVudEhlaWdodCArICdweCc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChtZXRlckVsZW1lbnQpO1xuICAgIHJldHVybiBtZXRlckVsZW1lbnQ7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1ldGVyID0gZnVuY3Rpb24gKGRvbUVsZW1lbnQsIG1ldGVyTm9kZSwgb3B0aW9uc092ZXJyaWRlcykge1xuICAgIHNldE9wdGlvbnMob3B0aW9uc092ZXJyaWRlcyk7XG4gICAgZWxlbWVudFdpZHRoID0gZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgICBlbGVtZW50SGVpZ2h0ID0gZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgdmFyIG1ldGVyRWxlbWVudCA9IGNyZWF0ZUNvbnRhaW5lckRpdihkb21FbGVtZW50KTtcblxuICAgIGlmIChlbGVtZW50V2lkdGggPiBlbGVtZW50SGVpZ2h0KSB7XG4gICAgICB2ZXJ0aWNhbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG1ldGVySGVpZ2h0ID0gZWxlbWVudEhlaWdodCAtIG1ldGVyVG9wIC0gb3B0aW9ucy5ib3JkZXJTaXplO1xuICAgIG1ldGVyV2lkdGggPSBlbGVtZW50V2lkdGggLSB0aWNrV2lkdGggLSBvcHRpb25zLmJvcmRlclNpemU7XG4gICAgY3JlYXRlVGlja3MobWV0ZXJFbGVtZW50KTtcbiAgICBjcmVhdGVSYWluYm93KG1ldGVyRWxlbWVudCwgbWV0ZXJXaWR0aCwgbWV0ZXJIZWlnaHQsIG1ldGVyVG9wLCB0aWNrV2lkdGgpO1xuICAgIGNoYW5uZWxDb3VudCA9IG1ldGVyTm9kZS5jaGFubmVsQ291bnQ7XG4gICAgdmFyIGNoYW5uZWxXaWR0aCA9IG1ldGVyV2lkdGggLyBjaGFubmVsQ291bnQ7XG4gICAgdmFyIGNoYW5uZWxMZWZ0ID0gdGlja1dpZHRoO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgY3JlYXRlQ2hhbm5lbE1hc2sobWV0ZXJFbGVtZW50LCBvcHRpb25zLmJvcmRlclNpemUsIG1ldGVyVG9wLCBjaGFubmVsTGVmdCwgZmFsc2UpO1xuICAgICAgY2hhbm5lbE1hc2tzW2ldID0gY3JlYXRlQ2hhbm5lbE1hc2sobWV0ZXJFbGVtZW50LCBjaGFubmVsV2lkdGgsIG1ldGVyVG9wLCBjaGFubmVsTGVmdCwgb3B0aW9ucy5tYXNrVHJhbnNpdGlvbik7XG4gICAgICBjaGFubmVsUGVha3NbaV0gPSAwLjA7XG4gICAgICBjaGFubmVsUGVha0xhYmVsc1tpXSA9IGNyZWF0ZVBlYWtMYWJlbChtZXRlckVsZW1lbnQsIGNoYW5uZWxXaWR0aCwgY2hhbm5lbExlZnQpO1xuICAgICAgY2hhbm5lbExlZnQgKz0gY2hhbm5lbFdpZHRoO1xuICAgIH1cblxuICAgIG1ldGVyTm9kZS5vbmF1ZGlvcHJvY2VzcyA9IHVwZGF0ZU1ldGVyO1xuICAgIG1ldGVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgICAgY2hhbm5lbFBlYWtzW2ldID0gMC4wO1xuICAgICAgICBjaGFubmVsUGVha0xhYmVsc1tpXS50ZXh0Q29udGVudCA9ICct4oieJztcbiAgICAgIH1cbiAgICB9LCBmYWxzZSk7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVRpY2tzID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgIHZhciBudW1UaWNrcyA9IE1hdGguZmxvb3Iob3B0aW9ucy5kYlJhbmdlIC8gb3B0aW9ucy5kYlRpY2tTaXplKTtcbiAgICB2YXIgZGJUaWNrTGFiZWwgPSAwO1xuICAgIHZhciBkYlRpY2tUb3AgPSBvcHRpb25zLmZvbnRTaXplICsgb3B0aW9ucy5ib3JkZXJTaXplO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1UaWNrczsgaSsrKSB7XG4gICAgICB2YXIgZGJUaWNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZGJUaWNrKTtcbiAgICAgIGRiVGljay5zdHlsZS53aWR0aCA9IHRpY2tXaWR0aCArICdweCc7XG4gICAgICBkYlRpY2suc3R5bGUudGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgIGRiVGljay5zdHlsZS5jb2xvciA9IG9wdGlvbnMudGlja0NvbG9yO1xuICAgICAgZGJUaWNrLnN0eWxlLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZSArICdweCc7XG4gICAgICBkYlRpY2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZGJUaWNrLnN0eWxlLnRvcCA9IGRiVGlja1RvcCArICdweCc7XG4gICAgICBkYlRpY2sudGV4dENvbnRlbnQgPSBkYlRpY2tMYWJlbCArICcnO1xuICAgICAgZGJUaWNrTGFiZWwgLT0gb3B0aW9ucy5kYlRpY2tTaXplO1xuICAgICAgZGJUaWNrVG9wICs9IG1ldGVySGVpZ2h0IC8gbnVtVGlja3M7XG4gICAgfVxuICB9O1xuXG4gIHZhciBjcmVhdGVSYWluYm93ID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIGhlaWdodCwgdG9wLCBsZWZ0KSB7XG4gICAgdmFyIHJhaW5ib3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQocmFpbmJvdyk7XG4gICAgcmFpbmJvdy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICByYWluYm93LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgcmFpbmJvdy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgcmFpbmJvdy5zdHlsZS50b3AgPSB0b3AgKyAncHgnO1xuICAgIHJhaW5ib3cuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIHZhciBncmFkaWVudFN0eWxlID0gJ2xpbmVhci1ncmFkaWVudCgnICsgb3B0aW9ucy5ncmFkaWVudC5qb2luKCcsICcpICsgJyknO1xuICAgIHJhaW5ib3cuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gZ3JhZGllbnRTdHlsZTtcbiAgICByZXR1cm4gcmFpbmJvdztcbiAgfTtcblxuICB2YXIgY3JlYXRlUGVha0xhYmVsID0gZnVuY3Rpb24gKHBhcmVudCwgd2lkdGgsIGxlZnQpIHtcbiAgICB2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobGFiZWwpO1xuICAgIGxhYmVsLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGxhYmVsLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIGxhYmVsLnN0eWxlLmNvbG9yID0gb3B0aW9ucy50aWNrQ29sb3I7XG4gICAgbGFiZWwuc3R5bGUuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgbGFiZWwuc3R5bGUudG9wID0gb3B0aW9ucy5ib3JkZXJTaXplICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgbGFiZWwudGV4dENvbnRlbnQgPSAnLeKInic7XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9O1xuXG4gIHZhciBjcmVhdGVDaGFubmVsTWFzayA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCB0b3AsIGxlZnQsIHRyYW5zaXRpb24pIHtcbiAgICB2YXIgY2hhbm5lbE1hc2sgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hhbm5lbE1hc2spO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLmhlaWdodCA9IG1ldGVySGVpZ2h0ICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5sZWZ0ID0gbGVmdCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUuYmFja2dyb3VuZENvbG9yID0gb3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgY2hhbm5lbE1hc2suc3R5bGUudHJhbnNpdGlvbiA9IG9wdGlvbnMubWFza1RyYW5zaXRpb247XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoYW5uZWxNYXNrO1xuICB9O1xuXG4gIHZhciBtYXNrU2l6ZSA9IGZ1bmN0aW9uIChmbG9hdFZhbCkge1xuICAgIGlmIChmbG9hdFZhbCA9PT0gMC4wKSB7XG4gICAgICByZXR1cm4gbWV0ZXJIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBkID0gb3B0aW9ucy5kYlJhbmdlICogLTE7XG4gICAgICB2YXIgcmV0dXJuVmFsID0gTWF0aC5mbG9vcihkYkZyb21GbG9hdChmbG9hdFZhbCkgKiBtZXRlckhlaWdodCAvIGQpO1xuXG4gICAgICBpZiAocmV0dXJuVmFsID4gbWV0ZXJIZWlnaHQpIHtcbiAgICAgICAgcmV0dXJuIG1ldGVySGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIHVwZGF0ZU1ldGVyID0gZnVuY3Rpb24gKGF1ZGlvUHJvY2Vzc2luZ0V2ZW50KSB7XG4gICAgdmFyIGlucHV0QnVmZmVyID0gYXVkaW9Qcm9jZXNzaW5nRXZlbnQuaW5wdXRCdWZmZXI7XG4gICAgdmFyIGk7XG4gICAgdmFyIGNoYW5uZWxEYXRhID0gW107XG4gICAgdmFyIGNoYW5uZWxNYXhlcyA9IFtdO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICBjaGFubmVsRGF0YVtpXSA9IGlucHV0QnVmZmVyLmdldENoYW5uZWxEYXRhKGkpO1xuICAgICAgY2hhbm5lbE1heGVzW2ldID0gMC4wO1xuICAgIH1cblxuICAgIGZvciAodmFyIHNhbXBsZSA9IDA7IHNhbXBsZSA8IGlucHV0QnVmZmVyLmxlbmd0aDsgc2FtcGxlKyspIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgICBpZiAoTWF0aC5hYnMoY2hhbm5lbERhdGFbaV1bc2FtcGxlXSkgPiBjaGFubmVsTWF4ZXNbaV0pIHtcbiAgICAgICAgICBjaGFubmVsTWF4ZXNbaV0gPSBNYXRoLmFicyhjaGFubmVsRGF0YVtpXVtzYW1wbGVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgdmFyIHRoaXNNYXNrU2l6ZSA9IG1hc2tTaXplKGNoYW5uZWxNYXhlc1tpXSwgbWV0ZXJIZWlnaHQpO1xuICAgICAgY2hhbm5lbE1hc2tzW2ldLnN0eWxlLmhlaWdodCA9IHRoaXNNYXNrU2l6ZSArICdweCc7XG5cbiAgICAgIGlmIChjaGFubmVsTWF4ZXNbaV0gPiBjaGFubmVsUGVha3NbaV0pIHtcbiAgICAgICAgY2hhbm5lbFBlYWtzW2ldID0gY2hhbm5lbE1heGVzW2ldO1xuICAgICAgICB2YXIgbGFiZWxUZXh0ID0gZGJGcm9tRmxvYXQoY2hhbm5lbFBlYWtzW2ldKS50b0ZpeGVkKDEpO1xuICAgICAgICBjaGFubmVsUGVha0xhYmVsc1tpXS50ZXh0Q29udGVudCA9IGxhYmVsVGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBjcmVhdGVNZXRlck5vZGU6IGNyZWF0ZU1ldGVyTm9kZSxcbiAgICBjcmVhdGVNZXRlcjogY3JlYXRlTWV0ZXJcbiAgfTtcbn0oKTtcblxubW9kdWxlLmV4cG9ydHMgPSB3ZWJBdWRpb1BlYWtNZXRlcjsiLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5jb25zdCBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zY3JpcHRzL2NvbnRyb2xsZXInKTtcclxuY29uc3QgRGlzcGxheSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9kaXNwbGF5Jyk7XHJcbmNvbnN0IEVuZ2luZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9lbmdpbmUnKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9nYW1lJyk7XHJcbnZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IHJlcXVpcmUoJ3dlYi1hdWRpby1wZWFrLW1ldGVyJyk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IChnYW1lLndvcmxkLnNjb3JlID09PSAwKSA/IChcclxuICAgICAgICAgICAgJzAlJ1xyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIChnYW1lLndvcmxkLnNjb3JlLnRvRml4ZWQoMikpLnRvU3RyaW5nKCkgKyAnJSdcclxuICAgICAgICApIFxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihjb250cm9sbGVyLmxlZnQuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIucmlnaHQuYWN0aXZlKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmKGNvbnRyb2xsZXIudXAuYWN0aXZlKXtcclxuICAgICAgICAvLyAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIC8vICAgICBjb250cm9sbGVyLnVwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IG5vdGVEcm9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihnYW1lLndvcmxkLm5vdGVBcnJbZ2FtZS53b3JsZC5ub3RlQXJyLmxlbmd0aCAtIDFdLnkgPiAxMTgpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuXHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgZGlzcGxheSA9IG5ldyBEaXNwbGF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKTtcclxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGxldCBlbmdpbmUgPSBuZXcgRW5naW5lKDEwMDAvMzAsIHJlbmRlciwgdXBkYXRlKTtcclxuXHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMuaGVpZ2h0ID0gZ2FtZS53b3JsZC5oZWlnaHQ7XHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMud2lkdGggPSBnYW1lLndvcmxkLndpZHRoO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcclxuXHJcbiAgICByZXNpemUoKTtcclxuICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgXHJcbiAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5Lm9ua2V5dXAgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDMyKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDgwKSB7XHJcbiAgICAgICAgICAgIGlmKCFnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZWQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZ2FtZS53b3JsZC5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxOb3RlQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEJhc3NBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsRWlnaHRBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbE5hcnV0b05vdGUoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2subG9vcCA9IHRydWU7XHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay52b2x1bWUgPSAwLjM7XHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICBcclxuICAgIC8vIHZhciBteU1ldGVyRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1wZWFrLW1ldGVyJyk7XHJcbiAgICAvLyB2YXIgYXVkaW9DdHggPSBuZXcgKHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dCkoKTtcclxuICAgIC8vIHZhciBzb3VyY2VOb2RlID0gYXVkaW9DdHguY3JlYXRlTWVkaWFFbGVtZW50U291cmNlKGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrKTtcclxuICAgIC8vIHNvdXJjZU5vZGUuY29ubmVjdChhdWRpb0N0eC5kZXN0aWF0aW9uKTtcclxuICAgIC8vIHZhciBtZXRlck5vZGUgPSB3ZWJBdWRpb1BlYWtNZXRlci5jcmVhdGVNZXRlck5vZGUoc291cmNlTm9kZSwgYXVkaW9DdHgpO1xyXG4gICAgLy8gd2ViQXVkaW9QZWFrTWV0ZXIuY3JlYXRlTWV0ZXIobXlNZXRlckVsZW1lbnQsIG1ldGVyTm9kZSwge30pO1xyXG5cclxuICAgIGVuZ2luZS5zdGFydCgpO1xyXG5cclxufSk7IiwiXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubGVmdCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnJpZ2h0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMudXAgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG5cclxuICAgIHRoaXMua2V5RG93blVwID0gZnVuY3Rpb24odHlwZSwga2V5X2NvZGUpIHtcclxuICAgICAgICBsZXQgZG93biA9ICh0eXBlID09PSAna2V5ZG93bicpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBzd2l0Y2goa2V5X2NvZGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQuZ2V0SW5wdXQoZG93bik7ICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM4OiBcclxuICAgICAgICAgICAgICAgIHRoaXMudXAuZ2V0SW5wdXQoZG93bik7ICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodC5nZXRJbnB1dChkb3duKTtcclxuICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyXHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuZG93biA9IGZhbHNlO1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQsXHJcblxyXG4gICAgZ2V0SW5wdXQgOiBmdW5jdGlvbihkb3duKSB7XHJcbiAgICAgICAgaWYodGhpcy5kb3duICE9IGRvd24pIHRoaXMuYWN0aXZlID0gZG93bjtcclxuICAgICAgICB0aGlzLmRvd24gPSBkb3duO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyOyIsImNvbnN0IERpc3BsYXkgPSBmdW5jdGlvbihjYW52YXMpe1xyXG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgdGhpcy5kcmF3UmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcyBpcyBkcmF3Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZHJhd05vdGUgPSBmdW5jdGlvbihub3RlKSB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciB9ID0gbm90ZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbGwgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlci5jYW52YXMsIDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCwgMCwgMCwgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgaWYoaGVpZ2h0IC8gd2lkdGggPiBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IHdpZHRoICogaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSBoZWlnaHQgLyBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgXHJcbn07XHJcblxyXG5EaXNwbGF5LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRGlzcGxheVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5OyIsIlxyXG5jb25zdCBFbmdpbmUgPSBmdW5jdGlvbih0aW1lX3N0ZXAsIHVwZGF0ZSwgcmVuZGVyKSB7XHJcbiAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSAwO1xyXG4gICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZSA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZV9zdGVwID0gdGltZV9zdGVwLFxyXG5cclxuICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcblxyXG4gICAgdGhpcy5ydW4gPSBmdW5jdGlvbih0aW1lX3N0YW1wKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lICs9IHRpbWVfc3RhbXAgLSB0aGlzLnRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGltZV9zdGFtcDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCAqIDMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXApIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lIC09IHRoaXMudGltZV9zdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodGltZV9zdGFtcCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy51cGRhdGVkKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRpbWVfc3RhbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZVJ1biA9ICh0aW1lX3N0ZXApID0+IHtcclxuICAgICAgICB0aGlzLnJ1bih0aW1lX3N0ZXApO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVuZ2luZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEVuZ2luZSxcclxuXHJcbiAgICBzdGFydDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB0aGlzLnRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsImNvbnN0IEdhbWUgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLndvcmxkID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBmcmljdGlvbjogMC45LFxyXG4gICAgICAgIGdyYXZpdHk6IDMsXHJcbiAgICAgICAgcGxheWVyOiBuZXcgR2FtZS5QbGF5ZXIoKSxcclxuICAgICAgICBub3RlQXJyOiBbXSxcclxuICAgICAgICBiYXNzTm90ZUFycjogW10sXHJcbiAgICAgICAgZWlnaHROb3RlQXJyOiBbXSxcclxuICAgICAgICBoZWlnaHQ6IDEyOCxcclxuICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgIHNjb3JlOiAwLFxyXG4gICAgICAgIGJhY2tncm91bmRUcmFjazogbmV3IEF1ZGlvKCdFcmljIFNraWZmIC0gQSBOaWdodCBPZiBEaXp6eSBTcGVsbHMubXAzJyksXHJcblxyXG4gICAgICAgIG1lbG9keUFycjogW1xyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJywgXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnZDUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJyxcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCBcclxuXHJcbiAgICAgICAgICAgICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsIFxyXG5cclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsIFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJyxcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2Q1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBiYXNzQXJyOiBbXHJcbiAgICAgICAgICAgICdmczMubXAzJywgJ2UzLm1wMycsICdkczMubXAzJywgJ2QzLm1wMycsICdlMy5tcDMnLCBcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAgICAgJ2ZzMy5tcDMnLCAnZTMubXAzJywgJ2RzMy5tcDMnLCAnZDMubXAzJywgJ2UzLm1wMycsIFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZWlnaHRBcnI6IFtcclxuICAgICAgICAgICAgJ2E1Lm1wMycsICdnczUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2ZzNS5tcDMnLCAnZ3M1Lm1wMycsJ2E1Lm1wMycsICdmczUubXAzJywgJ2ZzNi5tcDMnLFxyXG4gICAgICAgICAgICAnZnM1Lm1wMycsICdlNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdiLm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcbiAgICAgICAgICAgICdhNS5tcDMnLCAnZ3M1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdmczUubXAzJywgJ2dzNS5tcDMnLCdhNS5tcDMnLCAnZnM1Lm1wMycsICdmczYubXAzJyxcclxuICAgICAgICAgICAgJ2ZzNS5tcDMnLCAnZTUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnZDYubXAzJywgJ2NzNi5tcDMnLCAnYjUubXAzJywgJ2E1Lm1wMycsICdmczUubXAzJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhQb3NBcnI6IFtcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCAzNSwgNDUsIDM1LCAyNSwgMTUsIFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgODAsIDc1LCA3MywgNzAsIDU1LFxyXG5cclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgMjUsIDM1LCA0NSwgMzUsIDI1LCBcclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgMjUsIDM1LCA0NSwgMzUsIDI1LCBcclxuXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDQ1LCAzNSwgNDUsIDM1LCA0NSwgXHJcblxyXG4gICAgICAgICAgICA0NSwgNDUsIDQ1LCA0NSwgNDUsIDQ1LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCAzNSwgNDUsIDM1LCAyNSwgMTUsXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgODAsIDc1LCA3MywgNzAsIDU1LFxyXG4gICAgICAgICAgICAxNTAsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4QmFzc1Bvc0FycjogW1xyXG4gICAgICAgICAgICA2NSwgNTAsIDY1LCA0NSwgMjUsXHJcbiAgICAgICAgICAgIDM1LCAzNSwgMzUsIDM1LCAzNSwgMzUsXHJcbiAgICAgICAgICAgIDY1LCA1MCwgNjUsIDQ1LCAyNSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhFaWdodFBvc0FycjogW1xyXG4gICAgICAgICAgICA3NSwgNzAsIDY1LCA2MCwgNjAsIDcwLCA3NSwgNjAsIDk1LFxyXG4gICAgICAgICAgICA2MCwgNTUsIDUwLCA0MCwgNDAsIDUwLCA0MCwgMzAsIDIwLFxyXG4gICAgICAgICAgICA3NSwgNzAsIDY1LCA2MCwgNjAsIDcwLCA3NSwgNjAsIDk1LFxyXG4gICAgICAgICAgICA2MCwgNTUsIDUwLCA0MCwgODUsIDgwLCA3OCwgNzUsIDYwLFxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG5hcnV0b01lbG9keUFycjogW1xyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG9CYXNzQXJyOiBbXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRvRWlnaHRBcnI6IFtcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG9YUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNzAsIDgwXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG94QmFzc1Bvc0FycjpbXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRveEVpZ2h0UG9zQXJyOltcclxuXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgZmlsbE5hcnV0b05vdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLm5vdGVBcnIubGVuZ3RoIDwgdGhpcy5uYXJ1dG9NZWxvZHlBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy5uYXJ1dG9YUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5uYXJ1dG9NZWxvZHlBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDwgNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcmVzdGFydEdhbWU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2FtZUVuZE1lc3NhZ2U6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc2NvcmUgPiA5OSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dPVyEgUEVSRkVDVCBTQ09SRSEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA5MCAmJiB0aGlzLnNjb3JlIDw9IDk5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU08gQ0xPU0UgVE8gUEVSRkVDVElPTiEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA4MCAmJiB0aGlzLnNjb3JlIDw9IDg5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BSRVRUWSBHT09ELCBCVVQgSSBCRVQgWU9VIENBTiBETyBCRVRURVIuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gNzAgJiYgdGhpcy5zY29yZSA8PTc5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ09IIE1BTiwgTUFZQkUgWU9VIFNIT1VMRCBQUkFDVElDRSBBIExJVFRMRSBNT1JFLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlIDw9IDY5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSVMgWU9VUiBNT05JVE9SIE9OPyBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbE5vdGVBcnI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubWVsb2R5QXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhQb3NBcnJbY291bnRdLCB5LCB0aGlzLm1lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKGNvdW50IDw9IDQpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA3MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkgfHwgKGNvdW50ID49IDcxICYmIGNvdW50IDw9IDc0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKSB8fCAoY291bnQgPj0gNzYgJiYgY291bnQgPD0gNzkpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE3KSB8fCAoY291bnQgPj0gODAgJiYgY291bnQgPD0gODMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDg0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikgfHwgKGNvdW50ID49IDg1ICYmIGNvdW50IDw9IDg4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB8fCAoY291bnQgPj0gODkgJiYgY291bnQgPD0gOTIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDkzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHx8IChjb3VudCA+PSA5NCAmJiBjb3VudCA8PSA5NykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMzIgJiYgY291bnQgPD0gMzYpIHx8IChjb3VudCA+PSA5OCAmJiBjb3VudCA8PSAxMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPj0gMzcgJiYgY291bnQgPD0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDYzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2Nil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlsbEJhc3NBcnI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5iYXNzTm90ZUFyci5sZW5ndGggPCB0aGlzLmJhc3NBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhCYXNzUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5iYXNzQXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnJbY291bnQgLSAxXS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSAzIHx8IChjb3VudCA+PSAxMiAmJiBjb3VudCA8PSAxNCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDYwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEVpZ2h0QXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gLTg4NTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5laWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5laWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjb3JlVXBkYXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5tZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5iYXNzQXJyLmxlbmd0aCArIHRoaXMuZWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NvcmUgKz0gMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsaWRlT2JqZWN0OmZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICAgICAgICAgIGlmKG9iamVjdC54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqZWN0LnggKyBvYmplY3Qud2lkdGggPiB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IHRoaXMud2lkdGggLSBvYmplY3Qud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvLyBpZihvYmplY3QueSA8IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gMDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmKG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSB0aGlzLmhlaWdodCAtIG9iamVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeCAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZU9iamVjdCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud29ybGQudXBkYXRlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuR2FtZS5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yIDogR2FtZSB9O1xyXG5cclxuR2FtZS5QbGF5ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmNvbG9yID0gJyNmZjAwMDAnO1xyXG4gICAgdGhpcy5oZWlnaHQgPSA0O1xyXG4gICAgLy8gdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAvLyB0aGlzLnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IDI0O1xyXG4gICAgdGhpcy54ID0gNjA7XHJcbiAgICB0aGlzLnkgPSAxMTA7XHJcbn07XHJcblxyXG5HYW1lLlBsYXllci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuUGxheWVyLFxyXG5cclxuICAgIC8vIGp1bXA6ZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYoIXRoaXMuanVtcGluZyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmVsb2NpdHlfeSAtPSAxNTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIGhpdE5vdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVMZWZ0OmZ1bmN0aW9uKCkgeyBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggLT0gMC43NTtcclxuICAgIH0sXHJcbiAgICBtb3ZlUmlnaHQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94ICs9IDAuNzU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5X3g7XHJcbiAgICAgICAgLy8gdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuR2FtZS5Ob3RlID0gZnVuY3Rpb24oeCwgeSwgYXVkaW9GaWxlKXtcclxuICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDI7XHJcbiAgICB0aGlzLndpZHRoID0gMjtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlfeSA9IDE7XHJcblxyXG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oYXVkaW9GaWxlKTtcclxufVxyXG5cclxuR2FtZS5Ob3RlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5Ob3RlLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=