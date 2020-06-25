const Game = function() {

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

        melodyArr: [
            'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 
            'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3',
            'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3',
            'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'd5.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3',

            'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3',
            'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3',
            
            'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'cs.mp3', 

            'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 'cs.mp3', 

            'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3', 
            'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'b3.mp3', 'cs.mp3', 'b3.mp3', 'a3.mp3', 'fs3.mp3',
            'a.mp3', 'gs.mp3', 'g.mp3', 'fs.mp3', 'fs.mp3', 'gs.mp3', 'a.mp3', 'fs.mp3', 'fs5.mp3',
            'fs.mp3', 'e.mp3', 'cs.mp3', 'b3.mp3', 'd5.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3',
        ],
        bassArr: [
            'fs3.mp3', 'e3.mp3', 'ds3.mp3', 'd3.mp3', 'e3.mp3', 
            'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3', 'b3.mp3',
            'fs3.mp3', 'e3.mp3', 'ds3.mp3', 'd3.mp3', 'e3.mp3', 
        ],
        eightArr: [
            'a5.mp3', 'gs5.mp3', 'g5.mp3', 'fs5.mp3', 'fs5.mp3', 'gs5.mp3','a5.mp3', 'fs5.mp3', 'fs6.mp3',
            'fs5.mp3', 'e5.mp3', 'cs5.mp3', 'b.mp3', 'b.mp3', 'cs5.mp3', 'b.mp3', 'a.mp3', 'fs.mp3',
            'a5.mp3', 'gs5.mp3', 'g5.mp3', 'fs5.mp3', 'fs5.mp3', 'gs5.mp3','a5.mp3', 'fs5.mp3', 'fs6.mp3',
            'fs5.mp3', 'e5.mp3', 'cs5.mp3', 'b.mp3', 'd6.mp3', 'cs6.mp3', 'b5.mp3', 'a5.mp3', 'fs5.mp3',
        ],
        xPosArr: [
            70, 65, 60, 55, 55, 65, 70, 55, 90, 
            55, 50, 45, 35, 35, 45, 35, 25, 15, 
            70, 65, 60, 55, 55, 65, 70, 55, 90,
            55, 50, 45, 35, 80, 75, 73, 70, 55,

            35, 45, 35, 25, 35, 45, 35, 25, 
            35, 45, 35, 25, 35, 45, 35, 25, 

            35, 45, 35, 45, 35, 45, 35, 45, 

            45, 45, 45, 45, 45, 45,
            
            70, 65, 60, 55, 55, 65, 70, 55, 90, 
            55, 50, 45, 35, 35, 45, 35, 25, 15,
            70, 65, 60, 55, 55, 65, 70, 55, 90, 
            55, 50, 45, 35, 80, 75, 73, 70, 55,
            150,
        ],
        xBassPosArr: [
            65, 50, 65, 45, 25,
            35, 35, 35, 35, 35, 35,
            65, 50, 65, 45, 25,
        ],
        xEightPosArr: [
            75, 70, 65, 60, 60, 70, 75, 60, 95,
            60, 55, 50, 40, 40, 50, 40, 30, 20,
            75, 70, 65, 60, 60, 70, 75, 60, 95,
            60, 55, 50, 40, 85, 80, 78, 75, 60,
        ],

        narutoMelodyArr: [
            'b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', 'a3.mp3', 'b3.mp3', 'a3.mp3', 'b3.mp3', 'd.mp3', 'a3.mp3', 'b3.mp3',
            'd.mp3', 'a3.mp3', 'd.mp3', 'e.mp3', 'a3.mp3', 'e.mp3', 'fs.mp3', 'g.mp3', 'fs.mp3', 'e.mp3', 'd.mp3',
            'g5.mp3', 'fs5.mp3', 'd5.mp3', 'g5.mp3', 'fs5.mp3', 'd5.mp3', 'g5.mp3', 'fs5.mp3', 'd5.mp3', 'e5.mp3', 'fs5.mp3', //33

            'cs5.mp3', 'fs.mp3', 'd.mp3', 'e.mp3', 'fs.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', 'a.mp3', 'a.mp3', //46
            'e.mp3', 'cs.mp3', 'e.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //56
            'd.mp3',
        ],
        narutoBassArr: [

        ],
        narutoEightArr: [

        ],
        narutoXPosArr: [
            50, 45, 50, 60, 45, 50, 45, 50, 60, 45, 50,
            60, 45, 60, 65, 45, 65, 75, 80, 75, 65, 60,
            115, 110, 100, 115, 110, 100, 115, 110, 100, 105, 110,
            95, 75, 60, 65, 75, 60, 75, 75, 65, 60, 65, 85, 85,
            65, 55, 65, 60, 85, 80, 60, 85, 80, 60,
            60,
        ],
        narutoxBassPosArr:[

        ],
        narutoxEightPosArr:[

        ],

        fillNarutoNote:function(){
            let y = 0;
            let count = 0;
            while(this.noteArr.length < this.narutoMelodyArr.length){
                this.noteArr.push(new Game.Note(this.narutoXPosArr[count], y, this.narutoMelodyArr[count]));
                count += 1;

                if(count < 4){
                    y -= 5;
                } else if(count === 4 || count === 25 || count === 26 || count === 29 || count === 30 || count === 32 || count === 33 || count === 46){
                    y -= 15;
                } else if((count >= 5 && count <= 8) || count === 10 || count === 20 || count === 21 || (count >= 40 && count <= 43) || count === 45){
                    y -= 5;
                } else if(count === 9 || (count >= 11 && count <= 12) || (count >= 14 && count <= 15) || count === 17 || count === 18 || count === 19 || count === 22 || count === 23){
                    y -= 15;
                } else if (count === 13 || count === 16 || count === 24 || count === 27 || count === 31 || (count >= 34 && count <= 37) || count === 39 || count === 44 || (count >= 47 && count <= 49) || (count >= 51 && count <= 52) || (count >= 54 && count <= 55)) {
                    y -= 10;
                } else if (count === 28 || count === 38) {
                    y -= 30;
                } else if(count === 50 || count === 53 || (count >= 56 && count <= 57)){
                    y -= 20;
                }
            }
        },

        restartGame: function(){
            this.noteArr = [];
            this.bassNoteArr = [];
            this.eightNoteArr = [];
            this.score = 0;
        },

        gameEnd:function(){
            document.getElementById('end-menu').classList.remove('playing')
        },

        gameEndMessage:function(){
            let message = '';
            // debugger;
            if(this.score > 99){
                message = 'WOW! PERFECT SCORE! PRESS SPACEBAR TO TRY AGAIN'
            } else if(this.score >= 90 && this.score <= 99){
                message = 'SO CLOSE TO PERFECTION! PRESS SPACEBAR TO TRY AGAIN'
            } else if(this.score >= 80 && this.score <= 89) {
                message = 'PRETTY GOOD, BUT I BET YOU CAN DO BETTER. PRESS SPACEBAR TO TRY AGAIN'
            } else if(this.score >= 70 && this.score <=79) {
                message = 'OH MAN, MAYBE YOU SHOULD PRACTICE A LITTLE MORE. PRESS SPACEBAR TO TRY AGAIN'
            } else if(this.score <= 69){
                message = 'IS YOUR MONITOR ON? PRESS SPACEBAR TO TRY AGAIN'
            }

            document.getElementById('end-menu').innerHTML = message;
        },

        fillNoteArr:function() {
            let y = 0;
            let count = 0;
            while(this.noteArr.length < this.melodyArr.length) {
                this.noteArr.push(new Game.Note(this.xPosArr[count], y, this.melodyArr[count]));
                count += 1;

                if((count <= 4) || (count >= 67 && count <= 70)){
                    y -= 20;
                } else if((count >= 5 && count <= 8) || (count >= 71 && count <= 74)) {
                    y -= 10;
                } else if(count === 9 || count === 75){
                    y -= 30;  
                } else if((count >= 10 && count <= 13) || (count >= 76 && count <= 79)){
                    y -= 20
                } else if((count >= 14 && count <= 17) || (count >= 80 && count <= 83)) {
                    y -= 10;
                } else if(count === 18 || count === 84){
                    y -= 30;
                } else if((count >= 19 && count <= 22) || (count >= 85 && count <= 88)) {
                    y -= 20;
                } else if((count >= 23 && count <= 26) || (count >= 89 && count <= 92)) {
                    y -= 10;
                } else if(count === 27 || count === 93){
                    y -= 30;
                } else if( (count >= 28 && count <= 31) || (count >= 94 && count <= 97)) {
                    y -= 20;
                } else if( (count >= 32 && count <= 36) || (count >= 98 && count <= 102)) {
                    y -= 10;
                } else if( count >= 37 && count <= 60) {
                    y -= 10;
                } else if (count === 61) {
                    y -= 5;
                } else if (count === 62){
                    y -= 10;
                } else if( count === 63){
                    y -= 5;
                } else if(count === 64){
                    y -= 10;
                } else if(count === 65){
                    y -= 5;
                } else if(count === 66){
                    y -= 30;
                }
            }
        },
        
        fillBassArr:function(){
            // debugger;
            let y = 0;
            let count = 0;
            while(this.bassNoteArr.length < this.bassArr.length) {
                this.bassNoteArr.push(new Game.Note(this.xBassPosArr[count], y, this.bassArr[count]));
                count += 1;
                // console.log(this.bassNoteArr[count - 1].sound);
                if(count <= 3 || (count >= 12 && count <= 14)) {
                    y -= 150;
                } else if(count === 4 || count === 15) {
                    y -= 60;
                } else if (count === 5 ){
                    y -= 310;
                } else if(count === 6){
                    y -= 5;
                } else if (count === 7){
                    y -= 10;
                } else if(count === 8) {
                    y -= 5;
                } else if(count === 9){
                    y -= 10;
                } else if(count === 10){
                    y -= 5;
                } else if( count === 11) {
                    y -= 30
                }
            }
            // console.log(this.bassNoteArr);
        },

        fillEightArr:function(){
            let y = -885;
            let count = 0;
            while(this.eightNoteArr.length < this.eightArr.length){
                this.eightNoteArr.push(new Game.Note(this.xEightPosArr[count], y, this.eightArr[count]));
                count += 1;
                
                if(count <= 4){
                    y -= 20;
                } else if(count >= 5 && count <= 8) {
                    y -= 10;
                }
                else if(count === 9 || count === 75){
                    y -= 30;  
                } else if(count >= 10 && count <= 13){
                    y -= 20
                } else if(count >= 14 && count <= 17) {
                    y -= 10;
                } else if(count === 18 || count === 84){
                    y -= 30;
                } else if(count >= 19 && count <= 22) {
                    y -= 20;
                } else if(count >= 23 && count <= 26) {
                    y -= 10;
                } else if(count === 27){
                    y -= 30;
                } else if(count >= 28 && count <= 31) {
                    y -= 20;
                } else if( count >= 32 && count <= 36) {
                    y -= 10;
                }
            }
        },

        scoreUpdate:function() {
            this.score += (100 / (this.melodyArr.length + this.bassArr.length + this.eightArr.length));
            // this.score += 1;
        },

        collideObject:function(object){
            if(object.x < 0) {
                object.x = 0;
                object.velocity_x = 0;
            } else if(object.x + object.width > this.width) {
                object.x = this.width - object.width;
                object.velocity_x = 0;
            } 

            // if(object.y < 0) {
            //     object.y = 0;
            //     object.velocity_y = 0;
            // } else if(object.y + object.height > this.height) {
            //     object.jumping = false;
            //     object.y = this.height - object.height;
            //     object.velocity_y = 0;
            // }
        },

        update:function() {
            this.player.velocity_y += this.gravity;
            
            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;
            
            this.player.update();
            
            this.noteArr.forEach(note => {
                note.update();
            })

            this.bassNoteArr.forEach(note => {
                note.update();
            })

            this.eightNoteArr.forEach(note => {
                note.update();
            })

            this.collideObject(this.player);
        }
    };

    this.update = function() {
        this.world.update();
    };
};

Game.prototype = { constructor : Game };

Game.Player = function(x, y) {
    this.color = '#ff0000';
    this.height = 4;
    // this.jumping = true;
    this.velocity_x = 0;
    // this.velocity_y = 0;
    this.width = 24;
    this.x = 60;
    this.y = 110;
};

Game.Player.prototype = {
    constructor : Game.Player,

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

    hitNote:function() {
        this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);
    },

    moveLeft:function() { 
        this.velocity_x -= 0.75;
    },
    moveRight:function() {
        this.velocity_x += 0.75;
    },

    update:function(){
        this.x += this.velocity_x;
        // this.y += this.velocity_y;
    }
}

Game.Note = function(x, y, audioFile){
    this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);

    if(this.color.length != 7){
        this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6);
    }

    this.height = 2;
    this.width = 2;
    this.x = x;
    this.y = y;

    this.velocity_y = 1;

    this.hit = false;
    this.sound = new Audio(audioFile);
}

Game.Note.prototype = {
    constructor : Game.Note,
    update: function(){
        this.y += this.velocity_y;
    }
}



module.exports = Game;