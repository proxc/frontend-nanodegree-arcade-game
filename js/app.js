// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = 0;
  this.y = 0;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += 00*dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202.1;
  this.y = 403;
  this.newX = 202.1;
  this.newY = 403;
  this.speed = 3;
  this.enableMoveLeft = false;
  this.enableMoveRight = false;
  this.enableMoveUp = false;
  this.enableMoveDown = false;

};

Player.prototype.update = function(dt) {
  if(this.enableMoveLeft) {
    this.moveLeft(dt);
  }
  if(this.enableMoveRight) {
    this.moveRight(dt);
  }
  if(this.enableMoveUp) {
    this.moveUp(dt);
  }
  if(this.enableMoveDown) {
    this.moveDown(dt);
  }
};

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

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
  if(!this.enableMoveLeft && !this.enableMoveRight && !this.enableMoveUp && !this.enableMoveDown) {

    switch (key) {
      case 'left' :
        this.newX = this.x - 101;
        this.enableMoveLeft = true;
        break;
      case 'right' :
        this.newX = this.x + 101;
        this.enableMoveRight = true;
        break;
      case 'up' :
        this.newY = this.y - 83;
        this.enableMoveUp = true;
        break;
      case 'down' :
        this.newY = this.y + 83;
        this.enableMoveDown = true;
        break;
    }
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
console.log(player);


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

allEnemies.push( new Enemy() );
