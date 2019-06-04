class Food_Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, "food_player");
      this.setScale(0.1);

      scene.add.existing(this);
      scene.physics.add.existing(this);

      this.setCollideWorldBounds(true);

      this.cursors = scene.input.keyboard.createCursorKeys();
      this.body.allowGravity = false;
      this.setImmovable();
  }

  update(time,delta){

    if (this.cursors.left.isDown)
    {
        this.setVelocityX(-300);

    }
    else if (this.cursors.right.isDown)
    {
        this.setVelocityX(300);

    }
    else
    {
        this.setVelocityX(0);

        //this.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.body.touching.down)
    {
        this.setVelocityY(-330);
    }
  }
}
