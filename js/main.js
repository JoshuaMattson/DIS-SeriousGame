// this is the main game scene. Here we do most of the games logic while playing.

// create a new scene
let gameScene = new Phaser.Scene('Game');

let scale = 1;

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
  this.load.image('apple', 'assets/images/food/Apple.png');
  this.load.image('bacon', 'assets/images/food/Bacon.png');
  this.load.image('chicken', 'assets/images/food/Chicken.png');
  this.load.image('cookie', 'assets/images/food/Cookie.png');
  this.load.image('potato', 'assets/images/food/Potato.png');
  this.load.image('steak', 'assets/images/food/Steak.png');
  this.load.image('character', 'assets/images/characterSprite.png');
  this.load.image('health', 'assets/images/healthBar.png');
  this.load.image('heart', 'assets/images/heart.png');
};

// ass all objects active from the start in the game in create
gameScene.create = function() {
    // for now that is just the background
    this.background = this.add.sprite(0,0,'background');
    this.background.setOrigin(0,0);
    this.background.depth = -10;
    this.background.width = config.width;
    this.background.height = config.height;




    //sleep minigame
    this.sleepButton = this.add.sprite(config.width/4, config.height/4, "heart");
    //this.sleepButton.setScale(scale);
    this.setInteractive(this.sleepButton);
};

gameScene.generateWorkNums = function(){
  let num1 = Math.floor(Math.random()*10);
  let num2 = Math.floor(Math.random()*10);
  let num3 = Math.floor(Math.random()*10);
  this.workNums = [num1, num2, num3];
};

gameScene.makeWork = function(){
  this.num1 = this.add.text(0, 0, this.workNums.num1, { fontSize: '24px', fill: '#000000' });
  this.num2 = this.add.text(0, 0, this.workNums.num2, { fontSize: '24px', fill: '#000000' });
  this.num3 = this.add.text(0, 0, this.workNums.num3, { fontSize: '24px', fill: '#000000' });
  this.nums = this.add.conatiner(0,0);
  this.nums.add.existing(num1);
  this.nums.add.existing(num2);
  this.nums.add.existing(num3);

};

//making buttons when clicking
gameScene.setInteractive = function(button){
      button.setInteractive();
      button.on("pointerdown", function(){
      });

      button.on("pointerover", function(){
          //resetItemState(item);
          this.setScale(scale * 1.1);
      });

      button.on("pointerout", function(){
          //resetItemState(item);
          this.setScale(scale);
      });

};

// tween reset
function resetItemState(item){
    if(item.hoverTweenOut){
        item.hoverTweenOut.remove();
    }
    if(item.onClickTween){
        item.onClickTween.remove();
    }
    if(item.hoverTweenIn){
        item.hoverTweenIn.remove();
    }
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
