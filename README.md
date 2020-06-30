# beat_step

## Overview

Beat Step is a music game where a song is played and notes fall from the top of the screen.  Your goal is to catch the notes with your  platform that sits on the bottom and as you catch the notes, the song gets played based on what notes you catch.  It is going to be visually pleasing as catching each note will change your platform's color.  

## Functionality

Features of the game include:

* Being able to move the paddle left and right

* Plays the specific note of the song when it collides with your paddle

* Able to start the song with spacebar and clicking on the song from the song menu

* Able to pause the background music track if you press 'p'

* Can go back to the song menu if you press spacebar at anytime

# Code Snippets

* Checked for each note, if any of its corners intersect with the paddle at time, then play the specific note of that note block.  Also changes the hit property of the note block class to true so that it won't constantly play the note/only hit the paddle once.  Once it hits the paddle, it stops rendering the note to let you know that you caught the note.

```javascript
game.world.bassNoteArr.forEach(note => {
    if(note.x >= game.world.player.x && note.x <= game.world.player.x + 24 && note.y >= game.world.player.y && note.y <= game.world.player.y + 4 && !note.hit){
        game.world.scoreUpdate();
        note.hit = true;
        note.sound.play();
        game.world.player.hitNote();
    }
})
```

* Update function is called every frame the world is rendered.  This update function is what gives the game's world fake physics so that the paddle slides left and right and will slow to a stop if you don't continuosly give it input.  It also updates every note so that they constantly fall at the same rate.  

```javascript
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
```

* This collideObject function makes sure that the paddle doesn't go past the boundaries of the canvas border.  It checks if the player hits any part of the wall and then if it sees that you've collided with a wall, it will just constantly set your x position to that part of the wall.  Which will create the effect of a boundary being there.

```javascript
collideObject:function(object){
    if(object.x < 0) {
        object.x = 0;
        object.velocity_x = 0;
    } else if(object.x + object.width > this.width) {
        object.x = this.width - object.width;
        object.velocity_x = 0;
    } 
}
```

# Example Images
![Intro Page](https://github.com/dojobuns/pixel-beat/blob/master/src/images/portfoliositepixel.png)
![Score Page](https://github.com/dojobuns/pixel-beat/blob/master/src/images/soclosetoperfectscorepixel.png)
![Gameplay](https://github.com/dojobuns/MapMyWalk/blob/master/app/assets/images/thirteenscorepixel.png)

# Credits
* Music: Eric Skiff - Song Name - A Night Of Dizzy Spells