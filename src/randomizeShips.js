const randomizeShips = () => {
  const shipsArray = [];
  const availableCoordinates = [];
  for (let i = 0; i < 64; i += 1) availableCoordinates.push(i);

  const generateShipCoordinates = (coordinate, shipLength, nextCoordinateDifference) => {
    const shipCoordinates = [];
    for (let i = 0; i < shipLength; i += 1) shipCoordinates.push(coordinate + i * nextCoordinateDifference);
    return shipCoordinates;
  };

  const isShipPossible = (shipCoordinates) => {
    let status = true;
    const nextCoordinateDifference = shipCoordinates[1] - shipCoordinates[0];
    const determineRow = (coordinate) => Math.floor(coordinate / 8);
    const firstRow = determineRow(shipCoordinates[0]);

    shipCoordinates.forEach((coordinate) => {
      if (!availableCoordinates.includes(coordinate)) status = false;
      if (coordinate > 63 || coordinate < 0) status = false;
      if (nextCoordinateDifference === 1 && determineRow(coordinate) !== firstRow) status = false;
    });

    return status;
  };

  const addShip = (shipLength) => {
    let ship;
    const nextCoordinateDifference = Math.round(Math.random()) * 7 + 1;

    let shipStatus = false;
    while (!shipStatus) {
      const randomAvailableCoordinate = availableCoordinates[Math.floor(Math.random() * availableCoordinates.length)];
      const currentShip = generateShipCoordinates(randomAvailableCoordinate, shipLength, nextCoordinateDifference);
      ship = currentShip;
      if (isShipPossible(currentShip)) shipStatus = true;
    }

    ship.forEach((coordinate) => availableCoordinates.splice(availableCoordinates.indexOf(coordinate), 1));
    shipsArray.push(ship);
  };

  const shipsLengths = [5, 4, 3, 3, 2];
  shipsLengths.forEach((shipLength) => {
    addShip(shipLength);
  });

  return shipsArray;
};

export default randomizeShips;
