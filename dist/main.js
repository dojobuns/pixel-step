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

window.addEventListener('load', function (e) {
  'use strict';

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
    display.render();
  };

  var update = function update() {
    if (controller.left.active) {
      game.world.player.moveLeft();
    }

    if (controller.right.active) {
      game.world.player.moveRight();
    } // if(controller.up.active){
    //     game.world.player.jump();
    //     controller.up.active = false;
    // }


    game.update();
  };

  var noteDrop = function noteDrop() {
    display.fill(game.world.background_color); //     display.drawNote(game.world.note2);
    // if(game.world.note.y < 130){
    //     display.drawNote(game.world.note);
    // }

    game.world.noteArr.forEach(function (note) {
      if (note.y < 120) {
        display.drawNote(note);
      }
    }); // debugger;

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
  resize();
  game.world.fillNoteArr(); // debugger;

  setInterval(function () {
    return noteDrop();
  }, 100);
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
    note: new Game.Note(0),
    note2: new Game.Note(-10),
    note3: new Game.Note(-20),
    noteArr: [],
    height: 128,
    width: 128,
    fillNoteArr: function fillNoteArr() {
      var y = 0;

      while (this.noteArr.length < 30) {
        this.noteArr.push(new Game.Note(y));
        y -= 20;
        debugger;
      }
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
      this.player.update();
      this.player.velocity_x *= this.friction;
      this.player.velocity_y *= this.friction;
      this.note.update();
      this.note2.update();
      this.noteArr.forEach(function (note) {
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

  this.width = 14;
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
    this.velocity_x -= 0.5;
  },
  moveRight: function moveRight() {
    this.velocity_x += 0.5;
  },
  update: function update() {
    this.x += this.velocity_x; // this.y += this.velocity_y;
  }
};

Game.Note = function (y) {
  this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);

  if (this.color.length != 7) {
    this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6);
  }

  this.height = 2;
  this.width = 2;
  this.x = Math.floor(Math.random() * 124);
  this.y = y;
  this.velocity_y = 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsInJlcXVpcmUiLCJEaXNwbGF5IiwiRW5naW5lIiwiR2FtZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5RG93blVwIiwiY29udHJvbGxlciIsInR5cGUiLCJrZXlDb2RlIiwicmVzaXplIiwiZGlzcGxheSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsInVwZGF0ZSIsImxlZnQiLCJhY3RpdmUiLCJwbGF5ZXIiLCJtb3ZlTGVmdCIsInJpZ2h0IiwibW92ZVJpZ2h0Iiwibm90ZURyb3AiLCJmaWxsIiwiYmFja2dyb3VuZF9jb2xvciIsIm5vdGVBcnIiLCJmb3JFYWNoIiwibm90ZSIsInkiLCJkcmF3Tm90ZSIsImRyYXdSZWN0YW5nbGUiLCJ4IiwiY29sb3IiLCJxdWVyeVNlbGVjdG9yIiwiZW5naW5lIiwiYnVmZmVyIiwiY2FudmFzIiwiZmlsbE5vdGVBcnIiLCJzZXRJbnRlcnZhbCIsInN0YXJ0IiwiQnV0dG9uSW5wdXQiLCJ1cCIsImtleV9jb2RlIiwiZG93biIsImdldElucHV0IiwicHJvdG90eXBlIiwiY29uc3RydWN0b3IiLCJtb2R1bGUiLCJleHBvcnRzIiwiY3JlYXRlRWxlbWVudCIsImdldENvbnRleHQiLCJjb250ZXh0IiwiZmlsbFN0eWxlIiwiZmlsbFJlY3QiLCJNYXRoIiwiZmxvb3IiLCJkcmF3SW1hZ2UiLCJoZWlnaHRfd2lkdGhfcmF0aW8iLCJpbWFnZVNtb290aGluZ0VuYWJsZWQiLCJ0aW1lX3N0ZXAiLCJhY2N1bXVsYXRlZF90aW1lIiwiYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QiLCJ1bmRlZmluZWQiLCJ0aW1lIiwidXBkYXRlZCIsInJ1biIsInRpbWVfc3RhbXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJoYW5kbGVSdW4iLCJwZXJmb3JtYW5jZSIsIm5vdyIsInN0b3AiLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsImZyaWN0aW9uIiwiZ3Jhdml0eSIsIlBsYXllciIsIk5vdGUiLCJub3RlMiIsIm5vdGUzIiwibGVuZ3RoIiwicHVzaCIsImNvbGxpZGVPYmplY3QiLCJvYmplY3QiLCJ2ZWxvY2l0eV94IiwidmVsb2NpdHlfeSIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7O0FBQ0EsSUFBTUEsVUFBVSxHQUFHQyxtQkFBTyxDQUFDLHlEQUFELENBQTFCOztBQUNBLElBQU1DLE9BQU8sR0FBR0QsbUJBQU8sQ0FBQyxtREFBRCxDQUF2Qjs7QUFDQSxJQUFNRSxNQUFNLEdBQUdGLG1CQUFPLENBQUMsaURBQUQsQ0FBdEI7O0FBQ0EsSUFBTUcsSUFBSSxHQUFHSCxtQkFBTyxDQUFDLDZDQUFELENBQXBCOztBQUVBSSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFVBQVNDLENBQVQsRUFBWTtBQUN4Qzs7QUFFQSxNQUFJQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFTRCxDQUFULEVBQVk7QUFDeEJFLGNBQVUsQ0FBQ0QsU0FBWCxDQUFxQkQsQ0FBQyxDQUFDRyxJQUF2QixFQUE2QkgsQ0FBQyxDQUFDSSxPQUEvQjtBQUNILEdBRkQ7O0FBSUEsTUFBSUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBU0wsQ0FBVCxFQUFZO0FBQ3JCTSxXQUFPLENBQUNELE1BQVIsQ0FBZUUsUUFBUSxDQUFDQyxlQUFULENBQXlCQyxXQUF6QixHQUF1QyxFQUF0RCxFQUEwREYsUUFBUSxDQUFDQyxlQUFULENBQXlCRSxZQUF6QixHQUF3QyxFQUFsRyxFQUFzR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdDLE1BQVgsR0FBb0JGLElBQUksQ0FBQ0MsS0FBTCxDQUFXRSxLQUFySTtBQUNBUixXQUFPLENBQUNTLE1BQVI7QUFDSCxHQUhEOztBQUtBLE1BQUlBLE1BQU0sR0FBRyxTQUFUQSxNQUFTLEdBQVc7QUFFcEI7QUFDQTtBQUNBO0FBQ0FULFdBQU8sQ0FBQ1MsTUFBUjtBQUVILEdBUEQ7O0FBU0EsTUFBSUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsR0FBVztBQUNwQixRQUFHZCxVQUFVLENBQUNlLElBQVgsQ0FBZ0JDLE1BQW5CLEVBQTJCO0FBQ3ZCUCxVQUFJLENBQUNDLEtBQUwsQ0FBV08sTUFBWCxDQUFrQkMsUUFBbEI7QUFDSDs7QUFFRCxRQUFHbEIsVUFBVSxDQUFDbUIsS0FBWCxDQUFpQkgsTUFBcEIsRUFBMkI7QUFDdkJQLFVBQUksQ0FBQ0MsS0FBTCxDQUFXTyxNQUFYLENBQWtCRyxTQUFsQjtBQUNILEtBUG1CLENBU3BCO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQVgsUUFBSSxDQUFDSyxNQUFMO0FBQ0gsR0FmRDs7QUFpQkEsTUFBSU8sUUFBUSxHQUFHLFNBQVhBLFFBQVcsR0FBVztBQUN0QmpCLFdBQU8sQ0FBQ2tCLElBQVIsQ0FBYWIsSUFBSSxDQUFDQyxLQUFMLENBQVdhLGdCQUF4QixFQURzQixDQUd0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQWQsUUFBSSxDQUFDQyxLQUFMLENBQVdjLE9BQVgsQ0FBbUJDLE9BQW5CLENBQTJCLFVBQUFDLElBQUksRUFBSTtBQUMvQixVQUFHQSxJQUFJLENBQUNDLENBQUwsR0FBUyxHQUFaLEVBQWdCO0FBQ1p2QixlQUFPLENBQUN3QixRQUFSLENBQWlCRixJQUFqQjtBQUNIO0FBQ0osS0FKRCxFQVJzQixDQWF0Qjs7QUFFQXRCLFdBQU8sQ0FBQ3lCLGFBQVIsQ0FBc0JwQixJQUFJLENBQUNDLEtBQUwsQ0FBV08sTUFBWCxDQUFrQmEsQ0FBeEMsRUFBMkNyQixJQUFJLENBQUNDLEtBQUwsQ0FBV08sTUFBWCxDQUFrQlUsQ0FBN0QsRUFBZ0VsQixJQUFJLENBQUNDLEtBQUwsQ0FBV08sTUFBWCxDQUFrQkwsS0FBbEYsRUFBeUZILElBQUksQ0FBQ0MsS0FBTCxDQUFXTyxNQUFYLENBQWtCTixNQUEzRyxFQUFtSEYsSUFBSSxDQUFDQyxLQUFMLENBQVdPLE1BQVgsQ0FBa0JjLEtBQXJJO0FBQ0EzQixXQUFPLENBQUNTLE1BQVI7QUFDSCxHQWpCRDs7QUFtQkEsTUFBSWIsVUFBVSxHQUFHLElBQUlULFVBQUosRUFBakI7QUFDQSxNQUFJYSxPQUFPLEdBQUcsSUFBSVgsT0FBSixDQUFZWSxRQUFRLENBQUMyQixhQUFULENBQXVCLFFBQXZCLENBQVosQ0FBZDtBQUNBLE1BQUl2QixJQUFJLEdBQUcsSUFBSWQsSUFBSixFQUFYO0FBQ0EsTUFBSXNDLE1BQU0sR0FBRyxJQUFJdkMsTUFBSixDQUFXLE9BQUssRUFBaEIsRUFBb0JtQixNQUFwQixFQUE0QkMsTUFBNUIsQ0FBYjtBQUVBVixTQUFPLENBQUM4QixNQUFSLENBQWVDLE1BQWYsQ0FBc0J4QixNQUF0QixHQUErQkYsSUFBSSxDQUFDQyxLQUFMLENBQVdDLE1BQTFDO0FBQ0FQLFNBQU8sQ0FBQzhCLE1BQVIsQ0FBZUMsTUFBZixDQUFzQnZCLEtBQXRCLEdBQThCSCxJQUFJLENBQUNDLEtBQUwsQ0FBV0UsS0FBekM7QUFFQWhCLFFBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsU0FBeEIsRUFBbUNFLFNBQW5DO0FBQ0FILFFBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUNFLFNBQWpDO0FBQ0FILFFBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0NNLE1BQWxDO0FBRUFBLFFBQU07QUFDTk0sTUFBSSxDQUFDQyxLQUFMLENBQVcwQixXQUFYLEdBdEV3QyxDQXVFeEM7O0FBQ0FDLGFBQVcsQ0FBQztBQUFBLFdBQU1oQixRQUFRLEVBQWQ7QUFBQSxHQUFELEVBQW1CLEdBQW5CLENBQVg7QUFFQVksUUFBTSxDQUFDSyxLQUFQO0FBQ0gsQ0EzRUQsRTs7Ozs7Ozs7Ozs7QUNMQSxJQUFNL0MsVUFBVSxHQUFHLFNBQWJBLFVBQWEsR0FBVztBQUMxQixPQUFLd0IsSUFBTCxHQUFZLElBQUl4QixVQUFVLENBQUNnRCxXQUFmLEVBQVo7QUFDQSxPQUFLcEIsS0FBTCxHQUFhLElBQUk1QixVQUFVLENBQUNnRCxXQUFmLEVBQWI7QUFDQSxPQUFLQyxFQUFMLEdBQVUsSUFBSWpELFVBQVUsQ0FBQ2dELFdBQWYsRUFBVjs7QUFFQSxPQUFLeEMsU0FBTCxHQUFpQixVQUFTRSxJQUFULEVBQWV3QyxRQUFmLEVBQXlCO0FBQ3RDLFFBQUlDLElBQUksR0FBSXpDLElBQUksS0FBSyxTQUFWLEdBQXVCLElBQXZCLEdBQThCLEtBQXpDOztBQUVBLFlBQU93QyxRQUFQO0FBRUksV0FBSyxFQUFMO0FBQ0ksYUFBSzFCLElBQUwsQ0FBVTRCLFFBQVYsQ0FBbUJELElBQW5CO0FBQ0E7O0FBQ0osV0FBSyxFQUFMO0FBQ0ksYUFBS0YsRUFBTCxDQUFRRyxRQUFSLENBQWlCRCxJQUFqQjtBQUNBOztBQUNKLFdBQUssRUFBTDtBQUNJLGFBQUt2QixLQUFMLENBQVd3QixRQUFYLENBQW9CRCxJQUFwQjtBQVRSO0FBWUgsR0FmRDtBQWdCSCxDQXJCRDs7QUF1QkFuRCxVQUFVLENBQUNxRCxTQUFYLEdBQXVCO0FBQ25CQyxhQUFXLEVBQUd0RDtBQURLLENBQXZCOztBQUlBQSxVQUFVLENBQUNnRCxXQUFYLEdBQXlCLFlBQVc7QUFDaEMsT0FBS3ZCLE1BQUwsR0FBYyxLQUFLMEIsSUFBTCxHQUFZLEtBQTFCO0FBQ0gsQ0FGRDs7QUFJQW5ELFVBQVUsQ0FBQ2dELFdBQVgsQ0FBdUJLLFNBQXZCLEdBQW1DO0FBQy9CQyxhQUFXLEVBQUd0RCxVQUFVLENBQUNnRCxXQURNO0FBRy9CSSxVQUFRLEVBQUcsa0JBQVNELElBQVQsRUFBZTtBQUN0QixRQUFHLEtBQUtBLElBQUwsSUFBYUEsSUFBaEIsRUFBc0IsS0FBSzFCLE1BQUwsR0FBYzBCLElBQWQ7QUFDdEIsU0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7QUFOOEIsQ0FBbkM7QUFTQUksTUFBTSxDQUFDQyxPQUFQLEdBQWlCeEQsVUFBakIsQzs7Ozs7Ozs7Ozs7QUN6Q0EsSUFBTUUsT0FBTyxHQUFHLFNBQVZBLE9BQVUsQ0FBUzBDLE1BQVQsRUFBZ0I7QUFDNUIsT0FBS0QsTUFBTCxHQUFjN0IsUUFBUSxDQUFDMkMsYUFBVCxDQUF1QixRQUF2QixFQUFpQ0MsVUFBakMsQ0FBNEMsSUFBNUMsQ0FBZCxFQUNBLEtBQUtDLE9BQUwsR0FBZWYsTUFBTSxDQUFDYyxVQUFQLENBQWtCLElBQWxCLENBRGY7O0FBR0EsT0FBS3BCLGFBQUwsR0FBcUIsVUFBU0MsQ0FBVCxFQUFZSCxDQUFaLEVBQWVmLEtBQWYsRUFBc0JELE1BQXRCLEVBQThCb0IsS0FBOUIsRUFBcUM7QUFDdEQsU0FBS0csTUFBTCxDQUFZaUIsU0FBWixHQUF3QnBCLEtBQXhCO0FBQ0EsU0FBS0csTUFBTCxDQUFZa0IsUUFBWixDQUFxQkMsSUFBSSxDQUFDQyxLQUFMLENBQVd4QixDQUFYLENBQXJCLEVBQW9DdUIsSUFBSSxDQUFDQyxLQUFMLENBQVczQixDQUFYLENBQXBDLEVBQW1EZixLQUFuRCxFQUEwREQsTUFBMUQsRUFGc0QsQ0FHdEQ7QUFDSCxHQUpEOztBQU1BLE9BQUtpQixRQUFMLEdBQWdCLFVBQVNGLElBQVQsRUFBZTtBQUFBLFFBQ25CSSxDQURtQixHQUNZSixJQURaLENBQ25CSSxDQURtQjtBQUFBLFFBQ2hCSCxDQURnQixHQUNZRCxJQURaLENBQ2hCQyxDQURnQjtBQUFBLFFBQ2JmLEtBRGEsR0FDWWMsSUFEWixDQUNiZCxLQURhO0FBQUEsUUFDTkQsTUFETSxHQUNZZSxJQURaLENBQ05mLE1BRE07QUFBQSxRQUNFb0IsS0FERixHQUNZTCxJQURaLENBQ0VLLEtBREY7QUFFM0IsU0FBS0csTUFBTCxDQUFZaUIsU0FBWixHQUF3QnBCLEtBQXhCO0FBQ0EsU0FBS0csTUFBTCxDQUFZa0IsUUFBWixDQUFxQkMsSUFBSSxDQUFDQyxLQUFMLENBQVd4QixDQUFYLENBQXJCLEVBQW9DdUIsSUFBSSxDQUFDQyxLQUFMLENBQVczQixDQUFYLENBQXBDLEVBQW1EZixLQUFuRCxFQUEwREQsTUFBMUQsRUFIMkIsQ0FJM0I7QUFDSCxHQUxEOztBQU9BLE9BQUtXLElBQUwsR0FBWSxVQUFTUyxLQUFULEVBQWdCO0FBQ3hCLFNBQUtHLE1BQUwsQ0FBWWlCLFNBQVosR0FBd0JwQixLQUF4QjtBQUNBLFNBQUtHLE1BQUwsQ0FBWWtCLFFBQVosQ0FBcUIsQ0FBckIsRUFBd0IsQ0FBeEIsRUFBMkIsS0FBS2xCLE1BQUwsQ0FBWUMsTUFBWixDQUFtQnZCLEtBQTlDLEVBQXFELEtBQUtzQixNQUFMLENBQVlDLE1BQVosQ0FBbUJ4QixNQUF4RTtBQUNILEdBSEQ7O0FBS0EsT0FBS0UsTUFBTCxHQUFjLFlBQVc7QUFDckIsU0FBS3FDLE9BQUwsQ0FBYUssU0FBYixDQUF1QixLQUFLckIsTUFBTCxDQUFZQyxNQUFuQyxFQUEyQyxDQUEzQyxFQUE4QyxDQUE5QyxFQUFpRCxLQUFLRCxNQUFMLENBQVlDLE1BQVosQ0FBbUJ2QixLQUFwRSxFQUEyRSxLQUFLc0IsTUFBTCxDQUFZQyxNQUFaLENBQW1CeEIsTUFBOUYsRUFBc0csQ0FBdEcsRUFBeUcsQ0FBekcsRUFBNEcsS0FBS3VDLE9BQUwsQ0FBYWYsTUFBYixDQUFvQnZCLEtBQWhJLEVBQXVJLEtBQUtzQyxPQUFMLENBQWFmLE1BQWIsQ0FBb0J4QixNQUEzSjtBQUNILEdBRkQ7O0FBSUEsT0FBS1IsTUFBTCxHQUFjLFVBQVNTLEtBQVQsRUFBZ0JELE1BQWhCLEVBQXdCNkMsa0JBQXhCLEVBQTJDO0FBQ3JELFFBQUc3QyxNQUFNLEdBQUdDLEtBQVQsR0FBaUI0QyxrQkFBcEIsRUFBdUM7QUFDbkMsV0FBS04sT0FBTCxDQUFhZixNQUFiLENBQW9CeEIsTUFBcEIsR0FBNkJDLEtBQUssR0FBRzRDLGtCQUFyQztBQUNBLFdBQUtOLE9BQUwsQ0FBYWYsTUFBYixDQUFvQnZCLEtBQXBCLEdBQTRCQSxLQUE1QjtBQUNILEtBSEQsTUFHTztBQUNILFdBQUtzQyxPQUFMLENBQWFmLE1BQWIsQ0FBb0J4QixNQUFwQixHQUE2QkEsTUFBN0I7QUFDQSxXQUFLdUMsT0FBTCxDQUFhZixNQUFiLENBQW9CdkIsS0FBcEIsR0FBNEJELE1BQU0sR0FBRzZDLGtCQUFyQztBQUNIOztBQUVELFNBQUtOLE9BQUwsQ0FBYU8scUJBQWIsR0FBcUMsS0FBckM7QUFDSCxHQVZEO0FBV0gsQ0FyQ0Q7O0FBdUNBaEUsT0FBTyxDQUFDbUQsU0FBUixHQUFvQjtBQUNoQkMsYUFBVyxFQUFHcEQ7QUFERSxDQUFwQjtBQUlBcUQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCdEQsT0FBakIsQzs7Ozs7Ozs7Ozs7QUMxQ0EsSUFBTUMsTUFBTSxHQUFHLFNBQVRBLE1BQVMsQ0FBU2dFLFNBQVQsRUFBb0I1QyxNQUFwQixFQUE0QkQsTUFBNUIsRUFBb0M7QUFBQTs7QUFDL0MsT0FBSzhDLGdCQUFMLEdBQXdCLENBQXhCO0FBQ0EsT0FBS0MsdUJBQUwsR0FBK0JDLFNBQS9CLEVBQ0EsS0FBS0MsSUFBTCxHQUFZRCxTQURaLEVBRUEsS0FBS0gsU0FBTCxHQUFpQkEsU0FGakIsRUFJQSxLQUFLSyxPQUFMLEdBQWUsS0FKZjtBQU1BLE9BQUtqRCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxPQUFLRCxNQUFMLEdBQWNBLE1BQWQ7O0FBRUEsT0FBS21ELEdBQUwsR0FBVyxVQUFTQyxVQUFULEVBQXFCO0FBQzVCLFNBQUtOLGdCQUFMLElBQXlCTSxVQUFVLEdBQUcsS0FBS0gsSUFBM0M7QUFDQSxTQUFLQSxJQUFMLEdBQVlHLFVBQVo7O0FBRUEsUUFBSSxLQUFLTixnQkFBTCxJQUF5QixLQUFLRCxTQUFMLEdBQWlCLENBQTlDLEVBQWlEO0FBQzdDLFdBQUtDLGdCQUFMLEdBQXdCLEtBQUtELFNBQTdCO0FBQ0g7O0FBRUQsV0FBTSxLQUFLQyxnQkFBTCxJQUF5QixLQUFLRCxTQUFwQyxFQUErQztBQUMzQyxXQUFLQyxnQkFBTCxJQUF5QixLQUFLRCxTQUE5QjtBQUVBLFdBQUs1QyxNQUFMLENBQVltRCxVQUFaO0FBRUEsV0FBS0YsT0FBTCxHQUFlLElBQWY7QUFDSDs7QUFFRCxRQUFHLEtBQUtBLE9BQVIsRUFBZ0I7QUFDWixXQUFLQSxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtsRCxNQUFMLENBQVlvRCxVQUFaO0FBQ0g7O0FBRUQsU0FBS0wsdUJBQUwsR0FBK0JoRSxNQUFNLENBQUNzRSxxQkFBUCxDQUE2QixLQUFLQyxTQUFsQyxDQUEvQjtBQUNILEdBdEJEOztBQXdCQSxPQUFLQSxTQUFMLEdBQWlCLFVBQUNULFNBQUQsRUFBZTtBQUM1QixTQUFJLENBQUNNLEdBQUwsQ0FBU04sU0FBVDtBQUNILEdBRkQ7QUFHSCxDQXRDRDs7QUF3Q0FoRSxNQUFNLENBQUNrRCxTQUFQLEdBQW1CO0FBQ2ZDLGFBQVcsRUFBR25ELE1BREM7QUFHZjRDLE9BQUssRUFBQyxpQkFBVztBQUNiLFNBQUtxQixnQkFBTCxHQUF3QixLQUFLRCxTQUE3QjtBQUNBLFNBQUtJLElBQUwsR0FBWWxFLE1BQU0sQ0FBQ3dFLFdBQVAsQ0FBbUJDLEdBQW5CLEVBQVo7QUFDQSxTQUFLVCx1QkFBTCxHQUErQmhFLE1BQU0sQ0FBQ3NFLHFCQUFQLENBQTZCLEtBQUtDLFNBQWxDLENBQS9CO0FBQ0gsR0FQYztBQVNmRyxNQUFJLEVBQUMsZ0JBQVc7QUFDWjFFLFVBQU0sQ0FBQzJFLG9CQUFQLENBQTRCLEtBQUtYLHVCQUFqQztBQUNIO0FBWGMsQ0FBbkI7QUFjQWQsTUFBTSxDQUFDQyxPQUFQLEdBQWlCckQsTUFBakIsQzs7Ozs7Ozs7Ozs7QUN2REEsSUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQU8sR0FBVztBQUVwQixPQUFLZSxLQUFMLEdBQWE7QUFDVGEsb0JBQWdCLEVBQUUsU0FEVDtBQUVUaUQsWUFBUSxFQUFFLEdBRkQ7QUFHVEMsV0FBTyxFQUFFLENBSEE7QUFJVHhELFVBQU0sRUFBRSxJQUFJdEIsSUFBSSxDQUFDK0UsTUFBVCxFQUpDO0FBS1RoRCxRQUFJLEVBQUUsSUFBSS9CLElBQUksQ0FBQ2dGLElBQVQsQ0FBYyxDQUFkLENBTEc7QUFNVEMsU0FBSyxFQUFFLElBQUlqRixJQUFJLENBQUNnRixJQUFULENBQWMsQ0FBQyxFQUFmLENBTkU7QUFPVEUsU0FBSyxFQUFFLElBQUlsRixJQUFJLENBQUNnRixJQUFULENBQWMsQ0FBQyxFQUFmLENBUEU7QUFRVG5ELFdBQU8sRUFBRSxFQVJBO0FBU1RiLFVBQU0sRUFBRSxHQVRDO0FBVVRDLFNBQUssRUFBRSxHQVZFO0FBWVR3QixlQUFXLEVBQUMsdUJBQVc7QUFDbkIsVUFBSVQsQ0FBQyxHQUFHLENBQVI7O0FBQ0EsYUFBTSxLQUFLSCxPQUFMLENBQWFzRCxNQUFiLEdBQXNCLEVBQTVCLEVBQWdDO0FBQzVCLGFBQUt0RCxPQUFMLENBQWF1RCxJQUFiLENBQWtCLElBQUlwRixJQUFJLENBQUNnRixJQUFULENBQWNoRCxDQUFkLENBQWxCO0FBQ0FBLFNBQUMsSUFBSSxFQUFMO0FBQ0E7QUFDSDtBQUNKLEtBbkJRO0FBcUJUcUQsaUJBQWEsRUFBQyx1QkFBU0MsTUFBVCxFQUFnQjtBQUMxQixVQUFHQSxNQUFNLENBQUNuRCxDQUFQLEdBQVcsQ0FBZCxFQUFpQjtBQUNibUQsY0FBTSxDQUFDbkQsQ0FBUCxHQUFXLENBQVg7QUFDQW1ELGNBQU0sQ0FBQ0MsVUFBUCxHQUFvQixDQUFwQjtBQUNILE9BSEQsTUFHTyxJQUFHRCxNQUFNLENBQUNuRCxDQUFQLEdBQVdtRCxNQUFNLENBQUNyRSxLQUFsQixHQUEwQixLQUFLQSxLQUFsQyxFQUF5QztBQUM1Q3FFLGNBQU0sQ0FBQ25ELENBQVAsR0FBVyxLQUFLbEIsS0FBTCxHQUFhcUUsTUFBTSxDQUFDckUsS0FBL0I7QUFDQXFFLGNBQU0sQ0FBQ0MsVUFBUCxHQUFvQixDQUFwQjtBQUNILE9BUHlCLENBUzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0gsS0F0Q1E7QUF3Q1RwRSxVQUFNLEVBQUMsa0JBQVc7QUFDZCxXQUFLRyxNQUFMLENBQVlrRSxVQUFaLElBQTBCLEtBQUtWLE9BQS9CO0FBQ0EsV0FBS3hELE1BQUwsQ0FBWUgsTUFBWjtBQUVBLFdBQUtHLE1BQUwsQ0FBWWlFLFVBQVosSUFBMEIsS0FBS1YsUUFBL0I7QUFDQSxXQUFLdkQsTUFBTCxDQUFZa0UsVUFBWixJQUEwQixLQUFLWCxRQUEvQjtBQUVBLFdBQUs5QyxJQUFMLENBQVVaLE1BQVY7QUFDQSxXQUFLOEQsS0FBTCxDQUFXOUQsTUFBWDtBQUVBLFdBQUtVLE9BQUwsQ0FBYUMsT0FBYixDQUFxQixVQUFBQyxJQUFJLEVBQUk7QUFDekJBLFlBQUksQ0FBQ1osTUFBTDtBQUNILE9BRkQ7QUFJQSxXQUFLa0UsYUFBTCxDQUFtQixLQUFLL0QsTUFBeEI7QUFDSDtBQXZEUSxHQUFiOztBQTBEQSxPQUFLSCxNQUFMLEdBQWMsWUFBVztBQUNyQixTQUFLSixLQUFMLENBQVdJLE1BQVg7QUFDSCxHQUZEO0FBR0gsQ0EvREQ7O0FBaUVBbkIsSUFBSSxDQUFDaUQsU0FBTCxHQUFpQjtBQUFFQyxhQUFXLEVBQUdsRDtBQUFoQixDQUFqQjs7QUFFQUEsSUFBSSxDQUFDK0UsTUFBTCxHQUFjLFVBQVM1QyxDQUFULEVBQVlILENBQVosRUFBZTtBQUN6QixPQUFLSSxLQUFMLEdBQWEsU0FBYjtBQUNBLE9BQUtwQixNQUFMLEdBQWMsQ0FBZCxDQUZ5QixDQUd6Qjs7QUFDQSxPQUFLdUUsVUFBTCxHQUFrQixDQUFsQixDQUp5QixDQUt6Qjs7QUFDQSxPQUFLdEUsS0FBTCxHQUFhLEVBQWI7QUFDQSxPQUFLa0IsQ0FBTCxHQUFTLEVBQVQ7QUFDQSxPQUFLSCxDQUFMLEdBQVMsR0FBVDtBQUNILENBVEQ7O0FBV0FoQyxJQUFJLENBQUMrRSxNQUFMLENBQVk5QixTQUFaLEdBQXdCO0FBQ3BCQyxhQUFXLEVBQUdsRCxJQUFJLENBQUMrRSxNQURDO0FBR3BCO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUF4RCxVQUFRLEVBQUMsb0JBQVc7QUFDaEIsU0FBS2dFLFVBQUwsSUFBbUIsR0FBbkI7QUFDSCxHQWxCbUI7QUFtQnBCOUQsV0FBUyxFQUFDLHFCQUFXO0FBQ2pCLFNBQUs4RCxVQUFMLElBQW1CLEdBQW5CO0FBQ0gsR0FyQm1CO0FBdUJwQnBFLFFBQU0sRUFBQyxrQkFBVTtBQUNiLFNBQUtnQixDQUFMLElBQVUsS0FBS29ELFVBQWYsQ0FEYSxDQUViO0FBQ0g7QUExQm1CLENBQXhCOztBQTZCQXZGLElBQUksQ0FBQ2dGLElBQUwsR0FBWSxVQUFTaEQsQ0FBVCxFQUFXO0FBQ25CLE9BQUtJLEtBQUwsR0FBYSxNQUFNc0IsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQytCLE1BQUwsS0FBZ0IsUUFBM0IsRUFBcUNDLFFBQXJDLENBQThDLEVBQTlDLENBQW5COztBQUVBLE1BQUcsS0FBS3RELEtBQUwsQ0FBVytDLE1BQVgsSUFBcUIsQ0FBeEIsRUFBMEI7QUFDdEIsU0FBSy9DLEtBQUwsR0FBYSxLQUFLQSxLQUFMLENBQVd1RCxLQUFYLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLElBQXlCLEdBQXpCLEdBQStCLEtBQUt2RCxLQUFMLENBQVd1RCxLQUFYLENBQWlCLENBQWpCLEVBQW9CLENBQXBCLENBQTVDO0FBQ0g7O0FBRUQsT0FBSzNFLE1BQUwsR0FBYyxDQUFkO0FBQ0EsT0FBS0MsS0FBTCxHQUFhLENBQWI7QUFDQSxPQUFLa0IsQ0FBTCxHQUFTdUIsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQytCLE1BQUwsS0FBZ0IsR0FBM0IsQ0FBVDtBQUNBLE9BQUt6RCxDQUFMLEdBQVNBLENBQVQ7QUFFQSxPQUFLd0QsVUFBTCxHQUFrQixDQUFsQjtBQUNILENBYkQ7O0FBZUF4RixJQUFJLENBQUNnRixJQUFMLENBQVUvQixTQUFWLEdBQXNCO0FBQ2xCQyxhQUFXLEVBQUdsRCxJQUFJLENBQUNnRixJQUREO0FBRWxCN0QsUUFBTSxFQUFFLGtCQUFVO0FBQ2QsU0FBS2EsQ0FBTCxJQUFVLEtBQUt3RCxVQUFmO0FBQ0g7QUFKaUIsQ0FBdEI7QUFTQXJDLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBELElBQWpCLEM7Ozs7Ozs7Ozs7O0FDbklBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XHJcbmNvbnN0IENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3NjcmlwdHMvY29udHJvbGxlcicpO1xyXG5jb25zdCBEaXNwbGF5ID0gcmVxdWlyZSgnLi9zY3JpcHRzL2Rpc3BsYXknKTtcclxuY29uc3QgRW5naW5lID0gcmVxdWlyZSgnLi9zY3JpcHRzL2VuZ2luZScpO1xyXG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9zY3JpcHRzL2dhbWUnKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oZSkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCB1cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihjb250cm9sbGVyLmxlZnQuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVMZWZ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb250cm9sbGVyLnJpZ2h0LmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaWYoY29udHJvbGxlci51cC5hY3RpdmUpe1xyXG4gICAgICAgIC8vICAgICBnYW1lLndvcmxkLnBsYXllci5qdW1wKCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnRyb2xsZXIudXAuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBnYW1lLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgbm90ZURyb3AgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTtcclxuICAgICAgICBcclxuICAgICAgICAvLyAgICAgZGlzcGxheS5kcmF3Tm90ZShnYW1lLndvcmxkLm5vdGUyKTtcclxuICAgICAgICAvLyBpZihnYW1lLndvcmxkLm5vdGUueSA8IDEzMCl7XHJcbiAgICAgICAgLy8gICAgIGRpc3BsYXkuZHJhd05vdGUoZ2FtZS53b3JsZC5ub3RlKTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGdhbWUud29ybGQubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICBpZihub3RlLnkgPCAxMjApe1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmF3Tm90ZShub3RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gZGVidWdnZXI7XHJcblxyXG4gICAgICAgIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29udHJvbGxlciA9IG5ldyBDb250cm9sbGVyKCk7XHJcbiAgICBsZXQgZGlzcGxheSA9IG5ldyBEaXNwbGF5KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpKTtcclxuICAgIGxldCBnYW1lID0gbmV3IEdhbWUoKTtcclxuICAgIGxldCBlbmdpbmUgPSBuZXcgRW5naW5lKDEwMDAvMzAsIHJlbmRlciwgdXBkYXRlKTtcclxuXHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMuaGVpZ2h0ID0gZ2FtZS53b3JsZC5oZWlnaHQ7XHJcbiAgICBkaXNwbGF5LmJ1ZmZlci5jYW52YXMud2lkdGggPSBnYW1lLndvcmxkLndpZHRoO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGtleURvd25VcCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcclxuXHJcbiAgICByZXNpemUoKTtcclxuICAgIGdhbWUud29ybGQuZmlsbE5vdGVBcnIoKTtcclxuICAgIC8vIGRlYnVnZ2VyO1xyXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4gbm90ZURyb3AoKSwgMTAwKTtcclxuXHJcbiAgICBlbmdpbmUuc3RhcnQoKTtcclxufSk7IiwiXHJcbmNvbnN0IENvbnRyb2xsZXIgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMubGVmdCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcbiAgICB0aGlzLnJpZ2h0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMudXAgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG5cclxuICAgIHRoaXMua2V5RG93blVwID0gZnVuY3Rpb24odHlwZSwga2V5X2NvZGUpIHtcclxuICAgICAgICBsZXQgZG93biA9ICh0eXBlID09PSAna2V5ZG93bicpID8gdHJ1ZSA6IGZhbHNlO1xyXG5cclxuICAgICAgICBzd2l0Y2goa2V5X2NvZGUpIHtcclxuXHJcbiAgICAgICAgICAgIGNhc2UgMzc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQuZ2V0SW5wdXQoZG93bik7ICBcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDM4OiBcclxuICAgICAgICAgICAgICAgIHRoaXMudXAuZ2V0SW5wdXQoZG93bik7ICAgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzk6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yaWdodC5nZXRJbnB1dChkb3duKTtcclxuICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufTtcclxuXHJcbkNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBDb250cm9sbGVyXHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRoaXMuZG93biA9IGZhbHNlO1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5CdXR0b25JbnB1dC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQsXHJcblxyXG4gICAgZ2V0SW5wdXQgOiBmdW5jdGlvbihkb3duKSB7XHJcbiAgICAgICAgaWYodGhpcy5kb3duICE9IGRvd24pIHRoaXMuYWN0aXZlID0gZG93bjtcclxuICAgICAgICB0aGlzLmRvd24gPSBkb3duO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb250cm9sbGVyOyIsImNvbnN0IERpc3BsYXkgPSBmdW5jdGlvbihjYW52YXMpe1xyXG4gICAgdGhpcy5idWZmZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgdGhpcy5kcmF3UmVjdGFuZ2xlID0gZnVuY3Rpb24oeCwgeSwgd2lkdGgsIGhlaWdodCwgY29sb3IpIHtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygndGhpcyBpcyBkcmF3Jyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZHJhd05vdGUgPSBmdW5jdGlvbihub3RlKSB7XHJcbiAgICAgICAgY29uc3QgeyB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvciB9ID0gbm90ZTtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICB0aGlzLmJ1ZmZlci5maWxsUmVjdChNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyh5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpbGwgPSBmdW5jdGlvbihjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVuZGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZSh0aGlzLmJ1ZmZlci5jYW52YXMsIDAsIDAsIHRoaXMuYnVmZmVyLmNhbnZhcy53aWR0aCwgdGhpcy5idWZmZXIuY2FudmFzLmhlaWdodCwgMCwgMCwgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCwgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQsIGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgaWYoaGVpZ2h0IC8gd2lkdGggPiBoZWlnaHRfd2lkdGhfcmF0aW8pe1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IHdpZHRoICogaGVpZ2h0X3dpZHRoX3JhdGlvO1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSBoZWlnaHQgLyBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRGlzcGxheS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IERpc3BsYXlcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheTsiLCJcclxuY29uc3QgRW5naW5lID0gZnVuY3Rpb24odGltZV9zdGVwLCB1cGRhdGUsIHJlbmRlcikge1xyXG4gICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gMDtcclxuICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWUgPSB1bmRlZmluZWQsXHJcbiAgICB0aGlzLnRpbWVfc3RlcCA9IHRpbWVfc3RlcCxcclxuXHJcbiAgICB0aGlzLnVwZGF0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IHVwZGF0ZTtcclxuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyO1xyXG5cclxuICAgIHRoaXMucnVuID0gZnVuY3Rpb24odGltZV9zdGFtcCkge1xyXG4gICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSArPSB0aW1lX3N0YW1wIC0gdGhpcy50aW1lO1xyXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWVfc3RhbXA7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXAgKiAzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSA9IHRoaXMudGltZV9zdGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2hpbGUodGhpcy5hY2N1bXVsYXRlZF90aW1lID49IHRoaXMudGltZV9zdGVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWNjdW11bGF0ZWRfdGltZSAtPSB0aGlzLnRpbWVfc3RlcDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKHRpbWVfc3RhbXApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKHRoaXMudXBkYXRlZCl7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aW1lX3N0YW1wKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5oYW5kbGVSdW4gPSAodGltZV9zdGVwKSA9PiB7XHJcbiAgICAgICAgdGhpcy5ydW4odGltZV9zdGVwKTtcclxuICAgIH07XHJcbn07XHJcblxyXG5FbmdpbmUucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBFbmdpbmUsXHJcblxyXG4gICAgc3RhcnQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgdGhpcy50aW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uX2ZyYW1lX3JlcXVlc3QgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuaGFuZGxlUnVuKTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RvcDpmdW5jdGlvbigpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVuZ2luZTsiLCJjb25zdCBHYW1lID0gZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdGhpcy53b3JsZCA9IHtcclxuICAgICAgICBiYWNrZ3JvdW5kX2NvbG9yOiAnIzAwMDAwMCcsXHJcbiAgICAgICAgZnJpY3Rpb246IDAuOSxcclxuICAgICAgICBncmF2aXR5OiAzLFxyXG4gICAgICAgIHBsYXllcjogbmV3IEdhbWUuUGxheWVyKCksXHJcbiAgICAgICAgbm90ZTogbmV3IEdhbWUuTm90ZSgwKSxcclxuICAgICAgICBub3RlMjogbmV3IEdhbWUuTm90ZSgtMTApLFxyXG4gICAgICAgIG5vdGUzOiBuZXcgR2FtZS5Ob3RlKC0yMCksXHJcbiAgICAgICAgbm90ZUFycjogW10sXHJcbiAgICAgICAgaGVpZ2h0OiAxMjgsXHJcbiAgICAgICAgd2lkdGg6IDEyOCxcclxuXHJcbiAgICAgICAgZmlsbE5vdGVBcnI6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGxldCB5ID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodGhpcy5ub3RlQXJyLmxlbmd0aCA8IDMwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vdGVBcnIucHVzaChuZXcgR2FtZS5Ob3RlKHkpKVxyXG4gICAgICAgICAgICAgICAgeSAtPSAyMDtcclxuICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY29sbGlkZU9iamVjdDpmdW5jdGlvbihvYmplY3Qpe1xyXG4gICAgICAgICAgICBpZihvYmplY3QueCA8IDApIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC54ID0gMDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC52ZWxvY2l0eV94ID0gMDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKG9iamVjdC54ICsgb2JqZWN0LndpZHRoID4gdGhpcy53aWR0aCkge1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnggPSB0aGlzLndpZHRoIC0gb2JqZWN0LndpZHRoO1xyXG4gICAgICAgICAgICAgICAgb2JqZWN0LnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgICAgICAgICB9IFxyXG5cclxuICAgICAgICAgICAgLy8gaWYob2JqZWN0LnkgPCAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QueSA9IDA7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QudmVsb2NpdHlfeSA9IDA7XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSBpZihvYmplY3QueSArIG9iamVjdC5oZWlnaHQgPiB0aGlzLmhlaWdodCkge1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0Lmp1bXBpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC55ID0gdGhpcy5oZWlnaHQgLSBvYmplY3QuaGVpZ2h0O1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdXBkYXRlOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICs9IHRoaXMuZ3Jhdml0eTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudXBkYXRlKCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV94ICo9IHRoaXMuZnJpY3Rpb247XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnZlbG9jaXR5X3kgKj0gdGhpcy5mcmljdGlvbjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5ub3RlMi51cGRhdGUoKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubm90ZUFyci5mb3JFYWNoKG5vdGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90ZS51cGRhdGUoKTtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlkZU9iamVjdCh0aGlzLnBsYXllcik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMud29ybGQudXBkYXRlKCk7XHJcbiAgICB9O1xyXG59O1xyXG5cclxuR2FtZS5wcm90b3R5cGUgPSB7IGNvbnN0cnVjdG9yIDogR2FtZSB9O1xyXG5cclxuR2FtZS5QbGF5ZXIgPSBmdW5jdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLmNvbG9yID0gJyNmZjAwMDAnO1xyXG4gICAgdGhpcy5oZWlnaHQgPSA0O1xyXG4gICAgLy8gdGhpcy5qdW1waW5nID0gdHJ1ZTtcclxuICAgIHRoaXMudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAvLyB0aGlzLnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgdGhpcy53aWR0aCA9IDE0O1xyXG4gICAgdGhpcy54ID0gNjA7XHJcbiAgICB0aGlzLnkgPSAxMTA7XHJcbn07XHJcblxyXG5HYW1lLlBsYXllci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuUGxheWVyLFxyXG5cclxuICAgIC8vIGp1bXA6ZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgaWYoIXRoaXMuanVtcGluZyl7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIC8vICAgICAgICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmNvbG9yID0gdGhpcy5jb2xvci5zbGljZSgwLCAxKSArICcwJyArIHRoaXMuY29sb3Iuc2xpY2UoMSwgNik7XHJcbiAgICAvLyAgICAgICAgIH1cclxuXHJcbiAgICAvLyAgICAgICAgIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIHRoaXMudmVsb2NpdHlfeSAtPSAxNTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9LFxyXG5cclxuICAgIG1vdmVMZWZ0OmZ1bmN0aW9uKCkgeyBcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggLT0gMC41O1xyXG4gICAgfSxcclxuICAgIG1vdmVSaWdodDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLnZlbG9jaXR5X3ggKz0gMC41O1xyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eV94O1xyXG4gICAgICAgIC8vIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcbkdhbWUuTm90ZSA9IGZ1bmN0aW9uKHkpe1xyXG4gICAgdGhpcy5jb2xvciA9ICcjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2Nzc3MjE2KS50b1N0cmluZygxNik7XHJcblxyXG4gICAgaWYodGhpcy5jb2xvci5sZW5ndGggIT0gNyl7XHJcbiAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3Iuc2xpY2UoMCwgMSkgKyAnMCcgKyB0aGlzLmNvbG9yLnNsaWNlKDEsIDYpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaGVpZ2h0ID0gMjtcclxuICAgIHRoaXMud2lkdGggPSAyO1xyXG4gICAgdGhpcy54ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTI0KTtcclxuICAgIHRoaXMueSA9IHk7XHJcblxyXG4gICAgdGhpcy52ZWxvY2l0eV95ID0gMTtcclxufVxyXG5cclxuR2FtZS5Ob3RlLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogR2FtZS5Ob3RlLFxyXG4gICAgdXBkYXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnZlbG9jaXR5X3k7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=