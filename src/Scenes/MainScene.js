import Phaser from 'phaser';
import Player from '../Entities/Player';
import GunShip from '../Entities/GunShip';
import ChaserShip from '../Entities/ChaserShip';
import CarrierShip from '../Entities/CarrierShip';
import ScrollingBackground from '../Entities/ScrollingBackground';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Main' });
  }

  create() {
    // Add music background
    this.music = this.sound.add('sndBgMain', 1, true);
    this.music.lop = true;
    this.music.play();
    // this.shipSFX = this.sound.add('sndPlayerMove');

    // Add the starry background
    this.backgrounds = [];
    for (let i = 0; i < 2; i += 1) {
      const keys = ['starfield', 'nebulae'];
      const bg = new ScrollingBackground(this, keys[i]);
      this.backgrounds.push(bg);
    }

    // Create the Score on the top right corner
    this.score = this.sys.game.globals.score;
    this.leaderBoard = this.add
      .bitmapText(10, 10, 'arcade', `Score: ${this.score}`, 14)
      .setTint(0xffffff);

    //   Create some Animations
    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprExplosionPlayer',
      frames: this.anims.generateFrameNumbers('sprExplosionPlayer'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprExplosionLaser',
      frames: this.anims.generateFrameNumbers('sprExplosionLaser'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'sprPlayer',
      frames: this.anims.generateFrameNumbers('sprPlayer'),
      frameRate: 20,
      repeat: -1,
    });

    // Give it sound effects
    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
        this.sound.add('sndExplode2'),
        this.sound.add('sndExplode3'),
      ],
      laser: this.sound.add('sndLaser'),
    };

    // Create the Player
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );
    // this resizes the player
    this.player.setScale(1.7);

    // Create Key Bindings
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    // Add Enemy / Groups
    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    // Add a timer / event
    this.time.addEvent({
      delay: 1000,
      // the anonymous function?
      callback() {
        // This anonymous function spawns the enemies depending...
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new GunShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('ChaserShip').length < 5) {
            enemy = new ChaserShip(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new CarrierShip(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
          this.enemies.add(enemy);
        }

        // enemy destroyed uppon collision with laser
        this.physics.add.collider(
          this.playerLasers,
          this.enemies,
          (playerLaser, enemy) => {
            if (enemy) {
              if (enemy.onDestroy !== undefined) {
                this.score += 50;
                this.leaderBoard.setText(`SCORE: ${this.score}`);
                enemy.onDestroy();
              }
              enemy.explode(true, 'sprExplosion');
              playerLaser.destroy();
            }
          },
        );

        // player destroyed upon collision with laser
        this.physics.add.collider(
          this.enemyLasers,
          this.player,
          (enemyLasers, player) => {
            if (player) {
              if (player.onDestroy !== undefined) {
                player.onDestroy();
              }
              player.explode(false, 'sprExplosionPlayer');
              player.onDestroy();
              enemyLasers.destroy();
              this.sys.game.globals.score = this.score;
            }
          },
        );

        // laser destroyed upon collision with laser
        this.physics.add.collider(
          this.enemyLasers,
          this.playerLasers,
          (enemyLaser, playerLaser) => {
            if (playerLaser) {
              this.score += 5;
              this.leaderBoard.setText(`SCORE: ${this.score}`);
              playerLaser.explode(false, 'sprExplosionLaser');
              enemyLaser.destroy();
            }
          },
        );

        // player destroyed upon overlap
        this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
          if (!player.getData('isDead') && !enemy.getData('isDead')) {
            player.explode(false, 'sprExplosionPlayer');
            player.onDestroy();
            enemy.explode(true, 'sprExplosion');
            this.sys.game.globals.score = this.score;
          }
        });
      },
      callbackScope: this,
      loop: true,
    });
  }

  // create Frustum Culling for performance
  analyzeFrutumCulling() {
    // checks in the array of enemies to delete them
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();

      if (
        enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight
      ) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    // Check for enemy lasers
    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    // Check for player lasers
    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (
        laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight
      ) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }

  update() {
    this.player.update();

    // Movement code
    if (!this.player.getData('isDead')) {
      this.player.update();
      if (this.keyW.isDown) {
        // Play engine sound when press up
        // this.shipSFX.play();
        this.player.moveUp();
      } else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      } else if (this.keyD.isDown) {
        this.player.moveRight();
      }

      if (this.keySpace.isDown) {
        this.player.setData('isShooting', true);
      } else {
        this.player.setData(
          'timerShootTick',
          this.player.getData('timerShootDelay') - 1,
        );
        this.player.setData('isShooting', false);
      }
    }

    // to update enemies in the this.enemies group
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];

      enemy.update();
    }

    this.analyzeFrutumCulling();

    // Call the backgrund update
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }

  // In order to spawn the chase ship
  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
}

export default MainScene;
