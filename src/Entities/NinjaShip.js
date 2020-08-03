import Phaser from 'phaser';
import Entity from './Entities';

class NinjaShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'ninja', 'NinjaShip');
    this.shipName = 'NINJA';

    this.body.velocity.y = Phaser.Math.Between(400, 500);
    this.play('ninja');
  }
}

export default NinjaShip;
