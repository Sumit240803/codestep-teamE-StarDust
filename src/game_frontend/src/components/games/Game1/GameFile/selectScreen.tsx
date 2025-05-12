export class SelectScreen extends Phaser.Scene {
  ship = "";
  selectedFrame!: Phaser.GameObjects.Graphics;
    
  constructor() {
    super("SelectScreen");
  }

  preload() {
    this.load.spritesheet('Ship1', 'assets/images/game1/Ship1.png', {
      frameWidth: 384,
      frameHeight: 384
    });
    this.load.spritesheet('Ship2', 'assets/images/game1/Ship2.png', {
      frameWidth: 384,
      frameHeight: 384
    });
    this.load.spritesheet('Ship3', 'assets/images/game1/Ship3.png', {
      frameWidth: 384,
      frameHeight: 384
    });
  //  this.load.image("ship3", "assets/images/game1/Ship3.png");
  this.load.spritesheet('Ship4', 'assets/images/game1/Ship4.png', {
      frameWidth: 384,
      frameHeight: 384
    });
   // this.load.image("ship4", "assets/images/game1/Ship4.png");
    this.load.image("bg", "assets/images/game1/Blue_Nebula_02-1024x1024.png"); // Optional background
  }

  create() {
    const scaleMap: Record<string, number> = {
  Ship1: 0.9,
  Ship2: 0.9,
  Ship3: 0.3, // smaller scale to match others
  Ship4: 0.9
};
const yOffsetMap: Record<string, number> = {
  Ship1: 0,
  Ship2: -15,
  Ship3: -40, // Move it up slightly
  Ship4: -10, // Move it down if needed
};

    // Optional background
    this.add.image(0, 0, "bg").setOrigin(0).setDisplaySize(1024, 500);
    const sizeMap : Record<string,Array<number>>={
  Ship1 : [60, 70],
  Ship2 : [260, 90],
  Ship3 : [260, 90],
  Ship4 : [260, 90],
}
    const ships = ["Ship1", "Ship2", "Ship3", "Ship4"];
    const startX = 200;
    
    ships.forEach((key, index) => {
        console.log(key);
        const scale = scaleMap[key];
        const y = 250 + (yOffsetMap[key] || 0);
      const sprite = this.add
        .sprite(startX + index * 180, y, key)
        .setInteractive()
        .setScale(scale)
        .setOrigin(0.5)
        .setData("key", key)
        .setData("baseScale", scale);
        sprite.setSize(sizeMap[key][0],sizeMap[key][1]);

      this.tweens.add({
        targets: sprite,
        y: sprite.y - 10,
        yoyo: true,
        repeat: -1,
        duration: 1000,
        ease: "Sine.easeInOut",
      });

      sprite.on("pointerover", () => {
        sprite.setScale(sprite.getData("baseScale") * 1.2);
        sprite.setTint(0xffffaa);
      });

      sprite.on("pointerout", () => {
  if (this.ship !== sprite.getData("key")) {
    sprite.setScale(sprite.getData("baseScale"));
    sprite.clearTint();
  }
});

      sprite.on("pointerdown", () => {
  this.ship = sprite.getData("key");

  ships.forEach((_, i) => {
    if (i !== index) {
      const other = this.children.getByName(ships[i]) as Phaser.GameObjects.Sprite;
      if (other) {
        other.setScale(other.getData("baseScale")).clearTint();
      }
    }
  });

        sprite.setScale(sprite.getData("baseScale") * 1.3);
  sprite.setTint(0x00ff88);

        this.time.delayedCall(500, () => {
          this.scene.start("StartScene", { myShip: this.ship });
        });
      });

      sprite.setName(key);
    });

    // Optional instruction text
    this.add
      .text(this.cameras.main.centerX, 420, "Choose Your Rocket", {
        fontSize: "28px",
        color: "#ffffff",
        fontFamily: "Coin Ding Dong",
      })
      .setOrigin(0.5);
  }
}
