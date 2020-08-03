import enemyPoints from '../src/Scenes/helpers/enemyPoints';

describe('Will tests the point fucntionality of the enemies', () => {
  it('returns 0 to the main scene', () => {
    expect(enemyPoints('')).toBe(0);
  });

  it('returns 50 to the main scene', () => {
    expect(enemyPoints('UFO')).toBe(50);
  });

  it('returns 75 to the main scene', () => {
    expect(enemyPoints('SABOTEUR')).toBe(75);
  });

  it('returns 100 to the main scene', () => {
    expect(enemyPoints('TURTLE')).toBe(100);
  });

  it('returns 125 to the main scene', () => {
    expect(enemyPoints('LIGHTNING')).toBe(125);
  });

  it('returns 150 to the main scene', () => {
    expect(enemyPoints('NINJA')).toBe(150);
  });
});
