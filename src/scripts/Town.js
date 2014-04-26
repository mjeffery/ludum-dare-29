(function(exports) {
	function Town(game) {
		this.game = game;
		this.map = this.createMap();
	}

	// frame indices in buildings spritesheet
	Town.Constants = {
		NEIGHBORHOOD: 0,
		PARK: 1,
		STRIP_MALL: 2,
		OFFICES: 3,
		HOSPITAL: 4
	};

	Town.preload = function(load) {
		load.image('building-tiles', 'assets/img/building tiles rough.png');
	}

	Town.prototype = {
		createMap: function() {
			var rnd = this.game.rnd,
				map = [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				],
				assign = _.partial(assignSome, rnd, map);

			assign(Town.Constants.OFFICES, 2, 4);
			assign(Town.Constants.STRIP_MALL, 2, 4);
			assign(Town.Constants.PARK, 1, 2);
			assign(Town.Constants.HOSPITAL, 1, 1);

			return map;
		},

		createTileMap: function() {
			var tilemap = this.game.add.tilemap();

			tilemap.addTilesetImage('building-tiles', undefined, 120, 120);

			var layer = tilemap.create('buildings', 4, 4, 120, 120);
			for(var x = 0; x < 4; x++) {
				for(var y = 0; y < 4; y++) {
					tilemap.putTile(this.map[x][y], x, y);
				}
			}

			return tilemap;
		}
	}

	function assignOpenSpace(rnd, map, val) {
		var i, x, y;
		for(i = 0; i < 100; i++) {
			x = rnd.integerInRange(0,3);
			y = rnd.integerInRange(0,3);
			if(map[x][y] == 0) break;
		}

		map[x][y] = val;
	}

	function assignSome(rnd, map, val, min, max) {
		var n = rnd.integerInRange(min, max),
			fn = _.partial(assignOpenSpace, rnd, map, val);
		_.times(n, fn);
	}

	exports.Town = Town;
})(this);