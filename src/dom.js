const boards = (() => {
  const addHoverEffect = (canvas, ctx, coordinate) => {
    if (coordinate === -1) return;

    const gridLength = canvas.width / 8;
    const row = Math.floor(coordinate / 8);
    const column = coordinate % 8;

    ctx.beginPath();
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(column * gridLength, row * gridLength, gridLength, gridLength);
    ctx.stroke();
  };

  const addGridLines = (canvas, ctx) => {
    const gridLength = canvas.width / 8;

    for (let i = 1; i < 8; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * gridLength, 0);
      ctx.lineTo(i * gridLength, canvas.width);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }

    for (let i = 1; i < 8; i += 1) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridLength);
      ctx.lineTo(canvas.width, i * gridLength);
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#000000';
      ctx.stroke();
    }
  };

  const displayPlayer = (gameboard) => {
    const canvas = document.getElementById('playerBoard');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addGridLines(canvas, ctx);
  };

  const displayComputer = (gameboard, hoverCoordinate) => {
    const canvas = document.getElementById('computerBoard');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addHoverEffect(canvas, ctx, hoverCoordinate);
    addGridLines(canvas, ctx);
  };

  return { displayPlayer, displayComputer };
})();

const dom = (() => {
  let playerGameboard;
  let computerGameboard;

  const recieveGameboards = (givenPlayerGameboard, givenComputerGameboard) => {
    playerGameboard = givenPlayerGameboard;
    computerGameboard = givenComputerGameboard;
  };

  const fixCanvasDimensions = () => {
    const playerBoard = document.getElementById('playerBoard');
    playerBoard.height = playerBoard.width;
    const computerBoard = document.getElementById('computerBoard');
    computerBoard.height = computerBoard.width;
  };

  const hoverEffect = (coordinate) => {
    boards.displayComputer(playerGameboard, coordinate);
  };

  const displayBoards = () => {
    boards.displayPlayer(playerGameboard, -1);
    boards.displayComputer(computerGameboard);
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
