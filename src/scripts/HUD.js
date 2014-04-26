(function(exports) {
	function HUD(game) {
		Phaser.Group.call(this, game, undefined, undefined, true);
		//this.fixedToCamera = true;

		this.addChild( game.make.tileSprite(0, 0, 640, 30, 'black') );
		this.addChild( this.timer = game.make.bitmapText(10, 0, 'minecraftia', '', 16));
		this.addChild( this.money = game.make.bitmapText(290, 0, 'minecraftia', '', 16));
	}

	_.extend(HUD, {
		preload: function(load) {
			load.image('black', 'assets/img/black.png');
		}
	});

	HUD.prototype = Object.create(Phaser.Group.prototype);
	HUD.prototype.constructor = HUD;

	Util.override(HUD.prototype, 'update', function() {
		this.__super.apply(this, arguments);

		var session = this.game.session;
		this.timer.text = session.time.text;
		this.money.text = session.wallet.text;
	});

	exports.HUD = HUD; 
})(this);