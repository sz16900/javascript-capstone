import '../assets/css/main.css';

import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import MainMenuScene from './Scenes/MainMenuScene';
import MainScene from './Scenes/MainScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';
import ScoreScene from './Scenes/ScoreScene';
import PauseScene from './Scenes/PauseScene';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.globals = { score: 0, gameID: '' };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('MainMenu', MainMenuScene);
    this.scene.add('Main', MainScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('Score', ScoreScene);
    this.scene.add('Pause', PauseScene);
    // This thing should be called maybe when the play buttin is triggered
    this.scene.start('Boot');
  }
}

window.game = new Game();
