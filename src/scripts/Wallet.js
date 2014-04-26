(function(exports) {
	function Wallet(game) {
		this.game = game;
		this._displayAmount = 0;
		this._amount = 0;
	
		this._pendingChanges = [];
	}

	_.extend(Wallet.prototype, {
		add: function(amount) {
			var pending = this._pendingChanges,
				actual = this._amount;

			if(amount === 0) return true; // is true right?
			if(actual + amount < 0) return false;
			
			pending.push(amount);

			return true;
		},

		subtract: function(amount) {
			return this.add(-amount);
		},

		update: function() {
			var display = this._displayAmount,
				actual = this._amount,
				pending = this._pendingChanges;

			if(display == actual) {
				if(pending.length) {
					var next = pending.shift();
					actual = this._amount = Math.max(actual + next, 0);

					this.game.add.tween(this).to( { _displayAmount: actual }) //TODO calc a rate
						.start(); 
				}
			}
		}
	});

	Object.defineProperty(Wallet.prototype, 'text', {
		get: function() {
			return '$' + Math.floor(this._displayAmount);
		}
	});

	exports.Wallet = Wallet;
})(this);