(function(exports) {
	function Game() {}

	Game.prototype = {
		create: function() {
			var add = this.add,
				town = this.town = new Town(this.game),
				townMap = this.townMap = town.createTileMap(); 

		}
	}

	this.Game = Game;
})(this);