(function(exports) {
	function SceneObject(game, x, y, key, frame) {
		Phaser.Sprite.call(this, game, x, y, key);
		this.anchor.setTo(0.5, 1);
		this.scale.setTo(4, 4);
		if(frame !== undefined) this.frame = frame;
		this.smoothed = false;

		this.inputEnabled = true;
	}	

	SceneObject.preload = function(load) {
		load.spritesheet('background-door', 'assets/spritesheet/background doors.png', 16, 32);
		load.image('bed', 'assets/img/bed.png');
	};

	SceneObject.prototype = Object.create(Phaser.Sprite.prototype);
	SceneObject.prototype.constructor = SceneObject;

	exports.SceneObject = SceneObject;
})(this);