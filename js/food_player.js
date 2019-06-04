class food_player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, "paddle");
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
        this.setVelocityX(-200);

    }
    else if (this.cursors.right.isDown)
    {
        this.setVelocityX(200);

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
