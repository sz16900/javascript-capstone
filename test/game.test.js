import startGameMock from './startGameMock';
import 'jest-canvas-mock';

let game;
beforeEach(() => {
  game = startGameMock();
});

describe('Initializtion of game with config default values:', () => {
  it('should return an object as an initialization', () => {
    expect(typeof game).toBe('object');
  });
  it('should not be running', () => {
    expect(game.isRunning).toBe(false);
  });
  it('should be booted', () => {
    expect(game.isBooted).toBe(true);
  });
  it('returns true for proper height', () => {
    expect(game.config.height).toBe(600);
  });
  it('returns true for proper width', () => {
    expect(game.config.width).toBe(800);
  });
});
