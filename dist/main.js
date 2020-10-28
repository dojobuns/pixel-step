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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsInJlcXVpcmUiLCJEaXNwbGF5IiwiRW5naW5lIiwiR2FtZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duVXAiLCJjb250cm9sbGVyIiwidHlwZSIsImtleUNvZGUiLCJyZXNpemUiLCJkaXNwbGF5IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsImZpbGwiLCJiYWNrZ3JvdW5kX2NvbG9yIiwibm90ZUFyciIsImZvckVhY2giLCJub3RlIiwieSIsImhpdCIsImRyYXdOb3RlIiwibGVuZ3RoIiwiZ2FtZUVuZE1lc3NhZ2UiLCJnYW1lRW5kIiwiYmFja2dyb3VuZFRyYWNrIiwicGxheSIsImJhc3NOb3RlQXJyIiwiZWlnaHROb3RlQXJyIiwiZHJhd1JlY3RhbmdsZSIsInBsYXllciIsIngiLCJjb2xvciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJ0b0ZpeGVkIiwidG9TdHJpbmciLCJzY29yZVVwZGF0ZSIsInNvdW5kIiwiaGl0Tm90ZSIsImNvbnNvbGUiLCJsb2ciLCJ1cGRhdGUiLCJsZWZ0IiwiYWN0aXZlIiwibW92ZUxlZnQiLCJyaWdodCIsIm1vdmVSaWdodCIsInF1ZXJ5U2VsZWN0b3IiLCJlbmdpbmUiLCJidWZmZXIiLCJjYW52YXMiLCJ3aW5kb3ciLCJjbGFzc0xpc3QiLCJhZGQiLCJib2R5Iiwib25rZXl1cCIsInJlc3RhcnRHYW1lIiwicmVtb3ZlIiwiY29udGFpbnMiLCJwYXVzZWQiLCJwYXVzZSIsInNvbmciLCJmaWxsTm90ZUFyciIsImZpbGxCYXNzQXJyIiwiZmlsbEVpZ2h0QXJyIiwiZmlsbE5hcnV0b05vdGUiLCJsb29wIiwidm9sdW1lIiwic3RhcnQiLCJCdXR0b25JbnB1dCIsInVwIiwia2V5X2NvZGUiLCJkb3duIiwiZ2V0SW5wdXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29udGV4dCIsImNvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIk1hdGgiLCJmbG9vciIsImRyYXdJbWFnZSIsImhlaWdodF93aWR0aF9yYXRpbyIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsInRpbWVfc3RlcCIsImFjY3VtdWxhdGVkX3RpbWUiLCJhbmltYXRpb25fZnJhbWVfcmVxdWVzdCIsInVuZGVmaW5lZCIsInRpbWUiLCJ1cGRhdGVkIiwicnVuIiwidGltZV9zdGFtcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImhhbmRsZVJ1biIsInBlcmZvcm1hbmNlIiwibm93Iiwic3RvcCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZnJpY3Rpb24iLCJncmF2aXR5IiwiUGxheWVyIiwiQXVkaW8iLCJtZWxvZHlBcnIiLCJiYXNzQXJyIiwiZWlnaHRBcnIiLCJ4UG9zQXJyIiwieEJhc3NQb3NBcnIiLCJ4RWlnaHRQb3NBcnIiLCJuYXJ1dG9NZWxvZHlBcnIiLCJuYXJ1dG9CYXNzQXJyIiwibmFydXRvWFBvc0FyciIsIm5hcnV0b3hCYXNzUG9zQXJyIiwiY291bnQiLCJwdXNoIiwiTm90ZSIsIm1lc3NhZ2UiLCJjb2xsaWRlT2JqZWN0Iiwib2JqZWN0IiwidmVsb2NpdHlfeCIsInZlbG9jaXR5X3kiLCJyYW5kb20iLCJhdWRp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QixHQUErQixLQUFLaEcsS0FBTCxDQUFXZ0csS0FBWCxDQUFpQixDQUFqQixFQUFvQixDQUFwQixDQUE1QztBQUNIOztBQUVELE9BQUtySCxNQUFMLEdBQWMsQ0FBZDtBQUNBLE9BQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsT0FBS21CLENBQUwsR0FBU0EsQ0FBVDtBQUNBLE9BQUtaLENBQUwsR0FBU0EsQ0FBVDtBQUVBLE9BQUswRyxVQUFMLEdBQWtCLENBQWxCO0FBRUEsT0FBS3pHLEdBQUwsR0FBVyxLQUFYO0FBQ0EsT0FBS21CLEtBQUwsR0FBYSxJQUFJb0UsS0FBSixDQUFVb0IsU0FBVixDQUFiO0FBQ0gsQ0FoQkQ7O0FBa0JBbkksSUFBSSxDQUFDNEgsSUFBTCxDQUFVNUMsU0FBVixHQUFzQjtBQUNsQkMsYUFBVyxFQUFHakYsSUFBSSxDQUFDNEgsSUFERDtBQUVsQjdFLFFBQU0sRUFBRSxrQkFBVTtBQUNkLFNBQUt4QixDQUFMLElBQVUsS0FBSzBHLFVBQWY7QUFDSDtBQUppQixDQUF0QjtBQVNBL0MsTUFBTSxDQUFDQyxPQUFQLEdBQWlCbkYsSUFBakIsQzs7Ozs7Ozs7Ozs7QUM3ZUEsdUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Rpc3QvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5zY3NzJztcclxuY29uc3QgQ29udHJvbGxlciA9IHJlcXVpcmUoJy4vc2NyaXB0cy9jb250cm9sbGVyJyk7XHJcbmNvbnN0IERpc3BsYXkgPSByZXF1aXJlKCcuL3NjcmlwdHMvZGlzcGxheScpO1xyXG5jb25zdCBFbmdpbmUgPSByZXF1aXJlKCcuL3NjcmlwdHMvZW5naW5lJyk7XHJcbmNvbnN0IEdhbWUgPSByZXF1aXJlKCcuL3NjcmlwdHMvZ2FtZScpO1xyXG4vLyB2YXIgd2ViQXVkaW9QZWFrTWV0ZXIgPSByZXF1aXJlKCd3ZWItYXVkaW8tcGVhay1tZXRlcicpO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKGUpIHtcclxuXHJcbiAgICBsZXQga2V5RG93blVwID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnRyb2xsZXIua2V5RG93blVwKGUudHlwZSwgZS5rZXlDb2RlKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlc2l6ZSA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBkaXNwbGF5LnJlc2l6ZShkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSAzMiwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtIDMyLCBnYW1lLndvcmxkLmhlaWdodCAvIGdhbWUud29ybGQud2lkdGgpO1xyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCByZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7Ly8gQ2xlYXIgYmFja2dyb3VuZCB0byBnYW1lJ3MgYmFja2dyb3VuZCBjb2xvci5cclxuICAgICAgICAvLyBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG4gICAgICAgIC8vIG5vdGVEcm9wKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihnYW1lLndvcmxkLm5vdGVBcnJbZ2FtZS53b3JsZC5ub3RlQXJyLmxlbmd0aCAtIDFdLnkgPiAxMTgpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kTWVzc2FnZSgpO1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuXHJcblxyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5pbm5lckhUTUwgPSAoZ2FtZS53b3JsZC5zY29yZSA9PT0gMCkgPyAoXHJcbiAgICAgICAgICAgICcwJSdcclxuICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAoZ2FtZS53b3JsZC5zY29yZS50b0ZpeGVkKDIpKS50b1N0cmluZygpICsgJyUnXHJcbiAgICAgICAgKSBcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMjQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0ICYmICFub3RlLmhpdCl7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnNjb3JlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBub3RlLmhpdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBub3RlLnNvdW5kLnBsYXkoKTtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLmhpdE5vdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5oaXROb3RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihjb250cm9sbGVyLmxlZnQuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIucmlnaHQuYWN0aXZlKXtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZVJpZ2h0KCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLngpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54ICsgMTQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLm5vdGVBcnJbMV0ueSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmKGNvbnRyb2xsZXIudXAuYWN0aXZlKXtcclxuICAgICAgICAvLyAgICAgZ2FtZS53b3JsZC5wbGF5ZXIuanVtcCgpO1xyXG4gICAgICAgIC8vICAgICBjb250cm9sbGVyLnVwLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgZ2FtZS51cGRhdGUoKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gbGV0IG5vdGVEcm9wID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgICAgIC8vIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAvLyAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgLy8gICAgIH0gZWxzZSBpZihnYW1lLndvcmxkLm5vdGVBcnJbZ2FtZS53b3JsZC5ub3RlQXJyLmxlbmd0aCAtIDFdLnkgPiAxMTgpe1xyXG4gICAgICAgIC8vICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kTWVzc2FnZSgpO1xyXG4gICAgICAgIC8vICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgLy8gICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wbGF5KCk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGlmKG5vdGUueSA8IDEyMCAmJiAhbm90ZS5oaXQpIHtcclxuICAgICAgICAvLyAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KVxyXG5cclxuICAgICAgICAvLyBnYW1lLndvcmxkLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgIC8vICAgICBpZihub3RlLnkgPCAxMjAgJiYgIW5vdGUuaGl0KSB7XHJcbiAgICAgICAgLy8gICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfSlcclxuXHJcbiAgICAgICAgLy8gZGlzcGxheS5kcmF3UmVjdGFuZ2xlKGdhbWUud29ybGQucGxheWVyLngsIGdhbWUud29ybGQucGxheWVyLnksIGdhbWUud29ybGQucGxheWVyLndpZHRoLCBnYW1lLndvcmxkLnBsYXllci5oZWlnaHQsIGdhbWUud29ybGQucGxheWVyLmNvbG9yKTtcclxuXHJcbiAgICAgICAgLy8gZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgZGlzcGxheSA9IG5ldyBEaXNwbGF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKTtcclxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGxldCBlbmdpbmUgPSBuZXcgRW5naW5lKDEwMDAvMzAsIHJlbmRlciwgdXBkYXRlKTtcclxuXHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMuaGVpZ2h0ID0gZ2FtZS53b3JsZC5oZWlnaHQ7XHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMud2lkdGggPSBnYW1lLndvcmxkLndpZHRoO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcclxuXHJcbiAgICByZXNpemUoKTtcclxuICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgXHJcbiAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RyZW1vcicpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29uZy1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvcC1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvdHRvbS1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXJkLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm91cnRoLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYm9keS5vbmtleXVwID0gZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgaWYoZS5rZXlDb2RlID09PSAzMil7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0cmVtb3InKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb25nLXJ1bGUnKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3AtcnVsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JvdHRvbS1ydWxlJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcmQtcnVsZScpLmNsYXNzTGlzdC5yZW1vdmUoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvdXJ0aC1ydWxlJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbGF5aW5nJykpe1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BpeGVsLWxvZ28nKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuY29udGFpbnMoJ3BsYXlpbmcnKSl7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGxheSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKSB7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDgwKSB7XHJcbiAgICAgICAgICAgIGlmKCFnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZWQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5iYWNrZ3JvdW5kVHJhY2sucGF1c2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgZ2FtZS53b3JsZC5yZXN0YXJ0R2FtZSgpO1xyXG5cclxuICAgICAgICBnYW1lLndvcmxkLnNvbmcgPSAndHJlbW9yJztcclxuXHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbE5vdGVBcnIoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsQmFzc0FycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxFaWdodEFycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29uZy1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3R0b20tcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXJkLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3VydGgtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICBnYW1lLndvcmxkLnJlc3RhcnRHYW1lKCk7XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuc29uZyA9ICduYXJ1dG8nO1xyXG5cclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTmFydXRvTm90ZSgpO1xyXG4gICAgICAgICAgICAvLyBnYW1lLndvcmxkLmZpbGxOYXJ1dG9FaWdodCgpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5wYXVzZSgpO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LW1lbnUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaXhlbC1sb2dvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndHJlbW9yJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29uZy1ydWxlJykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9wLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib3R0b20tcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXJkLXJ1bGUnKS5jbGFzc0xpc3QuYWRkKCdwbGF5aW5nJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3VydGgtcnVsZScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXRJbnRlcnZhbCgoKSA9PiBub3RlRHJvcCgpLCAxKTtcclxuICAgIH0pXHJcbiAgICBnYW1lLndvcmxkLmJhY2tncm91bmRUcmFjay5sb29wID0gdHJ1ZTtcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnZvbHVtZSA9IDAuMztcclxuICAgIGdhbWUud29ybGQuYmFja2dyb3VuZFRyYWNrLnBsYXkoKTtcclxuXHJcbiAgICBlbmdpbmUuc3RhcnQoKTtcclxuXHJcbn0pOyIsIlxyXG5jb25zdCBDb250cm9sbGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmxlZnQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy5yaWdodCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnVwID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuXHJcbiAgICB0aGlzLmtleURvd25VcCA9IGZ1bmN0aW9uKHR5cGUsIGtleV9jb2RlKSB7XHJcbiAgICAgICAgbGV0IGRvd24gPSAodHlwZSA9PT0gJ2tleWRvd24nKSA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoKGtleV9jb2RlKSB7XHJcblxyXG4gICAgICAgICAgICBjYXNlIDM3OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0LmdldElucHV0KGRvd24pOyAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzODogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwLmdldElucHV0KGRvd24pOyAgICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM5OiBcclxuICAgICAgICAgICAgICAgIHRoaXMucmlnaHQuZ2V0SW5wdXQoZG93bik7XHJcbiAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XHJcblxyXG5Db250cm9sbGVyLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlclxyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0aGlzLmRvd24gPSBmYWxzZTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyLkJ1dHRvbklucHV0LFxyXG5cclxuICAgIGdldElucHV0IDogZnVuY3Rpb24oZG93bikge1xyXG4gICAgICAgIGlmKHRoaXMuZG93biAhPSBkb3duKSB0aGlzLmFjdGl2ZSA9IGRvd247XHJcbiAgICAgICAgdGhpcy5kb3duID0gZG93bjtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29udHJvbGxlcjsiLCJjb25zdCBEaXNwbGF5ID0gZnVuY3Rpb24oY2FudmFzKXtcclxuICAgIHRoaXMuYnVmZmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSxcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIHRoaXMuZHJhd1JlY3RhbmdsZSA9IGZ1bmN0aW9uKHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3RoaXMgaXMgZHJhdycpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRyYXdOb3RlID0gZnVuY3Rpb24obm90ZSkge1xyXG4gICAgICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IgfSA9IG5vdGU7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coeSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5maWxsID0gZnVuY3Rpb24oY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdCgwLCAwLCB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIuY2FudmFzLCAwLCAwLCB0aGlzLmJ1ZmZlci5jYW52YXMud2lkdGgsIHRoaXMuYnVmZmVyLmNhbnZhcy5oZWlnaHQsIDAsIDAsIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGgsIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXNpemUgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgIGlmKGhlaWdodCAvIHdpZHRoID4gaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSB3aWR0aCAqIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gaGVpZ2h0IC8gaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfTtcclxuICAgIFxyXG59O1xyXG5cclxuRGlzcGxheS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IERpc3BsYXlcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheTsiLCJcclxuY29uc3QgRW5naW5lID0gZnVuY3Rpb24odGltZV9zdGVwLCB1cGRhdGUsIHJlbmRlcikge1xyXG4gICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gMDtcclxuICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWUgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWVfc3RlcCA9IHRpbWVfc3RlcCxcclxuXHJcbiAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG5cclxuICAgIHRoaXMucnVuID0gZnVuY3Rpb24odGltZV9zdGFtcCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSArPSB0aW1lX3N0YW1wIC0gdGhpcy50aW1lO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWVfc3RhbXA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXAgKiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSAtPSB0aGlzLnRpbWVfc3RlcDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHRpbWVfc3RhbXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudXBkYXRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aW1lX3N0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5oYW5kbGVSdW4gPSAodGltZV9zdGVwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ydW4odGltZV9zdGVwKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5FbmdpbmUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBFbmdpbmUsXHJcblxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgdGhpcy50aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTsiLCJjb25zdCBHYW1lID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy53b3JsZCA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgZnJpY3Rpb246IDAuOSxcclxuICAgICAgICBncmF2aXR5OiAzLFxyXG4gICAgICAgIHBsYXllcjogbmV3IEdhbWUuUGxheWVyKCksXHJcbiAgICAgICAgbm90ZUFycjogW10sXHJcbiAgICAgICAgYmFzc05vdGVBcnI6IFtdLFxyXG4gICAgICAgIGVpZ2h0Tm90ZUFycjogW10sXHJcbiAgICAgICAgaGVpZ2h0OiAxMjgsXHJcbiAgICAgICAgd2lkdGg6IDE1MCxcclxuICAgICAgICBzY29yZTogMCxcclxuICAgICAgICBiYWNrZ3JvdW5kVHJhY2s6IG5ldyBBdWRpbygnRXJpYyBTa2lmZiAtIEEgTmlnaHQgT2YgRGl6enkgU3BlbGxzLm1wMycpLFxyXG4gICAgICAgIHNvbmc6ICcnLFxyXG5cclxuICAgICAgICBtZWxvZHlBcnI6IFtcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsIFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJyxcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2Q1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsXHJcblxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJyxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgXHJcblxyXG4gICAgICAgICAgICAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCBcclxuXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLCBcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdkNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYmFzc0FycjogW1xyXG4gICAgICAgICAgICAnZnMzLm1wMycsICdlMy5tcDMnLCAnZHMzLm1wMycsICdkMy5tcDMnLCAnZTMubXAzJywgXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsXHJcbiAgICAgICAgICAgICdmczMubXAzJywgJ2UzLm1wMycsICdkczMubXAzJywgJ2QzLm1wMycsICdlMy5tcDMnLCBcclxuICAgICAgICBdLFxyXG4gICAgICAgIGVpZ2h0QXJyOiBbXHJcbiAgICAgICAgICAgICdhNS5tcDMnLCAnZ3M1Lm1wMycsICdnNS5tcDMnLCAnZnM1Lm1wMycsICdmczUubXAzJywgJ2dzNS5tcDMnLCdhNS5tcDMnLCAnZnM1Lm1wMycsICdmczYubXAzJyxcclxuICAgICAgICAgICAgJ2ZzNS5tcDMnLCAnZTUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYi5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG4gICAgICAgICAgICAnYTUubXAzJywgJ2dzNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZnM1Lm1wMycsICdnczUubXAzJywnYTUubXAzJywgJ2ZzNS5tcDMnLCAnZnM2Lm1wMycsXHJcbiAgICAgICAgICAgICdmczUubXAzJywgJ2U1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2Q2Lm1wMycsICdjczYubXAzJywgJ2I1Lm1wMycsICdhNS5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4UG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgMzUsIDQ1LCAzNSwgMjUsIDE1LCBcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCxcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDgwLCA3NSwgNzMsIDcwLCA1NSxcclxuXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDI1LCAzNSwgNDUsIDM1LCAyNSwgXHJcbiAgICAgICAgICAgIDM1LCA0NSwgMzUsIDI1LCAzNSwgNDUsIDM1LCAyNSwgXHJcblxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCA0NSwgMzUsIDQ1LCAzNSwgNDUsIFxyXG5cclxuICAgICAgICAgICAgNDUsIDQ1LCA0NSwgNDUsIDQ1LCA0NSxcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsIFxyXG4gICAgICAgICAgICA1NSwgNTAsIDQ1LCAzNSwgMzUsIDQ1LCAzNSwgMjUsIDE1LFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDgwLCA3NSwgNzMsIDcwLCA1NSxcclxuICAgICAgICAgICAgMTUwLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeEJhc3NQb3NBcnI6IFtcclxuICAgICAgICAgICAgNjUsIDUwLCA2NSwgNDUsIDI1LFxyXG4gICAgICAgICAgICAzNSwgMzUsIDM1LCAzNSwgMzUsIDM1LFxyXG4gICAgICAgICAgICA2NSwgNTAsIDY1LCA0NSwgMjUsXHJcbiAgICAgICAgXSxcclxuICAgICAgICB4RWlnaHRQb3NBcnI6IFtcclxuICAgICAgICAgICAgNzUsIDcwLCA2NSwgNjAsIDYwLCA3MCwgNzUsIDYwLCA5NSxcclxuICAgICAgICAgICAgNjAsIDU1LCA1MCwgNDAsIDQwLCA1MCwgNDAsIDMwLCAyMCxcclxuICAgICAgICAgICAgNzUsIDcwLCA2NSwgNjAsIDYwLCA3MCwgNzUsIDYwLCA5NSxcclxuICAgICAgICAgICAgNjAsIDU1LCA1MCwgNDAsIDg1LCA4MCwgNzgsIDc1LCA2MCxcclxuICAgICAgICBdLFxyXG5cclxuICAgICAgICBuYXJ1dG9NZWxvZHlBcnI6IFtcclxuICAgICAgICAgICAgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdhMy5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsXHJcbiAgICAgICAgICAgICdnNS5tcDMnLCAnZnM1Lm1wMycsICdkNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZDUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2Q1Lm1wMycsICdlNS5tcDMnLCAnZnM1Lm1wMycsIC8vMzNcclxuXHJcbiAgICAgICAgICAgICdjczUubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsICdhLm1wMycsICdhLm1wMycsIC8vNDZcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vNTZcclxuXHJcbiAgICAgICAgICAgICdkLm1wMycsICdjcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzYxXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsICdhLm1wMycsICdhLm1wMycsIC8vNzRcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsICdiLm1wMycsICdhLm1wMycsICdkLm1wMycsIC8vODRcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vODlcclxuXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdkLm1wMycsIC8vMTAyXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdlLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAgLy8xMTVcclxuXHJcbiAgICAgICAgICAgICdkLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsICdlLm1wMycsIC8vMTIzIEVJR0hUUyBTVEFSVCBIRVJFXHJcbiAgICAgICAgICAgICdlLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2UubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAvLzEzMVxyXG5cclxuICAgICAgICAgICAgJ2UubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgJ2IubXAzJywgJ2EubXAzJywgJ2QubXAzJywgLy8xMzlcclxuICAgICAgICAgICAgJ2QubXAzJywgJ2NzLm1wMycsICdkLm1wMycsICdlLm1wMycsICdmcy5tcDMnLCAvLzE0NFxyXG5cclxuICAgICAgICAgICAgJ2QubXAzJywgJ2EzLm1wMycsICdkLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8xNTJcclxuICAgICAgICAgICAgJ2UubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnZS5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzE2MlxyXG4gICAgICAgICAgICAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzE2OFxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2ZzLm1wMycsIC8vMTczXHJcblxyXG4gICAgICAgICAgICAnZC5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAnZS5tcDMnLCAvLzE4MVxyXG4gICAgICAgICAgICAnZS5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdlLm1wMycsICdlLm1wMycsICdnLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZC5tcDMnLCAvLzE5MVxyXG4gICAgICAgICAgICAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZC5tcDMnLCAvLzE5N1xyXG4gICAgICAgICAgICAnZC5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2UubXAzJywgJ2QubXAzJywgLy8yMDJcclxuXHJcbiAgICAgICAgICAgICdhLm1wMycsICdmcy5tcDMnLCAnZS5tcDMnLCAnZS5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2UubXAzJywgJ2UubXAzJywgJ2IubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjE0XHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnY3MubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2ZzLm1wMycsICdlLm1wMycsICdkLm1wMycsIC8vMjIxXHJcbiAgICAgICAgICAgICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnYjMubXAzJywgJ2QubXAzJywgLy8yMzFcclxuICAgICAgICAgICAgJ2EzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2QubXAzJywgJ2UubXAzJywgLy8yMzZcclxuICAgICAgICBdLFxyXG4gICAgICAgIG5hcnV0b0Jhc3NBcnI6IFtcclxuXHJcbiAgICAgICAgXSxcclxuICAgICAgICAvLyBuYXJ1dG9FaWdodEFycjogW1xyXG4gICAgICAgIC8vICAgICAnYTMubXAzJywgJ2QzLm1wMycsICdhMy5tcDMnLCAnZC5tcDMnLCAnZC5tcDMnLCAnZDMubXAzJywgJ2IzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnYjMubXAzJywgJ2UzLm1wMycsICdhMy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdmczMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2ZzMy5tcDMnLFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdhMy5tcDMnLCAnYTMubXAzJywgJ2UzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLCAnYTMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdkMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdlMy5tcDMnLCAnYTMubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnZnMzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2QubXAzJywgJ2QubXAzJywgJ2EzLm1wMycsICdkMy5tcDMnLFxyXG4gICAgICAgIC8vICAgICAnYTMubXAzJywgJ2EzLm1wMycsICdlMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgJ2EzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnZDMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnZTMubXAzJywgJ2EzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsIFxyXG4gICAgICAgIC8vICAgICAnZC5tcDMnLCAnZC5tcDMnLCAnYTMubXAzJywgJ2QzLm1wMycsICdkLm1wMycsICdkLm1wMycsICdhMy5tcDMnLCAnZDMubXAzJywgXHJcbiAgICAgICAgLy8gICAgICdhMy5tcDMnLCAnYTMubXAzJywgJ2UzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJyxcclxuICAgICAgICAvLyBdLFxyXG4gICAgICAgIC8vIG5hcnV0b3hFaWdodFBvc0FycjpbXHJcbiAgICAgICAgLy8gICAgIDU1LCA0MCwgNTUsIDcwLCA3MCwgNjAsIDYwLCBcclxuICAgICAgICAvLyAgICAgNjAsIDQwLCA1MCwgNjAsIDc1LCA3MCwgNzAsIFxyXG4gICAgICAgIC8vICAgICA2MCwgNTUsIDUwLCA4NSwgODAsIDU1LCA1MCwgODUsIDgwLCA1NSwgNTAsXHJcbiAgICAgICAgLy8gXSxcclxuICAgICAgICBuYXJ1dG9YUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDUwLCA0NSwgNTAsIDYwLCA0NSwgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCxcclxuICAgICAgICAgICAgNjAsIDQ1LCA2MCwgNjUsIDQ1LCA2NSwgNzUsIDgwLCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICAxMTUsIDExMCwgMTAwLCAxMTUsIDExMCwgMTAwLCAxMTUsIDExMCwgMTAwLCAxMDUsIDExMCxcclxuXHJcbiAgICAgICAgICAgIDk1LCA3NSwgNjAsIDY1LCA3NSwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSwgODUsIDg1LFxyXG4gICAgICAgICAgICA2NSwgNTUsIDY1LCA2MCwgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA2MCxcclxuICAgICAgICAgICAgNzUsIDYwLCA2NSwgNjUsIDc1LCA2MCwgNjAsIDc1LCA2NSwgNjAsIDY1LCA4NSwgODUsXHJcbiAgICAgICAgICAgIDY1LCA1NSwgNjUsIDYwLCA5MCwgODUsIDYwLCA5MCwgODUsIDYwLCBcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLFxyXG5cclxuICAgICAgICAgICAgNTAsIDc1LCA3NSwgNjAsIDYwLCA3NSwgNzUsIDYwLCA2MCwgOTAsIDg1LCA3NSwgNjAsXHJcbiAgICAgICAgICAgIDUwLCA1NSwgNjAsIDYwLCA1NSwgNjAsIDY1LCA2NSwgNjUsIDc1LCA2NSwgNjAsIDY1LFxyXG5cclxuICAgICAgICAgICAgNjAsIDQ1LCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LFxyXG4gICAgICAgICAgICA2NSwgNDUsIDU1LCA2NSwgODAsIDc1LCA2NSwgNzUsXHJcblxyXG4gICAgICAgICAgICA2NSwgNjAsIDkwLCA4NSwgNjAsIDkwLCA4NSwgNjAsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNjAsIDY1LCA3NSxcclxuXHJcbiAgICAgICAgICAgIDYwLCA0NSwgNjAsIDc1LCA3NSwgNjUsIDYwLCA2NSxcclxuICAgICAgICAgICAgNjUsIDQ1LCA1NSwgNjUsIDgwLCA3NSwgNzUsIDc1ICwgNjUsIDYwLFxyXG4gICAgICAgICAgICA5MCwgODUsIDYwLCA5MCwgODUsIDYwLCBcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDc1LFxyXG5cclxuICAgICAgICAgICAgNjAsIDUwLCA2MCwgNzUsIDc1LCA2NSwgNjAsIDY1LFxyXG4gICAgICAgICAgICA2NSwgNDUsIDU1LCA2NSwgNjUsIDgwLCA4NSwgNzUsIDY1LCA2MCxcclxuICAgICAgICAgICAgOTAsIDg1LCA2MCwgOTAsIDg1LCA2MCxcclxuICAgICAgICAgICAgNjAsIDU1LCA2MCwgNjUsIDYwLCBcclxuXHJcbiAgICAgICAgICAgIDg1LCA3NSwgNjUsIDY1LCA4NSwgNzUsIDY1LCA2NSwgOTAsIDc1LCA2NSwgNjAsXHJcbiAgICAgICAgICAgIDUwLCA1NSwgNjAsIDYwLCA3NSwgNjUsIDYwLFxyXG4gICAgICAgICAgICA1MCwgNTAsIDQ1LCA1MCwgNjAsIDQ1LCA1MCwgNDUsIDUwLCA2MCxcclxuICAgICAgICAgICAgNDUsIDUwLCA0NSwgNjAsIDY1XHJcblxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgbmFydXRveEJhc3NQb3NBcnI6W1xyXG5cclxuICAgICAgICBdLFxyXG4gICAgICBcclxuXHJcbiAgICAgICAgZmlsbE5hcnV0b05vdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLm5vdGVBcnIubGVuZ3RoIDwgdGhpcy5uYXJ1dG9NZWxvZHlBcnIubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUodGhpcy5uYXJ1dG9YUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5uYXJ1dG9NZWxvZHlBcnJbY291bnRdKSk7XHJcbiAgICAgICAgICAgICAgICBjb3VudCArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDwgNCB8fCBjb3VudCA9PT0gNzMgfHwgY291bnQgPT09IDkwIHx8IGNvdW50ID09PSA5NCB8fCBjb3VudCA9PT0gOTggfHwgY291bnQgPT09IDEwMCAgfHwgKGNvdW50ID49IDEyMSAmJiBjb3VudCA8PSAxMjIpIHx8IChjb3VudCA+PSAxMjkgJiYgY291bnQgPD0gMTMwKSB8fCAoY291bnQgPj0gMTUwICYmIGNvdW50IDw9IDE1MSkgfHwgKGNvdW50ID49IDE1OCAmJiBjb3VudCA8PSAxNTkpIHx8IChjb3VudCA+PSAxNzkgJiYgY291bnQgPD0gMTgwKSB8fCAoY291bnQgPj0gMTg1ICYmIGNvdW50IDw9IDE4NikgfHwgY291bnQgPT09IDIwMyB8fCBjb3VudCA9PT0gMjA3IHx8IGNvdW50ID09PSAyMTEgfHwgKGNvdW50ID49IDIyMyAmJiBjb3VudCA8PSAyMjUpIHx8IChjb3VudCA+PSAyMjcgJiYgIGNvdW50IDw9IDIzMCkgfHwgKGNvdW50ID49IDIzMiAmJiAgY291bnQgPD0gMjM1KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA0IHx8IGNvdW50ID09PSAyNSB8fCBjb3VudCA9PT0gMjYgfHwgY291bnQgPT09IDI5IHx8IGNvdW50ID09PSAzMCB8fCBjb3VudCA9PT0gMzIgfHwgY291bnQgPT09IDMzIHx8IGNvdW50ID09PSA0NiB8fCBjb3VudCA9PT0gNzQgfHwgY291bnQgPT09IDkyIHx8IGNvdW50ID09PSA5NiB8fCBjb3VudCA9PT0gMjA0IHx8IGNvdW50ID09PSAyMDggfHwgY291bnQgPT09IDIxMiB8fCBjb3VudCA9PT0gMjI2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSA1ICYmIGNvdW50IDw9IDgpIHx8IGNvdW50ID09PSAxMCB8fCBjb3VudCA9PT0gMjAgfHwgY291bnQgPT09IDIxIHx8IChjb3VudCA+PSA0MCAmJiBjb3VudCA8PSA0MykgfHwgY291bnQgPT09IDQ1IHx8IChjb3VudCA+PSA2NCAmJiBjb3VudCA8PSA2NSkgfHwgKGNvdW50ID49IDY3ICYmIGNvdW50IDw9IDY4KSB8fCAoY291bnQgPj0gNzAgJiYgY291bnQgPD0gNzEpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgKGNvdW50ID49IDExICYmIGNvdW50IDw9IDEyKSB8fCAoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTUpIHx8IGNvdW50ID09PSAxNyB8fCBjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDE5IHx8IGNvdW50ID09PSAyMiB8fCBjb3VudCA9PT0gMjMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSAxMyB8fCBjb3VudCA9PT0gMTYgfHwgY291bnQgPT09IDI0IHx8IGNvdW50ID09PSAyNyB8fCBjb3VudCA9PT0gMzEgfHwgKGNvdW50ID49IDM0ICYmIGNvdW50IDw9IDM3KSB8fCBjb3VudCA9PT0gMzkgfHwgY291bnQgPT09IDQ0IHx8IChjb3VudCA+PSA0NyAmJiBjb3VudCA8PSA0OSkgfHwgKGNvdW50ID49IDUxICYmIGNvdW50IDw9IDUyKSB8fCAoY291bnQgPj0gNTQgJiYgY291bnQgPD0gNTUpIHx8IChjb3VudCA+PSA1OCAmJiBjb3VudCA8PSA2MykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMjggfHwgY291bnQgPT09IDM4IHx8IGNvdW50ID09IDY2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNTAgfHwgY291bnQgPT09IDUzIHx8IChjb3VudCA+PSA1NiAmJiBjb3VudCA8PSA1NykgfHwgY291bnQgPT09IDc4IHx8IGNvdW50ID09PSA4MSB8fCAoY291bnQgPj0gODQgJiYgY291bnQgPD0gODUpIHx8IGNvdW50ID09PSA4OSB8fCBjb3VudCA9PT0gMTAyIHx8IChjb3VudCA+PSAxMDUgJiYgY291bnQgPD0gMTA2KSB8fCAoY291bnQgPj0gMTA5ICYmIGNvdW50IDw9IDExMSkgfHwgY291bnQgPT09IDEyMyB8fCBjb3VudCA9PT0gMTMzIHx8IGNvdW50ID09PSAxMzYgfHwgKGNvdW50ID49IDEzOSAmJiBjb3VudCA8PSAxNDApIHx8IGNvdW50ID09PSAxNTIgfHwgY291bnQgPT09IDE2MiB8fCBjb3VudCA9PT0gMTY1IHx8IChjb3VudCA+PSAxNjggJiYgY291bnQgPD0gMTY5KSB8fCBjb3VudCA9PT0gMTgxIHx8IGNvdW50ID09PSAxOTEgfHwgY291bnQgPT09IDE5NCB8fCAoY291bnQgPj0gMTk3ICYmIGNvdW50IDw9IDE5OCkgfHwgY291bnQgPT09IDIwMiB8fCBjb3VudCA9PT0gMjE0IHx8IChjb3VudCA+PSAyMTcgJiYgY291bnQgPD0gMjE4KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjkgfHwgY291bnQgPT09IDcyIHx8IChjb3VudCA+PSA3NSAmJiBjb3VudCA8PSA3NykgfHwgKGNvdW50ID49IDc5ICYmIGNvdW50IDw9IDgwKSB8fCAoY291bnQgPj0gODIgJiYgY291bnQgPD0gODMpIHx8IChjb3VudCA+PSA4NiAmJiBjb3VudCA8PSA4OCkgfHwgY291bnQgPT09IDkxIHx8IGNvdW50ID09PSA5MyB8fCBjb3VudCA9PT0gOTUgfHwgY291bnQgPT09IDk3IHx8IGNvdW50ID09PSA5OSB8fCBjb3VudCA9PT0gMTAxIHx8IChjb3VudCA+PSAxMDMgJiYgY291bnQgPD0gMTA0KSB8fCAoY291bnQgPj0gMTA3ICYmIGNvdW50IDw9IDEwOCkgfHwgKGNvdW50ID49IDExMiAmJiBjb3VudCA8PSAxMjApIHx8IChjb3VudCA+PSAxMjQgJiYgY291bnQgPD0gMTI4KSB8fCAoY291bnQgPj0gMTMxICYmIGNvdW50IDw9IDEzMikgfHwgKGNvdW50ID49IDEzNCAmJiBjb3VudCA8PSAxMzUpIHx8IChjb3VudCA+PSAxMzcgJiYgY291bnQgPD0gMTM4KSB8fCAoY291bnQgPj0gMTQxICYmIGNvdW50IDw9IDE0OSkgfHwgKGNvdW50ID49IDE1MyAmJiBjb3VudCA8PSAxNTcpIHx8IChjb3VudCA+PSAxNjAgJiYgY291bnQgPD0gMTYxKSB8fCAoY291bnQgPj0gMTYzICYmIGNvdW50IDw9IDE2NCkgfHwgKGNvdW50ID49IDE2NiAmJiBjb3VudCA8PSAxNjcpIHx8IChjb3VudCA+PSAxNzAgJiYgY291bnQgPD0gMTc4KSB8fCAoY291bnQgPj0gMTgyICYmIGNvdW50IDw9IDE4NCkgfHwgKGNvdW50ID49IDE4NyAmJiBjb3VudCA8PSAxOTApIHx8IChjb3VudCA+PSAxOTIgJiYgY291bnQgPD0gMTkzKSB8fCAoY291bnQgPj0gMTk1ICYmIGNvdW50IDw9IDE5NikgfHwgKGNvdW50ID49IDE5OSAmJiBjb3VudCA8PSAyMDEpIHx8IChjb3VudCA+PSAyMDUgJiYgY291bnQgPD0gMjA2KSB8fCAoY291bnQgPj0gMjA5ICYmIGNvdW50IDw9IDIxMCkgfHwgY291bnQgPT09IDIxMyB8fCAoY291bnQgPj0gMjE1ICYmIGNvdW50IDw9IDIxNikgfHwgKGNvdW50ID49IDIxOSAmJiBjb3VudCA8PSAyMjIpIHx8IGNvdW50ID09PSAyMzEgfHwgY291bnQgPT09IDIzNil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vIGZpbGxOYXJ1dG9FaWdodDpmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vICAgICBsZXQgeSA9IC0xMzM1O1xyXG4gICAgICAgIC8vICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgIC8vICAgICB3aGlsZSAodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5uYXJ1dG9FaWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMubmFydXRveEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5uYXJ1dG9FaWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAvLyAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgaWYoY291bnQgPCA3IHx8IChjb3VudCA+PSA4ICYmIGNvdW50IDw9IDE5KSB8fCAoY291bnQgPj0gMjEgJiYgY291bnQgPD0gMjMpIHx8IGNvdW50ID09PSAyNSB8fCAoY291bnQgPj0gMjcgJiYgY291bnQgPD0gMzYpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAvLyAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNyB8fCBjb3VudCA9PT0gMjYpe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgLy8gICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDIwIHx8IGNvdW50ID09PSAyNCl7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgeSAtPSAxNTtcclxuICAgICAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9LFxyXG5cclxuICAgICAgICByZXN0YXJ0R2FtZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdGhpcy5ub3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIgPSBbXTtcclxuICAgICAgICAgICAgdGhpcy5zY29yZSA9IDA7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2FtZUVuZDpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW5kLW1lbnUnKS5jbGFzc0xpc3QucmVtb3ZlKCdwbGF5aW5nJylcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnYW1lRW5kTWVzc2FnZTpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9ICcnO1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYodGhpcy5zY29yZSA+PSA5OS44KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV09XISBQRVJGRUNUIFNDT1JFISBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDkwICYmIHRoaXMuc2NvcmUgPCA5OS44KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnU08gQ0xPU0UgVE8gUEVSRkVDVElPTiEgUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA4MCAmJiB0aGlzLnNjb3JlIDw9IDg5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1BSRVRUWSBHT09ELCBCVVQgSSBCRVQgWU9VIENBTiBETyBCRVRURVIuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPj0gNzAgJiYgdGhpcy5zY29yZSA8PTc5KSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ09IIE1BTiwgTUFZQkUgWU9VIFNIT1VMRCBQUkFDVElDRSBBIExJVFRMRSBNT1JFLiBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlIDw9IDY5KXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnSVMgWU9VUiBNT05JVE9SIE9OPyBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmlubmVySFRNTCA9IG1lc3NhZ2U7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbE5vdGVBcnI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IHRoaXMubWVsb2R5QXJyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhQb3NBcnJbY291bnRdLCB5LCB0aGlzLm1lbG9keUFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoKGNvdW50IDw9IDQpIHx8IChjb3VudCA+PSA2NyAmJiBjb3VudCA8PSA3MCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDUgJiYgY291bnQgPD0gOCkgfHwgKGNvdW50ID49IDcxICYmIGNvdW50IDw9IDc0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDEwICYmIGNvdW50IDw9IDEzKSB8fCAoY291bnQgPj0gNzYgJiYgY291bnQgPD0gNzkpKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE0ICYmIGNvdW50IDw9IDE3KSB8fCAoY291bnQgPj0gODAgJiYgY291bnQgPD0gODMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMTggfHwgY291bnQgPT09IDg0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKChjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikgfHwgKGNvdW50ID49IDg1ICYmIGNvdW50IDw9IDg4KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDIzICYmIGNvdW50IDw9IDI2KSB8fCAoY291bnQgPj0gODkgJiYgY291bnQgPD0gOTIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gMjcgfHwgY291bnQgPT09IDkzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMjggJiYgY291bnQgPD0gMzEpIHx8IChjb3VudCA+PSA5NCAmJiBjb3VudCA8PSA5NykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCAoY291bnQgPj0gMzIgJiYgY291bnQgPD0gMzYpIHx8IChjb3VudCA+PSA5OCAmJiBjb3VudCA8PSAxMDIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPj0gMzcgJiYgY291bnQgPD0gNjApIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNjEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2Mil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiggY291bnQgPT09IDYzKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY0KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2NSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2Nil7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXHJcbiAgICAgICAgZmlsbEJhc3NBcnI6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gZGVidWdnZXI7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5iYXNzTm90ZUFyci5sZW5ndGggPCB0aGlzLmJhc3NBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhCYXNzUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5iYXNzQXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnJbY291bnQgLSAxXS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSAzIHx8IChjb3VudCA+PSAxMiAmJiBjb3VudCA8PSAxNCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDYwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEVpZ2h0QXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gLTg4NTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgdGhpcy5laWdodEFyci5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5laWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjb3JlVXBkYXRlOmZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5zb25nID09PSAndHJlbW9yJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5tZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5iYXNzQXJyLmxlbmd0aCArIHRoaXMuZWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiggdGhpcy5zb25nID09PSAnbmFydXRvJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5uYXJ1dG9NZWxvZHlBcnIubGVuZ3RoICkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NvcmUgKz0gMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsaWRlT2JqZWN0OmZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICAgICAgICAgIGlmKG9iamVjdC54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqZWN0LnggKyBvYmplY3Qud2lkdGggPiB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IHRoaXMud2lkdGggLSBvYmplY3Qud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvLyBpZihvYmplY3QueSA8IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gMDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmKG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSB0aGlzLmhlaWdodCAtIG9iamVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeCAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZU9iamVjdCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud29ybGQudXBkYXRlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuR2FtZS5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yIDogR2FtZSB9O1xyXG5cclxuR2FtZS5QbGF5ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmNvbG9yID0gJyNmZjAwMDAnO1xyXG4gICAgdGhpcy5oZWlnaHQgPSA0O1xyXG4gICAgLy8gdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAvLyB0aGlzLnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IDI0O1xyXG4gICAgdGhpcy54ID0gNjA7XHJcbiAgICB0aGlzLnkgPSAxMTA7XHJcbn07XHJcblxyXG5HYW1lLlBsYXllci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuUGxheWVyLFxyXG5cclxuICAgIC8vIGp1bXA6ZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYoIXRoaXMuanVtcGluZyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmVsb2NpdHlfeSAtPSAxNTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIGhpdE5vdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcbiAgICB9LFxyXG5cclxuICAgIG1vdmVMZWZ0OmZ1bmN0aW9uKCkgeyBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggLT0gMC43NTtcclxuICAgIH0sXHJcbiAgICBtb3ZlUmlnaHQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94ICs9IDAuNzU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5X3g7XHJcbiAgICAgICAgLy8gdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuR2FtZS5Ob3RlID0gZnVuY3Rpb24oeCwgeSwgYXVkaW9GaWxlKXtcclxuICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDI7XHJcbiAgICB0aGlzLndpZHRoID0gMjtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlfeSA9IDE7XHJcblxyXG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oYXVkaW9GaWxlKTtcclxufVxyXG5cclxuR2FtZS5Ob3RlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5Ob3RlLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=