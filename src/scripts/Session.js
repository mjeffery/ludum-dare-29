(function(exports) {
	function Session(game) {
		this.game = game;
		this.time = new SessionTime(game);
		this.wallet = new Wallet(game);

		this.stats = new Stats();

		this.wallet.add(500); //TODO where do initial conditiosn go?
	}

	Session.prototype = {
		update: function() {
			this.time.update();
			this.wallet.update();
		}
	};

	exports.Session = Session;
})(this);