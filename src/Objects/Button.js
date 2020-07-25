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

    this.button.on(
      'pointerdown',
      function () {
        this.button.setTexture(keyDown);
        this.scene.sound.play('sndBtnDown');
      }.bind(this)
    );

    this.button.on(
      'pointerout',
      function () {
        this.button.setTexture(keyUp);
      }.bind(this)
    );

    this.button.on(
      'pointerover',
      function () {
        this.button.setTexture(keyOver);
        this.scene.sound.play('sndBtnOver');
      }.bind(this)
    );

    this.button.on(
      'pointerup',
      function () {
        this.button.setTexture(keyUp);
        this.scene.scene.start(targetScene);
      }.bind(this)
    );

    this.scene.add.existing(this);
    console.log(this.scene);
  }

  preload() {}
}
