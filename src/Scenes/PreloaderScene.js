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
    this.load.image('sprBg0', '../assets/nebulae.png');
    this.load.image('sprBg1', '../assets/starfield.png');
    this.load.image('sprBtnPlay', '../assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', '../assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', '../assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', '../assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', '../assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', '../assets/sprBtnRestartDown.png');
    this.load.audio('sndBtnOver', '../assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', '../assets/sndBtnDown.wav');

    // -> Main stuff
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

  ready() {
    this.scene.start('MainMenu');
    this.readyCount += 1;
    if (this.readyCount === 2) {
      this.scene.start('MainMenu');
    }
  }
}
