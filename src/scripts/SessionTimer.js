(function(exports) {
	function SessionTimer(time) {
		this.time = time;
		this._events = [];
	}

	SessionTimer.prototype = {
		update: function(timestamp) {
			var until = moment(timestamp),
				next = this.nextEvent();

			while(next && !next.isAfter(until)) {
				var e = this._events.shift();

				if(e.recurring) this._recurEvent(e);
				
				if(_.isFunction(e.callback)) 
					e.callback.call(e.context, next);

				next = this.nextEvent();
			}
		},

		nextEvent: function()  {
			var events = this._events;
			return events.length ? moment.unix(events[0].timestamp) : undefined;_
		},

		add: function(timestamp, callback, context) {
			// don't schedule in the past
			if(this.time.now.isAfter(timestamp)) return false;

			var id = _.uniqueId(),
				data = { id: id };

			this._addEvent(timestamp, data, callback, context);

			return id;
		},

		recurring: function(pattern, callback, context) {
			var timestamp =  this.time.weekday(pattern),
				id = _.uniqueId(),
				data = {
					id: id,
					recurring: true,
					pattern: pattern
				};

			this._addEvent(timestamp, data, callback, context);

			return id;
		},

		cancel: function(id) {
			var events = this._events,
				idx = _.findIndex(events, { id: id });
			
			if(idx > -1) {
				events.splice(idx, 1);
				return true;
			}
			else
				return false;
		},

		_addEvent: function(timestamp, data, callback, context) {
			var events = this._events,
				e = {
					timestamp: moment(timestamp).unix(),
					callback: callback,
					context: context
				},
				idx = _.sortedIndex(events, e, 'timestamp'); 

			_.extend(e, data || {});

			events.splice(idx, 0, e);	
		},

		_recurEvent: function(e) {
			if(!e.recurring) return;
			
			var tmp = moment.unix(e.timestamp),
				data = {
					id: e.id, // re-use ID so that it can be cancelled
					recurring: true,
					pattern: e.pattern
				};
			
			tmp = this.time.weekday(e.pattern, tmp);

			this._addEvent(tmp, data, e.callback, e.context);
		}

		//TODO repeat?
	}

	exports.SessionTimer = SessionTimer;
})(this);