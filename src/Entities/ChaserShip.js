import Entity from './Entities';

class ChaserShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy1', 'ChaserShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
  }
}

export default ChaserShip;
