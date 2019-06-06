class FoodDrop extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,timeAlive,velocity) {
        let food_circle = super(scene, Phaser.Math.Between(0, 400), 380, "food_circle");
        scene.add.existing(food_circle);
        scene.physics.add.existing(food_circle);

        this.setCollideWorldBounds(false);

        this.body.allowGravity = false;
        this.setImmovable();

        this.setVelocity(1,velocity);

        //food time alive
        this.foodTimeAlive = scene.time.addEvent({ delay: timeAlive, callback: function(){this.destroy();}, callbackScope: this, loop: false });

    }


}
