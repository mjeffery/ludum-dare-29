(function(exports) {
	function Session(game) {
		this.game = game;
		this.time = new SessionTime();
	}

	Session.prototype = {
		addTime: function(hours, minutes) {

		},

		update: function() {

		}
	};

	exports.Session = Session;
})(this);