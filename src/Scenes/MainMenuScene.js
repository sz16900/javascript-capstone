import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    // Add music background
    this.music = this.sound.add('sndBgMenu');
    this.music.loop = true;
    this.music.play();

    // Add static background
    this.add.sprite(0, 0, 'starfield');

    // Create a play button and add Sprites
    // Game
    this.gameButton = new Button(
      this,
      config.width * 0.5,
      config.height * 0.5,
      'sprBtnPlayDown',
      'sprBtnPlayHover',
      'sprBtnPlay',
      '',
      'Main',
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
  }
}
