import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../Entities/ScrollingBackground';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    // It looks like sound effects can only operate within the scene
    // Create Sound effects
    // this.sfx = {
    //   btnOver: this.sound.add('sndBtnOver'),
    //   btnDown: this.sound.add('sndBtnDown'),
    // };

    // Create a play button and add Sprites
    // Game
    this.gameButton = new Button(
      this,
      config.width * 0.5,
      config.height * 0.5,
      'sprBtnPlayDown',
      'sprBtnPlayHover',
      'sprBtnPlay',
      'Play',
      'Main'
    );

    // this.btnPlay = this.add.sprite(
    //   this.game.config.width * 0.5,
    //   this.game.config.height * 0.5,
    //   'sprBtnPlay'
    // );

    // // Make it interactive
    // this.btnPlay.setInteractive();

    // // Add mouse events to the btn
    // this.btnPlay.on(
    //   // -> pointer on
    //   'pointerover',
    //   () => {
    //     this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
    //     this.sfx.btnOver.play(); // play the button over sound
    //   },
    //   this
    // );
    // // -> pointer off
    // this.btnPlay.on('pointerout', () => {
    //   this.setTexture('sprBtnPlay');
    // });
    // // button down
    // this.btnPlay.on(
    //   'pointerdown',
    //   () => {
    //     this.btnPlay.setTexture('sprBtnPlayDown');
    //     this.sfx.btnDown.play();
    //   },
    //   this
    // );
    // // button up
    // this.btnPlay.on(
    //   'pointerup',
    //   () => {
    //     this.btnPlay.setTexture('sprBtnPlay');
    //     this.scene.start('Main');
    //   },
    //   this
    // );

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

    // clouds
    this.stars = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      'sprBg1'
    );

    this.stars.setOrigin(0, 0);
    this.stars.setScrollFactor(0);

    this.dunes = this.add.tileSprite(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      'sprBg0'
    );

    this.dunes.setOrigin(0, 0);
    this.dunes.setScrollFactor(0);
    // this.backgrounds = [];
    // for (let i = 0; i < 5; i += 1) {
    //   const keys = ['sprBg0', 'sprBg1'];
    //   const key = keys[Phaser.Math.Between(0, keys.length - 1)];
    //   const bg = new ScrollingBackground(this, key, i * 10);
    //   this.backgrounds.push(bg);
    // }
  }

  update() {
    this.dunes.tilePositionY -= 1;
    this.stars.tilePositionY -= 1;
    // for (let i = 0; i < this.backgrounds.length; i += 1) {
    //   this.backgrounds[i].update();
    // }
  }
}
