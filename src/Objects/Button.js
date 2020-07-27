import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, keyDown, keyOver, keyUp, text, targetScene) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.button = this.scene.add.sprite(0, 0, keyUp).setInteractive();
    this.text = this.scene.add.text(0, 0, text, {
      // fontSize: '32px',
      // fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      this.button.setTexture(keyDown);
      this.scene.sound.play('sndBtnDown');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(keyUp);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(keyOver);
      this.scene.sound.play('sndBtnOver');
    });

    this.button.on('pointerup', () => {
      this.button.setTexture(keyUp);
      this.scene.scene.start(targetScene);
    });

    this.scene.add.existing(this);
  }
}
