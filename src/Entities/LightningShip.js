import Phaser from 'phaser';
import Entity from './Entities';

class LightningShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'lightning', 'LightningShip');
    this.shipName = 'LIGHTNING';

    this.body.velocity.y = Phaser.Math.Between(200, 300);
    this.play('lightning');
  }
}

export default LightningShip;
