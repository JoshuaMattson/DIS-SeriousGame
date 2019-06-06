class HealthBar {

    constructor (scene, x, y, value) {
        this.bar = new Phaser.GameObjects.Graphics(scene);

        this.x = x;
        this.y = y;
        this.value = value;
        this.p = 196/200;
        this.color = 0xffffff;

        this.draw();

        scene.add.existing(this.bar);
    }

    // constructor

    decrease (amount) {
        this.value -= amount;
        if (this.value < 0) {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    }

    increase (amount) {
        this.value += amount;
        if (this.value > 160) {
          this.value = 160;
        }
        this.draw();
        return (this.value === 160);
    }

    draw ()
    {
        this.bar.clear();

        //  BG
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 600, 70);

        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x+2, this.y+2, 596, 66);

        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);
        }
        else {
            this.bar.fillStyle(0x00ff00);
        }

        var d = Math.floor(this.p * this.value);

        this.bar.fillRect(this.x + 2, this.y + 2, d, 66);
    }

}
