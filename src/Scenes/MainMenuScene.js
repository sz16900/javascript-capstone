import Phaser from 'phaser';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    this.load.image('sprBg0', '../assets/sprBg0.png');
    this.load.image('sprBg1', '../assets/sprBg1.png');
    this.load.image('sprBtnPlay', '../assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', '../assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', '../assets/sprBtnPlayDown.png');
    this.load.image('sprBtnRestart', '../assets/sprBtnRestart.png');
    this.load.image('sprBtnRestartHover', '../assets/sprBtnRestartHover.png');
    this.load.image('sprBtnRestartDown', '../assets/sprBtnRestartDown.png');

    this.load.audio('sndBtnOver', '../assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', '../assets/sndBtnDown.wav');
  }

  create() {
    // Create Sound effects
    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    // Create a play button and add Sprites
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay'
    );

    // Make it interactive
    this.btnPlay.setInteractive();

    // Add mouse events to the btn
    this.btnPlay.on(
      // -> pointer on
      'pointerover',
      function () {
        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this
    );
    // -> pointer off
    this.btnPlay.on('pointerout', function () {
      this.setTexture('sprBtnPlay');
    });
    // button down
    this.btnPlay.on(
      'pointerdown',
      function () {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this
    );
    // button up
    this.btnPlay.on(
      'pointerup',
      function () {
        this.btnPlay.setTexture('sprBtnPlay');
        this.scene.start('Main');
      },
      this
    );

    // Add the Title
    this.title = this.add.text(
      this.game.config.width * 0.5,
      128,
      'SPACE SHOOTER',
      {
        fontFamily: 'monospace',
        fontSize: 48,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      }
    );
    this.title.setOrigin(0.5);
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      let keys = ['sprBg0', 'sprBg1'];
      let key = keys[Phaser.Math.Between(0, keys.length - 1)];
      let bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
