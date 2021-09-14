import logic from './logic';
import dom from './dom';

const events = (() => {
  const computerBoard = document.getElementById('computerBoard');

  const convertXYtoCoordinate = (squareLength, x, y) => {
    const gridLength = squareLength / 8;
    const row = Math.floor(Math.abs(y) / gridLength);
    const column = Math.floor(Math.abs(x) / gridLength);
    return row * 8 + column;
  };

  const getCoordinate = (event) => {
    const rect = computerBoard.getBoundingClientRect();
    const squareLength = rect.width;
    const x = event.x - rect.left;
    const y = event.y - rect.top;
    return convertXYtoCoordinate(squareLength, x, y);
  };

  const hoverComputerBoard = () => {
    computerBoard.addEventListener('mousemove', (event) => {
      const coordinate = getCoordinate(event);
      if (!logic.isCoordinatePossibleAttack(coordinate)) return;
      dom.hoverEffect(coordinate);
    });
  };

  const clickComputerBoard = () => {
    computerBoard.addEventListener('click', (event) => {
      const coordinate = getCoordinate(event);
      if (!logic.isCoordinatePossibleAttack(coordinate)) return;
      logic.gameLoop(coordinate);
      dom.displayBoards();
    });
  };

  const clickNewGameBtn = () => {
    document.getElementById('gOMNewGameBtn').addEventListener('click', () => window.location.reload());
  };

  const init = () => {
    hoverComputerBoard();
    clickComputerBoard();
    clickNewGameBtn();
  };

  return { init };
})();

export default events;
