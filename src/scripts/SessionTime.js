(function(exports) {
	function SessionTime(game) {
		this.game = game;

		this._startedAt = moment('2014-04-28 6:00 AM', 'YYYY-MM-DD h:mm A');
		this._now = moment(this._startedAt);
		this._displayNow = moment(this._now);

		this.events = new SessionTimer(this);

		this._pendingAdds = [];
		this._interpolator = {};
	}

	var sessionRegex = /^\s*([-a-z]{7})\s+(\d?\d:\d{2}\s+(?:am|pm))\s*$/i,
		daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	SessionTime.prototype = {

		// arg is the elapsed game time
		update: function() {
			var display = this._displayNow,
				now = this._now,
				pending = this._pendingAdds,
				interp = this._interpolator;

			// check if we have a pending action to execute (display != now)
			if(now.isSame(display)) {
				if(pending.length) {
					var next = pending.shift(),
						hours = Math.max(next.hours || 0, 0),
						mins = Math.max(next.mins || 0, 0);

					if(hours == 0 && mins == 0) return; // bail on no increase (arrow of time, baby)

					// we'll interpolate a surrogate object
					now.add('hours', hours).add('minutes', mins);

					interp.time = display.unix();

					// clone now since we use it in the callback
					var tweenTime = now.clone(),
						tween = game.add.tween(interp).to({ time: tweenTime.unix() } ); //TODO calc a rate!

					// when tween is complete...
					tween.onComplete.addOnce(function() {
						this.events.update(tweenTime); // run pending events
						this.events.onElapsedTime.dispatch(hours, mins, hours * 60 + mins); // trigger signal
						if(_.isFunction(next.callback)) // callback...
							next.callback.call(next.context, tweenTime.clone());
					}, this);

					tween.start();
				}
			}
			// update display time with the interpolated time
			else {
				this._displayNow = moment.unix(interp.time); 
			}
		},

		addTime: function(hours, minutes, callback, context) {
			this._pendingAdds.push({
				hours: hours,
				mins: minutes,
				callback: callback,
				context: context
			});
		},

		weekday: function(pattern, from) {
			var tmp = moment(pattern, 'ddd h:mm A', true);
			if(!tmp.isValid()) return undefined;

			var day = tmp.day(),
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
				// we're not the same as the index
				else if(now.isBefore(times[idx])) {
					return times[idx];
				}
				//we are, so try next index
				else {
					idx++;
					// but be careful of wrap around again
					if(idx >= times.length) {
						times[0].add('week', 1);
						return times[0];
					}
					else
						return times[idx];
				}
			}

			return undefined;
		},

		pattern: function(pattern, from) {
			var result = this.nextScheduled(pattern, from);
			if(result === undefined)
				result = this.weekday(pattern, from);

			return result;
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