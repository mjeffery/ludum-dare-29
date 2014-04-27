(function(exports) {
	function IndoorWalls(game, width) {
		this.game = game;

		var map = game.add.tilemap();

	//TODO does not support scaling for collision!, use prescaled graphics!
		map.addTilesetImage('home-walls-scaled', undefined, 64, 256);

		var layer = this.layer = map.create('walls', width + 2 * IndoorWalls.OFFSET, 1, 64, 256);

		for(var i = IndoorWalls.OFFSET; i < width + IndoorWalls.OFFSET; i++) 
			map.putTile(IndoorWalls.Constants.EMPTY_WALL, i, 0);

		map.putTile(IndoorWalls.Constants.LEFT_WALL, IndoorWalls.OFFSET, 0);
		map.putTile(IndoorWalls.Constants.RIGHT_WALL, width + IndoorWalls.OFFSET, 0);

		game.world.setBounds(0, 0, (IndoorWalls.OFFSET * 2 + width) * 64, 480);

		map.setCollision([0,3], true, layer);
	}

	_.extend(IndoorWalls, {
		Constants: {
			LEFT_WALL: 0,
			EMPTY_WALL: 1,
			WINDOW: 2,
			RIGHT_WALL: 3
		},
		OFFSET: 2,
		preload: function(load) {
			load.image('home-walls-scaled', 'assets/spritesheet/home walls scaled.png');
		}
	});

	exports.IndoorWalls = IndoorWalls;
})(this);