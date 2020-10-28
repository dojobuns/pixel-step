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

var Game = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js"); // var webAudioPeakMeter = require('web-audio-peak-meter');


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
        console.log('hi');
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
  document.getElementById('song-rule').classList.add('playing');
  document.getElementById('top-rule').classList.add('playing');
  document.getElementById('bottom-rule').classList.add('playing');
  document.getElementById('third-rule').classList.add('playing');
  document.getElementById('fourth-rule').classList.add('playing');

  document.body.onkeyup = function (e) {
    if (e.keyCode === 32) {
      game.world.restartGame();
      document.getElementById('start-menu').classList.add('playing');
      document.getElementById('tremor').classList.remove('playing');
      document.getElementById('naruto').classList.remove('playing');
      document.getElementById('song-rule').classList.remove('playing');
      document.getElementById('top-rule').classList.remove('playing');
      document.getElementById('bottom-rule').classList.remove('playing');
      document.getElementById('third-rule').classList.remove('playing');
      document.getElementById('fourth-rule').classList.remove('playing');

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
    document.getElementById('song-rule').classList.add('playing');
    document.getElementById('top-rule').classList.add('playing');
    document.getElementById('bottom-rule').classList.add('playing');
    document.getElementById('third-rule').classList.add('playing');
    document.getElementById('fourth-rule').classList.add('playing');
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
    document.getElementById('song-rule').classList.add('playing');
    document.getElementById('top-rule').classList.add('playing');
    document.getElementById('bottom-rule').classList.add('playing');
    document.getElementById('third-rule').classList.add('playing');
    document.getElementById('fourth-rule').classList.add('playing');
    document.getElementById('score-container').classList.remove('playing'); // setInterval(() => noteDrop(), 1);
  });
  game.world.backgroundTrack.loop = true;
  game.world.backgroundTrack.volume = 0.3;
  game.world.backgroundTrack.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3M/YzgwNyJdLCJuYW1lcyI6WyJDb250cm9sbGVyIiwicmVxdWlyZSIsIkRpc3BsYXkiLCJFbmdpbmUiLCJHYW1lIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsImtleURvd25VcCIsImNvbnRyb2xsZXIiLCJ0eXBlIiwia2V5Q29kZSIsInJlc2l6ZSIsImRpc3BsYXkiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsImdhbWUiLCJ3b3JsZCIsImhlaWdodCIsIndpZHRoIiwicmVuZGVyIiwiZmlsbCIsImJhY2tncm91bmRfY29sb3IiLCJub3RlQXJyIiwiZm9yRWFjaCIsIm5vdGUiLCJ5IiwiaGl0IiwiZHJhd05vdGUiLCJsZW5ndGgiLCJnYW1lRW5kTWVzc2FnZSIsImdhbWVFbmQiLCJiYWNrZ3JvdW5kVHJhY2siLCJwbGF5IiwiYmFzc05vdGVBcnIiLCJlaWdodE5vdGVBcnIiLCJkcmF3UmVjdGFuZ2xlIiwicGxheWVyIiwieCIsImNvbG9yIiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJzY29yZSIsInRvRml4ZWQiLCJ0b1N0cmluZyIsInNjb3JlVXBkYXRlIiwic291bmQiLCJoaXROb3RlIiwiY29uc29sZSIsImxvZyIsInVwZGF0ZSIsImxlZnQiLCJhY3RpdmUiLCJtb3ZlTGVmdCIsInJpZ2h0IiwibW92ZVJpZ2h0IiwicXVlcnlTZWxlY3RvciIsImVuZ2luZSIsImJ1ZmZlciIsImNhbnZhcyIsIndpbmRvdyIsImNsYXNzTGlzdCIsImFkZCIsImJvZHkiLCJvbmtleXVwIiwicmVzdGFydEdhbWUiLCJyZW1vdmUiLCJjb250YWlucyIsInBhdXNlZCIsInBhdXNlIiwic29uZyIsImZpbGxOb3RlQXJyIiwiZmlsbEJhc3NBcnIiLCJmaWxsRWlnaHRBcnIiLCJmaWxsTmFydXRvTm90ZSIsImxvb3AiLCJ2b2x1bWUiLCJzdGFydCIsIkJ1dHRvbklucHV0IiwidXAiLCJrZXlfY29kZSIsImRvd24iLCJnZXRJbnB1dCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwiaGVpZ2h0X3dpZHRoX3JhdGlvIiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwidGltZV9zdGVwIiwiYWNjdW11bGF0ZWRfdGltZSIsImFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0IiwidW5kZWZpbmVkIiwidGltZSIsInVwZGF0ZWQiLCJydW4iLCJ0aW1lX3N0YW1wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGFuZGxlUnVuIiwicGVyZm9ybWFuY2UiLCJub3ciLCJzdG9wIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmcmljdGlvbiIsImdyYXZpdHkiLCJQbGF5ZXIiLCJBdWRpbyIsIm1lbG9keUFyciIsImJhc3NBcnIiLCJlaWdodEFyciIsInhQb3NBcnIiLCJ4QmFzc1Bvc0FyciIsInhFaWdodFBvc0FyciIsIm5hcnV0b01lbG9keUFyciIsIm5hcnV0b0Jhc3NBcnIiLCJuYXJ1dG9YUG9zQXJyIiwibmFydXRveEJhc3NQb3NBcnIiLCJjb3VudCIsInB1c2giLCJOb3RlIiwibWVzc2FnZSIsImNvbGxpZGVPYmplY3QiLCJvYmplY3QiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJhbmRvbSIs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LEdBQXpCLEdBQStCLEtBQUtoRyxLQUFMLENBQVdnRyxLQUFYLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLENBQTVDO0FBQ0g7O0FBRUQsT0FBS3JILE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLbUIsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsT0FBS1osQ0FBTCxHQUFTQSxDQUFUO0FBRUEsT0FBSzBHLFVBQUwsR0FBa0IsQ0FBbEI7QUFFQSxPQUFLekcsR0FBTCxHQUFXLEtBQVg7QUFDQSxPQUFLbUIsS0FBTCxHQUFhLElBQUlvRSxLQUFKLENBQVVvQixTQUFWLENBQWI7QUFDSCxDQWhCRDs7QUFrQkFuSSxJQUFJLENBQUM0SCxJQUFMLENBQVU1QyxTQUFWLEdBQXNCO0FBQ2xCQyxhQUFXLEVBQUdqRixJQUFJLENBQUM0SCxJQUREO0FBRWxCN0UsUUFBTSxFQUFFLGtCQUFVO0FBQ2QsU0FBS3hCLENBQUwsSUFBVSxLQUFLMEcsVUFBZjtBQUNIO0FBSmlCLENBQXRCO0FBU0EvQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJuRixJQUFqQixDOzs7Ozs7Ozs7OztBQzdlQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5jb25zdCBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zY3JpcHRzL2NvbnRyb2xsZXInKTtcclxuY29uc3QgRGlzcGxheSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9kaXNwbGF5Jyk7XHJcbmNvbnN0IEVuZ2luZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9lbmdpbmUnKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9nYW1lJyk7XHJcbi8vIHZhciB3ZWJBdWRpb1BlYWtNZXRlciA9IHJlcXVpcmUoJ3dlYi1hdWRpby1wZWFrLW1ldGVyJyk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGdhbWUud29ybGQubm90ZUFycltnYW1lLndvcmxkLm5vdGVBcnIubGVuZ3RoIC0gMV0ueSA+IDExOCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmQoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG5cclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IChnYW1lLndvcmxkLnNjb3JlID09PSAwKSA/IChcclxuICAgICAgICAgICAgJzAlJ1xyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIChnYW1lLndvcmxkLnNjb3JlLnRvRml4ZWQoMikpLnRvU3RyaW5nKCkgKyAnJSdcclxuICAgICAgICApIFxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuaGl0Tm90ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICBcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIubGVmdC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLnggKyAxNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQubm90ZUFyclsxXS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY29udHJvbGxlci5yaWdodC5hY3RpdmUpe1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLnggKyAxNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQubm90ZUFyclsxXS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYoY29udHJvbGxlci51cC5hY3RpdmUpe1xyXG4gICAgICAgIC8vICAgICBnYW1lLndvcmxkLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRyb2xsZXIudXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBsZXQgbm90ZURyb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICAgICAgLy8gZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIGlmKGdhbWUud29ybGQubm90ZUFycltnYW1lLndvcmxkLm5vdGVBcnIubGVuZ3RoIC0gMV0ueSA+IDExOCl7XHJcbiAgICAgICAgLy8gICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmQoKTtcclxuICAgICAgICAvLyAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vIGdhbWUud29ybGQuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAvLyAgICAgaWYobm90ZS55IDwgMTIwICYmICFub3RlLmhpdCkge1xyXG4gICAgICAgIC8vICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0pXHJcblxyXG4gICAgICAgIC8vIGdhbWUud29ybGQuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAvLyAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGxldCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoKTtcclxuICAgIGxldCBkaXNwbGF5ID0gbmV3IERpc3BsYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykpO1xyXG4gICAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gICAgbGV0IGVuZ2luZSA9IG5ldyBFbmdpbmUoMTAwMC8zMCwgcmVuZGVyLCB1cGRhdGUpO1xyXG5cclxuICAgIGRpc3BsYXkuYnVmZmVyLmNhbnZhcy5oZWlnaHQgPSBnYW1lLndvcmxkLmhlaWdodDtcclxuICAgIGRpc3BsYXkuYnVmZmVyLmNhbnZhcy53aWR0aCA9IGdhbWUud29ybGQud2lkdGg7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duVXApO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xyXG5cclxuICAgIHJlc2l6ZSgpO1xyXG4gICAgLy8gZGVidWdnZXI7XHJcbiAgICBcclxuICAgIGRpc3BsYXkuZmlsbChnYW1lLndvcmxkLmJhY2tncm91bmRfY29sb3IpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb25nLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm90dG9tLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcmQtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3VydGgtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICBkb2N1bWVudC5ib2R5Lm9ua2V5dXAgPSBmdW5jdGlvbihlKXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDMyKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5yZXN0YXJ0R2FtZSgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbmctcnVsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC1ydWxlJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm90dG9tLXJ1bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlyZC1ydWxlJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm91cnRoLXJ1bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGl4ZWwtbG9nbycpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PT0gODApIHtcclxuICAgICAgICAgICAgaWYoIWdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlZCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuc29uZyA9ICd0cmVtb3InO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTm90ZUFycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxCYXNzQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEVpZ2h0QXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb25nLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvdHRvbS1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcmQtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvdXJ0aC1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiBub3RlRHJvcCgpLCAxKTtcclxuICAgIH0pXHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25hcnV0bycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5zb25nID0gJ25hcnV0byc7XHJcblxyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxOYXJ1dG9Ob3RlKCk7XHJcbiAgICAgICAgICAgIC8vIGdhbWUud29ybGQuZmlsbE5hcnV0b0VpZ2h0KCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlKCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb25nLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvdHRvbS1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcmQtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvdXJ0aC1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldEludGVydmFsKCgpID0+IG5vdGVEcm9wKCksIDEpO1xyXG4gICAgfSlcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLmxvb3AgPSB0cnVlO1xyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sudm9sdW1lID0gMC4zO1xyXG4gICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG5cclxuICAgIGVuZ2luZS5zdGFydCgpO1xyXG5cclxufSk7IiwiXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubGVmdCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnJpZ2h0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMudXAgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG5cclxuICAgIHRoaXMua2V5RG93blVwID0gZnVuY3Rpb24odHlwZSwga2V5X2NvZGUpIHtcclxuICAgICAgICBsZXQgZG93biA9ICh0eXBlID09PSAna2V5ZG93bicpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBzd2l0Y2goa2V5X2NvZGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQuZ2V0SW5wdXQoZG93bik7ICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM4OiBcclxuICAgICAgICAgICAgICAgIHRoaXMudXAuZ2V0SW5wdXQoZG93bik7ICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodC5nZXRJbnB1dChkb3duKTtcclxuICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyXHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuZG93biA9IGZhbHNlO1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQsXHJcblxyXG4gICAgZ2V0SW5wdXQgOiBmdW5jdGlvbihkb3duKSB7XHJcbiAgICAgICAgaWYodGhpcy5kb3duICE9IGRvd24pIHRoaXMuYWN0aXZlID0gZG93bjtcclxuICAgICAgICB0aGlzLmRvd24gPSBkb3duO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyOyIsImNvbnN0IERpc3BsYXkgPSBmdW5jdGlvbihjYW52YXMpe1xyXG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgdGhpcy5kcmF3UmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcyBpcyBkcmF3Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZHJhd05vdGUgPSBmdW5jdGlvbihub3RlKSB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciB9ID0gbm90ZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbGwgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlci5jYW52YXMsIDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCwgMCwgMCwgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgaWYoaGVpZ2h0IC8gd2lkdGggPiBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IHdpZHRoICogaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSBoZWlnaHQgLyBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9O1xyXG4gICAgXHJcbn07XHJcblxyXG5EaXNwbGF5LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRGlzcGxheVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5OyIsIlxyXG5jb25zdCBFbmdpbmUgPSBmdW5jdGlvbih0aW1lX3N0ZXAsIHVwZGF0ZSwgcmVuZGVyKSB7XHJcbiAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSAwO1xyXG4gICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZSA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZV9zdGVwID0gdGltZV9zdGVwLFxyXG5cclxuICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcblxyXG4gICAgdGhpcy5ydW4gPSBmdW5jdGlvbih0aW1lX3N0YW1wKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lICs9IHRpbWVfc3RhbXAgLSB0aGlzLnRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGltZV9zdGFtcDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCAqIDMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXApIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lIC09IHRoaXMudGltZV9zdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodGltZV9zdGFtcCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy51cGRhdGVkKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRpbWVfc3RhbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZVJ1biA9ICh0aW1lX3N0ZXApID0+IHtcclxuICAgICAgICB0aGlzLnJ1bih0aW1lX3N0ZXApO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVuZ2luZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEVuZ2luZSxcclxuXHJcbiAgICBzdGFydDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB0aGlzLnRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsImNvbnN0IEdhbWUgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLndvcmxkID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBmcmljdGlvbjogMC45LFxyXG4gICAgICAgIGdyYXZpdHk6IDMsXHJcbiAgICAgICAgcGxheWVyOiBuZXcgR2FtZS5QbGF5ZXIoKSxcclxuICAgICAgICBub3RlQXJyOiBbXSxcclxuICAgICAgICBiYXNzTm90ZUFycjogW10sXHJcbiAgICAgICAgZWlnaHROb3RlQXJyOiBbXSxcclxuICAgICAgICBoZWlnaHQ6IDEyOCxcclxuICAgICAgICB3aWR0aDogMTUwLFxyXG4gICAgICAgIHNjb3JlOiAwLFxyXG4gICAgICAgIGJhY2tncm91bmRUcmFjazogbmV3IEF1ZGlvKCdFcmljIFNraWZmIC0gQSBOaWdodCBPZiBEaXp6eSBTcGVsbHMubXAzJyksXHJcbiAgICAgICAgc29uZzogJycsXHJcblxyXG4gICAgICAgIG1lbG9keUFycjogW1xyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJywgXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnZDUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJyxcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCBcclxuXHJcbiAgICAgICAgICAgICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsIFxyXG5cclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsIFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJyxcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2Q1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBiYXNzQXJyOiBbXHJcbiAgICAgICAgICAgICdmczMubXAzJywgJ2UzLm1wMycsICdkczMubXAzJywgJ2QzLm1wMycsICdlMy5tcDMnLCBcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAgICAgJ2ZzMy5tcDMnLCAnZTMubXAzJywgJ2RzMy5tcDMnLCAnZDMubXAzJywgJ2UzLm1wMycsIFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZWlnaHRBcnI6IFtcclxuICAgICAgICAgICAgJ2E1Lm1wMycsICdnczUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2ZzNS5tcDMnLCAnZ3M1Lm1wMycsJ2E1Lm1wMycsICdmczUubXAzJywgJ2ZzNi5tcDMnLFxyXG4gICAgICAgICAgICAnZnM1Lm1wMycsICdlNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdiLm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcbiAgICAgICAgICAgICdhNS5tcDMnLCAnZ3M1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdmczUubXAzJywgJ2dzNS5tcDMnLCdhNS5tcDMnLCAnZnM1Lm1wMycsICdmczYubXAzJyxcclxuICAgICAgICAgICAgJ2ZzNS5tcDMnLCAnZTUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnZDYubXAzJywgJ2NzNi5tcDMnLCAnYjUubXAzJywgJ2E1Lm1wMycsICdmczUubXAzJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhQb3NBcnI6IFtcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCAzNSwgNDUsIDM1LCAyNSwgMTUsIFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgODAsIDc1LCA3MywgNzAsIDU1LFxyXG5cclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgMjUsIDM1LCA0NSwgMzUsIDI1LCBcclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgMjUsIDM1LCA0NSwgMzUsIDI1LCBcclxuXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDQ1LCAzNSwgNDUsIDM1LCA0NSwgXHJcblxyXG4gICAgICAgICAgICA0NSwgNDUsIDQ1LCA0NSwgNDUsIDQ1LFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCAzNSwgNDUsIDM1LCAyNSwgMTUsXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgODAsIDc1LCA3MywgNzAsIDU1LFxyXG4gICAgICAgICAgICAxNTAsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4QmFzc1Bvc0FycjogW1xyXG4gICAgICAgICAgICA2NSwgNTAsIDY1LCA0NSwgMjUsXHJcbiAgICAgICAgICAgIDM1LCAzNSwgMzUsIDM1LCAzNSwgMzUsXHJcbiAgICAgICAgICAgIDY1LCA1MCwgNjUsIDQ1LCAyNSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhFaWdodFBvc0FycjogW1xyXG4gICAgICAgICAgICA3NSwgNzAsIDY1LCA2MCwgNjAsIDcwLCA3NSwgNjAsIDk1LFxyXG4gICAgICAgICAgICA2MCwgNTUsIDUwLCA0MCwgNDAsIDUwLCA0MCwgMzAsIDIwLFxyXG4gICAgICAgICAgICA3NSwgNzAsIDY1LCA2MCwgNjAsIDcwLCA3NSwgNjAsIDk1LFxyXG4gICAgICAgICAgICA2MCwgNTUsIDUwLCA0MCwgODUsIDgwLCA3OCwgNzUsIDYwLFxyXG4gICAgICAgIF0sXHJcblxyXG4gICAgICAgIG5hcnV0b01lbG9keUFycjogW1xyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2EzLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJyxcclxuICAgICAgICAgICAgJ2c1Lm1wMycsICdmczUubXAzJywgJ2Q1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdkNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZDUubXAzJywgJ2U1Lm1wMycsICdmczUubXAzJywgLy8zM1xyXG5cclxuICAgICAgICAgICAgJ2NzNS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2EubXAzJywgJ2EubXAzJywgLy80NlxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy81NlxyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vNjFcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2EubXAzJywgJ2EubXAzJywgLy83NFxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy84NFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy84OVxyXG5cclxuICAgICAgICAgICAgJ2IzLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgLy8xMDJcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsICAvLzExNVxyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8xMjMgRUlHSFRTIFNUQVJUIEhFUkVcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTMxXHJcblxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzEzOVxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTQ0XHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzE1MlxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMTYyXHJcbiAgICAgICAgICAgICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vMTY4XHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgLy8xNzNcclxuXHJcbiAgICAgICAgICAgICdkLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsIC8vMTgxXHJcbiAgICAgICAgICAgICdlLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2cubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMTkxXHJcbiAgICAgICAgICAgICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vMTk3XHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzIwMlxyXG5cclxuICAgICAgICAgICAgJ2EubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdlLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnYi5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8yMTRcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8yMjFcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAvLzIzMVxyXG4gICAgICAgICAgICAnYTMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzIzNlxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRvQmFzc0FycjogW1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICAgIC8vIG5hcnV0b0VpZ2h0QXJyOiBbXHJcbiAgICAgICAgLy8gICAgICdhMy5tcDMnLCAnZDMubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdkMy5tcDMnLCAnYjMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdiMy5tcDMnLCAnZTMubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2ZzMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2EzLm1wMycsICdhMy5tcDMnLCAnZTMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdhMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2QubXAzJywgJ2QubXAzJywgJ2QzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2UzLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdmczMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsXHJcbiAgICAgICAgLy8gICAgICdhMy5tcDMnLCAnYTMubXAzJywgJ2UzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCAnYTMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdkMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdlMy5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCBcclxuICAgICAgICAvLyAgICAgJ2EzLm1wMycsICdhMy5tcDMnLCAnZTMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLFxyXG4gICAgICAgIC8vIF0sXHJcbiAgICAgICAgLy8gbmFydXRveEVpZ2h0UG9zQXJyOltcclxuICAgICAgICAvLyAgICAgNTUsIDQwLCA1NSwgNzAsIDcwLCA2MCwgNjAsIFxyXG4gICAgICAgIC8vICAgICA2MCwgNDAsIDUwLCA2MCwgNzUsIDcwLCA3MCwgXHJcbiAgICAgICAgLy8gICAgIDYwLCA1NSwgNTAsIDg1LCA4MCwgNTUsIDUwLCA4NSwgODAsIDU1LCA1MCxcclxuICAgICAgICAvLyBdLFxyXG4gICAgICAgIG5hcnV0b1hQb3NBcnI6IFtcclxuICAgICAgICAgICAgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCwgNDUsIDUwLCA2MCwgNDUsIDUwLFxyXG4gICAgICAgICAgICA2MCwgNDUsIDYwLCA2NSwgNDUsIDY1LCA3NSwgODAsIDc1LCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDExNSwgMTEwLCAxMDAsIDExNSwgMTEwLCAxMDAsIDExNSwgMTEwLCAxMDAsIDEwNSwgMTEwLFxyXG5cclxuICAgICAgICAgICAgOTUsIDc1LCA2MCwgNjUsIDc1LCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LCA4NSwgODUsXHJcbiAgICAgICAgICAgIDY1LCA1NSwgNjUsIDYwLCA5MCwgODUsIDYwLCA5MCwgODUsIDYwLFxyXG5cclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLFxyXG4gICAgICAgICAgICA3NSwgNjAsIDY1LCA2NSwgNzUsIDYwLCA2MCwgNzUsIDY1LCA2MCwgNjUsIDg1LCA4NSxcclxuICAgICAgICAgICAgNjUsIDU1LCA2NSwgNjAsIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsIFxyXG4gICAgICAgICAgICA2MCwgNTUsIDYwLCA2NSwgNjAsXHJcblxyXG4gICAgICAgICAgICA1MCwgNzUsIDc1LCA2MCwgNjAsIDc1LCA3NSwgNjAsIDYwLCA5MCwgODUsIDc1LCA2MCxcclxuICAgICAgICAgICAgNTAsIDU1LCA2MCwgNjAsIDU1LCA2MCwgNjUsIDY1LCA2NSwgNzUsIDY1LCA2MCwgNjUsXHJcblxyXG4gICAgICAgICAgICA2MCwgNDUsIDYwLCA3NSwgNzUsIDY1LCA2MCwgNjUsXHJcbiAgICAgICAgICAgIDY1LCA0NSwgNTUsIDY1LCA4MCwgNzUsIDY1LCA3NSxcclxuXHJcbiAgICAgICAgICAgIDY1LCA2MCwgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDc1LFxyXG5cclxuICAgICAgICAgICAgNjAsIDQ1LCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LFxyXG4gICAgICAgICAgICA2NSwgNDUsIDU1LCA2NSwgODAsIDc1LCA3NSwgNzUgLCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsIFxyXG4gICAgICAgICAgICA2MCwgNTUsIDYwLCA2NSwgNzUsXHJcblxyXG4gICAgICAgICAgICA2MCwgNTAsIDYwLCA3NSwgNzUsIDY1LCA2MCwgNjUsXHJcbiAgICAgICAgICAgIDY1LCA0NSwgNTUsIDY1LCA2NSwgODAsIDg1LCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICA5MCwgODUsIDYwLCA5MCwgODUsIDYwLFxyXG4gICAgICAgICAgICA2MCwgNTUsIDYwLCA2NSwgNjAsIFxyXG5cclxuICAgICAgICAgICAgODUsIDc1LCA2NSwgNjUsIDg1LCA3NSwgNjUsIDY1LCA5MCwgNzUsIDY1LCA2MCxcclxuICAgICAgICAgICAgNTAsIDU1LCA2MCwgNjAsIDc1LCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDUwLCA1MCwgNDUsIDUwLCA2MCwgNDUsIDUwLCA0NSwgNTAsIDYwLFxyXG4gICAgICAgICAgICA0NSwgNTAsIDQ1LCA2MCwgNjVcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICBuYXJ1dG94QmFzc1Bvc0FycjpbXHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgIFxyXG5cclxuICAgICAgICBmaWxsTmFydXRvTm90ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgeSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgIHdoaWxlKHRoaXMubm90ZUFyci5sZW5ndGggPCB0aGlzLm5hcnV0b01lbG9keUFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLm5hcnV0b1hQb3NBcnJbY291bnRdLCB5LCB0aGlzLm5hcnV0b01lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPCA0IHx8IGNvdW50ID09PSA3MyB8fCBjb3VudCA9PT0gOTAgfHwgY291bnQgPT09IDk0IHx8IGNvdW50ID09PSA5OCB8fCBjb3VudCA9PT0gMTAwICB8fCAoY291bnQgPj0gMTIxICYmIGNvdW50IDw9IDEyMikgfHwgKGNvdW50ID49IDEyOSAmJiBjb3VudCA8PSAxMzApIHx8IChjb3VudCA+PSAxNTAgJiYgY291bnQgPD0gMTUxKSB8fCAoY291bnQgPj0gMTU4ICYmIGNvdW50IDw9IDE1OSkgfHwgKGNvdW50ID49IDE3OSAmJiBjb3VudCA8PSAxODApIHx8IChjb3VudCA+PSAxODUgJiYgY291bnQgPD0gMTg2KSB8fCBjb3VudCA9PT0gMjAzIHx8IGNvdW50ID09PSAyMDcgfHwgY291bnQgPT09IDIxMSB8fCAoY291bnQgPj0gMjIzICYmIGNvdW50IDw9IDIyNSkgfHwgKGNvdW50ID49IDIyNyAmJiAgY291bnQgPD0gMjMwKSB8fCAoY291bnQgPj0gMjMyICYmICBjb3VudCA8PSAyMzUpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDQgfHwgY291bnQgPT09IDI1IHx8IGNvdW50ID09PSAyNiB8fCBjb3VudCA9PT0gMjkgfHwgY291bnQgPT09IDMwIHx8IGNvdW50ID09PSAzMiB8fCBjb3VudCA9PT0gMzMgfHwgY291bnQgPT09IDQ2IHx8IGNvdW50ID09PSA3NCB8fCBjb3VudCA9PT0gOTIgfHwgY291bnQgPT09IDk2IHx8IGNvdW50ID09PSAyMDQgfHwgY291bnQgPT09IDIwOCB8fCBjb3VudCA9PT0gMjEyIHx8IGNvdW50ID09PSAyMjYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkgfHwgY291bnQgPT09IDEwIHx8IGNvdW50ID09PSAyMCB8fCBjb3VudCA9PT0gMjEgfHwgKGNvdW50ID49IDQwICYmIGNvdW50IDw9IDQzKSB8fCBjb3VudCA9PT0gNDUgfHwgKGNvdW50ID49IDY0ICYmIGNvdW50IDw9IDY1KSB8fCAoY291bnQgPj0gNjcgJiYgY291bnQgPD0gNjgpIHx8IChjb3VudCA+PSA3MCAmJiBjb3VudCA8PSA3MSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOSB8fCAoY291bnQgPj0gMTEgJiYgY291bnQgPD0gMTIpIHx8IChjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNSkgfHwgY291bnQgPT09IDE3IHx8IGNvdW50ID09PSAxOCB8fCBjb3VudCA9PT0gMTkgfHwgY291bnQgPT09IDIyIHx8IGNvdW50ID09PSAyMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDEzIHx8IGNvdW50ID09PSAxNiB8fCBjb3VudCA9PT0gMjQgfHwgY291bnQgPT09IDI3IHx8IGNvdW50ID09PSAzMSB8fCAoY291bnQgPj0gMzQgJiYgY291bnQgPD0gMzcpIHx8IGNvdW50ID09PSAzOSB8fCBjb3VudCA9PT0gNDQgfHwgKGNvdW50ID49IDQ3ICYmIGNvdW50IDw9IDQ5KSB8fCAoY291bnQgPj0gNTEgJiYgY291bnQgPD0gNTIpIHx8IChjb3VudCA+PSA1NCAmJiBjb3VudCA8PSA1NSkgfHwgKGNvdW50ID49IDU4ICYmIGNvdW50IDw9IDYzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSAyOCB8fCBjb3VudCA9PT0gMzggfHwgY291bnQgPT0gNjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA1MCB8fCBjb3VudCA9PT0gNTMgfHwgKGNvdW50ID49IDU2ICYmIGNvdW50IDw9IDU3KSB8fCBjb3VudCA9PT0gNzggfHwgY291bnQgPT09IDgxIHx8IChjb3VudCA+PSA4NCAmJiBjb3VudCA8PSA4NSkgfHwgY291bnQgPT09IDg5IHx8IGNvdW50ID09PSAxMDIgfHwgKGNvdW50ID49IDEwNSAmJiBjb3VudCA8PSAxMDYpIHx8IChjb3VudCA+PSAxMDkgJiYgY291bnQgPD0gMTExKSB8fCBjb3VudCA9PT0gMTIzIHx8IGNvdW50ID09PSAxMzMgfHwgY291bnQgPT09IDEzNiB8fCAoY291bnQgPj0gMTM5ICYmIGNvdW50IDw9IDE0MCkgfHwgY291bnQgPT09IDE1MiB8fCBjb3VudCA9PT0gMTYyIHx8IGNvdW50ID09PSAxNjUgfHwgKGNvdW50ID49IDE2OCAmJiBjb3VudCA8PSAxNjkpIHx8IGNvdW50ID09PSAxODEgfHwgY291bnQgPT09IDE5MSB8fCBjb3VudCA9PT0gMTk0IHx8IChjb3VudCA+PSAxOTcgJiYgY291bnQgPD0gMTk4KSB8fCBjb3VudCA9PT0gMjAyIHx8IGNvdW50ID09PSAyMTQgfHwgKGNvdW50ID49IDIxNyAmJiBjb3VudCA8PSAyMTgpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2OSB8fCBjb3VudCA9PT0gNzIgfHwgKGNvdW50ID49IDc1ICYmIGNvdW50IDw9IDc3KSB8fCAoY291bnQgPj0gNzkgJiYgY291bnQgPD0gODApIHx8IChjb3VudCA+PSA4MiAmJiBjb3VudCA8PSA4MykgfHwgKGNvdW50ID49IDg2ICYmIGNvdW50IDw9IDg4KSB8fCBjb3VudCA9PT0gOTEgfHwgY291bnQgPT09IDkzIHx8IGNvdW50ID09PSA5NSB8fCBjb3VudCA9PT0gOTcgfHwgY291bnQgPT09IDk5IHx8IGNvdW50ID09PSAxMDEgfHwgKGNvdW50ID49IDEwMyAmJiBjb3VudCA8PSAxMDQpIHx8IChjb3VudCA+PSAxMDcgJiYgY291bnQgPD0gMTA4KSB8fCAoY291bnQgPj0gMTEyICYmIGNvdW50IDw9IDEyMCkgfHwgKGNvdW50ID49IDEyNCAmJiBjb3VudCA8PSAxMjgpIHx8IChjb3VudCA+PSAxMzEgJiYgY291bnQgPD0gMTMyKSB8fCAoY291bnQgPj0gMTM0ICYmIGNvdW50IDw9IDEzNSkgfHwgKGNvdW50ID49IDEzNyAmJiBjb3VudCA8PSAxMzgpIHx8IChjb3VudCA+PSAxNDEgJiYgY291bnQgPD0gMTQ5KSB8fCAoY291bnQgPj0gMTUzICYmIGNvdW50IDw9IDE1NykgfHwgKGNvdW50ID49IDE2MCAmJiBjb3VudCA8PSAxNjEpIHx8IChjb3VudCA+PSAxNjMgJiYgY291bnQgPD0gMTY0KSB8fCAoY291bnQgPj0gMTY2ICYmIGNvdW50IDw9IDE2NykgfHwgKGNvdW50ID49IDE3MCAmJiBjb3VudCA8PSAxNzgpIHx8IChjb3VudCA+PSAxODIgJiYgY291bnQgPD0gMTg0KSB8fCAoY291bnQgPj0gMTg3ICYmIGNvdW50IDw9IDE5MCkgfHwgKGNvdW50ID49IDE5MiAmJiBjb3VudCA8PSAxOTMpIHx8IChjb3VudCA+PSAxOTUgJiYgY291bnQgPD0gMTk2KSB8fCAoY291bnQgPj0gMTk5ICYmIGNvdW50IDw9IDIwMSkgfHwgKGNvdW50ID49IDIwNSAmJiBjb3VudCA8PSAyMDYpIHx8IChjb3VudCA+PSAyMDkgJiYgY291bnQgPD0gMjEwKSB8fCBjb3VudCA9PT0gMjEzIHx8IChjb3VudCA+PSAyMTUgJiYgY291bnQgPD0gMjE2KSB8fCAoY291bnQgPj0gMjE5ICYmIGNvdW50IDw9IDIyMikgfHwgY291bnQgPT09IDIzMSB8fCBjb3VudCA9PT0gMjM2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gZmlsbE5hcnV0b0VpZ2h0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gICAgIGxldCB5ID0gLTEzMzU7XHJcbiAgICAgICAgLy8gICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgLy8gICAgIHdoaWxlICh0aGlzLmVpZ2h0Tm90ZUFyci5sZW5ndGggPCB0aGlzLm5hcnV0b0VpZ2h0QXJyLmxlbmd0aCl7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy5uYXJ1dG94RWlnaHRQb3NBcnJbY291bnRdLCB5LCB0aGlzLm5hcnV0b0VpZ2h0QXJyW2NvdW50XSkpO1xyXG4gICAgICAgIC8vICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgLy8gICAgICAgICBpZihjb3VudCA8IDcgfHwgKGNvdW50ID49IDggJiYgY291bnQgPD0gMTkpIHx8IChjb3VudCA+PSAyMSAmJiBjb3VudCA8PSAyMykgfHwgY291bnQgPT09IDI1IHx8IChjb3VudCA+PSAyNyAmJiBjb3VudCA8PSAzNikpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgIC8vICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA3IHx8IGNvdW50ID09PSAyNil7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjAgfHwgY291bnQgPT09IDI0KXtcclxuICAgICAgICAvLyAgICAgICAgICAgICB5IC09IDE1O1xyXG4gICAgICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0sXHJcblxyXG4gICAgICAgIHJlc3RhcnRHYW1lOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm5vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlID0gMDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lRW5kOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmRNZXNzYWdlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCBtZXNzYWdlID0gJyc7XHJcbiAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICBpZih0aGlzLnNjb3JlID49IDk5Ljgpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXT1chIFBFUkZFQ1QgU0NPUkUhIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gOTAgJiYgdGhpcy5zY29yZSA8IDk5Ljgpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTTyBDTE9TRSBUTyBQRVJGRUNUSU9OISBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDgwICYmIHRoaXMuc2NvcmUgPD0gODkpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnUFJFVFRZIEdPT0QsIEJVVCBJIEJFVCBZT1UgQ0FOIERPIEJFVFRFUi4gUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA3MCAmJiB0aGlzLnNjb3JlIDw9NzkpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnT0ggTUFOLCBNQVlCRSBZT1UgU0hPVUxEIFBSQUNUSUNFIEEgTElUVExFIE1PUkUuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPD0gNjkpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdJUyBZT1VSIE1PTklUT1IgT04/IFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaWxsTm90ZUFycjpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLm5vdGVBcnIubGVuZ3RoIDwgdGhpcy5tZWxvZHlBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueFBvc0Fycltjb3VudF0sIHksIHRoaXMubWVsb2R5QXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigoY291bnQgPD0gNCkgfHwgKGNvdW50ID49IDY3ICYmIGNvdW50IDw9IDcwKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB8fCAoY291bnQgPj0gNzEgJiYgY291bnQgPD0gNzQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOSB8fCBjb3VudCA9PT0gNzUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7ICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpIHx8IChjb3VudCA+PSA3NiAmJiBjb3VudCA8PSA3OSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTcpIHx8IChjb3VudCA+PSA4MCAmJiBjb3VudCA8PSA4MykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxOCB8fCBjb3VudCA9PT0gODQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE5ICYmIGNvdW50IDw9IDIyKSB8fCAoY291bnQgPj0gODUgJiYgY291bnQgPD0gODgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHx8IChjb3VudCA+PSA4OSAmJiBjb3VudCA8PSA5MikpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyB8fCBjb3VudCA9PT0gOTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIChjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkgfHwgKGNvdW50ID49IDk0ICYmIGNvdW50IDw9IDk3KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIChjb3VudCA+PSAzMiAmJiBjb3VudCA8PSAzNikgfHwgKGNvdW50ID49IDk4ICYmIGNvdW50IDw9IDEwMikpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA+PSAzNyAmJiBjb3VudCA8PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2MSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDYyKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gNjMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBmaWxsQmFzc0FycjpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLmJhc3NOb3RlQXJyLmxlbmd0aCA8IHRoaXMuYmFzc0Fyci5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEJhc3NQb3NBcnJbY291bnRdLCB5LCB0aGlzLmJhc3NBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycltjb3VudCAtIDFdLnNvdW5kKTtcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDMgfHwgKGNvdW50ID49IDEyICYmIGNvdW50IDw9IDE0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTUwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA0IHx8IGNvdW50ID09PSAxNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA1ICl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDYpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID09PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmJhc3NOb3RlQXJyKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaWxsRWlnaHRBcnI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHkgPSAtODg1O1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLmVpZ2h0Tm90ZUFyci5sZW5ndGggPCB0aGlzLmVpZ2h0QXJyLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy54RWlnaHRQb3NBcnJbY291bnRdLCB5LCB0aGlzLmVpZ2h0QXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoY291bnQgPD0gNCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSA1ICYmIGNvdW50IDw9IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihjb3VudCA9PT0gOSB8fCBjb3VudCA9PT0gNzUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7ICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxMCAmJiBjb3VudCA8PSAxMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMFxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDg0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDE5ICYmIGNvdW50IDw9IDIyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyMyAmJiBjb3VudCA8PSAyNikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDI3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID49IDI4ICYmIGNvdW50IDw9IDMxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPj0gMzIgJiYgY291bnQgPD0gMzYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2NvcmVVcGRhdGU6ZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLnNvbmcgPT09ICd0cmVtb3InKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gKDEwMCAvICh0aGlzLm1lbG9keUFyci5sZW5ndGggKyB0aGlzLmJhc3NBcnIubGVuZ3RoICsgdGhpcy5laWdodEFyci5sZW5ndGgpKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKCB0aGlzLnNvbmcgPT09ICduYXJ1dG8nKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gKDEwMCAvICh0aGlzLm5hcnV0b01lbG9keUFyci5sZW5ndGggKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdGhpcy5zY29yZSArPSAxO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbGxpZGVPYmplY3Q6ZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgICAgICAgICAgaWYob2JqZWN0LnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihvYmplY3QueCArIG9iamVjdC53aWR0aCA+IHRoaXMud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC54ID0gdGhpcy53aWR0aCAtIG9iamVjdC53aWR0aDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC52ZWxvY2l0eV94ID0gMDtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKG9iamVjdC55IDwgMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2UgaWYob2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0ID4gdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC5qdW1waW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QueSA9IHRoaXMuaGVpZ2h0IC0gb2JqZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeSArPSB0aGlzLmdyYXZpdHk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV94ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKj0gdGhpcy5mcmljdGlvbjtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RlLnVwZGF0ZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgdGhpcy5jb2xsaWRlT2JqZWN0KHRoaXMucGxheWVyKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy53b3JsZC51cGRhdGUoKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5HYW1lLnByb3RvdHlwZSA9IHsgY29uc3RydWN0b3IgOiBHYW1lIH07XHJcblxyXG5HYW1lLlBsYXllciA9IGZ1bmN0aW9uKHgsIHkpIHtcclxuICAgIHRoaXMuY29sb3IgPSAnI2ZmMDAwMCc7XHJcbiAgICB0aGlzLmhlaWdodCA9IDQ7XHJcbiAgICAvLyB0aGlzLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy52ZWxvY2l0eV94ID0gMDtcclxuICAgIC8vIHRoaXMudmVsb2NpdHlfeSA9IDA7XHJcbiAgICB0aGlzLndpZHRoID0gMjQ7XHJcbiAgICB0aGlzLnggPSA2MDtcclxuICAgIHRoaXMueSA9IDExMDtcclxufTtcclxuXHJcbkdhbWUuUGxheWVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5QbGF5ZXIsXHJcblxyXG4gICAgLy8ganVtcDpmdW5jdGlvbigpIHtcclxuICAgIC8vICAgICBpZighdGhpcy5qdW1waW5nKXtcclxuICAgIC8vICAgICAgICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcblxyXG4gICAgLy8gICAgICAgICBpZih0aGlzLmNvbG9yLmxlbmd0aCAhPSA3KXtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIC8vICAgICAgICAgfVxyXG5cclxuICAgIC8vICAgICAgICAgdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIC8vICAgICAgICAgdGhpcy52ZWxvY2l0eV95IC09IDE1O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH0sXHJcblxyXG4gICAgaGl0Tm90ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuICAgIH0sXHJcblxyXG4gICAgbW92ZUxlZnQ6ZnVuY3Rpb24oKSB7IFxyXG4gICAgICAgIHRoaXMudmVsb2NpdHlfeCAtPSAwLjc1O1xyXG4gICAgfSxcclxuICAgIG1vdmVSaWdodDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggKz0gMC43NTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHlfeDtcclxuICAgICAgICAvLyB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eV95O1xyXG4gICAgfVxyXG59XHJcblxyXG5HYW1lLk5vdGUgPSBmdW5jdGlvbih4LCB5LCBhdWRpb0ZpbGUpe1xyXG4gICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcblxyXG4gICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3Iuc2xpY2UoMCwgMSkgKyAnMCcgKyB0aGlzLmNvbG9yLnNsaWNlKDEsIDYpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gMjtcclxuICAgIHRoaXMud2lkdGggPSAyO1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eV95ID0gMTtcclxuXHJcbiAgICB0aGlzLmhpdCA9IGZhbHNlO1xyXG4gICAgdGhpcy5zb3VuZCA9IG5ldyBBdWRpbyhhdWRpb0ZpbGUpO1xyXG59XHJcblxyXG5HYW1lLk5vdGUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBHYW1lLk5vdGUsXHJcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==