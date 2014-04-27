(function(exports) {
	function Actor(game, x, y) {
		Phaser.Sprite.call(this, game, x, y, 'person');
		this.anchor.setTo(0.5, 1);
		this.scale.setTo(8, 8);
		this.smoothed = false;
		
		this.animations.add('stand', [0]);
		this.animations.add('walk-right', [1,2,3,2], Actor.WALK_RATE, true);
		this.animations.add('walk-left', [6,5,4,5], Actor.WALK_RATE, true);
		this.animations.play('stand');

		this.state = 'standing';

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.setSize(4, 16, 2, 0);

		this.events.onArrived = new Phaser.Signal();
	}

	Actor.preload = function(load) {
		load.spritesheet('person', 'assets/spritesheet/person.png', 8, 16, 7);
	}

	_.extend(Actor, {
		WALK_RATE: 3,
		SPEED: 100,
		CLOSE_ENOUGH: 8
	});

	Actor.prototype = Object.create(Phaser.Sprite.prototype);
	Actor.prototype.constructor = Actor;

	_.extend(Actor.prototype, {
		think: function() {
			switch(this.state) {
				case 'walking':
					var x = this.x,
						dest = this.destination;
					if(dest === undefined ||
					   Math.abs(x - dest) < Actor.CLOSE_ENOUGH) 
					{
						this.stand();
						if(dest !== undefined) {
							this.events.onArrived.dispatch();
							this.destination = undefined;
						}
					}
					else if(x < dest) {
						this.walk(Phaser.RIGHT);
					}
					else if(x > dest) {
						this.walk(Phaser.LEFT);
					}
				break;
			}
		},

		stand: function() {
			this.body.velocity.x = 0;
			this.animations.play('stand');
			this.state = 'standing';
		},

		walk: function(dir) {
			switch(dir) {
				case Phaser.LEFT: 
					this.body.velocity.x = -Actor.SPEED;
					this.animations.play('walk-left');
					this.state = 'walking';
				break;

				case Phaser.RIGHT:
					this.body.velocity.x = Actor.SPEED;
					this.animations.play('walk-right');
					this.state = 'walking';
				break;

				default: this.stand();
			}
		},

		goto: function(x) {
			this.destination = x;
			this.state = 'walking';
		}
	});

	exports.Actor = Actor;
})(this);