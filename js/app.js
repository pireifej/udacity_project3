// Enemies our player must avoid
// Parameter: init_y, the initial y position
// Parameter: speed, the speed at which the enemy moves across the screen
var Enemy = function(init_y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

	// Initial position for enemy on screen
	// X is always 0 because they start at the left-most column
	this.x = 0
	this.y = init_y;

	// Speed that this enemy will move
	this.my_speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

	// When enemy is off-screen, reset the position,
	// enemy will appear randomly on top, middle or bottom rows
	if (this.x > 500) {
		this.x = -100;
        this.y = enemy_pos[Math.floor(Math.random() * 3)];
		return;
	}
	this.x += this.my_speed * dt;
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Enemies our player must avoid
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';

	// Initial position for the player
	this.x = 200;
	this.y = 400;

	// Number of pixels to jump on each key press
	this.ver_jump = 85;
	this.hor_jump = 100;

	// New x, y positions for player after key press
	this.new_x = this.x;
	this.new_y = this.y;
}

// Update the player's position, required method for game
Player.prototype.update = function() {
	// First, perform bounds checking to ensure player
	// cannot move off canvas or into water
	if (this.new_y < 0) {
		return;
	}
	if (this.new_y > 450) {
		return;
	}
	if (this.new_x == -100) {
		return;
	}
	if (this.new_x == 500) {
		return;
	}
	this.y = this.new_y;
	this.x = this.new_x;
}

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Handle input from the keyboard sent to the player
// Calculates new x, y position for moving up, down, left and right
Player.prototype.handleInput = function(key) {
	if (!key) {
		return;
	}
	if (key == "up") {
		this.new_y = this.y - this.ver_jump;
	}
	if (key == "down") {
		this.new_y = this.y + this.ver_jump;
	}
	if (key == "left") {
		this.new_x = this.x - this.hor_jump;
	}
	if (key == "right") {
		this.new_x = this.x + this.hor_jump;
	}
}

function changeChar() {
    var selectChar = document.getElementById("selectChar");
    var charValue = selectChar.options[selectChar.selectedIndex].value;
	player.sprite = 'images/char-' + charValue + '.png';
}

// This class requires a  render() and method.
// Items our player can collect
var Item = function(my_sprite, init_x, init_y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our item, this uses
    // a helper we've provided to easily load images
    this.sprite = my_sprite;

	// Initial position for the item
	this.x = init_x;
	this.y = init_y;
}

// Draw the item on the screen, required method for game
Item.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// The position on screen that represents
// the bottom, middle and top rows (respectively)
// that the enemy can appear in
var enemy_pos = [50, 140, 220];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(enemy_pos[0], 300), new Enemy(enemy_pos[1], 200), new Enemy(enemy_pos[2], 500)];
var allItems = [new Item('images/Heart.png', 200, enemy_pos[0]), new Item('images/Key.png', 300, enemy_pos[1]), new Item('images/Star.png', 400, enemy_pos[2])];
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
