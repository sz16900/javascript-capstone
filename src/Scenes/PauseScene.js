import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Pause' });
  }

  create() {
    //     this.input.keyboard.once('keydown-P', (e) => {
    //       this.scene.resume('Main');
    //       this.scene.stop();
    //     });
  }

  //   update() {
  //     if (this.keyEsc.isDown) {
  //       // if (this.keyEsc.isUp) {
  //       this.scene.resume('Main');
  //       console.log('here');
  //       this.scene.launch('Main');
  //       // }
  //     }
  //   }
}
