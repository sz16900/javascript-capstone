import Phaser from 'phaser';

export default {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
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
