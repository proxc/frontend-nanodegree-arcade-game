// Enemies our player must avoid
var Enemy = function() {

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  // sets the initial start x positon randomly
  this.x = ((Math.floor(Math.random() * 4)) * 101);

  // sets initial y positoin
  this.y = 58;

  // sets movement speed
  this.speed = 1.5;

  // respawn timeput for when the enemies go offscreen
  // it gives a timeout to change position reletive to the
  // rest of the enemies
  this.respawnTimeout = 0;

  // varible to test if it needs to respawn
  this.respawned = true;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // checks if the enemy has respawned and checks its position
  // if its out of the canvas have it set a random respawn timer,
  // then reset its position 
  if(this.respawned) {
    this.x += 101 * this.speed * dt;
    if(this.x > ctx.canvas.width) {
      this.respawned = false;
      this.setPosition();
    }
  } else {
    //removes time from respawn timer and if its time is up respawn
    this.respawnTimeout += -1 * dt;
    if(this.respawnTimeout <= 0) {
      this.respawned = true;
    }
  }
};

// sets the enemys position
// the x position is offscreen
// the y is randomly choosen
// it also sets the respawn timer
Enemy.prototype.setPosition = function() {
 this.x = -101;
 this.y = ((Math.floor(Math.random() * 3) + 1) * 83) - 25;
 this.respawnTimeout = Math.floor(Math.random() * 2);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Creates the player
var Player = function() {
  //character sprite image
  this.sprite = 'images/char-boy.png';

  // character position
  this.x = 202;
  this.y = 403;

  // character position to move to
  this.newX = 202;
  this.newY = 403;

  // character speed
  this.speed = 3;

  //varibles to check if the player can move in a direction
  this.enableMoveLeft = false;
  this.enableMoveRight = false;
  this.enableMoveUp = false;
  this.enableMoveDown = false;

};

// updates the player
// required the delta time since last update dt
Player.prototype.update = function(dt) {

  // checks if we were told to move left, then moves left
  if(this.enableMoveLeft) {
    this.moveLeft(dt);
  }

  // checks if we were told to move right then moves right
  if(this.enableMoveRight) {
    this.moveRight(dt);
  }

  // checks if we were told to move up then moves up
  if(this.enableMoveUp) {
    this.moveUp(dt);
  }

  // checks if we were told to move down then moves down
  if(this.enableMoveDown) {
    this.moveDown(dt);
  }

  // calls checkCollision to see if we ran into a enemy
  this.checkCollision();

  // call to check if we made it across
  this.checkWin();
};

// functions that move the player
// requires the delta time dt
// we check if the players position has not passed the new position
// if it isn't then we calulate how far we need to move based on the time that has passed
// and set that as the new position
// if we have passed the new position set position to the new position
// and make sure we stop trying to move

Player.prototype.moveRight = function(dt) {
  if(this.x < this.newX) {
    this.x += 101 * dt * this.speed;
  } else {
    this.x = this.newX;
    this.enableMoveRight = false;
  }
};

Player.prototype.moveLeft = function(dt) {
  if(this.x > this.newX) {
    this.x -= 101 * dt * this.speed;
  } else {
    this.x = this.newX;
    this.enableMoveLeft = false;
  }
};

Player.prototype.moveUp = function(dt) {
  if(this.y > this.newY) {
    this.y -= 83 * dt * this.speed;
  } else {
    this.y = this.newY;
    this.enableMoveUp = false;
  }
};

Player.prototype.moveDown = function(dt) {
  if(this.y < this.newY) {
    this.y += 83 * dt * this.speed;
  } else {
    this.y = this.newY;
    this.enableMoveDown = false;
  }
};

// renders the players sprite
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// function to figure out if we can move 
// requires the key that was pressed

Player.prototype.handleInput = function (key) {
  //checks to see if we can move. Its setup to only allow one direction of
  //travel at a time and we can't change until we stop
  // calculates the new position based on the key that was pressed and if the
  // new position allowed, if it isn't allowed (outside area) then it resets the position
  // back to the current position 

  if(!this.enableMoveLeft && !this.enableMoveRight && !this.enableMoveUp && !this.enableMoveDown) {
    switch (key) {
      case 'left' :
        this.newX = this.x - 101;
        if(this.newX > -1){
          this.enableMoveLeft = true;
        } else {
          this.newX = this.x;
        }
        break;
      case 'right' :
        this.newX = this.x + 101;
        if(this.newX < ctx.canvas.width){
          this.enableMoveRight = true;
        } else {
          this.newX = this.X;
        }
        break;
      case 'up' :
        this.newY = this.y - 83;
        if(this.newY > -13) {
          this.enableMoveUp = true;
        } else {
          this.newY = this.Y;
        }
        break;
      case 'down' :
        this.newY = this.y + 83;
        if(this.newY < ((rows * 83) - 12) ){
          this.enableMoveDown = true;
        } else {
          this.newY = this.Y;
        }
        break;
    }
  }

};

// checks if the player intersects with the enemies
Player.prototype.checkCollision = function() {

  //get y position of player with a offset to remove dead space
  var currentY = this.y + 68;
  var currentY2 = currentY + 40;

  //get x position
  var currentX = this.x + 25;
  var currentX2 = this.x + 76;

  // runs through the array of enemies
  for(var e = 0; e < allEnemies.length; e++) {
    // get y position of enemies with a offset to remove dead space
    var enemyY = allEnemies[e].y + 63;
    var enemyY2 = enemyY + 75;

    var enemyX = allEnemies[e].x;
    var enemyX2 = enemyX + 101;

    // check to see if y pos intersect
    if(currentY <= enemyY2 && currentY2 >= enemyY) {
      // y positions intersect now check if x positions intersect
      if(currentX < enemyX2 && currentX2 > enemyX) {
        console.log("DEAD!");
        this.reset();
      }
    }
  }
};

//resets the player to the starting position
Player.prototype.reset = function() {
  this.x = 202;
  this.y = 403;
  this.newX = 202;
  this.newY = 403;
};

// checks if the player has won
// if player has won stop game
Player.prototype.checkWin = function() {
  if(this.y === -12) {
    alert('YOU WIN');
    running = false;
  }
};

// array holding all enemies
var allEnemies = [];

// creating all enemies  with random start positions
for(var i = 0; i < 3; i++) {
  badguy = new Enemy();
  badguy.x = ((Math.floor(Math.random() * 4)) * 101);
  badguy.y = ((Math.floor(Math.random() * 3) + 1) * 83) - 25;
  badguy.speed = 2;
  allEnemies.push(badguy);
}

// creating a new player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});



