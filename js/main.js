// this is the main game scene. Here we do most of the games logic while playing.

// create a new scene
let gameScene = new Phaser.Scene('Game');


let scale = 0.5;
let ball_scale = 0.25;
var imageSleepkey;

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
// let loadingBarBackground;
// let loadingBar;
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

  // loadingBarBackground = this.add.graphics();
  // loadingBarBackground.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
  // loadingBarBackground.fillStyle("#000000", 0.2);
  // loadingBarBackground.fillRect(0, 0, loadingBarWidth, loadingBarHeight);
  //
  // loadingBar = this.add.graphics();
  // loadingBar.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
  // loadingBar.fillStyle("#222222", 1);
  // loadingBar.fillRect(0, 0, 0, loadingBarHeight);

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

  this.load.image("sleepButton", "assets/images/sleepButton.png");
  this.load.image("exerciseBall1", "assets/images/darkcircle.png");
  this.load.image("exerciseBall2","assets/images/lightcircle.png");
};

// ass all objects active from the start in the game in create
gameScene.create = function() {
    // for now that is just the background
    this.background = this.add.sprite(0,0,'background');
    this.background.setOrigin(0,0);
    this.background.depth = -10;
    this.background.width = config.width;
    this.background.height = config.height;

    this.healthBar = new HealthBar(this, config.width/2, config.height/2);
    //Work mini games
    this.generateWorkNums();
    this.makeWork();


    //sleep minigame
    imageSleepkey = this.add.image(150, 100, 'sleepButton').setOrigin(0);
    imageSleepkey.setScale(scale);

    // exercise minigame
    exerciseBall1 = this.add.image(700, 100, 'exerciseBall1').setOrigin(0);
    exerciseBall1.setScale(ball_scale);
    exerciseBall2 = this.add.image(800, 100, 'exerciseBall2').setOrigin(0);
    exerciseBall2.setScale(ball_scale);

    //social game
    // this.healthBar = new HealthBar(this, config.width/2, config.height/2);
    //sleep minigame
    this.sleepButton = this.add.sprite(config.width/4, config.height/4, "heart");
    //this.sleepButton.setScale(scale);
    this.setInteractive(this.sleepButton);
    this.socialGame();

    this.heart = this.add.sprite(config.width/2-260, config.height-55, 'heart');
    this.heart.setScale(1.2);

    this.healthBar = new HealthBar(this, config.width/2-250, config.height - 70, 507);
    this.exerciseBar = new MinigameBar(this, config.width-225, config.height - 100, 160);
    this.socialBar = new MinigameBar(this, config.width-225, config.height - 80, 160);
    this.foodBar = new MinigameBar(this, config.width-225, config.height - 60, 160);
    this.sleepBar = new MinigameBar(this, config.width-225, config.height - 40, 160);
    this.workBar = new MinigameBar(this, config.width-225, config.height - 20, 160);

};

gameScene.update = function() {
  this.exerciseBar.decrease(0.02);
  this.socialBar.decrease(0.01);
  this.foodBar.decrease(0.04);
  this.sleepBar.decrease(0.03);
  this.workBar.decrease(0.06);
  if (this.exerciseBar.value < 60 || this.socialBar.value < 60 || this.foodBar.value < 60     ||
      this.sleepBar.value < 60    || this.workBar.value < 60   || this.exerciseBar.value > 160 ||
      this.socialBar.value > 160   || this.foodBar.value > 160   || this.sleepBar.value > 160   ||
      this.workBar.value > 160) {
    this.healthBar.decrease(0.1);
  }
  // if (socialGame.complete) {
  //   this.healthBar.increase(0.5);
  // }
  // if (exerciseGame.complete) {
  //   this.healthBar.increase(0.5);
  // }
  //sleep minigame
  this.sleepButton = this.add.sprite(config.width/4, config.height/4, "heart");
  //this.sleepButton.setScale(scale);
  this.setInteractive(this.sleepButton);
};

  // sleep minigame
  //
  //
  this.input.keyboard.on('keydown_Z', function (event) {
      imageSleepkey.setScale(scale * 1.1);
  });

  this.input.keyboard.on('keyup_Z', function (event) {
      imageSleepkey.setScale(scale);
  });

  // exercise minigame
  //
  //
  this.input.keyboard.on('keydown_OPEN_BRACKET', function (event) {
      exerciseBall1.setScale(ball_scale * 1.1);
  });

  this.input.keyboard.on('keyup_OPEN_BRACKET', function (event) {
      exerciseBall1.setScale(ball_scale);
  });

  this.input.keyboard.on('keydown_CLOSED_BRACKET', function (event) {
      exerciseBall2.setScale(ball_scale * 1.1);
  });

  this.input.keyboard.on('keyup_CLOSED_BRACKET', function (event) {
      exerciseBall2.setScale(ball_scale);
  });



  // food minigame


  //social game
  gameScene.playerText.setText(gameScene.textWord.substring(0, gameScene.combo.index));

};


gameScene.generateWorkNums = function(){
  this.workNums = [Math.floor(Math.random()*10),
  Math.floor(Math.random()*10),
  Math.floor(Math.random()*10)];
};

gameScene.makeWork = function(){
  this.num1 = this.add.text(30, 30, this.workNums[0], { fontSize: '42px', fill: '#000000' });
  this.num2 = this.add.text(60, 30, this.workNums[1], { fontSize: '42px', fill: '#000000' });
  this.num3 = this.add.text(90, 30, this.workNums[2], { fontSize: '42px', fill: '#000000' });
  //this.text = this.add.text(420, 50, 'Work', {fontSize: '42px', fill: '#000000'});
  this.nums = this.add.container(420,100);
  this.nums.add(this.num1);
  this.nums.add(this.num2);
  this.nums.add(this.num3);

};


// gameScene.gameOver = function(){
//     this.state = GAMESTATE.GAMEOVER;
//     this.time.addEvent({
//         delay: 2000,
//         callbackScope: this,
//         callback: function(){
//             this.scene.start('Home');
//         }
//     }, this);
// };

gameScene.socialGame = function() {
    complete = true;
    let textWords = ["hey", "wassup","hello",
                    "want to hang out","how are you",
                    "can we talk","how about dinner",
                    "howdy","thank you","see you soon"];

    let wordNum = Math.floor(Math.random() * textWords.length);
    console.log(textWords[wordNum]);
    gameScene.textWord = textWords[wordNum];
    let wordNumText = this.add.text(500, 450, gameScene.textWord, {fontSize:'20px',color:'#ff0000',fontFamily: 'Arial'});
    wordNumText.depth = 10;
    gameScene.combo = this.input.keyboard.createCombo(gameScene.textWord);
    gameScene.playerText = this.add.text(500, 500, "", {fontSize:'20px',color:'#ff0000',fontFamily: 'Arial'});
    
    this.input.keyboard.on('keycombomatch', function (event) {

        console.log('Key Combo matched!');
        complete = true;
    });
    
    //this.input.keyboard.addKeys();
}
