(function(exports) {
	function Preload() {}

	Preload.prototype = {
		preload: function() {
			var load = this.load,
				add = this.add,
				bar = add.sprite(192, 232, 'loading-bar');

			add.sprite(192, 232, 'loading-bar-overlay');

			load.setPreloadSprite(bar);
			load.onLoadComplete.addOnce(this.onLoadComplete, this);

			//PRELOAD ASSETS
			IndoorWalls.preload(load);
			SceneObject.preload(load);
			HUD.preload(load);
			Town.preload(load);
			Actor.preload(load);
			Door.preload(load);

			load.bitmapFont('minecraftia', 'assets/font/minecraftia.png', 'assets/font/minecraftia.xml');
		},

		onLoadComplete: function() {
			this.state.start('game');
		}
	}

	exports.Preload = Preload;
})(this);