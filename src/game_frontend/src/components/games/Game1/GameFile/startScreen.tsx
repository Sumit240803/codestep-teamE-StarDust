export class StartScene extends Phaser.Scene {
  private selectedShip : string= "";
  bg!: Phaser.GameObjects.TileSprite;
  rocket?: Phaser.Physics.Arcade.Sprite;
  width = 1024;
  height = 512;

  constructor() {
    super({ key: 'StartScene' });
  }
  init(data : any){
    this.selectedShip = data.myShip;
  }


  preload() {
    console.log(this.selectedShip);
    this.load.image('startButton', 'assets/images/game1/start-button.png'); 
    this.load.image('start-bg', 'assets/images/game1/start-screen-bg.png');
    this.load.spritesheet('rocket', `assets/images/game1/${this.selectedShip}.png`, {
      frameWidth: 384,
      frameHeight: 384
    });
  }

  create() {
    
    // Add background
    this.bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'start-bg');

    // Start button
    const btn = this.add.image(this.width / 2, this.height / 2, 'startButton')
      .setInteractive()
      .setScale(0.5);

    btn.on('pointerdown', () => {
      if (!this.rocket) this.animateRocket(); // Prevent multiple rocket creations
    });
  }

  animateRocket() {
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('rocket', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });
const scaleMap: Record<string, number> = {
  Ship1: 0.9,
  Ship2: 0.9,
  Ship3: 0.3, // smaller scale to match others
  Ship4: 0.9
};
    this.rocket = this.physics.add.sprite(this.width / 2, this.height / 2, 'rocket')
      .setScale(scaleMap[this.selectedShip])
      .play('move');
    this.tweens.add({
  targets: this.rocket,
  scale: {
    from: scaleMap[this.selectedShip],
    to: scaleMap[this.selectedShip] + 0.3
  },
  yoyo: true,
  repeat: -1,
  duration: 500,
  ease: 'Sine.easeInOut'
});

    this.rocket.body?.setSize(260, 90, true);
    this.rocket.setVelocityX(250);
  }

  update() {
    if (this.rocket && this.rocket.x > this.width) {
      this.scene.start('RocketRush',{gameShip : this.selectedShip});
    }
  }
}
