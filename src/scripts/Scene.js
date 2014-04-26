(function(exports) {
	function Scene(data) {

	}

	Scene.prototype = {
		create: function() {
			var add = this.add,
				player = this.player = new Actor(this.game, 320, 240);

			add.existing(player);

			this.input.onDown.add(this.onDown, this);
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