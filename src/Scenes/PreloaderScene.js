import Phaser from 'phaser';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
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

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game

    // -> Main Menu stuff
    this.load.image('nebulae', '../assets/nebulae.png');
    this.load.image('starfield', '../assets/starfield.png');
    this.load.image('sprBtnPlay', '../assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', '../assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', '../assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', '../assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', '../assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', '../assets/sprBtnRestartDown.png');

    // Sound
    this.load.audio('sndBtnOver', '../assets/Text rollover3.wav');
    this.load.audio(
      'sndBtnDown',
      '../assets/Menu Effect Time Stretch and Pitch Shift.wav'
    );
    this.load.audio('sndBgMain', '../assets/Operator Loop.wav');
    this.load.audio('sndBgMenu', '../assets/Tech Lab (Soft Hum) verb.mp3');
    this.load.audio('sndPlayerMove', '../assets/rocket_launch.wav');

    // -> Main stuff
    this.load.spritesheet('sprExplosion', '../assets/EXPLOSION_ANIMATION.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprExplosionPlayer', '../assets/sprExplosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', '../assets/UFO.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('sprEnemy1', '../assets/Turtle.png');
    this.load.spritesheet('sprEnemy2', '../assets/Saboteur.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('sprLaserEnemy0', '../assets/fire15.png');
    this.load.image('sprLaserPlayer', '../assets/fire07.png');
    this.load.spritesheet('sprPlayer', '../assets/Ligher.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.audio('sndExplode0', '../assets/explosion1.wav');
    this.load.audio('sndExplode1', '../assets/explosion2.wav');
    this.load.audio('sndExplode2', '../assets/explosion3.wav');
    this.load.audio('sndExplode3', '../assets/explosion4.wav');
    this.load.audio('sndLaser', '../assets/weaponfire7.wav');
  }

  ready() {
    this.scene.start('MainMenu');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('MainMenu');
    }
  }
}