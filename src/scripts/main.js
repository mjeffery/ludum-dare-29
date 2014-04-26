var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game-container');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Scene);

game.state.start('boot');