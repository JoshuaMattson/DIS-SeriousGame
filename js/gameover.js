let gameoverScene = new Phaser.Scene('GameOver');

gameoverScene.create = function() {
  console.log("Started Scene: GameOver");

  let gameWidth = this.sys.game.config.width;
  let gameHeight = this.sys.game.config.height;

  let background = this.add.sprite(0,0,'background');
  background.setOrigin(0,0);
  background.depth = -10;
  background.width = config.width;
  background.height = config.height;

  let message = this.add.text(gameWidth/2, gameHeight/2, '(Insert inspirational quote here)', {
      font: '40px Courier New',
      color: '0x000000'
  });
  message.setOrigin(0.5, 0.5);
  message.depth = 10;

  let message2 = this.add.text(gameWidth/2, gameHeight/3, 'Please refresh page to restart', {
      font: '40px Courier New',
      color: '0x000000'
  });
  message2.setOrigin(0.5, 0.5);
  message2.depth = 10;


  // let playAgain = this.add.text(gameWidth/2, gameHeight - 150, 'RESTART', {
  //     font: '40px Arial',
  //     fill: '#000000'
  // });
  // playAgain.setOrigin(0.5, 0.5);
  // playAgain.depth = 10;
  // // make the text interactive and load game scene when clicked
  // playAgain.setInteractive();
  // playAgain.on('pointerdown', function(){
  //     this.scene.start('Game');
  // }, this);
  //
  // // create the start buttons background
  // let textBg = this.add.graphics();
  // textBg.fillStyle("#000000", 0.5);
  // textBg.fillRect(
  //     gameWidth/2 - playAgain.width/2 - 10,
  //     gameHeight - 150 - playAgain.height/2 - 10,
  //     playAgain.width + 20,
  //     playAgain.height + 20
  // );

}
