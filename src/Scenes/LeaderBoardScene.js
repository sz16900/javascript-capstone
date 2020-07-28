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
          .bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME')
          .setTint(0xffffff);
        for (let i = 1; i < 6; i++) {
          this.add
            .bitmapText(
              100,
              160 + 50 * i,
              'arcade',
              ` ${i}    ${data.result[i].score}    ${data.result[i].user}`
            )
            .setTint(0xffffff);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
