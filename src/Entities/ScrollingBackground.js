import config from '../Config/config';

class ScrollingBackground {
  constructor(scene, key) {
    this.scene = scene;
    this.key = key;
    this.createBackground();
  }

  createBackground = () => {
    this.stars = this.scene.add.tileSprite(
      0,
      0,
      config.width,
      config.height,
      this.key
    );
    this.stars.setOrigin(0, 0);
    this.stars.setScrollFactor(0);
  };

  update = () => {
    this.stars.tilePositionY -= 1;
  };
}

export default ScrollingBackground;
