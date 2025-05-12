export class EndScreen extends Phaser.Scene{
    private finalScore : number = 0;
     bg!: Phaser.GameObjects.TileSprite;
     rocket?: Phaser.Physics.Arcade.Sprite;
     width = 1024;
  height = 512;
    constructor(){
        super({key : "EndScreen"})
    }
    preload(){
      this.load.image("endBG", "assets/images/game1/end-bg.png");
      this.load.spritesheet('rocket', 'assets/images/game1/Ship3.png', {
      frameWidth: 384,
      frameHeight: 384
    });
    this.load.spritesheet('explosion', 'assets/images/game1/ship_explosion.png', {
      frameWidth: 256,
      frameHeight: 256
    });
    }

    init(data : any){
        this.finalScore= data.score;
    }
    create() {

      this.bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'endBG');
    this.add.text(512, 370, `Score: ${this.finalScore}`, {
      fontFamily : 'Coin Ding Dong',
      fontSize: '32px',
      color: '#ffffff'
    }).setOrigin(0.5);
    this.anims.create({
      key: 'explode',
      frameRate: 2,
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 10 }),
      repeat: -1
    });
    this.rocket = this.physics.add.sprite(this.width / 2, this.height / 2, 'rocket')
      .setScale(0.4); 
    this.time.addEvent({
      delay : 400,
      callback : ()=> {this.rocket?.play('explode')},
      callbackScope : this,
      loop : true 
    })
  
  }
}