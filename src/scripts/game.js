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
        song: '',

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

            'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'd.mp3', //61
            'fs.mp3', 'd.mp3', 'e.mp3', 'e.mp3', 'fs.mp3', 'd.mp3', 'd.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3', 'a.mp3', 'a.mp3', //74
            'e.mp3', 'cs.mp3', 'e.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'd.mp3', //84
            'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'd.mp3', //89

            'b3.mp3', 'fs.mp3', 'fs.mp3', 'd.mp3', 'd.mp3', 'fs.mp3', 'fs.mp3', 'd.mp3', 'd.mp3', 'b.mp3', 'a.mp3', 'fs.mp3', 'd.mp3', //102
            'b3.mp3', 'cs.mp3', 'd.mp3', 'd.mp3', 'cs.mp3', 'd.mp3', 'e.mp3', 'e.mp3', 'e.mp3', 'fs.mp3', 'e.mp3', 'd.mp3', 'e.mp3',  //115

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
            'a3.mp3', 'b3.mp3', 'a3.mp3', 'd.mp3', 'e.mp3', //236
        ],
        narutoBassArr: [

        ],
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
        narutoXPosArr: [
            50, 45, 50, 60, 45, 50, 45, 50, 60, 45, 50,
            60, 45, 60, 65, 45, 65, 75, 80, 75, 65, 60,
            115, 110, 100, 115, 110, 100, 115, 110, 100, 105, 110,

            95, 75, 60, 65, 75, 60, 75, 75, 65, 60, 65, 85, 85,
            65, 55, 65, 60, 90, 85, 60, 90, 85, 60,

            60, 55, 60, 65, 60,
            75, 60, 65, 65, 75, 60, 60, 75, 65, 60, 65, 85, 85,
            65, 55, 65, 60, 90, 85, 60, 90, 85, 60, 
            60, 55, 60, 65, 60,

            50, 75, 75, 60, 60, 75, 75, 60, 60, 90, 85, 75, 60,
            50, 55, 60, 60, 55, 60, 65, 65, 65, 75, 65, 60, 65,

            60, 45, 60, 75, 75, 65, 60, 65,
            65, 45, 55, 65, 80, 75, 65, 75,

            65, 60, 90, 85, 60, 90, 85, 60,
            60, 55, 60, 65, 75,

            60, 45, 60, 75, 75, 65, 60, 65,
            65, 45, 55, 65, 80, 75, 75, 75 , 65, 60,
            90, 85, 60, 90, 85, 60, 
            60, 55, 60, 65, 75,

            60, 50, 60, 75, 75, 65, 60, 65,
            65, 45, 55, 65, 65, 80, 85, 75, 65, 60,
            90, 85, 60, 90, 85, 60,
            60, 55, 60, 65, 60, 

            85, 75, 65, 65, 85, 75, 65, 65, 90, 75, 65, 60,
            50, 55, 60, 60, 75, 65, 60,
            50, 50, 45, 50, 60, 45, 50, 45, 50, 60,
            45, 50, 45, 60, 65

        ],
        narutoxBassPosArr:[

        ],
      

        fillNarutoNote:function(){
            let y = 0;
            let count = 0;
            while(this.noteArr.length < this.narutoMelodyArr.length){
                this.noteArr.push(new Game.Note(this.narutoXPosArr[count], y, this.narutoMelodyArr[count]));
                count += 1;

                if(count < 4 || count === 73 || count === 90 || count === 94 || count === 98 || count === 100  || (count >= 121 && count <= 122) || (count >= 129 && count <= 130) || (count >= 150 && count <= 151) || (count >= 158 && count <= 159) || (count >= 179 && count <= 180) || (count >= 185 && count <= 186) || count === 203 || count === 207 || count === 211 || (count >= 223 && count <= 225) || (count >= 227 &&  count <= 230) || (count >= 232 &&  count <= 235)){
                    y -= 5;
                } else if(count === 4 || count === 25 || count === 26 || count === 29 || count === 30 || count === 32 || count === 33 || count === 46 || count === 74 || count === 92 || count === 96 || count === 204 || count === 208 || count === 212 || count === 226){
                    y -= 15;
                } else if((count >= 5 && count <= 8) || count === 10 || count === 20 || count === 21 || (count >= 40 && count <= 43) || count === 45 || (count >= 64 && count <= 65) || (count >= 67 && count <= 68) || (count >= 70 && count <= 71)){
                    y -= 5;
                } else if(count === 9 || (count >= 11 && count <= 12) || (count >= 14 && count <= 15) || count === 17 || count === 18 || count === 19 || count === 22 || count === 23){
                    y -= 15;
                } else if (count === 13 || count === 16 || count === 24 || count === 27 || count === 31 || (count >= 34 && count <= 37) || count === 39 || count === 44 || (count >= 47 && count <= 49) || (count >= 51 && count <= 52) || (count >= 54 && count <= 55) || (count >= 58 && count <= 63)) {
                    y -= 10;
                } else if (count === 28 || count === 38 || count == 66) {
                    y -= 30;
                } else if(count === 50 || count === 53 || (count >= 56 && count <= 57) || count === 78 || count === 81 || (count >= 84 && count <= 85) || count === 89 || count === 102 || (count >= 105 && count <= 106) || (count >= 109 && count <= 111) || count === 123 || count === 133 || count === 136 || (count >= 139 && count <= 140) || count === 152 || count === 162 || count === 165 || (count >= 168 && count <= 169) || count === 181 || count === 191 || count === 194 || (count >= 197 && count <= 198) || count === 202 || count === 214 || (count >= 217 && count <= 218)){
                    y -= 20;
                } else if(count === 69 || count === 72 || (count >= 75 && count <= 77) || (count >= 79 && count <= 80) || (count >= 82 && count <= 83) || (count >= 86 && count <= 88) || count === 91 || count === 93 || count === 95 || count === 97 || count === 99 || count === 101 || (count >= 103 && count <= 104) || (count >= 107 && count <= 108) || (count >= 112 && count <= 120) || (count >= 124 && count <= 128) || (count >= 131 && count <= 132) || (count >= 134 && count <= 135) || (count >= 137 && count <= 138) || (count >= 141 && count <= 149) || (count >= 153 && count <= 157) || (count >= 160 && count <= 161) || (count >= 163 && count <= 164) || (count >= 166 && count <= 167) || (count >= 170 && count <= 178) || (count >= 182 && count <= 184) || (count >= 187 && count <= 190) || (count >= 192 && count <= 193) || (count >= 195 && count <= 196) || (count >= 199 && count <= 201) || (count >= 205 && count <= 206) || (count >= 209 && count <= 210) || count === 213 || (count >= 215 && count <= 216) || (count >= 219 && count <= 222) || count === 231 || count === 236){
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
            debugger;
            if(this.score >= 99.8){
                message = 'WOW! PERFECT SCORE! PRESS SPACEBAR TO TRY AGAIN'
            } else if(this.score >= 90 && this.score < 99.8){
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

            if(this.song === 'tremor'){
                this.score += (100 / (this.melodyArr.length + this.bassArr.length + this.eightArr.length));
            } else if( this.song === 'naruto'){
                this.score += (100 / (this.narutoMelodyArr.length ));
            }
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