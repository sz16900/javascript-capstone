import Entity from './Entities';
import EnemyLaser from '../Entities/EnemyLaser';

class GunShip extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'sprEnemy0', 'GunShip');
    this.body.velocity.y = Phaser.Math.Between(50, 100);

    // Create an Event
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: function () {
        var laser = new EnemyLaser(this.scene, this.x, this.y);
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });

    this.play('sprEnemy0');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}
export default GunShip;
