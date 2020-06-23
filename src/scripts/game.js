const Game = function() {

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

        fillNoteArr:function() {
            let y = 0;
            while(this.noteArr.length < 30) {
                this.noteArr.push(new Game.Note(y))
                y -= 20;
                debugger;
            }
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
            this.player.update();

            this.player.velocity_x *= this.friction;
            this.player.velocity_y *= this.friction;

            this.note.update();
            this.note2.update();

            this.noteArr.forEach(note => {
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
    this.width = 14;
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

    moveLeft:function() { 
        this.velocity_x -= 0.5;
    },
    moveRight:function() {
        this.velocity_x += 0.5;
    },

    update:function(){
        this.x += this.velocity_x;
        // this.y += this.velocity_y;
    }
}

Game.Note = function(y){
    this.color = '#' + Math.floor(Math.random() * 16777216).toString(16);

    if(this.color.length != 7){
        this.color = this.color.slice(0, 1) + '0' + this.color.slice(1, 6);
    }

    this.height = 2;
    this.width = 2;
    this.x = Math.floor(Math.random() * 124);
    this.y = y;

    this.velocity_y = 1;
}

Game.Note.prototype = {
    constructor : Game.Note,
    update: function(){
        this.y += this.velocity_y;
    }
}



module.exports = Game;