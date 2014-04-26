(function(exports) {

	function Place(x, y, type) {
		this.type = type;
		this.id = '' + x + y;
		this.pos = { x: x, y: y };
	}

	exports.Place = Place;
})(this);