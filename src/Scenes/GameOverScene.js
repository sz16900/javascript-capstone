import Phaser from 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';
import ScrollingBackground from '../Entities/ScrollingBackground';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' });
  }

  create() {
    // Add the starry background
    this.backgrounds = [];
    for (let i = 0; i < 2; i += 1) {
      const keys = ['starfield', 'nebulae'];
      const bg = new ScrollingBackground(this, keys[i]);
      this.backgrounds.push(bg);
    }

    // Add the text
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.sfx = {
      btnOver: this.sound.add('sndBtnOver'),
      btnDown: this.sound.add('sndBtnDown'),
    };

    this.gameButton = new Button(
      this,
      config.width * 0.5,
      config.height * 0.5,
      'sprBtnRestartDown',
      'sprBtnRestartHover',
      'sprBtnRestart',
      '',
      'Main',
    );
  }

  update() {
    // Call the backgrund update
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}

export default GameOverScene;
