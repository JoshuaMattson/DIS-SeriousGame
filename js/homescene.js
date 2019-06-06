// the home scene is the start (main) menu of your game.
// for not it only has a background and a "start" button, consisting of a text and
// its rectangle background drawn by a graphics object.
let homeScene = new Phaser.Scene('Home');

// Home does not have a preload, because we already loaded everything in Loading

homeScene.create = function() {

    // log we are now in "Home Scene"
    console.log("Started Scene: Home");

    // store width and height for easy access
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    let background = this.add.sprite(0,0,'background');
    background.setOrigin(0,0);
    background.depth = -10;
    background.width = config.width;
    background.height = config.height;

    // create the text for the start button
    this.add.image(gameWidth/2 - 10, 350, 'head');
    let titleText = this.add.text(gameWidth/2, 450, 'SELF-CARE SIMULATOR', {
        font: '60px Courier New',
        fill: '#000000'
    });
    titleText.setOrigin(0.5, 0.5);
    titleText.depth = 10;
    let startText = this.add.text(gameWidth/2, gameHeight - 150, 'START', {
        font: '40px Courier New',
        fill: '#000000'
    });
    startText.setOrigin(0.5, 0.5);
    startText.depth = 10;
    // make the text interactive and load game scene when clicked
    startText.setInteractive();
    startText.on('pointerdown', function(){
        this.scene.start('Game');
    }, this);
    // create the start buttons background
    let textBg = this.add.graphics();
    textBg.fillStyle("#000000", 0.5);
    textBg.fillRect(
        gameWidth/2 - startText.width/2 - 10,
        gameHeight - 150 - startText.height/2 - 10,
        startText.width + 20,
        startText.height + 20
    );

    // this.healthBar = new HealthBar(this, config.width/2, config.height/2 - 20, 100);
    // this.exerciseBar = new HealthBar(this, config.width/2, config.height/2, 70);
    // this.socialBar = new HealthBar(this, config.width/2, config.height/2 + 20, 70);
    // this.foodBar = new HealthBar(this, config.width/2, config.height/2 + 40, 70);
    // this.sleepBar = new HealthBar(this, config.width/2, config.height/2 + 60, 70);
    // this.workBar = new HealthBar(this, config.width/2, config.height/2 + 80, 70);

};

homeScene.update = function() {

}
