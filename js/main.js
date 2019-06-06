// this is the main game scene. Here we do most of the games logic while playing.

// create a new scene
let gameScene = new Phaser.Scene('Game');


let scale = 0.5;
var imageSleepkey;

let numsExist = false;
gameScene.velocity = 100;



// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 1000,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 2000 },
          debug: false
      }
  },
  scene: [bootScene, loadingScene, homeScene, gameScene, gameoverScene],
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
let tracker = 0;
gameScene.velocity = 100;

let keyData = {
  z: false,
  l: false,
  r: false
}


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

  this.load.image("food_player","assets/images/food_player.png");
  this.load.image('apple', 'assets/images/food/Apple.png');
  this.load.image('bacon', 'assets/images/food/Bacon.png');
  this.load.image('chicken', 'assets/images/food/Chicken.png');
  this.load.image('cookie', 'assets/images/food/Cookie.png');
  this.load.image('potato', 'assets/images/food/Potato.png');
  this.load.image('steak', 'assets/images/food/Steak.png');

  this.load.image('exercise', 'assets/images/dumbbell.png');
  this.load.image('social', 'assets/images/social.png');
  this.load.image('work', 'assets/images/work.png');
  this.load.image('sleep', 'assets/images/sleep.png');
  this.load.image('workCalc', 'assets/images/calculator.jpg');

  this.load.image('character', 'assets/images/characterSprite.png');
  this.load.image('health', 'assets/images/healthBar.png');
  this.load.image('heart', 'assets/images/heart.png');
  this.load.image('brain', 'assets/images/brain.png');
  this.load.image('background', 'assets/images/background.png');

  this.load.image("food_circle", "assets/images/food_circle.png");

  this.load.image("sleepButton", "assets/images/sleepButton.png");
  this.load.image("exerciseBall1", "assets/images/running1.jpg");
  this.load.image("exerciseBall2","assets/images/running2.jpg");
  this.load.image("texting","assets/images/texting.png");
};

// ass all objects active from the start in the game in create
gameScene.create = function() {
    // for now that is just the background
    this.background = this.add.sprite(0,0,'background');
    this.background.setOrigin(0,0);
    this.background.depth = -10;
    this.background.width = config.width;
    this.background.height = config.height;


    //this.healthBar = new HealthBar(this, config.width/2, config.height/2);
    //Work mini games
    this.calc = this.add.sprite(config.width/2, config.height/4-20, 'workCalc');
    this.calc.setScale(0.7);
    this.generateWorkNums();
    this.makeWork();

    // food minigame
    this.foodPlayer = new Food_Player(this, 100, 650);
    //food drop time
    foodTimer.call(this);
    this.foodTimedEvent = this.time.addEvent({ delay: 4000, callback: foodTimer, callbackScope: this, loop: true });

    this.velocityTimer = this.time.addEvent({ delay: 1000, callback: function(){gameScene.velocity++;}, callbackScope: this, loop: true });

    //sleep minigame
    imageSleepkey = this.add.image(110, 120, 'sleepButton').setOrigin(0);
    imageSleepkey.setScale(scale);
    this.input.keyboard.on('keydown_Z', function (event) {
        gameScene.sleepBar.increase(0.7);
        if(keyData.z){
          return;
        }

        if(imageSleepkey.onClickTweenUp){
          imageSleepkey.onClickTweenUp.stop();
        }


        imageSleepkey.onClickTweenDown = gameScene.tweens.add({
            targets: imageSleepkey,
            scaleX: scale * 1.4,
            scaleY: scale * 1.4,
            duration: 200,
            yoyo: false,
            ease: 'Linear.easeIn',
            onStart: function(){
                imageSleepkey.setScale(scale * 1.1, scale * 1.1);
            }
        });
        keyData.z = true;
    });

    this.input.keyboard.on('keyup_Z', function (event) {
      imageSleepkey.onClickTweenDown.stop();

      imageSleepkey.onClickTweenUp = gameScene.tweens.add({
          targets: imageSleepkey,
          scaleX: scale,
          scaleY: scale,
          duration: 200,
          yoyo: false,
          ease: 'Linear.easeIn'
      });
      keyData.z = false;
    });


    // exercise minigame
    exerciseBall1 = this.add.image(680, 120, 'exerciseBall1').setOrigin(0);
    exerciseBall1.setScale(1);
    exerciseBall2 = this.add.image(810, 120, 'exerciseBall2').setOrigin(0);
    exerciseBall2.setScale(1);
    this.input.keyboard.on('keydown_OPEN_BRACKET', function (event) {


        if (tracker === 0) {
          tracker = 1;
        }
        else if (tracker === 1) {
          tracker = 0;
        }

        if(keyData.l){
          return;
        }
        if(exerciseBall1.onClickTweenUpBallOne){
          exerciseBall1.onClickTweenUpBallOne.stop();
        }


        exerciseBall1.onClickTweenDownBallOne = gameScene.tweens.add({
            targets: exerciseBall1,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 200,
            yoyo: false,
            ease: 'Linear.easeIn',
            onStart: function(){
                exerciseBall1.setScale(1.1,1.1);
            }
        });
        keyData.l = true;
    });

    this.input.keyboard.on('keyup_OPEN_BRACKET', function (event) {
      exerciseBall1.onClickTweenDownBallOne.stop();

      exerciseBall1.onClickTweenUpBallOne = gameScene.tweens.add({
          targets: exerciseBall1,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          yoyo: false,
          ease: 'Linear.easeIn'
      });
      keyData.l = false;
    });





    this.input.keyboard.on('keydown_CLOSED_BRACKET', function (event) {
        exerciseBall2.setScale(1.1);
        if (tracker === 1) {
          tracker = 2;
        }
        if(keyData.r){
          return;
        }

        if(exerciseBall2.onClickTweenUpBallTwo){
          exerciseBall2.onClickTweenUpBallTwo.stop();
        }


        exerciseBall2.onClickTweenDownBallTwo = gameScene.tweens.add({
            targets: exerciseBall2,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 200,
            yoyo: false,
            ease: 'Linear.easeIn',
            onStart: function(){
                exerciseBall2.setScale(1.1,1.1);
            }
        });
        keyData.r = true;

    });

      this.input.keyboard.on('keyup_CLOSED_BRACKET', function (event) {
        exerciseBall2.onClickTweenDownBallTwo.stop();

        exerciseBall2.onClickTweenUpBallTwo = gameScene.tweens.add({
            targets: exerciseBall2,
            scaleX: 1,
            scaleY: 1,
            duration: 200,
            yoyo: false,
            ease: 'Linear.easeIn'
        });
        keyData.r = false;
    });


    //social game
    let texting = this.add.image(730, 640, 'texting'); //550, 450
    texting.setScale(1.3,1);
    this.firstPhrase = true;
    this.prevPhrase = 0;
    this.socialGame();


    //health bars
    this.heart = this.add.sprite(55, config.height-115, 'heart');
    this.heart.setScale(2);
    this.food = this.add.sprite(config.width-250, config.height-115, 'apple');
    this.food.setScale(1.5);
    this.exercise = this.add.sprite(config.width-250, config.height-190, 'exercise');
    this.exercise.setScale(0.23);
    this.social = this.add.sprite(config.width-250, config.height-155, 'social');
    this.social.setScale(0.2);
    this.sleep = this.add.sprite(config.width-250, config.height-70, 'sleep');
    this.sleep.setScale(0.1);
    this.work = this.add.sprite(config.width-250, config.height-30, 'work');
    this.work.setScale(0.1);
    this.healthBar = new HealthBar(this, 80, config.height - 150, 608);
    this.exerciseBar = new MinigameBar(this, config.width-225, config.height - 210,
                                      Math.random() * (150 - 130) + 130);
    this.socialBar = new MinigameBar(this, config.width-225, config.height - 170,
                                    Math.random() * (150 - 130) + 130);
    this.foodBar = new MinigameBar(this, config.width-225, config.height - 130,
                                    Math.random() * (150 - 130) + 130);
    this.sleepBar = new MinigameBar(this, config.width-225, config.height - 90,
                                    Math.random() * (150 - 130) + 130);
    this.workBar = new MinigameBar(this, config.width-225, config.height - 50,
                                    Math.random() * (150 - 130) + 130);

    //tick marks on health bars; 1-5 are high end, 6-10 are low end
    let graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x000000 } });
    let line = new Phaser.Geom.Line(config.width-65, config.height-210, config.width-65, config.height-195);
    let line2 = new Phaser.Geom.Line(config.width-65, config.height-170, config.width-65, config.height-155);
    let line3 = new Phaser.Geom.Line(config.width-65, config.height-130, config.width-65, config.height-115);
    let line4 = new Phaser.Geom.Line(config.width-65, config.height-90, config.width-65, config.height-75);
    let line5 = new Phaser.Geom.Line(config.width-65, config.height-50, config.width-65, config.height-35);
    let line6 = new Phaser.Geom.Line(config.width-165, config.height-210, config.width-165, config.height-195);
    let line7 = new Phaser.Geom.Line(config.width-165, config.height-170, config.width-165, config.height-155);
    let line8 = new Phaser.Geom.Line(config.width-165, config.height-130, config.width-165, config.height-115);
    let line9 = new Phaser.Geom.Line(config.width-165, config.height-90, config.width-165, config.height-75);
    let line10 = new Phaser.Geom.Line(config.width-165, config.height-50, config.width-165, config.height-35);
    graphics.strokeLineShape(line);
    graphics.strokeLineShape(line2);
    graphics.strokeLineShape(line3);
    graphics.strokeLineShape(line4);
    graphics.strokeLineShape(line5);
    graphics.strokeLineShape(line6);
    graphics.strokeLineShape(line7);
    graphics.strokeLineShape(line8);
    graphics.strokeLineShape(line9);
    graphics.strokeLineShape(line10);

    this.randomEvent = new RandomEvent();
    this.timedEvent = this.time.addEvent({ delay: 5000, callback: onTimer, callbackScope: this, loop: true });
    this.eventText = this.add.text(50, 715, "", {fontSize:'20px',color:'#ff0000',fontFamily: 'Courier New'});
};

gameScene.update = function() {
  this.exerciseBar.decrease(0.04);
  this.socialBar.decrease(0.04);
  this.foodBar.decrease(0.04);
  this.sleepBar.decrease(0.04);
  this.workBar.decrease(0.04);
  if (this.exerciseBar.value < 60 || this.socialBar.value < 60 || this.foodBar.value < 60     ||
      this.sleepBar.value < 60    || this.workBar.value < 60   || this.exerciseBar.value > 160 ||
      this.socialBar.value > 160   || this.foodBar.value > 160   || this.sleepBar.value > 160   ||
      this.workBar.value > 160) {
    this.healthBar.decrease(0.1);
  }

  // food minigame
  this.foodPlayer.update();

  // sleep minigame
  //
  //

  // exercise minigame
  //
  //
  if (tracker === 2) {
    this.exerciseBar.increase(3.5);
    tracker = 0;
  }


  //workmini game

  //social game
  gameScene.playerText.setText(gameScene.textWord.substring(0, gameScene.combo.index));
  if (gameScene.newWord === true) {
    gameScene.playerText.setText("");
    gameScene.socialBar.increase(15);
    gameScene.socialGame();
  }

  if (this.healthBar.value === 0) {
    this.scene.start('GameOver');
  }
};

function numtoWord(num){
  if (num===0){
    return 'ZERO';
  }
  if (num===1){
    return 'ONE';
  }
  if (num===2){
    return 'TWO';
  }
  if (num===3){
    return 'THREE';
  }
  if (num===4){
    return 'FOUR';
  }
  if (num===5){
    return 'FIVE';
  }
  if (num===6){
    return 'SIX';
  }
  if (num===7){
    return 'SEVEN';
  }
  if (num===8){
    return 'EIGHT';
  }
  if (num===9){
    return 'NINE';
  }
}


gameScene.generateWorkNums = function(){
  this.workNums = [Math.floor(Math.random()*10),
  Math.floor(Math.random()*10),
  Math.floor(Math.random()*10)];
};

gameScene.makeWork = function(){
  if (!numsExist){
  this.num0 = this.add.text(450, 140, this.workNums[0], { fontSize: '50px', fill: '#000000' });
  this.num1 = this.add.text(480, 140, this.workNums[1], { fontSize: '50px', fill: '#000000' });
  this.num2 = this.add.text(510, 140, this.workNums[2], { fontSize: '50px', fill: '#000000' });
  workListeners();
  numsExist=true;
} else {
  gameScene.num0.setText(gameScene.workNums[0]);
  gameScene.num0.setFill('#000000');
  gameScene.num0.setFontSize('50px');

  gameScene.num1.setText(gameScene.workNums[1]);
  gameScene.num1.setFill('#000000');
  gameScene.num1.setFontSize('50px');

  gameScene.num2.setText(gameScene.workNums[2]);
  gameScene.num2.setFill('#000000');
  gameScene.num2.setFontSize('50px');

  workListeners();
}

};

function workListeners() {
  gameScene.input.keyboard.once('keydown_'+numtoWord(gameScene.workNums[0]), function(event) {
    gameScene.num0.setFill('#30e83c');
    gameScene.num0.setFontSize('40px');
    gameScene.input.keyboard.once('keydown_'+numtoWord(gameScene.workNums[1]), function(event) {
      gameScene.num1.setFill('#30e83c');
      gameScene.num1.setFontSize('40px');
      gameScene.input.keyboard.once('keydown_'+numtoWord(gameScene.workNums[2]), function(event) {
        gameScene.num2.setFill('#30e83c');
        gameScene.num2.setFontSize('40px');
        gameScene.workBar.increase(15);
        gameScene.generateWorkNums();
        gameScene.makeWork();
      });
    });
  });
}



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
 gameScene.newWord = false;
 let wordnum = 0;
 let textWords = ["hey", "wassup","hello",
                   "want to hang out","how are you",
                   "can we talk","how about dinner",
                   "howdy","thank you","see you soon",
                   "coffee at eight", "i wanna party",
                   "are you free","i appreciate it",
                   "is everything all right","heyyo",
                   "bruh","lmao","xoxo","i love you",
                   "talk to you later","yeet","wow"];
 if(this.firstPhrase == true) {
   wordNum = Math.floor(Math.random() * textWords.length);
   this.prevPhrase = wordNum;
 } else {
   while(wordNum === this.prevPhrase) {
     wordNum = Math.floor(Math.random() * textWords.length);
   }
 }
 this.firstPhrase = false;
 this.prevPhrase = wordNum;

 console.log(textWords[wordNum]);
 gameScene.textWord = textWords[wordNum];
 let wordNumText = this.add.text(550, 540, gameScene.textWord, {fontSize:'30px',color:'#0000ff',fontFamily: 'Courier New'});
 wordNumText.depth = 10;
 gameScene.combo = this.input.keyboard.createCombo(gameScene.textWord);
 gameScene.playerText = this.add.text(550, 610, "", {fontSize:'30px',color:'#ffffff',fontFamily: 'Courier New'});

 this.input.keyboard.on('keycombomatch', function (event) {

   console.log('Key Combo matched!');
   gameScene.playerText.setText("");
   wordNumText.setText("");
   gameScene.newWord = true;
 });
}

function onTimer() {
 gameScene.eventText.setText("");
 gameScene.randomEvent.generate();
 gameScene.eventText.setText(gameScene.randomEvent.text);
 if(gameScene.randomEvent.stat === "Work") {
   gameScene.workBar.decrease(gameScene.randomEvent.magnitude);
 } else if (gameScene.randomEvent.stat === "Sleep") {
   gameScene.sleepBar.decrease(gameScene.randomEvent.magnitude);
 } else if (gameScene.randomEvent.stat === "Social") {
   gameScene.socialBar.decrease(gameScene.randomEvent.magnitude);
 } else if (gameScene.randomEvent.stat === "Food") {
   gameScene.foodBar.decrease(gameScene.randomEvent.magnitude);
 } else { //Exercise
   gameScene.exerciseBar.decrease(gameScene.randomEvent.magnitude);
 }
}

function foodTimer() {
  let foodDrop = new FoodDrop(gameScene,10000,gameScene.velocity);
  foodDrop.depth = -1;
  this.physics.add.overlap(this.foodPlayer,foodDrop, collectNutrition, null, this);
}

function collectNutrition(player,food){
   this.foodBar.increase(17);
   food.destroy();
}
