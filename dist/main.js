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
    game.world.noteArr.forEach(function (note) {
      if (note.x >= game.world.player.x && note.x <= game.world.player.x + 14 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4) {
        game.world.scoreUpdate();
        console.log(game.world.score);
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
    noteArr: [],
    height: 128,
    width: 128,
    score: 0,
    fillNoteArr: function fillNoteArr() {
      var y = 0;

      while (this.noteArr.length < 30) {
        this.noteArr.push(new Game.Note(y));
        y -= 20;
      }
    },
    scoreUpdate: function scoreUpdate() {
      this.score += 100 / this.noteArr.length;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZGlzcGxheS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9lbmdpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL2luZGV4LnNjc3MiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsInJlcXVpcmUiLCJEaXNwbGF5IiwiRW5naW5lIiwiR2FtZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwia2V5RG93blVwIiwiY29udHJvbGxlciIsInR5cGUiLCJrZXlDb2RlIiwicmVzaXplIiwiZGlzcGxheSIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJnYW1lIiwid29ybGQiLCJoZWlnaHQiLCJ3aWR0aCIsInJlbmRlciIsIm5vdGVBcnIiLCJmb3JFYWNoIiwibm90ZSIsIngiLCJwbGF5ZXIiLCJ5Iiwic2NvcmVVcGRhdGUiLCJjb25zb2xlIiwibG9nIiwic2NvcmUiLCJ1cGRhdGUiLCJsZWZ0IiwiYWN0aXZlIiwibW92ZUxlZnQiLCJyaWdodCIsIm1vdmVSaWdodCIsIm5vdGVEcm9wIiwiZmlsbCIsImJhY2tncm91bmRfY29sb3IiLCJkcmF3Tm90ZSIsImRyYXdSZWN0YW5nbGUiLCJjb2xvciIsInF1ZXJ5U2VsZWN0b3IiLCJlbmdpbmUiLCJidWZmZXIiLCJjYW52YXMiLCJmaWxsTm90ZUFyciIsInNldEludGVydmFsIiwic3RhcnQiLCJCdXR0b25JbnB1dCIsInVwIiwia2V5X2NvZGUiLCJkb3duIiwiZ2V0SW5wdXQiLCJwcm90b3R5cGUiLCJjb25zdHJ1Y3RvciIsIm1vZHVsZSIsImV4cG9ydHMiLCJjcmVhdGVFbGVtZW50IiwiZ2V0Q29udGV4dCIsImNvbnRleHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIk1hdGgiLCJmbG9vciIsImRyYXdJbWFnZSIsImhlaWdodF93aWR0aF9yYXRpbyIsImltYWdlU21vb3RoaW5nRW5hYmxlZCIsInRpbWVfc3RlcCIsImFjY3VtdWxhdGVkX3RpbWUiLCJhbmltYXRpb25fZnJhbWVfcmVxdWVzdCIsInVuZGVmaW5lZCIsInRpbWUiLCJ1cGRhdGVkIiwicnVuIiwidGltZV9zdGFtcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImhhbmRsZVJ1biIsInBlcmZvcm1hbmNlIiwibm93Iiwic3RvcCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwiZnJpY3Rpb24iLCJncmF2aXR5IiwiUGxheWVyIiwibGVuZ3RoIiwicHVzaCIsIk5vdGUiLCJjb2xsaWRlT2JqZWN0Iiwib2JqZWN0IiwidmVsb2NpdHlfeCIsInZlbG9jaXR5X3kiLCJyYW5kb20iLCJ0b1N0cmluZyIsInNsaWNlIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FB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RSxVQUFmO0FBQ0g7QUFKaUIsQ0FBdEI7QUFTQW5DLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnhELElBQWpCLEM7Ozs7Ozs7Ozs7O0FDaklBLHVDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9kaXN0L1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi9zdHlsZXMvaW5kZXguc2Nzcyc7XHJcbmNvbnN0IENvbnRyb2xsZXIgPSByZXF1aXJlKCcuL3NjcmlwdHMvY29udHJvbGxlcicpO1xyXG5jb25zdCBEaXNwbGF5ID0gcmVxdWlyZSgnLi9zY3JpcHRzL2Rpc3BsYXknKTtcclxuY29uc3QgRW5naW5lID0gcmVxdWlyZSgnLi9zY3JpcHRzL2VuZ2luZScpO1xyXG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi9zY3JpcHRzL2dhbWUnKTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oZSkge1xyXG5cclxuICAgIGxldCBrZXlEb3duVXAgPSBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgY29udHJvbGxlci5rZXlEb3duVXAoZS50eXBlLCBlLmtleUNvZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgcmVzaXplID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGRpc3BsYXkucmVzaXplKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIDMyLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMzIsIGdhbWUud29ybGQuaGVpZ2h0IC8gZ2FtZS53b3JsZC53aWR0aCk7XHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IHJlbmRlciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAvLyBkaXNwbGF5LmZpbGwoZ2FtZS53b3JsZC5iYWNrZ3JvdW5kX2NvbG9yKTsvLyBDbGVhciBiYWNrZ3JvdW5kIHRvIGdhbWUncyBiYWNrZ3JvdW5kIGNvbG9yLlxyXG4gICAgICAgIC8vIGRpc3BsYXkuZHJhd1JlY3RhbmdsZShnYW1lLndvcmxkLnBsYXllci54LCBnYW1lLndvcmxkLnBsYXllci55LCBnYW1lLndvcmxkLnBsYXllci53aWR0aCwgZ2FtZS53b3JsZC5wbGF5ZXIuaGVpZ2h0LCBnYW1lLndvcmxkLnBsYXllci5jb2xvcik7XHJcbiAgICAgICAgLy8gbm90ZURyb3AoKTtcclxuXHJcbiAgICAgICAgZ2FtZS53b3JsZC5ub3RlQXJyLmZvckVhY2gobm90ZSA9PiB7XHJcbiAgICAgICAgICAgIGlmKG5vdGUueCA+PSBnYW1lLndvcmxkLnBsYXllci54ICYmIG5vdGUueCA8PSBnYW1lLndvcmxkLnBsYXllci54ICsgMTQgJiYgbm90ZS55ID49IGdhbWUud29ybGQucGxheWVyLnkgJiYgbm90ZS55IDw9IGdhbWUud29ybGQucGxheWVyLnkgKyA0KXtcclxuICAgICAgICAgICAgICAgIGdhbWUud29ybGQuc2NvcmVVcGRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWUud29ybGQuc2NvcmUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgZGlzcGxheS5yZW5kZXIoKTtcclxuICAgIFxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgdXBkYXRlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYoY29udHJvbGxlci5sZWZ0LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBnYW1lLndvcmxkLnBsYXllci5tb3ZlTGVmdCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCArIDE0KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5ub3RlQXJyWzFdLnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb250cm9sbGVyLnJpZ2h0LmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIGdhbWUud29ybGQucGxheWVyLm1vdmVSaWdodCgpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lLndvcmxkLnBsYXllci54KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5wbGF5ZXIueCArIDE0KTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZS53b3JsZC5ub3RlQXJyWzFdLnkpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZihjb250cm9sbGVyLnVwLmFjdGl2ZSl7XHJcbiAgICAgICAgLy8gICAgIGdhbWUud29ybGQucGxheWVyLmp1bXAoKTtcclxuICAgICAgICAvLyAgICAgY29udHJvbGxlci51cC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIGdhbWUudXBkYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBub3RlRHJvcCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRpc3BsYXkuZmlsbChnYW1lLndvcmxkLmJhY2tncm91bmRfY29sb3IpO1xyXG5cclxuICAgICAgICBnYW1lLndvcmxkLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgaWYobm90ZS55IDwgMTIwKXtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuZHJhd05vdGUobm90ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICBkaXNwbGF5LmRyYXdSZWN0YW5nbGUoZ2FtZS53b3JsZC5wbGF5ZXIueCwgZ2FtZS53b3JsZC5wbGF5ZXIueSwgZ2FtZS53b3JsZC5wbGF5ZXIud2lkdGgsIGdhbWUud29ybGQucGxheWVyLmhlaWdodCwgZ2FtZS53b3JsZC5wbGF5ZXIuY29sb3IpO1xyXG5cclxuICAgICAgICBkaXNwbGF5LnJlbmRlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjb250cm9sbGVyID0gbmV3IENvbnRyb2xsZXIoKTtcclxuICAgIGxldCBkaXNwbGF5ID0gbmV3IERpc3BsYXkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykpO1xyXG4gICAgbGV0IGdhbWUgPSBuZXcgR2FtZSgpO1xyXG4gICAgbGV0IGVuZ2luZSA9IG5ldyBFbmdpbmUoMTAwMC8zMCwgcmVuZGVyLCB1cGRhdGUpO1xyXG5cclxuICAgIGRpc3BsYXkuYnVmZmVyLmNhbnZhcy5oZWlnaHQgPSBnYW1lLndvcmxkLmhlaWdodDtcclxuICAgIGRpc3BsYXkuYnVmZmVyLmNhbnZhcy53aWR0aCA9IGdhbWUud29ybGQud2lkdGg7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlEb3duVXApO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywga2V5RG93blVwKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemUpO1xyXG5cclxuICAgIHJlc2l6ZSgpO1xyXG4gICAgZ2FtZS53b3JsZC5maWxsTm90ZUFycigpO1xyXG4gICAgLy8gZGVidWdnZXI7XHJcbiAgICBzZXRJbnRlcnZhbCgoKSA9PiBub3RlRHJvcCgpLCAxMDApO1xyXG5cclxuICAgIGVuZ2luZS5zdGFydCgpO1xyXG59KTsiLCJcclxuY29uc3QgQ29udHJvbGxlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgdGhpcy5sZWZ0ID0gbmV3IENvbnRyb2xsZXIuQnV0dG9uSW5wdXQoKTtcclxuICAgIHRoaXMucmlnaHQgPSBuZXcgQ29udHJvbGxlci5CdXR0b25JbnB1dCgpO1xyXG4gICAgdGhpcy51cCA9IG5ldyBDb250cm9sbGVyLkJ1dHRvbklucHV0KCk7XHJcblxyXG4gICAgdGhpcy5rZXlEb3duVXAgPSBmdW5jdGlvbih0eXBlLCBrZXlfY29kZSkge1xyXG4gICAgICAgIGxldCBkb3duID0gKHR5cGUgPT09ICdrZXlkb3duJykgPyB0cnVlIDogZmFsc2U7XHJcblxyXG4gICAgICAgIHN3aXRjaChrZXlfY29kZSkge1xyXG5cclxuICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIHRoaXMubGVmdC5nZXRJbnB1dChkb3duKTsgIFxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMzg6IFxyXG4gICAgICAgICAgICAgICAgdGhpcy51cC5nZXRJbnB1dChkb3duKTsgICAgXHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAzOTogXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJpZ2h0LmdldElucHV0KGRvd24pO1xyXG4gICAgICBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IENvbnRyb2xsZXJcclxufTtcclxuXHJcbkNvbnRyb2xsZXIuQnV0dG9uSW5wdXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHRoaXMuYWN0aXZlID0gdGhpcy5kb3duID0gZmFsc2U7XHJcbn07XHJcblxyXG5Db250cm9sbGVyLkJ1dHRvbklucHV0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogQ29udHJvbGxlci5CdXR0b25JbnB1dCxcclxuXHJcbiAgICBnZXRJbnB1dCA6IGZ1bmN0aW9uKGRvd24pIHtcclxuICAgICAgICBpZih0aGlzLmRvd24gIT0gZG93bikgdGhpcy5hY3RpdmUgPSBkb3duO1xyXG4gICAgICAgIHRoaXMuZG93biA9IGRvd247XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbnRyb2xsZXI7IiwiY29uc3QgRGlzcGxheSA9IGZ1bmN0aW9uKGNhbnZhcyl7XHJcbiAgICB0aGlzLmJ1ZmZlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLmdldENvbnRleHQoJzJkJyksXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICB0aGlzLmRyYXdSZWN0YW5nbGUgPSBmdW5jdGlvbih4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzIGlzIGRyYXcnKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kcmF3Tm90ZSA9IGZ1bmN0aW9uKG5vdGUpIHtcclxuICAgICAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQsIGNvbG9yIH0gPSBub3RlO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyLmZpbGxSZWN0KE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSksIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmlsbCA9IGZ1bmN0aW9uKGNvbG9yKSB7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5idWZmZXIuZmlsbFJlY3QoMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0KTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZW5kZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKHRoaXMuYnVmZmVyLmNhbnZhcywgMCwgMCwgdGhpcy5idWZmZXIuY2FudmFzLndpZHRoLCB0aGlzLmJ1ZmZlci5jYW52YXMuaGVpZ2h0LCAwLCAwLCB0aGlzLmNvbnRleHQuY2FudmFzLndpZHRoLCB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgaGVpZ2h0X3dpZHRoX3JhdGlvKXtcclxuICAgICAgICBpZihoZWlnaHQgLyB3aWR0aCA+IGhlaWdodF93aWR0aF9yYXRpbyl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMuaGVpZ2h0ID0gd2lkdGggKiBoZWlnaHRfd2lkdGhfcmF0aW87XHJcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNhbnZhcy53aWR0aCA9IGhlaWdodCAvIGhlaWdodF93aWR0aF9yYXRpbztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIH07XHJcbn07XHJcblxyXG5EaXNwbGF5LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yIDogRGlzcGxheVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEaXNwbGF5OyIsIlxyXG5jb25zdCBFbmdpbmUgPSBmdW5jdGlvbih0aW1lX3N0ZXAsIHVwZGF0ZSwgcmVuZGVyKSB7XHJcbiAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSAwO1xyXG4gICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZSA9IHVuZGVmaW5lZCxcclxuICAgIHRoaXMudGltZV9zdGVwID0gdGltZV9zdGVwLFxyXG5cclxuICAgIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlO1xyXG4gICAgdGhpcy5yZW5kZXIgPSByZW5kZXI7XHJcblxyXG4gICAgdGhpcy5ydW4gPSBmdW5jdGlvbih0aW1lX3N0YW1wKSB7XHJcbiAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lICs9IHRpbWVfc3RhbXAgLSB0aGlzLnRpbWU7XHJcbiAgICAgICAgdGhpcy50aW1lID0gdGltZV9zdGFtcDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWNjdW11bGF0ZWRfdGltZSA+PSB0aGlzLnRpbWVfc3RlcCAqIDMpIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lID0gdGhpcy50aW1lX3N0ZXA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB3aGlsZSh0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPj0gdGhpcy50aW1lX3N0ZXApIHtcclxuICAgICAgICAgICAgdGhpcy5hY2N1bXVsYXRlZF90aW1lIC09IHRoaXMudGltZV9zdGVwO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGUodGltZV9zdGFtcCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy51cGRhdGVkKXtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRpbWVfc3RhbXApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmhhbmRsZVJ1biA9ICh0aW1lX3N0ZXApID0+IHtcclxuICAgICAgICB0aGlzLnJ1bih0aW1lX3N0ZXApO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkVuZ2luZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEVuZ2luZSxcclxuXHJcbiAgICBzdGFydDpmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLmFjY3VtdWxhdGVkX3RpbWUgPSB0aGlzLnRpbWVfc3RlcDtcclxuICAgICAgICB0aGlzLnRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICAgICAgdGhpcy5hbmltYXRpb25fZnJhbWVfcmVxdWVzdCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5oYW5kbGVSdW4pO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdG9wOmZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvbl9mcmFtZV9yZXF1ZXN0KTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW5naW5lOyIsImNvbnN0IEdhbWUgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB0aGlzLndvcmxkID0ge1xyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBmcmljdGlvbjogMC45LFxyXG4gICAgICAgIGdyYXZpdHk6IDMsXHJcbiAgICAgICAgcGxheWVyOiBuZXcgR2FtZS5QbGF5ZXIoKSxcclxuICAgICAgICBub3RlQXJyOiBbXSxcclxuICAgICAgICBoZWlnaHQ6IDEyOCxcclxuICAgICAgICB3aWR0aDogMTI4LFxyXG4gICAgICAgIHNjb3JlOiAwLFxyXG5cclxuICAgICAgICBmaWxsTm90ZUFycjpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbGV0IHkgPSAwO1xyXG4gICAgICAgICAgICB3aGlsZSh0aGlzLm5vdGVBcnIubGVuZ3RoIDwgMzApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm90ZUFyci5wdXNoKG5ldyBHYW1lLk5vdGUoeSkpXHJcbiAgICAgICAgICAgICAgICB5IC09IDIwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2NvcmVVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2NvcmUgKz0gKDEwMCAvIHRoaXMubm90ZUFyci5sZW5ndGgpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGNvbGxpZGVPYmplY3Q6ZnVuY3Rpb24ob2JqZWN0KXtcclxuICAgICAgICAgICAgaWYob2JqZWN0LnggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QueCA9IDA7XHJcbiAgICAgICAgICAgICAgICBvYmplY3QudmVsb2NpdHlfeCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZihvYmplY3QueCArIG9iamVjdC53aWR0aCA+IHRoaXMud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIG9iamVjdC54ID0gdGhpcy53aWR0aCAtIG9iamVjdC53aWR0aDtcclxuICAgICAgICAgICAgICAgIG9iamVjdC52ZWxvY2l0eV94ID0gMDtcclxuICAgICAgICAgICAgfSBcclxuXHJcbiAgICAgICAgICAgIC8vIGlmKG9iamVjdC55IDwgMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnkgPSAwO1xyXG4gICAgICAgICAgICAvLyAgICAgb2JqZWN0LnZlbG9jaXR5X3kgPSAwO1xyXG4gICAgICAgICAgICAvLyB9IGVsc2UgaWYob2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0ID4gdGhpcy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC5qdW1waW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIC8vICAgICBvYmplY3QueSA9IHRoaXMuaGVpZ2h0IC0gb2JqZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgLy8gICAgIG9iamVjdC52ZWxvY2l0eV95ID0gMDtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHVwZGF0ZTpmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeSArPSB0aGlzLmdyYXZpdHk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnVwZGF0ZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIudmVsb2NpdHlfeCAqPSB0aGlzLmZyaWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXllci52ZWxvY2l0eV95ICo9IHRoaXMuZnJpY3Rpb247XHJcblxyXG4gICAgICAgICAgICB0aGlzLm5vdGVBcnIuZm9yRWFjaChub3RlID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGUudXBkYXRlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVPYmplY3QodGhpcy5wbGF5ZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB0aGlzLndvcmxkLnVwZGF0ZSgpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkdhbWUucHJvdG90eXBlID0geyBjb25zdHJ1Y3RvciA6IEdhbWUgfTtcclxuXHJcbkdhbWUuUGxheWVyID0gZnVuY3Rpb24oeCwgeSkge1xyXG4gICAgdGhpcy5jb2xvciA9ICcjZmYwMDAwJztcclxuICAgIHRoaXMuaGVpZ2h0ID0gNDtcclxuICAgIC8vIHRoaXMuanVtcGluZyA9IHRydWU7XHJcbiAgICB0aGlzLnZlbG9jaXR5X3ggPSAwO1xyXG4gICAgLy8gdGhpcy52ZWxvY2l0eV95ID0gMDtcclxuICAgIHRoaXMud2lkdGggPSAxNDtcclxuICAgIHRoaXMueCA9IDYwO1xyXG4gICAgdGhpcy55ID0gMTEwO1xyXG59O1xyXG5cclxuR2FtZS5QbGF5ZXIucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3IgOiBHYW1lLlBsYXllcixcclxuXHJcbiAgICAvLyBqdW1wOmZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgIGlmKCF0aGlzLmp1bXBpbmcpe1xyXG4gICAgLy8gICAgICAgICB0aGlzLmNvbG9yID0gJyMnICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTY3NzcyMTYpLnRvU3RyaW5nKDE2KTtcclxuXHJcbiAgICAvLyAgICAgICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5jb2xvciA9IHRoaXMuY29sb3Iuc2xpY2UoMCwgMSkgKyAnMCcgKyB0aGlzLmNvbG9yLnNsaWNlKDEsIDYpO1xyXG4gICAgLy8gICAgICAgICB9XHJcblxyXG4gICAgLy8gICAgICAgICB0aGlzLmp1bXBpbmcgPSB0cnVlO1xyXG4gICAgLy8gICAgICAgICB0aGlzLnZlbG9jaXR5X3kgLT0gMTU7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfSxcclxuXHJcbiAgICBtb3ZlTGVmdDpmdW5jdGlvbigpIHsgXHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94IC09IDAuNTtcclxuICAgIH0sXHJcbiAgICBtb3ZlUmlnaHQ6ZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy52ZWxvY2l0eV94ICs9IDAuNTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHlfeDtcclxuICAgICAgICAvLyB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eV95O1xyXG4gICAgfVxyXG59XHJcblxyXG5HYW1lLk5vdGUgPSBmdW5jdGlvbih5KXtcclxuICAgIHRoaXMuY29sb3IgPSAnIycgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxNjc3NzIxNikudG9TdHJpbmcoMTYpO1xyXG5cclxuICAgIGlmKHRoaXMuY29sb3IubGVuZ3RoICE9IDcpe1xyXG4gICAgICAgIHRoaXMuY29sb3IgPSB0aGlzLmNvbG9yLnNsaWNlKDAsIDEpICsgJzAnICsgdGhpcy5jb2xvci5zbGljZSgxLCA2KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmhlaWdodCA9IDI7XHJcbiAgICB0aGlzLndpZHRoID0gMjtcclxuICAgIHRoaXMueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEyNCk7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG5cclxuICAgIHRoaXMudmVsb2NpdHlfeSA9IDE7XHJcbn1cclxuXHJcbkdhbWUuTm90ZS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvciA6IEdhbWUuTm90ZSxcclxuICAgIHVwZGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy52ZWxvY2l0eV95O1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9