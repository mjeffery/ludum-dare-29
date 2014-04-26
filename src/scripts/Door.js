(function(exports) {
	function Door(game, x, y, type) {
		Phaser.Sprite.call(this, game, x, y, 'background-door');
		this.anchor.setTo(0.5, 1);
		this.frame = type || 0;
		this.smoothed = false;
		this.scale.setTo(4, 4);
		this.inputEnabled = true;
	}

	_.extend(Door, {
		preload: function(load) {
			load.spritesheet('background-door', 'assets/spritesheet/background doors.png', 16, 32);
		}
	});

	Door.prototype = Object.create(Phaser.Sprite.prototype);
	Door.prototype.constructor = Door;

	_.extend(Door.prototype, {

	});

	exports.Door = Door;
})(this);