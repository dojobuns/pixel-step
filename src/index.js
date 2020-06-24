import './styles/index.scss';
const Controller = require('./scripts/controller');
const Display = require('./scripts/display');
const Engine = require('./scripts/engine');
const Game = require('./scripts/game');

document.addEventListener('DOMContentLoaded', function(e) {

    let keyDownUp = function(e) {
        controller.keyDownUp(e.type, e.keyCode);
    };

    let resize = function(e) {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    };

    let render = function() {

        // display.fill(game.world.background_color);// Clear background to game's background color.
        // display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
        // noteDrop();

        document.getElementById('score-container').innerHTML = (game.world.score === 0) ? (
            '0%'
        ) : (
            (game.world.score.toFixed(2)).toString() + '%'
        ) 

        game.world.noteArr.forEach(note => {
            if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
                game.world.scoreUpdate();
                note.hit = true;
                // debugger;
                note.sound.play();
                // console.log(note.sound);
                // debugger;
            }
        })

        game.world.bassNoteArr.forEach(note => {
            if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
                game.world.scoreUpdate();
                note.hit = true;
                note.sound.play();
                // console.log(note.sound);
                // debugger;
            }
        })

        game.world.eightNoteArr.forEach(note => {
            if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
                game.world.scoreUpdate();
                note.hit = true;
                note.sound.play();
                // console.log(note.sound);
                // debugger;
            }
        })

        display.render();
    
    };

    let update = function() {
        if(controller.left.active) {
            game.world.player.moveLeft();
            // console.log(game.world.player.x);
            // console.log(game.world.player.x + 14);
            // console.log(game.world.noteArr[1].y)
        }

        if(controller.right.active){
            game.world.player.moveRight();
            // console.log(game.world.player.x);
            // console.log(game.world.player.x + 14);
            // console.log(game.world.noteArr[1].y)
        }

        // if(controller.up.active){
        //     game.world.player.jump();
        //     controller.up.active = false;
        // }

        game.update();
    };

    let noteDrop = function() {
        display.fill(game.world.background_color);

        game.world.noteArr.forEach(note => {
            if(note.y < 120){
                display.drawNote(note);
                if(game.world.noteArr[game.world.noteArr.length - 1].y > 118){
                    game.world.gameEndMessage();
                    game.world.gameEnd();
                }
            }
        })

        game.world.bassNoteArr.forEach(note => {
            if(note.y < 120) {
                display.drawNote(note);
            }
        })

        game.world.eightNoteArr.forEach(note => {
            if(note.y < 120) {
                display.drawNote(note);
            }
        })

        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);

        display.render();
    }

    let controller = new Controller();
    let display = new Display(document.querySelector('canvas'));
    let game = new Game();
    let engine = new Engine(1000/30, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);
    window.addEventListener('resize', resize);

    resize();
    // debugger;
    
    display.fill(game.world.background_color);

    document.getElementById('end-menu').classList.add('playing');

    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            game.world.restartGame();
            game.world.fillNoteArr();
            game.world.fillBassArr();
            game.world.fillEightArr();

            document.getElementById('start-menu').classList.add('playing');
            if(!document.getElementById('end-menu').classList.contains('playing')){
                document.getElementById('end-menu').classList.add('playing');
            }

            setInterval(() => noteDrop(), 1);
        }
    }

    engine.start();
});