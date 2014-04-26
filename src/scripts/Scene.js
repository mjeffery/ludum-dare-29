(function(exports) {
	function Scene(data) {

	}

	Scene.prototype = {
		create: function() {
			var game = this.game,
				add = this.add,
				player = this.player = new Actor(this.game, 240, 250);

			new IndoorWalls(game, 10);

			var bg = this.background = add.group();
			add.existing(player);
			var fg = this.foreground = add.group();

			this.input.onDown.add(this.onDown, this);

			bg.add(new Door(this.game, 480, 228));
			bg.add(new SceneObject(this.game, 240, 240, 'bed'));

			if(!game.HUD) game.HUD = new HUD(game);

			game.camera.follow(player)//, Phaser.Camera.FOLLOW_PLATFORMER);
		},

		update: function() {
			this.game.session.update(); //where does this go?
			this.player.think();
		},

		render: function() {
			game.debug.cameraInfo(game.camera, 32, 300);
		},

		onDown: function(pointer) {
			var x = pointer.worldX;
			this.player.goto(x);
		}
	}

	exports.Scene = Scene;
})(this);