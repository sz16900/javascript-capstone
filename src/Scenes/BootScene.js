import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload = () => {
    this.load.image('logoPhaser', 'assets/logo.png');
    this.load.image('logoZenva', 'assets/zenva_logo.png');
  };

  create = () => {
    this.scene.start('Preloader');
  };
}
