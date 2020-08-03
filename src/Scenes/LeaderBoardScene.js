import Phaser from 'phaser';
import api from '../Utils/apiHandler';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeaderBoard' });
  }

  create = () => {
    document.getElementById('spinner').classList.remove('hidden');

    setTimeout(() => {
      api
        .getScore()
        .then((data) => {
          this.add
            .bitmapText(100, 10, 'arcade', 'RANK  NAME   SCORE')
            .setTint(0xffffff);
          data.result.sort((a, b) => {
            if (a.score > b.score) {
              return -1;
            }
            if (b.score > a.score) {
              return 1;
            }
            return 0;
          });
          for (let i = 1; i < 6; i += 1) {
            this.add
              .bitmapText(
                100,
                60 + 50 * i,
                'arcade',
                ` ${i}    ${data.result[i].user}     ${data.result[i].score}`,
              )
              .setTint(0xffffff);
          }
          document.getElementById('spinner').classList.add('hidden');
        })
        .catch((e) => {
          const input = document.getElementById('space-shooter-game');
          input.innerText = e;
        });
    }, 3000);

    this.add
      .bitmapText(this.game.config.width * 0.5, 500, 'arcade', 'PRESS ENTER!')
      .setTint(0xffffff)
      .setOrigin(0.5);

    // Key Bindings
    this.keyENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
  };

  update = () => {
    if (this.keyENTER.isDown) {
      this.sys.game.globals.score = 0;
      this.scene.start('Main');
    }
  };
}
