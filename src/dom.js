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

  const addDotsForMisses = (canvas, ctx, missedAttacks) => {
    const gridLength = canvas.width / 8;
    const radius = Math.floor(canvas.width / 100);

    missedAttacks.forEach((coordinate) => {
      const row = Math.floor(coordinate / 8);
      const column = coordinate % 8;

      const centerX = column * gridLength + gridLength / 2;
      const cneterY = row * gridLength + gridLength / 2;

      ctx.beginPath();
      ctx.arc(centerX, cneterY, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#004A8F';
      ctx.fill();
    });
  };

  const addXForHits = (canvas, ctx, hits) => {
    const gridLength = canvas.width / 8;

    hits.forEach((coordinate) => {
      const row = Math.floor(coordinate / 8);
      const column = coordinate % 8;

      const beginningRow = row * gridLength;
      const endingRow = (row + 1) * gridLength;
      const beginningColumn = column * gridLength;
      const endingColumn = (column + 1) * gridLength;

      ctx.beginPath();
      ctx.moveTo(beginningColumn, beginningRow);
      ctx.lineTo(endingColumn, endingRow);
      ctx.moveTo(beginningColumn, endingRow);
      ctx.lineTo(endingColumn, beginningRow);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.stroke();
    });
  };

  const addHorizontalShipWithColor = (gridLength, ctx, startingCoordinate, shipLength, color) => {
    const row = Math.floor(startingCoordinate / 8);
    const column = startingCoordinate % 8;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(column * gridLength, row * gridLength, gridLength * shipLength, gridLength);
    ctx.stroke();
  };

  const addVerticalShipWithColor = (gridLength, ctx, startingCoordinate, shipLength, color) => {
    const row = Math.floor(startingCoordinate / 8);
    const column = startingCoordinate % 8;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(column * gridLength, row * gridLength, gridLength, gridLength * shipLength);
    ctx.stroke();
  };

  const addShipWithColor = (gridLength, ctx, coordinates, color) => {
    if (coordinates[1] - coordinates[0] === 1) {
      addHorizontalShipWithColor(gridLength, ctx, coordinates[0], coordinates.length, color);
    } else {
      addVerticalShipWithColor(gridLength, ctx, coordinates[0], coordinates.length, color);
    }
  };

  const addBlueShipsForShips = (canvas, ctx, ships) => {
    const gridLength = canvas.width / 8;

    ships.forEach((coordinates) => {
      addShipWithColor(gridLength, ctx, coordinates, '#004A8F');
    });
  };

  const addRedShipsForSunkenShips = (canvas, ctx, sunkenShips) => {
    const gridLength = canvas.width / 8;

    sunkenShips.forEach((coordinates) => {
      addShipWithColor(gridLength, ctx, coordinates, 'red');
    });
  };

  const displayPlayer = (gameboard) => {
    const canvas = document.getElementById('playerBoard');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addDotsForMisses(canvas, ctx, gameboard.getGameboardInfo().missedAttacks);
    addBlueShipsForShips(canvas, ctx, gameboard.getGameboardInfo().ships);
    addXForHits(canvas, ctx, gameboard.getGameboardInfo().hits);
    addRedShipsForSunkenShips(canvas, ctx, gameboard.getGameboardInfo().sunkenShips);
    addGridLines(canvas, ctx);
  };

  const displayComputer = (gameboard, hoverCoordinate) => {
    const canvas = document.getElementById('computerBoard');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    addHoverEffect(canvas, ctx, hoverCoordinate);
    addDotsForMisses(canvas, ctx, gameboard.getGameboardInfo().missedAttacks);
    addXForHits(canvas, ctx, gameboard.getGameboardInfo().hits);
    addRedShipsForSunkenShips(canvas, ctx, gameboard.getGameboardInfo().sunkenShips);
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
    boards.displayComputer(computerGameboard, coordinate);
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
