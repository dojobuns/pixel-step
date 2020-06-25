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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYi1hdWRpby1wZWFrLW1ldGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2Rpc3BsYXkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZW5naW5lLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlcy9pbmRleC5zY3NzP2M4MDciXSwibmFtZXMiOlsiQ29udHJvbGxlciIsInJlcXVpcmUiLCJEaXNwbGF5IiwiRW5naW5lIiwiR2FtZSIsIndlYkF1ZGlvUGVha01ldGVyIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleURvd25VcCIsImNvbnRyb2xsZXIiLCJ0eXBlIiwia2V5Q29kZSIsInJlc2l6ZSIsImRpc3BsYXkiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImdhbWUiLCJ3b3JsZCIsImhlaWdodCIsIndpZHRoIiwicmVuZGVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzY29yZSIsInRvRml4ZWQiLCJ0b1N0cmluZyIsIm5vdGVBcnIiLCJmb3JFYWNoIiwibm90ZSIsIngiLCJwbGF5ZXIiLCJ5IiwiaGl0Iiwic2NvcmVVcGRhdGUiLCJzb3VuZCIsInBsYXkiLCJoaXROb3RlIiwiYmFzc05vdGVBcnIiLCJlaWdodE5vdGVBcnIiLCJ1cGRhdGUiLCJsZWZ0IiwiYWN0aXZlIiwibW92ZUxlZnQiLCJyaWdodCIsIm1vdmVSaWdodCIsIm5vdGVEcm9wIiwiZmlsbCIsImJhY2tncm91bmRfY29sb3IiLCJkcmF3Tm90ZSIsImxlbmd0aCIsImdhbWVFbmRNZXNzYWdlIiwiZ2FtZUVuZCIsImJhY2tncm91bmRUcmFjayIsImRyYXdSZWN0YW5nbGUiLCJjb2xvciIsInF1ZXJ5U2VsZWN0b3IiLCJlbmdpbmUiLCJidWZmZXIiLCJjYW52YXMiLCJ3aW5kb3ciLCJjbGFzc0xpc3QiLCJhZGQiLCJib2R5Iiwib25rZXl1cCIsInJlc3RhcnRHYW1lIiwicmVtb3ZlIiwiY29udGFpbnMiLCJwYXVzZWQiLCJwYXVzZSIsImZpbGxOb3RlQXJyIiwiZmlsbEJhc3NBcnIiLCJmaWxsRWlnaHRBcnIiLCJzZXRJbnRlcnZhbCIsImZpbGxOYXJ1dG9Ob3RlIiwibG9vcCIsInZvbHVtZSIsInN0YXJ0IiwiQnV0dG9uSW5wdXQiLCJ1cCIsImtleV9jb2RlIiwiZG93biIsImdldElucHV0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJtb2R1bGUiLCJleHBvcnRzIiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJjb250ZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJNYXRoIiwiZmxvb3IiLCJkcmF3SW1hZ2UiLCJoZWlnaHRfd2lkdGhfcmF0aW8iLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJ0aW1lX3N0ZXAiLCJhY2N1bXVsYXRlZF90aW1lIiwiYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QiLCJ1bmRlZmluZWQiLCJ0aW1lIiwidXBkYXRlZCIsInJ1biIsInRpbWVfc3RhbXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoYW5kbGVSdW4iLCJwZXJmb3JtYW5jZSIsIm5vdyIsInN0b3AiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImZyaWN0aW9uIiwiZ3Jhdml0eSIsIlBsYXllciIsIkF1ZGlvIiwibWVsb2R5QXJyIiwiYmFzc0FyciIsImVpZ2h0QXJyIiwieFBvc0FyciIsInhCYXNzUG9zQXJyIiwieEVpZ2h0UG9zQXJyIiwibmFydXRvTWVsb2R5QXJyIiwibmFydXRvQmFzc0FyciIsIm5hcnV0b0VpZ2h0QXJyIiwibmFydXRvWFBvc0FyciIsIm5hcnV0b3hCYXNzUG9zQXJyIiwibmFydXRveEVpZ2h0UG9zQXJyIiwiY291bnQiLCJwdXNoIiwiTm90ZSIsIm1lc3NhZ2UiLCJjb2xsaWRlT2JqZWN0Iiwib2JqZWN0IiwidmVsb2NpdHlfeCIsInZlbG9jaXR5X3kiLCJyYW5kb20iLCJhdWRpb0ZpbGUiLCJzbGljZSJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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VixDQUFiO0FBQ0gsQ0FoQkQ7O0FBa0JBckksSUFBSSxDQUFDOEgsSUFBTCxDQUFVOUMsU0FBVixHQUFzQjtBQUNsQkMsYUFBVyxFQUFHakYsSUFBSSxDQUFDOEgsSUFERDtBQUVsQnpGLFFBQU0sRUFBRSxrQkFBVTtBQUNkLFNBQUtSLENBQUwsSUFBVSxLQUFLc0csVUFBZjtBQUNIO0FBSmlCLENBQXRCO0FBU0FqRCxNQUFNLENBQUNDLE9BQVAsR0FBaUJuRixJQUFqQixDOzs7Ozs7Ozs7OztBQ3RYQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJ2YXIgd2ViQXVkaW9QZWFrTWV0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBib3JkZXJTaXplOiAyLFxuICAgIGZvbnRTaXplOiA5LFxuICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICB0aWNrQ29sb3I6ICcjZGRkJyxcbiAgICBncmFkaWVudDogWydyZWQgMSUnLCAnI2ZmMCAxNiUnLCAnbGltZSA0NSUnLCAnIzA4MCAxMDAlJ10sXG4gICAgZGJSYW5nZTogNDgsXG4gICAgZGJUaWNrU2l6ZTogNixcbiAgICBtYXNrVHJhbnNpdGlvbjogJ2hlaWdodCAwLjFzJ1xuICB9O1xuICB2YXIgdGlja1dpZHRoO1xuICB2YXIgZWxlbWVudFdpZHRoO1xuICB2YXIgZWxlbWVudEhlaWdodDtcbiAgdmFyIG1ldGVySGVpZ2h0O1xuICB2YXIgbWV0ZXJXaWR0aDtcbiAgdmFyIG1ldGVyVG9wO1xuICB2YXIgdmVydGljYWwgPSB0cnVlO1xuICB2YXIgY2hhbm5lbENvdW50ID0gMTtcbiAgdmFyIGNoYW5uZWxNYXNrcyA9IFtdO1xuICB2YXIgY2hhbm5lbFBlYWtzID0gW107XG4gIHZhciBjaGFubmVsUGVha0xhYmVscyA9IFtdO1xuXG4gIHZhciBnZXRCYXNlTG9nID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICByZXR1cm4gTWF0aC5sb2coeSkgLyBNYXRoLmxvZyh4KTtcbiAgfTtcblxuICB2YXIgZGJGcm9tRmxvYXQgPSBmdW5jdGlvbiAoZmxvYXRWYWwpIHtcbiAgICByZXR1cm4gZ2V0QmFzZUxvZygxMCwgZmxvYXRWYWwpICogMjA7XG4gIH07XG5cbiAgdmFyIHNldE9wdGlvbnMgPSBmdW5jdGlvbiAodXNlck9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrIGluIHVzZXJPcHRpb25zKSB7XG4gICAgICBvcHRpb25zW2tdID0gdXNlck9wdGlvbnNba107XG4gICAgfVxuXG4gICAgdGlja1dpZHRoID0gb3B0aW9ucy5mb250U2l6ZSAqIDIuMDtcbiAgICBtZXRlclRvcCA9IG9wdGlvbnMuZm9udFNpemUgKiAxLjUgKyBvcHRpb25zLmJvcmRlclNpemU7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZU1ldGVyTm9kZSA9IGZ1bmN0aW9uIChzb3VyY2VOb2RlLCBhdWRpb0N0eCkge1xuICAgIHZhciBjID0gc291cmNlTm9kZS5jaGFubmVsQ291bnQ7XG4gICAgdmFyIG1ldGVyTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZVNjcmlwdFByb2Nlc3NvcigyMDQ4LCBjLCBjKTtcbiAgICBzb3VyY2VOb2RlLmNvbm5lY3QobWV0ZXJOb2RlKTtcbiAgICBtZXRlck5vZGUuY29ubmVjdChhdWRpb0N0eC5kZXN0aW5hdGlvbik7XG4gICAgcmV0dXJuIG1ldGVyTm9kZTtcbiAgfTtcblxuICB2YXIgY3JlYXRlQ29udGFpbmVyRGl2ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgIHZhciBtZXRlckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtZXRlckVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS53aWR0aCA9IGVsZW1lbnRXaWR0aCArICdweCc7XG4gICAgbWV0ZXJFbGVtZW50LnN0eWxlLmhlaWdodCA9IGVsZW1lbnRIZWlnaHQgKyAncHgnO1xuICAgIG1ldGVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvcjtcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQobWV0ZXJFbGVtZW50KTtcbiAgICByZXR1cm4gbWV0ZXJFbGVtZW50O1xuICB9O1xuXG4gIHZhciBjcmVhdGVNZXRlciA9IGZ1bmN0aW9uIChkb21FbGVtZW50LCBtZXRlck5vZGUsIG9wdGlvbnNPdmVycmlkZXMpIHtcbiAgICBzZXRPcHRpb25zKG9wdGlvbnNPdmVycmlkZXMpO1xuICAgIGVsZW1lbnRXaWR0aCA9IGRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG4gICAgZWxlbWVudEhlaWdodCA9IGRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgIHZhciBtZXRlckVsZW1lbnQgPSBjcmVhdGVDb250YWluZXJEaXYoZG9tRWxlbWVudCk7XG5cbiAgICBpZiAoZWxlbWVudFdpZHRoID4gZWxlbWVudEhlaWdodCkge1xuICAgICAgdmVydGljYWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBtZXRlckhlaWdodCA9IGVsZW1lbnRIZWlnaHQgLSBtZXRlclRvcCAtIG9wdGlvbnMuYm9yZGVyU2l6ZTtcbiAgICBtZXRlcldpZHRoID0gZWxlbWVudFdpZHRoIC0gdGlja1dpZHRoIC0gb3B0aW9ucy5ib3JkZXJTaXplO1xuICAgIGNyZWF0ZVRpY2tzKG1ldGVyRWxlbWVudCk7XG4gICAgY3JlYXRlUmFpbmJvdyhtZXRlckVsZW1lbnQsIG1ldGVyV2lkdGgsIG1ldGVySGVpZ2h0LCBtZXRlclRvcCwgdGlja1dpZHRoKTtcbiAgICBjaGFubmVsQ291bnQgPSBtZXRlck5vZGUuY2hhbm5lbENvdW50O1xuICAgIHZhciBjaGFubmVsV2lkdGggPSBtZXRlcldpZHRoIC8gY2hhbm5lbENvdW50O1xuICAgIHZhciBjaGFubmVsTGVmdCA9IHRpY2tXaWR0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgIGNyZWF0ZUNoYW5uZWxNYXNrKG1ldGVyRWxlbWVudCwgb3B0aW9ucy5ib3JkZXJTaXplLCBtZXRlclRvcCwgY2hhbm5lbExlZnQsIGZhbHNlKTtcbiAgICAgIGNoYW5uZWxNYXNrc1tpXSA9IGNyZWF0ZUNoYW5uZWxNYXNrKG1ldGVyRWxlbWVudCwgY2hhbm5lbFdpZHRoLCBtZXRlclRvcCwgY2hhbm5lbExlZnQsIG9wdGlvbnMubWFza1RyYW5zaXRpb24pO1xuICAgICAgY2hhbm5lbFBlYWtzW2ldID0gMC4wO1xuICAgICAgY2hhbm5lbFBlYWtMYWJlbHNbaV0gPSBjcmVhdGVQZWFrTGFiZWwobWV0ZXJFbGVtZW50LCBjaGFubmVsV2lkdGgsIGNoYW5uZWxMZWZ0KTtcbiAgICAgIGNoYW5uZWxMZWZ0ICs9IGNoYW5uZWxXaWR0aDtcbiAgICB9XG5cbiAgICBtZXRlck5vZGUub25hdWRpb3Byb2Nlc3MgPSB1cGRhdGVNZXRlcjtcbiAgICBtZXRlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICAgIGNoYW5uZWxQZWFrc1tpXSA9IDAuMDtcbiAgICAgICAgY2hhbm5lbFBlYWtMYWJlbHNbaV0udGV4dENvbnRlbnQgPSAnLeKInic7XG4gICAgICB9XG4gICAgfSwgZmFsc2UpO1xuICB9O1xuXG4gIHZhciBjcmVhdGVUaWNrcyA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICB2YXIgbnVtVGlja3MgPSBNYXRoLmZsb29yKG9wdGlvbnMuZGJSYW5nZSAvIG9wdGlvbnMuZGJUaWNrU2l6ZSk7XG4gICAgdmFyIGRiVGlja0xhYmVsID0gMDtcbiAgICB2YXIgZGJUaWNrVG9wID0gb3B0aW9ucy5mb250U2l6ZSArIG9wdGlvbnMuYm9yZGVyU2l6ZTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtVGlja3M7IGkrKykge1xuICAgICAgdmFyIGRiVGljayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGRiVGljayk7XG4gICAgICBkYlRpY2suc3R5bGUud2lkdGggPSB0aWNrV2lkdGggKyAncHgnO1xuICAgICAgZGJUaWNrLnN0eWxlLnRleHRBbGlnbiA9ICdyaWdodCc7XG4gICAgICBkYlRpY2suc3R5bGUuY29sb3IgPSBvcHRpb25zLnRpY2tDb2xvcjtcbiAgICAgIGRiVGljay5zdHlsZS5mb250U2l6ZSA9IG9wdGlvbnMuZm9udFNpemUgKyAncHgnO1xuICAgICAgZGJUaWNrLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGRiVGljay5zdHlsZS50b3AgPSBkYlRpY2tUb3AgKyAncHgnO1xuICAgICAgZGJUaWNrLnRleHRDb250ZW50ID0gZGJUaWNrTGFiZWwgKyAnJztcbiAgICAgIGRiVGlja0xhYmVsIC09IG9wdGlvbnMuZGJUaWNrU2l6ZTtcbiAgICAgIGRiVGlja1RvcCArPSBtZXRlckhlaWdodCAvIG51bVRpY2tzO1xuICAgIH1cbiAgfTtcblxuICB2YXIgY3JlYXRlUmFpbmJvdyA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCBoZWlnaHQsIHRvcCwgbGVmdCkge1xuICAgIHZhciByYWluYm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKHJhaW5ib3cpO1xuICAgIHJhaW5ib3cuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgcmFpbmJvdy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICAgIHJhaW5ib3cuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHJhaW5ib3cuc3R5bGUudG9wID0gdG9wICsgJ3B4JztcbiAgICByYWluYm93LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICB2YXIgZ3JhZGllbnRTdHlsZSA9ICdsaW5lYXItZ3JhZGllbnQoJyArIG9wdGlvbnMuZ3JhZGllbnQuam9pbignLCAnKSArICcpJztcbiAgICByYWluYm93LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGdyYWRpZW50U3R5bGU7XG4gICAgcmV0dXJuIHJhaW5ib3c7XG4gIH07XG5cbiAgdmFyIGNyZWF0ZVBlYWtMYWJlbCA9IGZ1bmN0aW9uIChwYXJlbnQsIHdpZHRoLCBsZWZ0KSB7XG4gICAgdmFyIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGxhYmVsKTtcbiAgICBsYWJlbC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICBsYWJlbC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBsYWJlbC5zdHlsZS5jb2xvciA9IG9wdGlvbnMudGlja0NvbG9yO1xuICAgIGxhYmVsLnN0eWxlLmZvbnRTaXplID0gb3B0aW9ucy5mb250U2l6ZSArICdweCc7XG4gICAgbGFiZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGxhYmVsLnN0eWxlLnRvcCA9IG9wdGlvbnMuYm9yZGVyU2l6ZSArICdweCc7XG4gICAgbGFiZWwuc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIGxhYmVsLnRleHRDb250ZW50ID0gJy3iiJ4nO1xuICAgIHJldHVybiBsYWJlbDtcbiAgfTtcblxuICB2YXIgY3JlYXRlQ2hhbm5lbE1hc2sgPSBmdW5jdGlvbiAocGFyZW50LCB3aWR0aCwgdG9wLCBsZWZ0LCB0cmFuc2l0aW9uKSB7XG4gICAgdmFyIGNoYW5uZWxNYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNoYW5uZWxNYXNrKTtcbiAgICBjaGFubmVsTWFzay5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICBjaGFubmVsTWFzay5zdHlsZS5oZWlnaHQgPSBtZXRlckhlaWdodCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLnRvcCA9IHRvcCArICdweCc7XG4gICAgY2hhbm5lbE1hc2suc3R5bGUubGVmdCA9IGxlZnQgKyAncHgnO1xuICAgIGNoYW5uZWxNYXNrLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgIGNoYW5uZWxNYXNrLnN0eWxlLnRyYW5zaXRpb24gPSBvcHRpb25zLm1hc2tUcmFuc2l0aW9uO1xuICAgIH1cblxuICAgIHJldHVybiBjaGFubmVsTWFzaztcbiAgfTtcblxuICB2YXIgbWFza1NpemUgPSBmdW5jdGlvbiAoZmxvYXRWYWwpIHtcbiAgICBpZiAoZmxvYXRWYWwgPT09IDAuMCkge1xuICAgICAgcmV0dXJuIG1ldGVySGVpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZCA9IG9wdGlvbnMuZGJSYW5nZSAqIC0xO1xuICAgICAgdmFyIHJldHVyblZhbCA9IE1hdGguZmxvb3IoZGJGcm9tRmxvYXQoZmxvYXRWYWwpICogbWV0ZXJIZWlnaHQgLyBkKTtcblxuICAgICAgaWYgKHJldHVyblZhbCA+IG1ldGVySGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBtZXRlckhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHZhciB1cGRhdGVNZXRlciA9IGZ1bmN0aW9uIChhdWRpb1Byb2Nlc3NpbmdFdmVudCkge1xuICAgIHZhciBpbnB1dEJ1ZmZlciA9IGF1ZGlvUHJvY2Vzc2luZ0V2ZW50LmlucHV0QnVmZmVyO1xuICAgIHZhciBpO1xuICAgIHZhciBjaGFubmVsRGF0YSA9IFtdO1xuICAgIHZhciBjaGFubmVsTWF4ZXMgPSBbXTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBjaGFubmVsQ291bnQ7IGkrKykge1xuICAgICAgY2hhbm5lbERhdGFbaV0gPSBpbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YShpKTtcbiAgICAgIGNoYW5uZWxNYXhlc1tpXSA9IDAuMDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBzYW1wbGUgPSAwOyBzYW1wbGUgPCBpbnB1dEJ1ZmZlci5sZW5ndGg7IHNhbXBsZSsrKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKGNoYW5uZWxEYXRhW2ldW3NhbXBsZV0pID4gY2hhbm5lbE1heGVzW2ldKSB7XG4gICAgICAgICAgY2hhbm5lbE1heGVzW2ldID0gTWF0aC5hYnMoY2hhbm5lbERhdGFbaV1bc2FtcGxlXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgIHZhciB0aGlzTWFza1NpemUgPSBtYXNrU2l6ZShjaGFubmVsTWF4ZXNbaV0sIG1ldGVySGVpZ2h0KTtcbiAgICAgIGNoYW5uZWxNYXNrc1tpXS5zdHlsZS5oZWlnaHQgPSB0aGlzTWFza1NpemUgKyAncHgnO1xuXG4gICAgICBpZiAoY2hhbm5lbE1heGVzW2ldID4gY2hhbm5lbFBlYWtzW2ldKSB7XG4gICAgICAgIGNoYW5uZWxQZWFrc1tpXSA9IGNoYW5uZWxNYXhlc1tpXTtcbiAgICAgICAgdmFyIGxhYmVsVGV4dCA9IGRiRnJvbUZsb2F0KGNoYW5uZWxQZWFrc1tpXSkudG9GaXhlZCgxKTtcbiAgICAgICAgY2hhbm5lbFBlYWtMYWJlbHNbaV0udGV4dENvbnRlbnQgPSBsYWJlbFRleHQ7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgY3JlYXRlTWV0ZXJOb2RlOiBjcmVhdGVNZXRlck5vZGUsXG4gICAgY3JlYXRlTWV0ZXI6IGNyZWF0ZU1ldGVyXG4gIH07XG59KCk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2ViQXVkaW9QZWFrTWV0ZXI7IiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcclxuY29uc3QgQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vc2NyaXB0cy9jb250cm9sbGVyJyk7XHJcbmNvbnN0IERpc3BsYXkgPSByZXF1aXJlKCcuL3NjcmlwdHMvZGlzcGxheScpO1xyXG5jb25zdCBFbmdpbmUgPSByZXF1aXJlKCcuL3NjcmlwdHMvZW5naW5lJyk7XHJcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL3NjcmlwdHMvZ2FtZScpO1xyXG52YXIgd2ViQXVkaW9QZWFrTWV0ZXIgPSByZXF1aXJlKCd3ZWItYXVkaW8tcGVhay1tZXRlcicpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBsZXQga2V5RG93blVwID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnRyb2xsZXIua2V5RG93blVwKGUudHlwZSwgZS5rZXlDb2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlc2l6ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBkaXNwbGF5LnJlc2l6ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAzMiwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDMyLCBnYW1lLndvcmxkLmhlaWdodCAvIGdhbWUud29ybGQud2lkdGgpO1xyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy8gZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7Ly8gQ2xlYXIgYmFja2dyb3VuZCB0byBnYW1lJ3MgYmFja2dyb3VuZCBjb2xvci5cclxuICAgICAgICAvLyBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG4gICAgICAgIC8vIG5vdGVEcm9wKCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5pbm5lckhUTUwgPSAoZ2FtZS53b3JsZC5zY29yZSA9PT0gMCkgPyAoXHJcbiAgICAgICAgICAgICcwJSdcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAoZ2FtZS53b3JsZC5zY29yZS50b0ZpeGVkKDIpKS50b1N0cmluZygpICsgJyUnXHJcbiAgICAgICAgKSBcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoY29udHJvbGxlci5sZWZ0LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCArIDE0KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5ub3RlQXJyWzFdLnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb250cm9sbGVyLnJpZ2h0LmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCArIDE0KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5ub3RlQXJyWzFdLnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZihjb250cm9sbGVyLnVwLmFjdGl2ZSl7XHJcbiAgICAgICAgLy8gICAgIGdhbWUud29ybGQucGxheWVyLmp1bXAoKTtcclxuICAgICAgICAvLyAgICAgY29udHJvbGxlci51cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGdhbWUudXBkYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBub3RlRHJvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRpc3BsYXkuZmlsbChnYW1lLndvcmxkLmJhY2tncm91bmRfY29sb3IpO1xyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYoZ2FtZS53b3JsZC5ub3RlQXJyW2dhbWUud29ybGQubm90ZUFyci5sZW5ndGggLSAxXS55ID4gMTE4KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuZ2FtZUVuZE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuZ2FtZUVuZCgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcblxyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGRpc3BsYXkgPSBuZXcgRGlzcGxheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSk7XHJcbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgICBsZXQgZW5naW5lID0gbmV3IEVuZ2luZSgxMDAwLzMwLCByZW5kZXIsIHVwZGF0ZSk7XHJcblxyXG4gICAgZGlzcGxheS5idWZmZXIuY2FudmFzLmhlaWdodCA9IGdhbWUud29ybGQuaGVpZ2h0O1xyXG4gICAgZGlzcGxheS5idWZmZXIuY2FudmFzLndpZHRoID0gZ2FtZS53b3JsZC53aWR0aDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXlEb3duVXApO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XHJcblxyXG4gICAgcmVzaXplKCk7XHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuICAgIFxyXG4gICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkub25rZXl1cCA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gMzIpe1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gODApIHtcclxuICAgICAgICAgICAgaWYoIWdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlZCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbE5vdGVBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsQmFzc0FycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxFaWdodEFycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbE5hcnV0b05vdGUoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IG5vdGVEcm9wKCksIDEpO1xyXG4gICAgfSlcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLmxvb3AgPSB0cnVlO1xyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sudm9sdW1lID0gMC4zO1xyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgXHJcbiAgICAvLyB2YXIgbXlNZXRlckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktcGVhay1tZXRlcicpO1xyXG4gICAgLy8gdmFyIGF1ZGlvQ3R4ID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQpKCk7XHJcbiAgICAvLyB2YXIgc291cmNlTm9kZSA9IGF1ZGlvQ3R4LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjayk7XHJcbiAgICAvLyBzb3VyY2VOb2RlLmNvbm5lY3QoYXVkaW9DdHguZGVzdGlhdGlvbik7XHJcbiAgICAvLyB2YXIgbWV0ZXJOb2RlID0gd2ViQXVkaW9QZWFrTWV0ZXIuY3JlYXRlTWV0ZXJOb2RlKHNvdXJjZU5vZGUsIGF1ZGlvQ3R4KTtcclxuICAgIC8vIHdlYkF1ZGlvUGVha01ldGVyLmNyZWF0ZU1ldGVyKG15TWV0ZXJFbGVtZW50LCBtZXRlck5vZGUsIHt9KTtcclxuXHJcbiAgICBlbmdpbmUuc3RhcnQoKTtcclxuXHJcbn0pOyIsIlxyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxlZnQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy5yaWdodCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnVwID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuXHJcbiAgICB0aGlzLmtleURvd25VcCA9IGZ1bmN0aW9uKHR5cGUsIGtleV9jb2RlKSB7XHJcbiAgICAgICAgbGV0IGRvd24gPSAodHlwZSA9PT0gJ2tleWRvd24nKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoKGtleV9jb2RlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0LmdldElucHV0KGRvd24pOyAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzODogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwLmdldElucHV0KGRvd24pOyAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM5OiBcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHQuZ2V0SW5wdXQoZG93bik7XHJcbiAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5Db250cm9sbGVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlclxyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLmRvd24gPSBmYWxzZTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyLkJ1dHRvbklucHV0LFxyXG5cclxuICAgIGdldElucHV0IDogZnVuY3Rpb24oZG93bikge1xyXG4gICAgICAgIGlmKHRoaXMuZG93biAhPSBkb3duKSB0aGlzLmFjdGl2ZSA9IGRvd247XHJcbiAgICAgICAgdGhpcy5kb3duID0gZG93bjtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlcjsiLCJjb25zdCBEaXNwbGF5ID0gZnVuY3Rpb24oY2FudmFzKXtcclxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSxcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIHRoaXMuZHJhd1JlY3RhbmdsZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgZHJhdycpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRyYXdOb3RlID0gZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IgfSA9IG5vdGU7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWxsID0gZnVuY3Rpb24oY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdCgwLCAwLCB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIuY2FudmFzLCAwLCAwLCB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQsIDAsIDAsIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgIGlmKGhlaWdodCAvIHdpZHRoID4gaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSB3aWR0aCAqIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gaGVpZ2h0IC8gaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIFxyXG59O1xyXG5cclxuRGlzcGxheS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IERpc3BsYXlcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheTsiLCJcclxuY29uc3QgRW5naW5lID0gZnVuY3Rpb24odGltZV9zdGVwLCB1cGRhdGUsIHJlbmRlcikge1xyXG4gICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gMDtcclxuICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWUgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWVfc3RlcCA9IHRpbWVfc3RlcCxcclxuXHJcbiAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG5cclxuICAgIHRoaXMucnVuID0gZnVuY3Rpb24odGltZV9zdGFtcCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSArPSB0aW1lX3N0YW1wIC0gdGhpcy50aW1lO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWVfc3RhbXA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXAgKiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSAtPSB0aGlzLnRpbWVfc3RlcDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHRpbWVfc3RhbXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudXBkYXRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aW1lX3N0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5oYW5kbGVSdW4gPSAodGltZV9zdGVwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ydW4odGltZV9zdGVwKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5FbmdpbmUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBFbmdpbmUsXHJcblxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgdGhpcy50aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTsiLCJjb25zdCBHYW1lID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy53b3JsZCA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgZnJpY3Rpb246IDAuOSxcclxuICAgICAgICBncmF2aXR5OiAzLFxyXG4gICAgICAgIHBsYXllcjogbmV3IEdhbWUuUGxheWVyKCksXHJcbiAgICAgICAgbm90ZUFycjogW10sXHJcbiAgICAgICAgYmFzc05vdGVBcnI6IFtdLFxyXG4gICAgICAgIGVpZ2h0Tm90ZUFycjogW10sXHJcbiAgICAgICAgaGVpZ2h0OiAxMjgsXHJcbiAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICBzY29yZTogMCxcclxuICAgICAgICBiYWNrZ3JvdW5kVHJhY2s6IG5ldyBBdWRpbygnRXJpYyBTa2lmZiAtIEEgTmlnaHQgT2YgRGl6enkgU3BlbGxzLm1wMycpLFxyXG5cclxuICAgICAgICBtZWxvZHlBcnI6IFtcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsIFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJyxcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2Q1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcblxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgXHJcblxyXG4gICAgICAgICAgICAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCBcclxuXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLCBcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdkNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYmFzc0FycjogW1xyXG4gICAgICAgICAgICAnZnMzLm1wMycsICdlMy5tcDMnLCAnZHMzLm1wMycsICdkMy5tcDMnLCAnZTMubXAzJywgXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsXHJcbiAgICAgICAgICAgICdmczMubXAzJywgJ2UzLm1wMycsICdkczMubXAzJywgJ2QzLm1wMycsICdlMy5tcDMnLCBcclxuICAgICAgICBdLFxyXG4gICAgICAgIGVpZ2h0QXJyOiBbXHJcbiAgICAgICAgICAgICdhNS5tcDMnLCAnZ3M1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdmczUubXAzJywgJ2dzNS5tcDMnLCdhNS5tcDMnLCAnZnM1Lm1wMycsICdmczYubXAzJyxcclxuICAgICAgICAgICAgJ2ZzNS5tcDMnLCAnZTUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYi5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG4gICAgICAgICAgICAnYTUubXAzJywgJ2dzNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZnM1Lm1wMycsICdnczUubXAzJywnYTUubXAzJywgJ2ZzNS5tcDMnLCAnZnM2Lm1wMycsXHJcbiAgICAgICAgICAgICdmczUubXAzJywgJ2U1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2Q2Lm1wMycsICdjczYubXAzJywgJ2I1Lm1wMycsICdhNS5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4UG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgMzUsIDQ1LCAzNSwgMjUsIDE1LCBcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCxcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDgwLCA3NSwgNzMsIDcwLCA1NSxcclxuXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDI1LCAzNSwgNDUsIDM1LCAyNSwgXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDI1LCAzNSwgNDUsIDM1LCAyNSwgXHJcblxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCA0NSwgMzUsIDQ1LCAzNSwgNDUsIFxyXG5cclxuICAgICAgICAgICAgNDUsIDQ1LCA0NSwgNDUsIDQ1LCA0NSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgMzUsIDQ1LCAzNSwgMjUsIDE1LFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDgwLCA3NSwgNzMsIDcwLCA1NSxcclxuICAgICAgICAgICAgMTUwLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeEJhc3NQb3NBcnI6IFtcclxuICAgICAgICAgICAgNjUsIDUwLCA2NSwgNDUsIDI1LFxyXG4gICAgICAgICAgICAzNSwgMzUsIDM1LCAzNSwgMzUsIDM1LFxyXG4gICAgICAgICAgICA2NSwgNTAsIDY1LCA0NSwgMjUsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4RWlnaHRQb3NBcnI6IFtcclxuICAgICAgICAgICAgNzUsIDcwLCA2NSwgNjAsIDYwLCA3MCwgNzUsIDYwLCA5NSxcclxuICAgICAgICAgICAgNjAsIDU1LCA1MCwgNDAsIDQwLCA1MCwgNDAsIDMwLCAyMCxcclxuICAgICAgICAgICAgNzUsIDcwLCA2NSwgNjAsIDYwLCA3MCwgNzUsIDYwLCA5NSxcclxuICAgICAgICAgICAgNjAsIDU1LCA1MCwgNDAsIDg1LCA4MCwgNzgsIDc1LCA2MCxcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBuYXJ1dG9NZWxvZHlBcnI6IFtcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJ1xyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRvQmFzc0FycjogW1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b0VpZ2h0QXJyOiBbXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRvWFBvc0FycjogW1xyXG4gICAgICAgICAgICA3MCwgNjUsIDcwLCA4MFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRveEJhc3NQb3NBcnI6W1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b3hFaWdodFBvc0FycjpbXHJcblxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIGZpbGxOYXJ1dG9Ob3RlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubmFydXRvTWVsb2R5QXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMubmFydXRvWFBvc0Fycltjb3VudF0sIHksIHRoaXMubmFydXRvTWVsb2R5QXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHJlc3RhcnRHYW1lOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm5vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lRW5kOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmRNZXNzYWdlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjb3JlID4gOTkpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXT1chIFBFUkZFQ1QgU0NPUkUhIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gOTAgJiYgdGhpcy5zY29yZSA8PSA5OSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1NPIENMT1NFIFRPIFBFUkZFQ1RJT04hIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gODAgJiYgdGhpcy5zY29yZSA8PSA4OSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdQUkVUVFkgR09PRCwgQlVUIEkgQkVUIFlPVSBDQU4gRE8gQkVUVEVSLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDcwICYmIHRoaXMuc2NvcmUgPD03OSkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdPSCBNQU4sIE1BWUJFIFlPVSBTSE9VTEQgUFJBQ1RJQ0UgQSBMSVRUTEUgTU9SRS4gUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA8PSA2OSl7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ0lTIFlPVVIgTU9OSVRPUiBPTj8gUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5pbm5lckhUTUwgPSBtZXNzYWdlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxOb3RlQXJyOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBsZXQgeSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMubm90ZUFyci5sZW5ndGggPCB0aGlzLm1lbG9keUFyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy54UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5tZWxvZHlBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKChjb3VudCA8PSA0KSB8fCAoY291bnQgPj0gNjcgJiYgY291bnQgPD0gNzApKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSA1ICYmIGNvdW50IDw9IDgpIHx8IChjb3VudCA+PSA3MSAmJiBjb3VudCA8PSA3NCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5IHx8IGNvdW50ID09PSA3NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDsgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxMCAmJiBjb3VudCA8PSAxMykgfHwgKGNvdW50ID49IDc2ICYmIGNvdW50IDw9IDc5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykgfHwgKGNvdW50ID49IDgwICYmIGNvdW50IDw9IDgzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMTkgJiYgY291bnQgPD0gMjIpIHx8IChjb3VudCA+PSA4NSAmJiBjb3VudCA8PSA4OCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAyMyAmJiBjb3VudCA8PSAyNikgfHwgKGNvdW50ID49IDg5ICYmIGNvdW50IDw9IDkyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDI3IHx8IGNvdW50ID09PSA5Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggKGNvdW50ID49IDI4ICYmIGNvdW50IDw9IDMxKSB8fCAoY291bnQgPj0gOTQgJiYgY291bnQgPD0gOTcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggKGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB8fCAoY291bnQgPj0gOTggJiYgY291bnQgPD0gMTAyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDM3ICYmIGNvdW50IDw9IDYwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDYxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID09PSA2Myl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFxyXG4gICAgICAgIGZpbGxCYXNzQXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBsZXQgeSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMuYmFzc05vdGVBcnIubGVuZ3RoIDwgdGhpcy5iYXNzQXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy54QmFzc1Bvc0Fycltjb3VudF0sIHksIHRoaXMuYmFzc0Fycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJhc3NOb3RlQXJyW2NvdW50IC0gMV0uc291bmQpO1xyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPD0gMyB8fCAoY291bnQgPj0gMTIgJiYgY291bnQgPD0gMTQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxNTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDQgfHwgY291bnQgPT09IDE1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA2MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDUgKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbGxFaWdodEFycjpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgeSA9IC04ODU7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMuZWlnaHROb3RlQXJyLmxlbmd0aCA8IHRoaXMuZWlnaHRBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhFaWdodFBvc0Fycltjb3VudF0sIHksIHRoaXMuZWlnaHRBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSA0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGNvdW50ID09PSA5IHx8IGNvdW50ID09PSA3NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDsgIFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTcpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxOCB8fCBjb3VudCA9PT0gODQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTkgJiYgY291bnQgPD0gMjIpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA+PSAzMiAmJiBjb3VudCA8PSAzNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBzY29yZVVwZGF0ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5zY29yZSArPSAoMTAwIC8gKHRoaXMubWVsb2R5QXJyLmxlbmd0aCArIHRoaXMuYmFzc0Fyci5sZW5ndGggKyB0aGlzLmVpZ2h0QXJyLmxlbmd0aCkpO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnNjb3JlICs9IDE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sbGlkZU9iamVjdDpmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgICAgICAgICBpZihvYmplY3QueCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC54ID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC52ZWxvY2l0eV94ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKG9iamVjdC54ICsgb2JqZWN0LndpZHRoID4gdGhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSB0aGlzLndpZHRoIC0gb2JqZWN0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgLy8gaWYob2JqZWN0LnkgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QueSA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZihvYmplY3QueSArIG9iamVjdC5oZWlnaHQgPiB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0Lmp1bXBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gdGhpcy5oZWlnaHQgLSBvYmplY3QuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICs9IHRoaXMuZ3Jhdml0eTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3ggKj0gdGhpcy5mcmljdGlvbjtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeSAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVPYmplY3QodGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLndvcmxkLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkdhbWUucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvciA6IEdhbWUgfTtcclxuXHJcbkdhbWUuUGxheWVyID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdGhpcy5jb2xvciA9ICcjZmYwMDAwJztcclxuICAgIHRoaXMuaGVpZ2h0ID0gNDtcclxuICAgIC8vIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICB0aGlzLnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgLy8gdGhpcy52ZWxvY2l0eV95ID0gMDtcclxuICAgIHRoaXMud2lkdGggPSAyNDtcclxuICAgIHRoaXMueCA9IDYwO1xyXG4gICAgdGhpcy55ID0gMTEwO1xyXG59O1xyXG5cclxuR2FtZS5QbGF5ZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBHYW1lLlBsYXllcixcclxuXHJcbiAgICAvLyBqdW1wOmZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIGlmKCF0aGlzLmp1bXBpbmcpe1xyXG4gICAgLy8gICAgICAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3Iuc2xpY2UoMCwgMSkgKyAnMCcgKyB0aGlzLmNvbG9yLnNsaWNlKDEsIDYpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICB0aGlzLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnZlbG9jaXR5X3kgLT0gMTU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBoaXROb3RlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG4gICAgfSxcclxuXHJcbiAgICBtb3ZlTGVmdDpmdW5jdGlvbigpIHsgXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94IC09IDAuNzU7XHJcbiAgICB9LFxyXG4gICAgbW92ZVJpZ2h0OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMudmVsb2NpdHlfeCArPSAwLjc1O1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eV94O1xyXG4gICAgICAgIC8vIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdhbWUuTm90ZSA9IGZ1bmN0aW9uKHgsIHksIGF1ZGlvRmlsZSl7XHJcbiAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuXHJcbiAgICBpZih0aGlzLmNvbG9yLmxlbmd0aCAhPSA3KXtcclxuICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oZWlnaHQgPSAyO1xyXG4gICAgdGhpcy53aWR0aCA9IDI7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuXHJcbiAgICB0aGlzLnZlbG9jaXR5X3kgPSAxO1xyXG5cclxuICAgIHRoaXMuaGl0ID0gZmFsc2U7XHJcbiAgICB0aGlzLnNvdW5kID0gbmV3IEF1ZGlvKGF1ZGlvRmlsZSk7XHJcbn1cclxuXHJcbkdhbWUuTm90ZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuTm90ZSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eV95O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9