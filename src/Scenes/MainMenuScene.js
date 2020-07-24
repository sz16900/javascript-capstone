import Phaser from 'phaser';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
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
      'sprBtnPlay',
    );

    // Make it interactive
    this.btnPlay.setInteractive();

    // Add mouse events to the btn
    this.btnPlay.on(
      // -> pointer on
      'pointerover',
      () => {
        this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
        this.sfx.btnOver.play(); // play the button over sound
      },
      this,
    );
    // -> pointer off
    this.btnPlay.on('pointerout', () => {
      this.setTexture('sprBtnPlay');
    });
    // button down
    this.btnPlay.on(
      'pointerdown',
      () => {
        this.btnPlay.setTexture('sprBtnPlayDown');
        this.sfx.btnDown.play();
      },
      this,
    );
    // button up
    this.btnPlay.on(
      'pointerup',
      () => {
        this.btnPlay.setTexture('sprBtnPlay');
        this.scene.start('Main');
      },
      this,
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
      },
    );
    this.title.setOrigin(0.5);
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const keys = ['sprBg0', 'sprBg1'];
      const key = keys[Phaser.Math.Between(0, keys.length - 1)];
      const bg = new ScrollingBackground(this, key, i * 10);
      this.backgrounds.push(bg);
    }
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
