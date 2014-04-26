(function(exports) {
	function Boot() {}

	Boot.prototype = {
		preload: function() {
			console.log('Boot#preload');
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