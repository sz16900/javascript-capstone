import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import MainMenuScene from './Scenes/MainMenuScene';
import MainScene from './Scenes/MainScene';
import GameOverScene from './Scenes/GameOverScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = { score: 0, gameID: '' };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('MainMenu', MainMenuScene);
    this.scene.add('Main', MainScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    // This thing should be called maybe when the play buttin is triggered
    this.scene.start('Boot');
  }
}

window.game = new Game();
