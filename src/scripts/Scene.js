(function(exports) {
	function Scene(data) {

	}

	Scene.prototype = {
		create: function() {
			var add = this.add,
				player = this.player = new Actor(this.game, 320, 240);

			var bg = this.background = add.group();
			add.existing(player);
			var fg = this.foreground = add.group();

			this.input.onDown.add(this.onDown, this);

			bg.add(new Door(this.game, 480, 240));
		},

		update: function() {
			this.player.think();
		},

		onDown: function(pointer) {
			var x = pointer.worldX;
			this.player.goto(x);
		}
	}

	exports.Scene = Scene;
})(this);