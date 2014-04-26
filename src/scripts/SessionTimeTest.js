(function(exports) {
	function SessionTimeTest() {}

	SessionTimeTest.prototype = {
		preload: function() {
			this.load.bitmapFont('minecraftia', 'assets/font/minecraftia.png', 'assets/font/minecraftia.xml');
		},

		create: function() {
			var session = this.game.session,
				time = session.time;

			var reportTime = function(timestamp) {
				console.log(timestamp.format());
			}

			console.log('expect 2 times');
			time.events.add(time.weekday('Mon 7:00 AM'), reportTime);
			time.events.add(time.weekday('Mon 6:15 AM'), reportTime);
			time.events.update(time.weekday('Mon 7:00 AM'));			

			console.log('expect 3 times')
			time.events.recurring('Tues 12:00 PM', reportTime);
			time.events.update(time.now.add('weeks', 3));	

			console.log('expect 4-30');
			var pattern = '---W--- 1:45 PM',
				next = time.nextScheduled(pattern, time.weekday('Mon 7:00 AM'));
			console.log(next.format());

			console.log('expect 5-7');
			next = time.nextScheduled(pattern, time.weekday('Wed 1:46 PM'));
			console.log(next.format());

			pattern = '-M-W-F- 12:00 PM';
			console.log('expect 4-28');
			console.log(time.nextScheduled(pattern, time.weekday('Sun 12:00 PM')).format());
			console.log('expect 4-30');
			console.log(time.nextScheduled(pattern, time.weekday('Tue 12:00 PM')).format());
			console.log('expect 5-2');
			console.log(time.nextScheduled(pattern, time.weekday('Thu 12:00 PM')).format());
			console.log('expect 5-5');
			console.log(time.nextScheduled(pattern, time.weekday('Sat 12:00 PM')).format());

			console.log('expect nothing');
			time.events.recurring('------- 7:00 pm', reportTime);
			time.events.update(time.now.add('weeks', 1));
			console.log('expect 7 times');
			time.events.recurring('SMTWTFS 5:45 AM', reportTime);
			time.events.update(time.now.add('weeks', 1));

			var timer = this.timer = this.add.bitmapText(10, 0, 'minecraftia', time.text, 16);
		
			var key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			key.onDown.add(function() {
				console.log("pressed space");
				time.addTime(0, 15, function(timestamp) {
					console.log('time is now: ' + timestamp.format());
				});
			});

			this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
		},

		update: function() {
			var session = this.game.session,
				timer = this.timer;

			session.update(); 
			timer.text = session.time.text;
		}
	};

	exports.SessionTimeTest = SessionTimeTest;
})(this);