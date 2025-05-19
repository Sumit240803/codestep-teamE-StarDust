export default class EndScene extends Phaser.Scene{
    endText! : Phaser.GameObjects.Text;
    score =0;
    scoreText! : Phaser.GameObjects.Text;
    infoText! : Phaser.GameObjects.Text;
    width = 1024;
    height = 512;
    bg! :Phaser.GameObjects.TileSprite;
    constructor(){
        super({key : "endScene"});
    }
    preload(){
        this.load.image('nebula', 'assets/images/game1/Blue_Nebula_02-1024x1024.png');
    }
    init(data : any){
        this.score = data.score;
    }

    create(){
        this.bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nebula');
        this.endText = this.add.text(400,50,"Game Over",{
            fontSize : "48px",
            fontFamily : "Coin Ding Dong",
            color: '#ffffff',
            stroke: '#000',
    strokeThickness: 3
        })

        this.scoreText = this.add.text(380,180,"Your Score: "+this.score,{
            fontSize : "28px",
            fontFamily : "Coin Ding Dong",
            color: '#ffffff',
            stroke: '#000',
    strokeThickness: 3
        });
        this.infoText = this.add.text(250,300, "Your Points are added into your account",{
            fontSize : "28px",
            fontFamily : "Coin Ding Dong",
            color: '#ffffff',
            stroke: '#000',
    strokeThickness: 3
        })

        const btn = this.add.text(470,400, "Play Again",{
            fontSize : "32px",
            fontFamily : "Coin Ding Dong",
            color: '#ffffff',
            stroke: '#000',
    strokeThickness: 3
        }).setInteractive();
        btn.on('pointerdown',()=>{
            this.scene.start('startScene')
        })
    }
}