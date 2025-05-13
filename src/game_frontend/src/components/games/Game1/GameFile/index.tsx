import Phaser from "phaser";

export default class RocketRush extends Phaser.Scene {
  rocket!: Phaser.Physics.Arcade.Sprite;
  debrisGroup!: Phaser.Physics.Arcade.Group;
  starfield!: Phaser.GameObjects.TileSprite;
  nebula!: Phaser.GameObjects.TileSprite;
  coins!: Phaser.Physics.Arcade.Group;
  levelText!: Phaser.GameObjects.Text;
  gameText! : Phaser.GameObjects.Text;
  redDeb!: Phaser.Physics.Arcade.Group;
  selectedShip = "";
  hit=0;
  isGameOver = false;
  score = 0;
  scoreText!: Phaser.GameObjects.Text;
  levels = [
    { level : 1 , debrisDelay : 1200 , coinDelay : 500 },
    {level : 2 , debrisDelay : 1000, coinDelay : 450},
    {level : 3 , debrisDelay : 800, coinDelay : 450},
    {level : 4 , debrisDelay : 700, coinDelay : 450},
    {level : 5 , debrisDelay : 600, coinDelay : 550},
    {level : 6 , debrisDelay : 500, coinDelay : 900},
  ]
  currentIndexLevel  =0;

  constructor() {
    super({ key: "RocketRush" });
  }
  init(data : any){
    this.score =0;
    this.selectedShip = data.gameShip
  }

  preload() {
    this.load.audio('bg' , 'assets/sounds/game1/bg-sound-1.mp3');
    this.load.audio('collide' , 'assets/sounds/game1/collision-1.mp3');
    this.load.audio('collect' , 'assets/sounds/game1/coin.mp3');
    this.load.audio('jump' , 'assets/sounds/game1/jump-1.mp3');
    this.load.spritesheet('red' , "assets/images/game1/red.png",{
      frameWidth: 90,
      frameHeight: 90
    });
    this.load.spritesheet('rocket', `assets/images/game1/${this.selectedShip}.png`, {
      frameWidth: 384,
      frameHeight: 384
    });
    this.load.image('starfield', 'assets/images/game1/Starfield_05-1024x1024.png');
    this.load.image('nebula', 'assets/images/game1/Blue_Nebula_02-1024x1024.png');
    this.load.spritesheet('debris', 'assets/images/game1/1.png', {
      frameWidth: 90,
      frameHeight: 90
    });
    this.load.spritesheet('explosion', 'assets/images/game1/ship_explosion.png', {
      frameWidth: 256,
      frameHeight: 256
    });
    this.load.spritesheet('coin', "assets/images/game1/animated_items.png", {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create() {
    this.sound.play('bg');
    const jumpSound = this.sound.add('jump');
    //const coinSound = this.sound.add('collect');
    const width =1024  //this.cameras.main.width;
    const height =512  //this.cameras.main.height;
   /* console.log("width", width);
    console.log("height", height);*/
    this.starfield = this.add.tileSprite(width / 2, height / 2, width, height, 'starfield');

    this.nebula = this.add.tileSprite(width / 2, height / 2, width, height, 'nebula');

    this.nebula.setAlpha(0.5);

    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('rocket', { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1
    });

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
  fontSize: '32px',
  color: '#ffffff'
}).setScrollFactor(0);

// Place levelText right next to scoreText with some padding
this.levelText = this.add.text(this.scoreText.x + 20 + this.scoreText.width + 20, 16, 'Level: 1', {
  fontSize: '32px',
  color: '#ffffff'
}).setScrollFactor(0);

this.gameText = this.add.text(this.levelText.x + 160 + this.levelText.width + 90,30,'yo' , {
  fontSize: '28px',
  color: '#ffff00',
  fontStyle: 'bold',
  align: 'center'
}).setOrigin(0.5).setScrollFactor(0).setVisible(true);
const scaleMap: Record<string, number> = {
  Ship1: 1.4,
  Ship2: 0.9,
  Ship3: 0.3, // smaller scale to match others
  Ship4: 0.9
};
const sizeMap : Record<string,Array<number>>={
  Ship1 : [60, 30],
  Ship2 : [60, 30],
  Ship3 : [260, 90],
  Ship4 : [80, 30],
}
const offsetMap: Record<string, [number, number]> = {
  Ship1: [160,130],  // Adjust these values experimentally
  Ship2: [160, 150],
  Ship3: [60, 145],
  Ship4: [160, 148]
};

    this.rocket = this.physics.add.sprite(100, 200, 'rocket').setScale(scaleMap[this.selectedShip]);
    this.rocket.body?.setSize(sizeMap[this.selectedShip][0],sizeMap[this.selectedShip][1],true);
    this.rocket.body?.setOffset(offsetMap[this.selectedShip][0], offsetMap[this.selectedShip][1]);
    this.rocket.play('move');
    this.rocket.setGravityY(600);

    this.input.on('pointerdown', () => {
      this.rocket.setVelocityY(-300);
      jumpSound.play();
    });
    this.anims.create({
      key: 'spinred',
      frames: this.anims.generateFrameNumbers('red', { start: 0, end: 24 }),
      frameRate: 12,
      repeat: -1
    });
    this.anims.create({
      key: 'spin',
      frames: this.anims.generateFrameNumbers('debris', { start: 0, end: 24 }),
      frameRate: 12,
      repeat: -1
    });
    this.redDeb = this.physics.add.group();
    this.debrisGroup = this.physics.add.group();
    this.time.addEvent({
      delay: this.levels[this.currentIndexLevel].debrisDelay,
      callback: this.updateLevel,
      callbackScope: this,
      loop: true
    });
    this.time.addEvent({
      delay : 300,
      callback : this.checkScore,
      callbackScope : this,
      loop : true
    })

    this.anims.create({
      key: 'explode',
      frameRate: 9,
      frames: this.anims.generateFrameNumbers('explosion', { start: 4, end: 10 }),
      repeat: 0
    });

    this.coins = this.physics.add.group();
    this.time.addEvent({
      delay: this.levels[this.currentIndexLevel].coinDelay,
      callback: this.spawnCoins,
      callbackScope: this,
      loop: true
    });
    this.anims.create({
      key: 'spinCoin',
      frameRate: 6,
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 7 }),
      repeat: -1
    });
    this.physics.add.overlap(
      this.rocket as Phaser.Types.Physics.Arcade.GameObjectWithBody,
      this.coins as Phaser.Physics.Arcade.Group,
      this.collectCoin as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
      undefined,
      this
    );

    // Pass a function that checks if the body is a Sprite, and call the appropriate method
    this.physics.add.collider(this.rocket, this.debrisGroup, (object1, object2) => {
      if (object1 instanceof Phaser.Physics.Arcade.Sprite && object2 instanceof Phaser.Physics.Arcade.Sprite) {
         this.handleCollision(object1, object2);
      }
    });
    this.physics.add.collider(this.rocket,this.redDeb, (obj1 , obj2)=>{
      if(obj1 instanceof Phaser.Physics.Arcade.Sprite && obj2 instanceof Phaser.Physics.Arcade.Sprite){
        this.handleCollision(obj1,obj2);
      }
    })
  }

  checkScore(){
    if(this.score == 50){
      this.showText("Doing Great!!");
    }
    if(this.score == 100){
      this.showText("It's a century. Keep Going!")
    }
    if(this.score == 150){
      this.showText("That's what pro player do"
      )
    }
    if(this.score== 200){
      this.showText("You are reaching God Level");
    }
    if(this.score == 250){
      this.showText("Show them you're the PRO")
    }
    if(this.score == 300){
      this.showText("Impossible")
    }
  }
  showText(message : string){
    this.gameText.setText(message);
    this.gameText.setVisible(true);
    this.time.delayedCall(3000,()=>{
      this.gameText.setVisible(false);
    })
  }

  collectCoin = (
    rocketObj: Phaser.GameObjects.GameObject,
    coinObj: Phaser.GameObjects.GameObject
  ): void => {
    const coin = coinObj as Phaser.Physics.Arcade.Sprite;
    this.sound.play('collect');
    coin.destroy();


    this.score += 5;
    this.scoreText.setText('Score: ' + this.score);
  };

  spawnCoins() {
    const y = Phaser.Math.Between(100, 440);
    const coin = this.coins.create(1000, y, 'coin');
    coin.setScale(2);
    coin.body.allowGravity = false;
    coin.play('spinCoin');
    coin.setVelocityX(-400);
  }
  updateLevel(){
    if(this.score <= 50){
        this.currentIndexLevel =1;
        this.levelText.setText('Level: '+ 1);
        //this.spawnDebris(this.currentIndexLevel);
        this.spwanRedDeb();
    }
    if(this.score >50 && this.score <=100){
        this.currentIndexLevel =2;
        this.levelText.setText('Level: '+ 2);
        this.spawnDebris(this.currentIndexLevel);
        this.spwanRedDeb();
    }
    if(this.score >100 && this.score <=200){
        this.currentIndexLevel = 3;
        this.levelText.setText('Level: '+ 3);
        this.spawnDebris(this.currentIndexLevel);
        this.spwanRedDeb();
    }
    if(this.score >200){
        this.currentIndexLevel =4;
        this.levelText.setText('Level: '+ 4);
        this.spawnDebris(this.currentIndexLevel);
    }
  }
  spwanRedDeb(){
    const y= Phaser.Math.Between(100,440);
    const x = 1000;
    const debris = this.redDeb.create(x,y,'red');
    debris.setSize(60,60);
    debris.setScale(0.7);
    debris.play('spinred');
    debris.setImmovable(true);
    debris.body.allowGravity = false;
    debris.setVelocityX(-400);
  }

  spawnDebris(level : number) {
    //Linear Motion
    const y = Phaser.Math.Between(100,440);
    const x = 1000;
    const debris = this.debrisGroup.create(x,y,'debris');
    debris.body.setSize(60, 60);
    debris.setScale(0.7);
    debris.play('spin');
    debris.setImmovable(true);
    debris.body.allowGravity = false;
    if(level ==1){
        debris.setVelocityX(-400);
    }
    if(level ==2){
        let direction = 1;
    this.time.addEvent({
        delay: 50,
        callback: () => {
            if (debris.x >= 1000 || debris.x <= 800) {
                direction *= -1; // Reverse the direction
            }
            debris.x += direction * 10; // Move left or right
        },
        loop: true
    });

    // Set forward motion
    debris.setVelocityX(-500);
    }
    if(level ==3){
        debris.setVelocityX(-500);
        debris.setData('initialY',debris.y);
        this.time.addEvent({
            delay : 500,
            callback : ()=>{
                const deltaY = Math.sin(this.time.now * 0.07) *100;
                debris.y =debris.getData('initialY') + deltaY;
            },
            loop : true
        })
    }
    if (level === 4) {
    let directionY = 1; // 1 for down, -1 for up
    let speedX = -3;    // Move left
    let speedY = 2;     // Diagonal Y speed
    const minY = 100;
    const maxY = 440;

    this.time.addEvent({
        delay: 16, // ~60fps
        callback: () => {
            debris.x += speedX;
            debris.y += speedY * directionY;

            // Reverse Y direction on hitting bounds
            if (debris.y >= maxY || debris.y <= minY) {
                directionY *= -1;
            }
        },
        loop: true
    });
}



    
    
    //Circular Motion
    /*
    const radius = 20; // Radius of the circle
    const angle = Phaser.Math.Between(-15, 15); // Random angle to spawn the debris

    // Convert the angle to radians
    const radians = Phaser.Math.DegToRad(angle);

    // Calculate x and y position based on the circle's radius and angle
    const x = 1000 //1000 + radius * Math.cos(radians);
    const y = 250 + radius * Math.sin(radians); // You can adjust the center of the circle (300 in this case)

    const debris = this.debrisGroup.create(x, y, 'debris');
    debris.body.setSize(60, 60);
    debris.setScale(0.7);
    debris.play('spin');

    // Set velocity for circular motion
    const speed = 450; // You can adjust the speed of the circular motion
    debris.setVelocityX(-speed * Math.cos(radians)); // Set horizontal velocity
    debris.setVelocityY(speed * Math.sin(radians)); // Set vertical velocity

    debris.setImmovable(true);
    debris.body.allowGravity = false;*/

  }

  handleCollision(rocket: Phaser.Physics.Arcade.Sprite, debris: Phaser.Physics.Arcade.Sprite) {
    this.hit++;
    console.log(this.hit);
    // Stop the rocket and play the explosion animation
    /*if(this.hit < 5){
      this.cameras.main.shake(250,0.01);
      return;
    }else{*/

    
    this.cameras.main.shake(250,0.01);
    this.isGameOver = true;
    this.coins.setVelocity(0,0);
    debris.setVelocity(0,0);
    rocket.setVelocityX(0);
    rocket.setVelocityY(0);

    const rocketBody = rocket.body as Phaser.Physics.Arcade.Body;
    rocketBody.setAllowGravity(false);
    rocketBody.setImmovable(true);
    this.input.on('pointerdown', () => {
      rocketBody.setVelocity(0);
    });

    // Destroy debris
    debris.destroy();
    this.sound.play('collide');
    // Play explosion animation
    rocket.play('explode');
    
    
    // Pause the game when the animation completes
    rocket.on('animationcomplete', () => {
      this.scene.stop('RocketRush');
    this.scene.launch('EndScreen',{score : this.score});
    this.scene.restart();
    });//}
  }

  update() {
    if (this.isGameOver) return;
    this.starfield.tilePositionX += 0.2; // far background = slower
    this.nebula.tilePositionX += 0.5;    // closer background = faster
    if (this.rocket.y > 450 || this.rocket.y < 0) {
        this.scene.pause();
      this.scene.stop('RocketRush');
      
      this.scene.launch('EndScreen',{score : this.score});

    }
  }
}
