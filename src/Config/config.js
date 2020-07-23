import 'phaser';

export default {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [],
  pixelArt: true,
  roundPixels: true,
};
