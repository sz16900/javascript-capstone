import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init = () => {
    this.readyCount = 0;
  };

  preload = () => {
    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
    const { width } = this.cameras.main;
    const { height } = this.cameras.main;

    // add logo image
    this.add.image(120, 100, 'logoPhaser').setScale(0.5);
    this.add.image(690, 60, 'logoZenva').setScale(1.1);

    // Loading text
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    // Percentage text
    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    // Text for loaded assets
    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    // Takes some time to breathe
    this.timedEvent = this.time.delayedCall(6000, this.ready, [], this);

    // Load Fonts
    this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');

    // -> Main Images
    this.load.image('nebulae', 'assets/nebulae.png');
    this.load.image('starfield', 'assets/starfield.png');
    this.load.image('kbCommands', 'assets/keyboardCommands.png');

    // Load SFX and other

    this.load.audio('sndBgMain', 'assets/Operator Loop.wav', {
      instances: 2,
    });
    this.load.audio('sndBgMenu', 'assets/Tech Lab (Soft Hum) verb.mp3', {
      instances: 2,
    });
    this.load.audio('sndPlayerMove', 'assets/rocket_launch.wav', {
      instances: 2,
    });
    this.load.audio('sndExplode0', 'assets/explosion1.wav', {
      instances: 2,
    });
    this.load.audio('sndExplode1', 'assets/explosion2.wav', {
      instances: 2,
    });
    this.load.audio('sndExplode2', 'assets/explosion3.wav', {
      instances: 2,
    });
    this.load.audio('sndExplode3', 'assets/explosion4.wav', {
      instances: 2,
    });
    this.load.audio('sndLaser', 'assets/weaponfire7.wav', {
      instances: 2,
    });

    // Load Sprites for anims
    this.load.spritesheet('sprExplosion', 'assets/EXPLOSION_ANIMATION.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprExplosionPlayer', 'assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprExplosionLaser', 'assets/Explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ufo', 'assets/UFO.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('turtle', 'assets/Turtle.png');
    this.load.spritesheet('saboteur', 'assets/Saboteur.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('lightning', 'assets/Lightning.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('ninja', 'assets/Ninja.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('sprLaserEnemy0', 'assets/fire15.png');
    this.load.image('sprLaserPlayer', 'assets/fire07.png');
    this.load.spritesheet('sprPlayer', 'assets/Ligher.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  };

  ready = () => {
    this.scene.start('MainMenu');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('MainMenu');
    }
  };
}
