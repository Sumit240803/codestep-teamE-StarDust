export default class StartScene extends Phaser.Scene{
    earth! : Phaser.Physics.Arcade.Sprite;
    bg! :Phaser.GameObjects.TileSprite;
    shield! : Phaser.Physics.Arcade.Sprite;
    laser! : Phaser.Physics.Arcade.Sprite;
    laserGroup! : Phaser.Physics.Arcade.Group;
    width =1024;  
    height =512 ;
    angle =0;
    radius = 70;
    headline! : Phaser.GameObjects.Text;
    title! : Phaser.GameObjects.Text;
    constructor(){
        super({key :"startScene"})
    }


    preload(){
        this.load.image('nebula', 'assets/images/game4/Purple_Nebula_06-1024x1024.png');
        this.load.spritesheet('earth', 'assets/images/game4/Earth-Sprite.png',{
            frameWidth : 48,
            frameHeight : 48
        });
        this.load.spritesheet('shield' , "assets/images/game4/sheild.png",{
            frameWidth : 64,
            frameHeight : 64
        })
        this.load.spritesheet('danger' , "assets/images/game4/danger.png",{
            frameWidth : 64,
            frameHeight : 64
        })
    }
    create(){
        this.bg = this.add.tileSprite(this.width / 2, this.height / 2, this.width, this.height, 'nebula');
        this.title = this.add.text(400,40 ,"Terra Gaurd" ,{
            fontSize: '32px',
    color: '#ffffff',
    fontFamily: "Coin Ding Dong",
    stroke: '#000',
    strokeThickness: 3
        }).setScale(0);
        this.headline = this.add.text(300,100,"Become the Guardian of Terra!",{
            fontSize : '24px'
        }).setScale(0);
        this.animateEarth();
        this.createEarth();
        this.animateShield();
        this.createShield();

        const btn = this.add.text(490 , 400,"Play",{
            fontSize: '28px',
    color: '#ffffff',
    fontFamily: "Coin Ding Dong",
    stroke: '#000',
    strokeThickness: 3,
        }).setInteractive();
        btn.on('pointerdown',()=>{
            this.scene.start('gameScene');
        })

        this.tweens.add({
            targets : this.title,
            scale : 1,
            ease : 'Sin.easeInOut',
            duration : 800,
            delay : 100,
            
        })
        this.tweens.add({
            targets : this.headline,
            scale : 1,
            ease : 'Expo.easeInOut ',
            duration : 900,
            delay : 800,
            
        })
        

    }
    createEarth(){
        this.earth = this.physics.add.sprite(this.width/2,this.height/2,'earth');

        this.earth.body?.setSize(40,40,true);
        this.earth.setScale(2.3)
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
    animateShield(){
        this.anims.create({
            delay : 400,
            frameRate : 9,
            key : 'shieldAnim',
            frames : this.anims.generateFrameNumbers('shield' , {start : 0 , end : 2} ),
            repeat : -1
        })
    }
    createShield(){
        this.shield = this.physics.add.sprite(570,250,'shield').setScale(2.3);
        this.shield.play('shieldAnim');
        this.shield.body?.setCircle(23,12,12)
        
    }
    update(){
        this.angle +=0.03;
            const x = this.earth.x + this.radius*Math.cos(this.angle);
            const y = this.earth.y + this.radius*Math.sin(this.angle);
            this.shield.setPosition(x,y);
            this.shield.setRotation(this.angle + Math.PI/20)
    }

}