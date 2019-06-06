// the loading scene file. Here we declare and set up the loading scene. In the loading scene
// all assets, images, sounds and other, should be loaded.

let loadingScene = new Phaser.Scene('Loading');

// load asset files for our game
loadingScene.preload = function() {

    // log we are now in "Loading Scene"
    console.log("Started Scene: Loading");

    // store width and height for easy access
    let gameWidth = this.sys.game.config.width;
    let gameHeight = this.sys.game.config.height;

    // add logo on loading screen, could be any image of the game or removed if you want
    // we are adding things to the scene in preload, usually that has to happen in create
    // but because the scene will transition immediately to "home" when done loading, we only get to create
    // at the very end of its live time.
    this.add.sprite(gameWidth/2, gameHeight/2, 'logo');

    // set up loading bar using Phaser3 graphics (easy way to draw simple shapes)
    let loadingBarWidth = 150;
    let loadingBarHeight = 30;

    let loadingBarBackground = this.add.graphics();
    loadingBarBackground.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
    loadingBarBackground.fillStyle("#ffffff", 0.2);
    loadingBarBackground.fillRect(0, 0, loadingBarWidth, loadingBarHeight);

    let loadText = this.add.text(gameWidth/2, 230, 'Loading...', { 
        font: '35px Courier New', 
        fill: '#000000' 
    }); 
    loadText.setOrigin(0.5, 0.5); 
    loadText.depth = 10; 
 
    let quoteText1 = this.add.text(gameWidth/2, 750, '\"Be kind, for everyone you meet is fighting', { 
        font: '30px Courier New', 
        fill: '#000000' 
    }); 
    quoteText1.setOrigin(0.5, 0.5); 
    quoteText1.depth = 10; 
 
    let quoteText2 = this.add.text(gameWidth/2, 800, 'a battle you know nothing about.\"', { 
        font: '30px Courier New', 
        fill: '#000000' 
    }); 
    quoteText2.setOrigin(0.5, 0.5); 
    quoteText2.depth = 10; 

    let loadingBar = this.add.graphics();
    loadingBar.setPosition(gameWidth/2 - loadingBarWidth/2, gameHeight/2 + 100);
    loadingBar.fillStyle("#000000", 1);
    loadingBar.fillRect(0, 0, 0, loadingBarHeight);

    // to update the loading bar, we will add an eventlistener to the 'progress' event of the load manager from
    // our loading scene. This is fired every time an asset is loaded and has a value of 0-1 (% of assets loaded)
    this.load.on('progress', function(value){
        // clear progress bar
        loadingBar.clear();
        loadingBar.fillStyle("#000000", 1);
        // draw new progress bar, scaled according to value (% of assets loaded)
        loadingBar.fillRect(0, 0, value * loadingBarWidth, loadingBarHeight);
    }, this);

    // LOAD ALL ASSETS HERE
    // currently that's of course only the background
    this.load.image('background', 'assets/images/background.png');
    this.load.image('head', 'assets/images/brain.jpeg');
    for (let i = 0; i < 1000; i++) { 
        this.load.image('head' + i, 'assets/images/brain.jpeg'); 
    } 

};

loadingScene.create = function() {
    this.scene.start('Home');
};
