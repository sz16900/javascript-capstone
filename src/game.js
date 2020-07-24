import Phaser from 'phaser';
import config from './Config/config';
// import MainMenuScene from './Scenes/MainMenuScene';
import MainScene from './Scenes/MainScene';
// import GameOverScene from './Scenes/GameOverScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    // this.scene.add('MainMenu', MainMenuScene);
    this.scene.add('Main', MainScene);

    // This thing should be called maybe when the play buttin is triggered
    this.scene.start('Main');

    // this.scene.add('GameOver', GameOverScene);
  }
}

window.game = new Game();
