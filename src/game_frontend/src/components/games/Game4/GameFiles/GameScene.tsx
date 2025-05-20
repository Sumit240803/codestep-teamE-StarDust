export default class GameScene extends Phaser.Scene{
    earth! : Phaser.Physics.Arcade.Sprite;
    bg! :Phaser.GameObjects.TileSprite;
    shield! : Phaser.Physics.Arcade.Sprite;
    laser! : Phaser.Physics.Arcade.Sprite;
    laserGroup! : Phaser.Physics.Arcade.Group;
    width =1024;  
    height =512 ;
    healthBarBg!: Phaser.GameObjects.Graphics;
healthBar!: Phaser.GameObjects.Graphics;
maxHealth = 5;
health = this.maxHealth;
score = 0;
scoreText!: Phaser.GameObjects.Text;
level =1;
levelText! : Phaser.GameObjects.Text;
waves = [
    { id : 1 , spawnTime : 1200 , dir : ['left' , 'right'] ,speed : 250},
    { id : 2 , spawnTime : 1200 , dir : ['left' , 'right','top'] , speed : 350},
    { id : 3 , spawnTime : 1200 , dir : ['left' , 'right','top','bottom'] , speed : 450},
]
threshold = [0, 51,101,151];
currentWave = 1;

    isRotating = false;
    angle =0;
    radius = 70;
    constructor(){
        super({key : "gameScene"});
    }

    preload(){
        this.load.image('nebula', 'assets/images/game1/Blue_Nebula_02-1024x1024.png');
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

        this.scoreText = this.add.text(this.width - 160, 20, 'Score: 0', {
    fontSize: '24px',
    color: '#ffffff',
    fontFamily: "Coin Ding Dong",
    stroke: '#000',
    strokeThickness: 3
});
        this.levelText = this.add.text(this.width - 300, 20, 'Wave: 1', {
    fontSize: '24px',
    color: '#ffffff',
    fontFamily: "Coin Ding Dong",
    stroke: '#000',
    strokeThickness: 3
});
this.level =1;

        this.health =this.maxHealth;
        this.healthBarBg = this.add.graphics();
this.healthBarBg.fillStyle(0xffffff, 1);
this.healthBarBg.fillRect(20, 20, 200, 20); // x, y, width, height

// Foreground (actual health)
this.healthBar = this.add.graphics();
this.updateHealthBar();
       
        this.animateDanger()
       // this.createLaser();
        this.animateEarth();
        this.createEarth();
        this.animateShield();
        this.createShield();
        this.laserGroup = this.physics.add.group();

        this.input.on('pointerdown',()=>{
            this.isRotating = !this.isRotating;
        })
        this.time.addEvent({
            delay : this.waves[this.level-1].spawnTime,
            callback : this.createLaser,
            callbackScope : this,
            loop : true
        })

        this.physics.add.overlap(this.shield,this.laserGroup,(earth,laser)=>{
            this.cameras.main.shake(100,0.02)
            laser.destroy();
            this.score += 10;
    this.scoreText.setText('Score: ' + this.score);
            
            console.log("Collided")
        })
        this.physics.add.overlap(this.earth , this.laserGroup , (earth,laser)=>{
            this.health--;
            if(this.score >=5){
                this.score -=5;
                this.scoreText.setText('Score: '+this.score);
            }
            this.updateHealthBar();
            if(this.health <=0){
                this.cameras.main.shake(1200,0.04);
                this.time.addEvent({
                    delay : 1400,
                    callback : ()=>{
                        earth.destroy();
                        this.scene.start('endScene' , {score : this.score});
                    },
                    callbackScope : this,
                    repeat : 0
                })
                
                //this.scene.restart();
            }
            this.cameras.main.shake(100,0.04);
            laser.destroy();
        })
    }
    updateHealthBar() {
    const barWidth = 200;
    const barHeight = 20;
    const barX = 20;
    const barY = 20;
    const newWidth = (this.health / this.maxHealth) * barWidth;

    this.tweens.add({
        targets: this.healthBar,
        props: {
            scaleX: { value: newWidth / barWidth, duration: 200, ease: 'Power1' }
        },
        onUpdate: () => {
            this.healthBar.clear();
            this.healthBar.fillStyle(0xff0000, 1);
            this.healthBar.fillRect(barX, barY, barWidth, barHeight);
        }
    });
}


    createShield(){
        this.shield = this.physics.add.sprite(570,250,'shield').setScale(2.3);
        this.shield.play('shieldAnim');
        this.shield.body?.setCircle(23,12,12)
        
    }
    createLaser() {
    const earthX = this.earth.x;
    const earthY = this.earth.y;

    const edges = this.waves[this.level-1].dir;
    const edge = Phaser.Math.RND.pick(edges);

    let startX = 0, startY = 0;

    switch(edge) {
        case 'top':
            startX = Phaser.Math.Between(0, this.width);
            startY = 0;
            break;
        case 'bottom':
            startX = Phaser.Math.Between(0, this.width);
            startY = this.height;
            break;
        case 'left':
            startX = 0;
            startY = Phaser.Math.Between(0, this.height);
            break;
        case 'right':
            startX = this.width;
            startY = Phaser.Math.Between(0, this.height);
            break;
    }

    const laser = this.physics.add.sprite(startX, startY, 'danger');
    laser.setScale(0.6);
    laser.play('dangerAnim');

    // Add to group
    this.laserGroup.add(laser);

    // Move toward Earth
    const angle = Phaser.Math.Angle.Between(startX, startY, earthX, earthY);
    //let speed;
    
    this.physics.velocityFromRotation(angle, 430, laser.body.velocity)
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
    animateDanger(){
        this.anims.create({
            delay : 400,
            frameRate : 9,
            key : 'dangerAnim',
            frames : this.anims.generateFrameNumbers('danger' , {start : 0 , end : 3} ),
            repeat : -1
        })
    }


    update(){
        if(this.level != this.currentWave){
            this.currentWave = this.level;
            this.time.removeAllEvents();
            this.time.addEvent({
                delay : this.waves[this.level -1].spawnTime,
                callback : this.createLaser,
                callbackScope : this,
                loop : true
            })
        }
        
        for(let i = this.waves.length ; i >=1 ; i--){
            if(this.score >= this.threshold[i-1]){
                if(this.level !==i){
                    this.level = i;
                    this.levelText.setText("Wave: "+ this.level);
                }
                break;
            }
        }
        if(this.isRotating){
            this.angle +=0.09;
            const x = this.earth.x + this.radius*Math.cos(this.angle);
            const y = this.earth.y + this.radius*Math.sin(this.angle);
            this.shield.setPosition(x,y);
            this.shield.setRotation(this.angle + Math.PI/20)
        }
    }
    
}