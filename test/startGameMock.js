import 'jest-canvas-mock';

import Phaser from 'phaser';

import BootScene from '../src/Scenes/BootScene';
import PreloaderScene from '../src/Scenes/BootScene';
import MainMenuScene from '../src/Scenes/BootScene';
import MainScene from '../src/Scenes/BootScene';
import LeaderBoardScene from '../src/Scenes/BootScene';
import ScoreScene from '../src/Scenes/BootScene';
import PauseScene from '../src/Scenes/BootScene';
import config from '../src/Config/config';

const startGameMock = () => {
  config.scene = [
    BootScene,
    MainMenuScene,
    MainScene,
    LeaderBoardScene,
    PreloaderScene,
    LeaderBoardScene,
    ScoreScene,
    PauseScene,
  ];
  const game = new Phaser.Game(config);
  return game;
};

export default startGameMock;
