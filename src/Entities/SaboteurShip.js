import Phaser from 'phaser';
import Entity from './Entities';

class SaboteurShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'saboteur', 'SaboteurShip');
    this.shipName = 'SABOTEUR';

    this.body.velocity.y = Phaser.Math.Between(100, 200);
    this.play('saboteur');
  }
}

export default SaboteurShip;
