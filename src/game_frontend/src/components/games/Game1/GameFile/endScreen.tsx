export class EndScreen extends Phaser.Scene{
    private finalScore : number = 0;
    constructor(){
        super({key : "EndScreen"})
    }

    init(data : any){
        this.finalScore= data.score;
    }
    create() {
    this.add.text(400, 200, `Score: ${this.finalScore}`, {
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
    
    // Optionally add a restart button
    const restartButton = this.add.text(400, 300, 'Restart', {
      fontSize: '24px',
      backgroundColor: '#000',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive();

    restartButton.on('pointerdown', () => {
      this.scene.start('RocketRush'); // Restart game
    });
  }
}