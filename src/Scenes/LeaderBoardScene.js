import Phaser from 'phaser';
import api from '../Utils/apiHandler';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoard' });
  }

  create() {
    api
      .getScore()
      .then((data) => {
        this.add
          .bitmapText(100, 10, 'arcade', 'RANK  NAME   SCORE')
          .setTint(0xffffff);
        data.result.sort((a, b) =>
          a.score > b.score ? -1 : b.score > a.score ? 1 : 0
        );
        console.log(data);
        for (let i = 1; i < 6; i++) {
          this.add
            .bitmapText(
              100,
              60 + 50 * i,
              'arcade',
              ` ${i}    ${data.result[i].user}     ${data.result[i].score}`
            )
            .setTint(0xffffff);
        }
      })
      .catch((e) => {
        console.log(e);
      });

    this.add
      .bitmapText(this.game.config.width * 0.5, 500, 'arcade', 'PRESS ENTER!')
      .setTint(0xffffff)
      .setOrigin(0.5);

    // Key Bindings
    this.keyENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );
  }

  update() {
    if (this.keyENTER.isDown) {
      this.sys.game.globals.score = 0;
      this.scene.start('Main');
    }
  }
}
