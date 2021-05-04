import './styles/index.scss';
const Controller = require('./scripts/controller');
const Display = require('./scripts/display');
const Engine = require('./scripts/engine');
const Game = require('./scripts/game');
// var webAudioPeakMeter = require('web-audio-peak-meter');

document.addEventListener('DOMContentLoaded', function(e) {

    let keyDownUp = function(e) {
        controller.keyDownUp(e.type, e.keyCode);
    };

    let resize = function(e) {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    };

    let render = function() {

        display.fill(game.world.background_color);// Clear background to game's background color.
        // display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);
        // noteDrop();

        game.world.noteArr.forEach(note => {
            if(note.y < 120 && !note.hit){
                display.drawNote(note);
            } else if(game.world.noteArr[game.world.noteArr.length - 1].y > 118){
                game.world.gameEndMessage();
                game.world.gameEnd();
                game.world.backgroundTrack.play();
            }
        })

        game.world.bassNoteArr.forEach(note => {
            if(note.y < 120 && !note.hit) {
                display.drawNote(note);
            }
        })

        game.world.eightNoteArr.forEach(note => {
            if(note.y < 120 && !note.hit) {
                display.drawNote(note);
            }
        })

        display.drawRectangle(game.world.player.x, game.world.player.y, game.world.player.width, game.world.player.height, game.world.player.color);


        document.getElementById('score-container').innerHTML = (game.world.score === 0) ? (
            '0%'
        ) : (
            (game.world.score.toFixed(2)).toString() + '%'
        ) 

        game.world.noteArr.forEach(note => {
            if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
                game.world.scoreUpdate();
                note.hit = true;
                note.sound.play();
                game.world.player.hitNote();
                console.log('hi');
            }
        })

        game.world.bassNoteArr.forEach(note => {
            if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
                game.world.scoreUpdate();
                note.hit = true;
                note.sound.play();
                game.world.player.hitNote();
            }
        })

        game.world.eightNoteArr.forEach(note => {
            if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
                game.world.scoreUpdate();
                note.hit = true;
                note.sound.play();
                game.world.player.hitNote();
            }
        })

        display.render();
    
    };

    let update = function() {
        if(controller.left.active) {
            game.world.player.moveLeft();
            // console.log(game.world.player.x);few
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

    // let noteDrop = function() {
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

    document.getElementById('score-container').classList.add('playing');
    document.getElementById('end-menu').classList.add('playing');
    document.getElementById('tremor').classList.add('playing');
    document.getElementById('naruto').classList.add('playing');
    document.getElementById('song-rule').classList.add('playing');
    document.getElementById('top-rule').classList.add('playing');
    document.getElementById('bottom-rule').classList.add('playing');
    document.getElementById('third-rule').classList.add('playing');
    document.getElementById('fourth-rule').classList.add('playing');

    document.body.onkeyup = function(e){
        if(e.keyCode === 32){
            game.world.restartGame();
            document.getElementById('start-menu').classList.add('playing');
            document.getElementById('tremor').classList.remove('playing');
            document.getElementById('naruto').classList.remove('playing');
            document.getElementById('song-rule').classList.remove('playing');
            document.getElementById('top-rule').classList.remove('playing');
            document.getElementById('bottom-rule').classList.remove('playing');
            document.getElementById('third-rule').classList.remove('playing');
            document.getElementById('fourth-rule').classList.remove('playing');


            if(document.getElementById('pixel-logo').classList.contains('playing')){
                document.getElementById('pixel-logo').classList.remove('playing');
            }

            if(!document.getElementById('end-menu').classList.contains('playing')){
                document.getElementById('end-menu').classList.add('playing');
            }

            if(game.world.backgroundTrack.paused) {
                game.world.backgroundTrack.play();
            }

            if(!document.getElementById('score-container').classList.contains('playing')) {
                document.getElementById('score-container').classList.add('playing');
            }
        }

        if(e.keyCode === 80) {
            if(!game.world.backgroundTrack.paused){
                game.world.backgroundTrack.pause();
            } else {
                game.world.backgroundTrack.play();
            }
        }
    }

    document.getElementById('tremor').addEventListener('click', () => {
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


            document.getElementById('score-container').classList.remove('playing');

            // setInterval(() => noteDrop(), 1);
    })

    document.getElementById('naruto').addEventListener('click', () => {
        game.world.restartGame();

        game.world.song = 'naruto';

            game.world.fillNarutoNote();
            // game.world.fillNarutoEight();
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

            document.getElementById('score-container').classList.remove('playing');

            // setInterval(() => noteDrop(), 1);
    })
    game.world.backgroundTrack.loop = true;
    game.world.backgroundTrack.volume = 0.3;
    game.world.backgroundTrack.play();

    engine.start();

});