(function(exports) {
	function TownGame(container) {
		Phaser.Game.call(this, 640, 480, Phaser.AUTO, container);

		this.state.add('boot', Boot);
		this.state.add('preload', Preload);
		this.state.add('game', Scene);
		this.state.add('time-test', SessionTimeTest);

		this.session = new Session(this);
	}

	TownGame.prototype = Object.create(Phaser.Game.prototype);
	TownGame.prototype.constructor = TownGame;

	exports.TownGame = TownGame;
})(this);