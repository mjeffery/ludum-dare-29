(function(exports) {
	function Session(game) {
		this.game = game;

		this._startedAt = moment('2014-04-28 6:00 AM', 'YYYY-MM-DD h:mm A');
		this._now = moment(this._startedAt);
	}

	Object.defineProperty(Session.prototype, 'now', {
		get: function() { 
			return moment(this._now);
		}
	});

	Object.defineProperty(Session.prototype, 'week', {
		get: function() {
			var start = this._startedAt.get('isoweek'),
				now = this._now.get('isoweek');
			return now - start + 1;
		}
	});

	Object.defineProperty(Session.prototype, 'timeString', {
		get: function() {
			var dayAndTime = this._now.format('ddd h:mm A');
			return 'Week ' + this.week + ' ' + dayAndTime;
		}
	});

	exports.Session = Session;
})(this);