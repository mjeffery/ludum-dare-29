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
		},

		onLoadComplete: function() {
			this.state.start('game');
		}
	}

	exports.Preload = Preload;
})(this);