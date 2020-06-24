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

var Game = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");

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
        note.hit = true; // debugger;

        note.sound.play(); // console.log(note.sound);
        // debugger;
      }
    });
    game.world.bassNoteArr.forEach(function (note) {
      if (note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit) {
        game.world.scoreUpdate();
        note.hit = true;
        note.sound.play(); // console.log(note.sound);
        // debugger;
      }
    });
    game.world.eightNoteArr.forEach(function (note) {
      if (note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit) {
        game.world.scoreUpdate();
        note.hit = true;
        note.sound.play(); // console.log(note.sound);
        // debugger;
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
      if (note.y < 120) {
        display.drawNote(note);

        if (game.world.noteArr[game.world.noteArr.length - 1].y > 118) {
          game.world.gameEndMessage();
          game.world.gameEnd();
        }
      }
    });
    game.world.bassNoteArr.forEach(function (note) {
      if (note.y < 120) {
        display.drawNote(note);
      }
    });
    game.world.eightNoteArr.forEach(function (note) {
      if (note.y < 120) {
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

  document.body.onkeyup = function (e) {
    if (e.keyCode == 32) {
      game.world.restartGame();
      game.world.fillNoteArr();
      game.world.fillBassArr();
      game.world.fillEightArr();
      document.getElementById('start-menu').classList.add('playing');

      if (!document.getElementById('end-menu').classList.contains('playing')) {
        document.getElementById('end-menu').classList.add('playing');
      }

      setInterval(function () {
        return noteDrop();
      }, 1);
    }
  };

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
    melodyArr: ['a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3', 'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'd5.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3', 'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'd5.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3'],
    bassArr: ['fs3.mp3', 'e3.mp3', 'ds3.mp3', 'd3.mp3', 'e3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'fs3.mp3', 'e3.mp3', 'ds3.mp3', 'd3.mp3', 'e3.mp3'],
    eightArr: ['a5.mp3', 'gs5.mp3', 'g5.mp3', 'fs5.mp3', 'fs5.mp3', 'gs5.mp3', 'a5.mp3', 'fs5.mp3', 'fs6.mp3', 'fs5.mp3', 'e5.mp3', 'cs5.mp3', 'b.mp3', 'b.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3', 'a5.mp3', 'gs5.mp3', 'g5.mp3', 'fs5.mp3', 'fs5.mp3', 'gs5.mp3', 'a5.mp3', 'fs5.mp3', 'fs6.mp3', 'fs5.mp3', 'e5.mp3', 'cs5.mp3', 'b.mp3', 'd6.mp3', 'cs6.mp3', 'b5.mp3', 'a5.mp3', 'fs5.mp3'],
    xPosArr: [70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 35, 45, 35, 25, 15, 70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 80, 75, 73, 70, 55, 35, 45, 35, 25, 35, 45, 35, 25, 35, 45, 35, 25, 35, 45, 35, 25, 35, 45, 35, 45, 35, 45, 35, 45, 45, 45, 45, 45, 45, 45, 70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 35, 45, 35, 25, 15, 70, 65, 60, 55, 55, 65, 70, 55, 90, 55, 50, 45, 35, 80, 75, 73, 70, 55, 150],
    xBassPosArr: [65, 50, 65, 45, 25, 35, 35, 35, 35, 35, 35, 65, 50, 65, 45, 25],
    xEightPosArr: [75, 70, 65, 60, 60, 70, 75, 60, 95, 60, 55, 50, 40, 40, 50, 40, 30, 20, 75, 70, 65, 60, 60, 70, 75, 60, 95, 60, 55, 50, 40, 85, 80, 78, 75, 60],
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
      var message = '';

      if (this.score === 100) {
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

      while (this.noteArr.length < 102) {
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

      while (this.bassNoteArr.length < 16) {
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

      while (this.eightNoteArr.length < 36) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsInJlcXVpcmUiLCJEaXNwbGF5IiwiRW5naW5lIiwiR2FtZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXlEb3duVXAiLCJjb250cm9sbGVyIiwidHlwZSIsImtleUNvZGUiLCJyZXNpemUiLCJkaXNwbGF5IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJ0b0ZpeGVkIiwidG9TdHJpbmciLCJub3RlQXJyIiwiZm9yRWFjaCIsIm5vdGUiLCJ4IiwicGxheWVyIiwieSIsImhpdCIsInNjb3JlVXBkYXRlIiwic291bmQiLCJwbGF5IiwiYmFzc05vdGVBcnIiLCJlaWdodE5vdGVBcnIiLCJ1cGRhdGUiLCJsZWZ0IiwiYWN0aXZlIiwibW92ZUxlZnQiLCJyaWdodCIsIm1vdmVSaWdodCIsIm5vdGVEcm9wIiwiZmlsbCIsImJhY2tncm91bmRfY29sb3IiLCJkcmF3Tm90ZSIsImxlbmd0aCIsImdhbWVFbmRNZXNzYWdlIiwiZ2FtZUVuZCIsImRyYXdSZWN0YW5nbGUiLCJjb2xvciIsInF1ZXJ5U2VsZWN0b3IiLCJlbmdpbmUiLCJidWZmZXIiLCJjYW52YXMiLCJ3aW5kb3ciLCJjbGFzc0xpc3QiLCJhZGQiLCJib2R5Iiwib25rZXl1cCIsInJlc3RhcnRHYW1lIiwiZmlsbE5vdGVBcnIiLCJmaWxsQmFzc0FyciIsImZpbGxFaWdodEFyciIsImNvbnRhaW5zIiwic2V0SW50ZXJ2YWwiLCJzdGFydCIsIkJ1dHRvbklucHV0IiwidXAiLCJrZXlfY29kZSIsImRvd24iLCJnZXRJbnB1dCIsInByb3RvdHlwZSIsImNvbnN0cnVjdG9yIiwibW9kdWxlIiwiZXhwb3J0cyIsImNyZWF0ZUVsZW1lbnQiLCJnZXRDb250ZXh0IiwiY29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiTWF0aCIsImZsb29yIiwiZHJhd0ltYWdlIiwiaGVpZ2h0X3dpZHRoX3JhdGlvIiwiaW1hZ2VTbW9vdGhpbmdFbmFibGVkIiwidGltZV9zdGVwIiwiYWNjdW11bGF0ZWRfdGltZSIsImFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0IiwidW5kZWZpbmVkIiwidGltZSIsInVwZGF0ZWQiLCJydW4iLCJ0aW1lX3N0YW1wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaGFuZGxlUnVuIiwicGVyZm9ybWFuY2UiLCJub3ciLCJzdG9wIiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJmcmljdGlvbiIsImdyYXZpdHkiLCJQbGF5ZXIiLCJtZWxvZHlBcnIiLCJiYXNzQXJyIiwiZWlnaHRBcnIiLCJ4UG9zQXJyIiwieEJhc3NQb3NBcnIiLCJ4RWlnaHRQb3NBcnIiLCJyZW1vdmUiLCJtZXNzYWdlIiwiY291bnQiLCJwdXNoIiwiTm90ZSIsImNvbGxpZGVPYmplY3QiLCJvYmplY3QiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsImF1ZGlvRmlsZSIsInJhbmRvbSIsInNsaWNlIiwiQXVkaW8iXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7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LENBQXRCO0FBU0EzQyxNQUFNLENBQUNDLE9BQVAsR0FBaUIxRSxJQUFqQixDOzs7Ozs7Ozs7OztBQy9VQSx1QyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvZGlzdC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgJy4vc3R5bGVzL2luZGV4LnNjc3MnO1xyXG5jb25zdCBDb250cm9sbGVyID0gcmVxdWlyZSgnLi9zY3JpcHRzL2NvbnRyb2xsZXInKTtcclxuY29uc3QgRGlzcGxheSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9kaXNwbGF5Jyk7XHJcbmNvbnN0IEVuZ2luZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9lbmdpbmUnKTtcclxuY29uc3QgR2FtZSA9IHJlcXVpcmUoJy4vc2NyaXB0cy9nYW1lJyk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlLWNvbnRhaW5lcicpLmlubmVySFRNTCA9IChnYW1lLndvcmxkLnNjb3JlID09PSAwKSA/IChcclxuICAgICAgICAgICAgJzAlJ1xyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIChnYW1lLndvcmxkLnNjb3JlLnRvRml4ZWQoMikpLnRvU3RyaW5nKCkgKyAnJSdcclxuICAgICAgICApIFxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhub3RlLnNvdW5kKTtcclxuICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5iYXNzTm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnggPj0gZ2FtZS53b3JsZC5wbGF5ZXIueCAmJiBub3RlLnggPD0gZ2FtZS53b3JsZC5wbGF5ZXIueCArIDI0ICYmIG5vdGUueSA+PSBnYW1lLndvcmxkLnBsYXllci55ICYmIG5vdGUueSA8PSBnYW1lLndvcmxkLnBsYXllci55ICsgNCAmJiAhbm90ZS5oaXQpe1xyXG4gICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5zY29yZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5oaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgbm90ZS5zb3VuZC5wbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhub3RlLnNvdW5kKTtcclxuICAgICAgICAgICAgICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5laWdodE5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS54ID49IGdhbWUud29ybGQucGxheWVyLnggJiYgbm90ZS54IDw9IGdhbWUud29ybGQucGxheWVyLnggKyAyNCAmJiBub3RlLnkgPj0gZ2FtZS53b3JsZC5wbGF5ZXIueSAmJiBub3RlLnkgPD0gZ2FtZS53b3JsZC5wbGF5ZXIueSArIDQgJiYgIW5vdGUuaGl0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIG5vdGUuaGl0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIG5vdGUuc291bmQucGxheSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobm90ZS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICBcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKGNvbnRyb2xsZXIubGVmdC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5wbGF5ZXIubW92ZUxlZnQoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLnggKyAxNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQubm90ZUFyclsxXS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY29udHJvbGxlci5yaWdodC5hY3RpdmUpe1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5tb3ZlUmlnaHQoKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQucGxheWVyLnggKyAxNCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWUud29ybGQubm90ZUFyclsxXS55KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYoY29udHJvbGxlci51cC5hY3RpdmUpe1xyXG4gICAgICAgIC8vICAgICBnYW1lLndvcmxkLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRyb2xsZXIudXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgbm90ZURyb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCl7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYXdOb3RlKG5vdGUpO1xyXG4gICAgICAgICAgICAgICAgaWYoZ2FtZS53b3JsZC5ub3RlQXJyW2dhbWUud29ybGQubm90ZUFyci5sZW5ndGggLSAxXS55ID4gMTE4KXtcclxuICAgICAgICAgICAgICAgICAgICBnYW1lLndvcmxkLmdhbWVFbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FtZS53b3JsZC5nYW1lRW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBnYW1lLndvcmxkLmJhc3NOb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGdhbWUud29ybGQuZWlnaHROb3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueSA8IDEyMCkge1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcblxyXG4gICAgICAgIGRpc3BsYXkucmVuZGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNvbnRyb2xsZXIgPSBuZXcgQ29udHJvbGxlcigpO1xyXG4gICAgbGV0IGRpc3BsYXkgPSBuZXcgRGlzcGxheShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKSk7XHJcbiAgICBsZXQgZ2FtZSA9IG5ldyBHYW1lKCk7XHJcbiAgICBsZXQgZW5naW5lID0gbmV3IEVuZ2luZSgxMDAwLzMwLCByZW5kZXIsIHVwZGF0ZSk7XHJcblxyXG4gICAgZGlzcGxheS5idWZmZXIuY2FudmFzLmhlaWdodCA9IGdhbWUud29ybGQuaGVpZ2h0O1xyXG4gICAgZGlzcGxheS5idWZmZXIuY2FudmFzLndpZHRoID0gZ2FtZS53b3JsZC53aWR0aDtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBrZXlEb3duVXApO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7XHJcblxyXG4gICAgcmVzaXplKCk7XHJcbiAgICAvLyBkZWJ1Z2dlcjtcclxuICAgIFxyXG4gICAgZGlzcGxheS5maWxsKGdhbWUud29ybGQuYmFja2dyb3VuZF9jb2xvcik7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LmFkZCgncGxheWluZycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkub25rZXl1cCA9IGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKGUua2V5Q29kZSA9PSAzMil7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucmVzdGFydEdhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS53b3JsZC5maWxsTm90ZUFycigpO1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLmZpbGxCYXNzQXJyKCk7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQuZmlsbEVpZ2h0QXJyKCk7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5jb250YWlucygncGxheWluZycpKXtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbmQtbWVudScpLmNsYXNzTGlzdC5hZGQoJ3BsYXlpbmcnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGVuZ2luZS5zdGFydCgpO1xyXG59KTsiLCJcclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sZWZ0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMucmlnaHQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy51cCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcblxyXG4gICAgdGhpcy5rZXlEb3duVXAgPSBmdW5jdGlvbih0eXBlLCBrZXlfY29kZSkge1xyXG4gICAgICAgIGxldCBkb3duID0gKHR5cGUgPT09ICdrZXlkb3duJykgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXlfY29kZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdC5nZXRJbnB1dChkb3duKTsgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzg6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cC5nZXRJbnB1dChkb3duKTsgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOTogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0LmdldElucHV0KGRvd24pO1xyXG4gICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXJcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5kb3duID0gZmFsc2U7XHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlci5CdXR0b25JbnB1dCxcclxuXHJcbiAgICBnZXRJbnB1dCA6IGZ1bmN0aW9uKGRvd24pIHtcclxuICAgICAgICBpZih0aGlzLmRvd24gIT0gZG93bikgdGhpcy5hY3RpdmUgPSBkb3duO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGRvd247XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xsZXI7IiwiY29uc3QgRGlzcGxheSA9IGZ1bmN0aW9uKGNhbnZhcyl7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyksXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB0aGlzLmRyYXdSZWN0YW5nbGUgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIGRyYXcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kcmF3Tm90ZSA9IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yIH0gPSBub3RlO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsbCA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLmNhbnZhcywgMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0LCAwLCAwLCB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICBpZihoZWlnaHQgLyB3aWR0aCA+IGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gd2lkdGggKiBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IGhlaWdodCAvIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICBcclxufTtcclxuXHJcbkRpc3BsYXkucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBEaXNwbGF5XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERpc3BsYXk7IiwiXHJcbmNvbnN0IEVuZ2luZSA9IGZ1bmN0aW9uKHRpbWVfc3RlcCwgdXBkYXRlLCByZW5kZXIpIHtcclxuICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IDA7XHJcbiAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gdW5kZWZpbmVkLFxyXG4gICAgdGhpcy50aW1lID0gdW5kZWZpbmVkLFxyXG4gICAgdGhpcy50aW1lX3N0ZXAgPSB0aW1lX3N0ZXAsXHJcblxyXG4gICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSB1cGRhdGU7XHJcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlcjtcclxuXHJcbiAgICB0aGlzLnJ1biA9IGZ1bmN0aW9uKHRpbWVfc3RhbXApIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgKz0gdGltZV9zdGFtcCAtIHRoaXMudGltZTtcclxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lX3N0YW1wO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwICogMykge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdoaWxlKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgLT0gdGhpcy50aW1lX3N0ZXA7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSh0aW1lX3N0YW1wKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLnVwZGF0ZWQpe1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGltZV9zdGFtcCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuaGFuZGxlUnVuID0gKHRpbWVfc3RlcCkgPT4ge1xyXG4gICAgICAgIHRoaXMucnVuKHRpbWVfc3RlcCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW5naW5lLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRW5naW5lLFxyXG5cclxuICAgIHN0YXJ0OmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgICB0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmhhbmRsZVJ1bik7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0b3A6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QpO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbmdpbmU7IiwiY29uc3QgR2FtZSA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHRoaXMud29ybGQgPSB7XHJcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGZyaWN0aW9uOiAwLjksXHJcbiAgICAgICAgZ3Jhdml0eTogMyxcclxuICAgICAgICBwbGF5ZXI6IG5ldyBHYW1lLlBsYXllcigpLFxyXG4gICAgICAgIG5vdGVBcnI6IFtdLFxyXG4gICAgICAgIGJhc3NOb3RlQXJyOiBbXSxcclxuICAgICAgICBlaWdodE5vdGVBcnI6IFtdLFxyXG4gICAgICAgIGhlaWdodDogMTI4LFxyXG4gICAgICAgIHdpZHRoOiAxNTAsXHJcbiAgICAgICAgc2NvcmU6IDAsXHJcbiAgICAgICAgbWVsb2R5QXJyOiBbXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLCBcclxuICAgICAgICAgICAgJ2ZzLm1wMycsICdlLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdmczMubXAzJyxcclxuICAgICAgICAgICAgJ2EubXAzJywgJ2dzLm1wMycsICdnLm1wMycsICdmcy5tcDMnLCAnZnMubXAzJywgJ2dzLm1wMycsICdhLm1wMycsICdmcy5tcDMnLCAnZnM1Lm1wMycsXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdkNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdhLm1wMycsICdmcy5tcDMnLFxyXG5cclxuICAgICAgICAgICAgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnYTMubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2EzLm1wMycsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdjcy5tcDMnLCAnYjMubXAzJywgJ2NzLm1wMycsIFxyXG5cclxuICAgICAgICAgICAgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgJ2NzLm1wMycsICdjcy5tcDMnLCAnY3MubXAzJywgXHJcblxyXG4gICAgICAgICAgICAnYS5tcDMnLCAnZ3MubXAzJywgJ2cubXAzJywgJ2ZzLm1wMycsICdmcy5tcDMnLCAnZ3MubXAzJywgJ2EubXAzJywgJ2ZzLm1wMycsICdmczUubXAzJywgXHJcbiAgICAgICAgICAgICdmcy5tcDMnLCAnZS5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnY3MubXAzJywgJ2IzLm1wMycsICdhMy5tcDMnLCAnZnMzLm1wMycsXHJcbiAgICAgICAgICAgICdhLm1wMycsICdncy5tcDMnLCAnZy5tcDMnLCAnZnMubXAzJywgJ2ZzLm1wMycsICdncy5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgICAgICAnZnMubXAzJywgJ2UubXAzJywgJ2NzLm1wMycsICdiMy5tcDMnLCAnZDUubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuICAgICAgICBdLFxyXG4gICAgICAgIGJhc3NBcnI6IFtcclxuICAgICAgICAgICAgJ2ZzMy5tcDMnLCAnZTMubXAzJywgJ2RzMy5tcDMnLCAnZDMubXAzJywgJ2UzLm1wMycsIFxyXG4gICAgICAgICAgICAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLCAnYjMubXAzJywgJ2IzLm1wMycsICdiMy5tcDMnLFxyXG4gICAgICAgICAgICAnZnMzLm1wMycsICdlMy5tcDMnLCAnZHMzLm1wMycsICdkMy5tcDMnLCAnZTMubXAzJywgXHJcbiAgICAgICAgXSxcclxuICAgICAgICBlaWdodEFycjogW1xyXG4gICAgICAgICAgICAnYTUubXAzJywgJ2dzNS5tcDMnLCAnZzUubXAzJywgJ2ZzNS5tcDMnLCAnZnM1Lm1wMycsICdnczUubXAzJywnYTUubXAzJywgJ2ZzNS5tcDMnLCAnZnM2Lm1wMycsXHJcbiAgICAgICAgICAgICdmczUubXAzJywgJ2U1Lm1wMycsICdjczUubXAzJywgJ2IubXAzJywgJ2IubXAzJywgJ2NzNS5tcDMnLCAnYi5tcDMnLCAnYS5tcDMnLCAnZnMubXAzJyxcclxuICAgICAgICAgICAgJ2E1Lm1wMycsICdnczUubXAzJywgJ2c1Lm1wMycsICdmczUubXAzJywgJ2ZzNS5tcDMnLCAnZ3M1Lm1wMycsJ2E1Lm1wMycsICdmczUubXAzJywgJ2ZzNi5tcDMnLFxyXG4gICAgICAgICAgICAnZnM1Lm1wMycsICdlNS5tcDMnLCAnY3M1Lm1wMycsICdiLm1wMycsICdkNi5tcDMnLCAnY3M2Lm1wMycsICdiNS5tcDMnLCAnYTUubXAzJywgJ2ZzNS5tcDMnLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeFBvc0FycjogW1xyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDM1LCA0NSwgMzUsIDI1LCAxNSwgXHJcbiAgICAgICAgICAgIDcwLCA2NSwgNjAsIDU1LCA1NSwgNjUsIDcwLCA1NSwgOTAsXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCA4MCwgNzUsIDczLCA3MCwgNTUsXHJcblxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCAyNSwgMzUsIDQ1LCAzNSwgMjUsIFxyXG4gICAgICAgICAgICAzNSwgNDUsIDM1LCAyNSwgMzUsIDQ1LCAzNSwgMjUsIFxyXG5cclxuICAgICAgICAgICAgMzUsIDQ1LCAzNSwgNDUsIDM1LCA0NSwgMzUsIDQ1LCBcclxuXHJcbiAgICAgICAgICAgIDQ1LCA0NSwgNDUsIDQ1LCA0NSwgNDUsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICA3MCwgNjUsIDYwLCA1NSwgNTUsIDY1LCA3MCwgNTUsIDkwLCBcclxuICAgICAgICAgICAgNTUsIDUwLCA0NSwgMzUsIDM1LCA0NSwgMzUsIDI1LCAxNSxcclxuICAgICAgICAgICAgNzAsIDY1LCA2MCwgNTUsIDU1LCA2NSwgNzAsIDU1LCA5MCwgXHJcbiAgICAgICAgICAgIDU1LCA1MCwgNDUsIDM1LCA4MCwgNzUsIDczLCA3MCwgNTUsXHJcbiAgICAgICAgICAgIDE1MCxcclxuICAgICAgICBdLFxyXG4gICAgICAgIHhCYXNzUG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDY1LCA1MCwgNjUsIDQ1LCAyNSxcclxuICAgICAgICAgICAgMzUsIDM1LCAzNSwgMzUsIDM1LCAzNSxcclxuICAgICAgICAgICAgNjUsIDUwLCA2NSwgNDUsIDI1LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgeEVpZ2h0UG9zQXJyOiBbXHJcbiAgICAgICAgICAgIDc1LCA3MCwgNjUsIDYwLCA2MCwgNzAsIDc1LCA2MCwgOTUsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNTAsIDQwLCA0MCwgNTAsIDQwLCAzMCwgMjAsXHJcbiAgICAgICAgICAgIDc1LCA3MCwgNjUsIDYwLCA2MCwgNzAsIDc1LCA2MCwgOTUsXHJcbiAgICAgICAgICAgIDYwLCA1NSwgNTAsIDQwLCA4NSwgODAsIDc4LCA3NSwgNjAsXHJcbiAgICAgICAgXSxcclxuXHJcbiAgICAgICAgcmVzdGFydEdhbWU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyciA9IFtdO1xyXG4gICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuZWlnaHROb3RlQXJyID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgPSAwO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdhbWVFbmQ6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuY2xhc3NMaXN0LnJlbW92ZSgncGxheWluZycpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2FtZUVuZE1lc3NhZ2U6ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnJztcclxuICAgICAgICAgICAgaWYodGhpcy5zY29yZSA9PT0gMTAwKXtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV09XISBQRVJGRUNUIFNDT1JFISBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDkwICYmIHRoaXMuc2NvcmUgPD0gOTkpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdTTyBDTE9TRSBUTyBQRVJGRUNUSU9OISBQUkVTUyBTUEFDRUJBUiBUTyBUUlkgQUdBSU4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNjb3JlID49IDgwICYmIHRoaXMuc2NvcmUgPD0gODkpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnUFJFVFRZIEdPT0QsIEJVVCBJIEJFVCBZT1UgQ0FOIERPIEJFVFRFUi4gUFJFU1MgU1BBQ0VCQVIgVE8gVFJZIEFHQUlOJ1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zY29yZSA+PSA3MCAmJiB0aGlzLnNjb3JlIDw9NzkpIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnT0ggTUFOLCBNQVlCRSBZT1UgU0hPVUxEIFBSQUNUSUNFIEEgTElUVExFIE1PUkUuIFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2NvcmUgPD0gNjkpe1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdJUyBZT1VSIE1PTklUT1IgT04/IFBSRVNTIFNQQUNFQkFSIFRPIFRSWSBBR0FJTidcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VuZC1tZW51JykuaW5uZXJIVE1MID0gbWVzc2FnZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaWxsTm90ZUFycjpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLm5vdGVBcnIubGVuZ3RoIDwgMTAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueFBvc0Fycltjb3VudF0sIHksIHRoaXMubWVsb2R5QXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigoY291bnQgPD0gNCkgfHwgKGNvdW50ID49IDY3ICYmIGNvdW50IDw9IDcwKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB8fCAoY291bnQgPj0gNzEgJiYgY291bnQgPD0gNzQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gOSB8fCBjb3VudCA9PT0gNzUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7ICBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpIHx8IChjb3VudCA+PSA3NiAmJiBjb3VudCA8PSA3OSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMTQgJiYgY291bnQgPD0gMTcpIHx8IChjb3VudCA+PSA4MCAmJiBjb3VudCA8PSA4MykpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxOCB8fCBjb3VudCA9PT0gODQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoKGNvdW50ID49IDE5ICYmIGNvdW50IDw9IDIyKSB8fCAoY291bnQgPj0gODUgJiYgY291bnQgPD0gODgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZigoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHx8IChjb3VudCA+PSA4OSAmJiBjb3VudCA8PSA5MikpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyB8fCBjb3VudCA9PT0gOTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIChjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkgfHwgKGNvdW50ID49IDk0ICYmIGNvdW50IDw9IDk3KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIChjb3VudCA+PSAzMiAmJiBjb3VudCA8PSAzNikgfHwgKGNvdW50ID49IDk4ICYmIGNvdW50IDw9IDEwMikpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA+PSAzNyAmJiBjb3VudCA8PSA2MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA2MSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY291bnQgPT09IDYyKXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gNjMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gNTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNjQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDY2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcclxuICAgICAgICBmaWxsQmFzc0FycjpmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLmJhc3NOb3RlQXJyLmxlbmd0aCA8IDE2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhc3NOb3RlQXJyLnB1c2gobmV3IEdhbWUuTm90ZSh0aGlzLnhCYXNzUG9zQXJyW2NvdW50XSwgeSwgdGhpcy5iYXNzQXJyW2NvdW50XSkpO1xyXG4gICAgICAgICAgICAgICAgY291bnQgKz0gMTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYmFzc05vdGVBcnJbY291bnQgLSAxXS5zb3VuZCk7XHJcbiAgICAgICAgICAgICAgICBpZihjb3VudCA8PSAzIHx8IChjb3VudCA+PSAxMiAmJiBjb3VudCA8PSAxNCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDE1MDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA9PT0gNCB8fCBjb3VudCA9PT0gMTUpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDYwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gNSApe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMzEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA2KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSA3KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSA5KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCBjb3VudCA9PT0gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5iYXNzTm90ZUFycik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZmlsbEVpZ2h0QXJyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxldCB5ID0gLTg4NTtcclxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5laWdodE5vdGVBcnIubGVuZ3RoIDwgMzYpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5laWdodE5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHRoaXMueEVpZ2h0UG9zQXJyW2NvdW50XSwgeSwgdGhpcy5laWdodEFycltjb3VudF0pKTtcclxuICAgICAgICAgICAgICAgIGNvdW50ICs9IDE7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmKGNvdW50IDw9IDQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gNSAmJiBjb3VudCA8PSA4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY291bnQgPT09IDkgfHwgY291bnQgPT09IDc1KXtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDMwOyAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMTAgJiYgY291bnQgPD0gMTMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjBcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxNCAmJiBjb3VudCA8PSAxNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMTA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPT09IDE4IHx8IGNvdW50ID09PSA4NCl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAxOSAmJiBjb3VudCA8PSAyMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY291bnQgPj0gMjMgJiYgY291bnQgPD0gMjYpIHtcclxuICAgICAgICAgICAgICAgICAgICB5IC09IDEwO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGNvdW50ID09PSAyNyl7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAzMDtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjb3VudCA+PSAyOCAmJiBjb3VudCA8PSAzMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHkgLT0gMjA7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIGNvdW50ID49IDMyICYmIGNvdW50IDw9IDM2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNjb3JlVXBkYXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNjb3JlICs9ICgxMDAgLyAodGhpcy5tZWxvZHlBcnIubGVuZ3RoICsgdGhpcy5iYXNzQXJyLmxlbmd0aCArIHRoaXMuZWlnaHRBcnIubGVuZ3RoKSk7XHJcbiAgICAgICAgICAgIC8vIHRoaXMuc2NvcmUgKz0gMTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjb2xsaWRlT2JqZWN0OmZ1bmN0aW9uKG9iamVjdCl7XHJcbiAgICAgICAgICAgIGlmKG9iamVjdC54IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSAwO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYob2JqZWN0LnggKyBvYmplY3Qud2lkdGggPiB0aGlzLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IHRoaXMud2lkdGggLSBvYmplY3Qud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICAvLyBpZihvYmplY3QueSA8IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gMDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfSBlbHNlIGlmKG9iamVjdC55ICsgb2JqZWN0LmhlaWdodCA+IHRoaXMuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QuanVtcGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSB0aGlzLmhlaWdodCAtIG9iamVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB1cGRhdGU6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKz0gdGhpcy5ncmF2aXR5O1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeCAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci51cGRhdGUoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuYmFzc05vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmVpZ2h0Tm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZU9iamVjdCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud29ybGQudXBkYXRlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuR2FtZS5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yIDogR2FtZSB9O1xyXG5cclxuR2FtZS5QbGF5ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmNvbG9yID0gJyNmZjAwMDAnO1xyXG4gICAgdGhpcy5oZWlnaHQgPSA0O1xyXG4gICAgLy8gdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAvLyB0aGlzLnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IDI0O1xyXG4gICAgdGhpcy54ID0gNjA7XHJcbiAgICB0aGlzLnkgPSAxMTA7XHJcbn07XHJcblxyXG5HYW1lLlBsYXllci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuUGxheWVyLFxyXG5cclxuICAgIC8vIGp1bXA6ZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYoIXRoaXMuanVtcGluZyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmVsb2NpdHlfeSAtPSAxNTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIG1vdmVMZWZ0OmZ1bmN0aW9uKCkgeyBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggLT0gMC43NTtcclxuICAgIH0sXHJcbiAgICBtb3ZlUmlnaHQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94ICs9IDAuNzU7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5X3g7XHJcbiAgICAgICAgLy8gdGhpcy55ICs9IHRoaXMudmVsb2NpdHlfeTtcclxuICAgIH1cclxufVxyXG5cclxuR2FtZS5Ob3RlID0gZnVuY3Rpb24oeCwgeSwgYXVkaW9GaWxlKXtcclxuICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDI7XHJcbiAgICB0aGlzLndpZHRoID0gMjtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlfeSA9IDE7XHJcblxyXG4gICAgdGhpcy5oaXQgPSBmYWxzZTtcclxuICAgIHRoaXMuc291bmQgPSBuZXcgQXVkaW8oYXVkaW9GaWxlKTtcclxufVxyXG5cclxuR2FtZS5Ob3RlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5Ob3RlLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=