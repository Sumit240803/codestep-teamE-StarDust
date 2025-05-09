export class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload() {
    this.load.image('startButton', 'assets/images/game1/start-button.png'); 
  }

  create() {
    this.add.text(400, 150, 'Rocket Game', { fontSize: '40px', color: '#fff' }).setOrigin(0.5);

    const btn = this.add.image(400, 300, 'startButton').setInteractive().setScale(0.5);

    btn.on('pointerdown', () => {
      this.scene.start('RocketRush');
    });
  }
}
