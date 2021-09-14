const boards = (() => {
  const displayPlayer = () => {};
  const displayComputer = () => {};

  return { displayPlayer, displayComputer };
})();

const dom = (() => {
  let playerGameboard;
  let computerGameboard;
  let canvasLength;

  const recieveGameboards = (givenPlayerGameboard, givenComputerGameboard) => {
    playerGameboard = givenPlayerGameboard;
    computerGameboard = givenComputerGameboard;
  };

  const fixCanvasDimensions = () => {
    const playerBoard = document.getElementById('playerBoard');
    playerBoard.height = playerBoard.width;
    const computerBoard = document.getElementById('computerBoard');
    computerBoard.height = computerBoard.width;

    canvasLength = playerBoard.height;
  };

  const hoverEffect = () => {};

  const displayBoards = () => {
    boards.displayPlayer(playerGameboard, canvasLength);
    boards.displayComputer(computerGameboard, canvasLength);
  };

  const displayWinner = () => {
    // code here
  };

  const init = () => {
    fixCanvasDimensions();
    displayBoards();
  };

  return { recieveGameboards, displayBoards, hoverEffect, displayWinner, init };
})();

export default dom;
