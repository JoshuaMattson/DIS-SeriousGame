// this is the main game scene. Here we do most of the games logic while playing.

// create a new scene
let gameScene = new Phaser.Scene('Game');

// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  scene: [bootScene, loadingScene, homeScene, gameScene],
  title: 'DIS final Project',
  pixelArt: false, //Use anti-aliasing
  backgroundColor: '#ffffff' // white background by default
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
let loadingBarBackground;
let loadingBar;
let loadingBarWidth = 150;
let loadingBarHeight = 30;

// a simple set of states that the game can assume.
let GAMESTATE = {
    MENU: 0,
    READY: 1,
    PAUSED: 2,
    GAMEOVER: 3
};

// some parameters for our scene
gameScene.init = function() {
    // log we are now in "Game Scene"
    console.log("Started Scene: Game");
    this.state = GAMESTATE.READY;
};

gameScene.preload = function() {
  let gameWidth = this.sys.game.config.width;
  let gameHeight = this.sys.game.config.height;

  loadingBarBackground = this.add.graphics();
  loadingBarBackground.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
  loadingBarBackground.fillStyle("#000000", 0.2);
  loadingBarBackground.fillRect(0, 0, loadingBarWidth, loadingBarHeight);

  loadingBar = this.add.graphics();
  loadingBar.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
  loadingBar.fillStyle("#222222", 1);
  loadingBar.fillRect(0, 0, 0, loadingBarHeight);

  // to update the loading bar, we will add an eventlistener to the 'progress' event of the load manager from
  // our loading scene. This is fired every time an asset is loaded and has a value of 0-1 (% of assets loaded)
  // this.load.on('progress', function(value){
  //     // clear progress bar
  //     loadingBar.clear();
  //     loadingBar.fillStyle("#222222", 1);
  //     // draw new progress bar, scaled according to value (% of assets loaded)
  //     loadingBar.fillRect(0, 0, value * loadingBarWidth, loadingBarHeight);
  // }, this);

  this.load.image('apple', 'assets/images/food/Apple.png');
  this.load.image('bacon', 'assets/images/food/Bacon.png');
  this.load.image('chicken', 'assets/images/food/Chicken.png');
  this.load.image('cookie', 'assets/images/food/Cookie.png');
  this.load.image('potato', 'assets/images/food/Potato.png');
  this.load.image('steak', 'assets/images/food/Steak.png');
  this.load.image('character', 'assets/images/characterSprite.png');
  this.load.image('health', 'assets/images/healthBar.png');
  this.load.image('heart', 'assets/images/heart.png');
  this.load.image('brain', 'assets/images/brain.png');
  this.load.image('background', 'assets/images/background.png');

}

// ass all objects active from the start in the game in create
gameScene.create = function() {
    // for now that is just the background
    this.background = this.add.sprite(0,0,'background');
    this.background.setOrigin(0,0);
    this.background.depth = -10;
    this.background.width = config.width;
    this.background.height = config.height;

    this.healthBar = new HealthBar(this, config.width/2, config.height/2);
};

gameScene.update = function() {
  // this.load.on('progress', function(value){
  //     // clear progress bar
  //     loadingBar.clear();
  //     loadingBar.fillStyle("#222222", 1);
  //     // draw new progress bar, scaled according to value (% of assets loaded)
  //
  // }, this);
  this.healthBar.decrease(0.1);
}

gameScene.gameOver = function(){
    this.state = GAMESTATE.GAMEOVER;
    this.time.addEvent({
        delay: 2000,
        callbackScope: this,
        callback: function(){
            this.scene.start('Home');
        }
    }, this);
};
