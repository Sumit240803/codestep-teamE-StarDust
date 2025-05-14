export default class GameScene extends Phaser.Scene{
    earth! : Phaser.Physics.Arcade.Sprite;
    bg! :Phaser.GameObjects.TileSprite;
    width =1024;  
    height =512 ;
    constructor(){
        super({key : "gameScene"});
    }

    preload(){
        this.load.image('nebula', 'assets/images/game1/Blue_Nebula_02-1024x1024.png');
        this.load.spritesheet('earth', 'assets/images/game4/Earth-Sprite.png',{
            frameWidth : 48,
            frameHeight : 48
        });
    }

    create(){
       
        this.bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nebula');
        this.animateEarth();
        this.createEarth();
        this.time.addEvent({
            delay : 300,
            callback :()=> this.createLaser(),
            callbackScope : this,
            loop : true
        })
       // this.createLaser();

    }

    createEarth(){
        this.earth = this.physics.add.sprite(this.width/2,this.height/2,'earth');

        this.earth.body?.setSize(40,40,true);
        this.earth.setScale(1.7)
        this.earth.play('spinEarth')
    }
    animateEarth(){
        this.anims.create({
            delay : 200,
            frameRate : 5,
            key : 'spinEarth',
            frames : this.anims.generateFrameNumbers('earth',{start : 0 , end : 16}),
            repeat : -1
        })
    }
    createLaser(){
        const laser = this.add.rectangle(
  this.earth.x,            // x position
  this.earth.y - 20,       // y position (above Earth)
  5,                       // width
  20,                      // height
  0xff0000                 // red color (hex)
);
this.physics.add.existing(laser);  // add physics
(laser.body as Phaser.Physics.Arcade.Body).setVelocityY(-300);

    }
}