import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create = () => {
    // Add music background
    this.music = this.sound.add('sndBgMenu');
    this.music.loop = true;
    this.music.play();

    // Add static background
    this.add.sprite(0, 0, 'starfield');
    this.add
      .sprite(
        this.game.config.width * 0.5,
        this.game.config.height * 0.5,
        'kbCommands',
      )
      .setScale(0.4);

    this.add
      .bitmapText(
        this.game.config.width * 0.5,
        128,
        'arcade',
        'SPACETIME SHOOTER',
        38,
      )
      .setTint(0xffffff)
      .setOrigin(0.5);

    this.pressEnter = this.add
      .bitmapText(
        this.game.config.width * 0.5,
        428,
        'arcade',
        'PRESS ENTER TO START!',
        28,
      )
      .setTint(0xffffff)
      .setOrigin(0.5);

    this.tweens.add({
      targets: [this.pressEnter],
      scaleX: 0.99,
      scaleY: 0.99,
      ease: 'Elastic', // 'Cubic', 'Elastic', 'Bounce', 'Back'
      duration: 2000,
      repeat: -1,
      yoyo: true,
    });

    // Key Bindings
    this.keyENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER,
    );
  };

  update = () => {
    if (this.keyENTER.isDown) {
      this.scene.start('Main');
    }
  };
}
