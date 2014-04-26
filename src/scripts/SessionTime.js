(function(exports) {
	function SessionTime() {
		this._startedAt = moment('2014-04-28 6:00 AM', 'YYYY-MM-DD h:mm A');
		this._now = moment(this._startedAt);
		this._displayNow = moment(this._now);

		this.events = new SessionTimer(this);
	}

	var sessionRegex = /^\s*([-a-z]{7})\s+(\d?\d:\d{2}\s+(?:am|pm))\s*$/i,
		daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

	SessionTime.prototype = {
		weekday: function(pattern, from) {
			var tmp = moment(pattern, 'ddd h:mm A');
				day = tmp.day(),
				hour = tmp.hour(),
				min = tmp.minute(),
				next = from === undefined ? this.now : moment(from);

			// make sure its the NEXT instance of this time
			if( 
				next.day() == day &&
			   (next.hour() > hour || 
			   (next.hour() == hour && next.minute() >= min))
			  )
			{
				day += 7;
			}

			next.day(day);
			next.hour(hour);
			next.minute(min);

			return next;
		},

		nextScheduled: function(pattern, from) {
			var now = from === undefined ? this.now : moment(from),
				start = now.clone().startOf('week'),
				results = pattern.match(sessionRegex),
				times, idx;

			if(results) {
				// get the weekday times
				times = _(daysOfTheWeek)
					.reject(function(day, idx) {
						return results[1][idx] == '-';
					})
					.map(function(day) {
						return this.weekday(day + ' ' + results[2] , start)
					}, this)
					.valueOf();

				// early out if there are no times
				if(_.isEmpty(times)) return undefined;

				// find the sorted insertion index
				idx = _(times)
					.sortBy(this._sortBy)
					.sortedIndex(now, this._sortBy);

				// we're after the last time already, wrap around to next week
				if(idx >= times.length) {
					times[0].add('week', 1);
					return times[0];
				}
				else
					return times[idx];
			}

			return undefined;
		},

		_sortBy: function(time) {
			return time.unix();
		}
	};

	Object.defineProperty(SessionTime.prototype, 'now', {
		get: function() { 
			return moment(this._now);
		}
	});

	Object.defineProperty(SessionTime.prototype, 'week', {
		get: function() {
			var start = this._startedAt.get('isoweek'),
				now = this._now.get('isoweek');
			return now - start + 1;
		}
	});

	Object.defineProperty(SessionTime.prototype, 'text', {
		get: function() {
			var dayAndTime = this._displayNow.format('ddd h:mm A');
			return 'Week ' + this.week + ' ' + dayAndTime;
		}
	});

	exports.SessionTime = SessionTime;
})(this);