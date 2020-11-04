import Phaser from 'phaser';
import Entity from './Entities';
import PlayerLaser from './PlayerLaser';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player');
    // Player Speed
    this.setData('speed', 135);
    // Player's Animation
    this.play('sprPlayer');
    // The ability to shoot
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 80);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp = () => {
    this.body.velocity.y = -this.getData('speed');
  };

  moveDown = () => {
    this.body.velocity.y = this.getData('speed');
  };

  moveLeft = () => {
    this.body.velocity.x = -this.getData('speed');
  };

  moveRight = () => {
    this.body.velocity.x = this.getData('speed');
  };

  onDestroy = () => {
    this.scene.time.addEvent({
      // go to game over scene
      delay: 1000,
      callback() {
        // Stops the music
        this.scene.music.stop();
        // Start the next scene
        this.scene.scene.start('Score');
      },
      callbackScope: this,
      loop: false,
    });
  };

  update = () => {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    // Now this sets up the 'manual' timer for the shooting
    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
      } else {
        // when the "manual timer" is triggered:
        const laser = new PlayerLaser(this.scene, this.x, this.y);
        this.scene.playerLasers.add(laser);

        this.scene.sfx.laser.play(); // play the laser sound effect
        this.setData('timerShootTick', 0);
      }
    }
  };
}

export default Player;
