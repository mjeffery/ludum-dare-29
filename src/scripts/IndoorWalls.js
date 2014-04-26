(function(exports) {
	function IndoorWalls(game, width) {
		this.game = game;

		var map = game.add.tilemap();

		map.addTilesetImage('home-walls', undefined, 16, 64);

		var layer = this.layer = map.create('walls', width + 2 * IndoorWalls.OFFSET, 1, 16, 64);
		layer.smoothed = false;
		layer.scale.setTo(4, 4);
		layer.fixedToCamera = false;

		for(var i = IndoorWalls.OFFSET; i < width + IndoorWalls.OFFSET; i++) 
			map.putTile(IndoorWalls.Constants.EMPTY_WALL, i, 0);

		map.putTile(IndoorWalls.Constants.LEFT_WALL, IndoorWalls.OFFSET, 0);
		map.putTile(IndoorWalls.Constants.RIGHT_WALL, width + IndoorWalls.OFFSET, 0);

		game.world.setBounds(0, 0, (IndoorWalls.OFFSET * 2 + width) * 64, 480)
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
			load.image('home-walls', 'assets/spritesheet/home walls.png');
		}
	});

	exports.IndoorWalls = IndoorWalls;
})(this);