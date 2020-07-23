import 'phaser';
import Player from '../Entities/Player';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  preload() {
    console.log('preload');
    this.load.image('sprBg0', '../assets/sprBg0.png');
    this.load.image('sprBg1', '../assets/sprBg1.png');
    this.load.spritesheet('sprExplosion', '../assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', '../assets/sprEnemy0.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprEnemy1', '../assets/sprEnemy1.png');
    this.load.spritesheet('sprEnemy2', '../assets/sprEnemy2.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('sprLaserEnemy0', '../assets/sprLaserEnemy0.png');
    this.load.image('sprLaserPlayer', '../assets/sprLaserPlayer.png');
    this.load.spritesheet('sprPlayer', '../assets/sprPlayer.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.audio('sndExplode0', '../assets/sndExplode0.wav');
    this.load.audio('sndExplode1', '../assets/sndExplode1.wav');
    this.load.audio('sndLaser', '../assets/sndLaser.wav');
  }
  create() {
    //   Create some Animations
    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    // Give it sound effects
    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    // Create the Player
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer'
    );

    // Create Key Bindings
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
  }

  update() {
    this.player.update();

    if (this.keyW.isDown) {
      this.player.moveUp();
    } else if (this.keyS.isDown) {
      this.player.moveDown();
    }

    if (this.keyA.isDown) {
      this.player.moveLeft();
    } else if (this.keyD.isDown) {
      this.player.moveRight();
    }
  }
}

export default MainScene;
