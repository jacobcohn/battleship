import CreateGameboard from './gameboard';
import randomizeShips from './randomizeShips';
import CreatePlayer from './player';
import CreateComputer from './computer';
import dom from './dom';

const logic = (() => {
  let player;
  let computer;

  const init = () => {
    const addRandomShipsToGameboard = (gameboard) => {
      const randomShips = randomizeShips();
      randomShips.forEach((ship) => gameboard.addShip(ship));
    };

    const playerGameboard = CreateGameboard();
    const computerGameboard = CreateGameboard();
    addRandomShipsToGameboard(playerGameboard);
    addRandomShipsToGameboard(computerGameboard);

    player = CreatePlayer(computerGameboard);
    computer = CreateComputer(playerGameboard);
  };

  const gameLoop = (playerAttackCoordinate) => {
    player.sendAttack(playerAttackCoordinate);
    if (player.didWin()) {
      dom.displayWinner('Player');
      return;
    }
    computer.sendAttack();
    if (computer.didWin()) dom.displayWinner('Computer');
  };

  return { init, gameLoop };
})();

export default logic;
