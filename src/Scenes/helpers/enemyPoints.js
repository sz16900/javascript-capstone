// import UfoShip from '../src/Entities/UfoShip';
// import TurtleShip from '../src/Entities/TurtleShip';
// import SaboteurShip from '../src/Entities/SaboteurShip';
// import LightningShip from '../src/Entities/LightningShip';
// import NinjaShip from '../src/Entities/NinjaShip';

const enemyPoints = (enemy) => {
  if (enemy === 'TURTLE') {
    return 100;
  }
  if (enemy === 'SABOTEUR') {
    return 75;
  }
  if (enemy === 'LIGHTNING') {
    return 125;
  }
  if (enemy === 'NINJA') {
    return 150;
  }
  if (enemy === 'UFO') {
    return 50;
  }
  return 0;
};

export default enemyPoints;
