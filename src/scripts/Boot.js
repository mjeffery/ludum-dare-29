(function(exports) {
	function Boot() {}

	Boot.prototype = {
		preload: function() {
			this.load.image('loading-bar', 'assets/img/loading bar.png');
			this.load.image('loading-bar-overlay', 'assets/img/loading bar overlay.png');
		},

		create: function() {
			this.stage.backgroundColor = '#000000';
			this.state.start('preload');
		}
	}

	exports.Boot = Boot;
})(this);