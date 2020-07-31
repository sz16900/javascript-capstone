import Phaser from 'phaser';
import api from '../Utils/apiHandler';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Score' });
  }

  create = () => {
    this.element = document.getElementById('playername');
    this.element.classList.remove('hidden');

    this.add
      .bitmapText(
        this.game.config.width * 0.5,
        100,
        'arcade',
        'YOUR SCORE IS:',
        42
      )
      .setTint(0xffffff)
      .setOrigin(0.5);
    this.add
      .bitmapText(
        this.game.config.width * 0.5,
        250,
        'arcade',
        `${this.sys.game.globals.score}`,
        56
      )
      .setTint(0xffffff)
      .setOrigin(0.5);
    this.add
      .bitmapText(
        this.game.config.width * 0.5,
        400,
        'arcade',
        'TYPE NAME & PRESS ENTER!',
        24
      )
      .setTint(0xffffff)
      .setOrigin(0.5);

    // Key Bindings
    this.keyENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  };

  update = () => {
    if (this.keyENTER.isDown) {
      const info = document.getElementById('playername').value;
      if (this.sys.game.globals.score >= 500) {
        api.setScore(info, this.sys.game.globals.score);
      }
      this.element.classList.add('hidden');
      this.scene.start('LeaderBoard');
    }
  };
}
