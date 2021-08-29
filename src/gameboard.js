import CreateShip from './ship';

const CreateGameboard = () => {
  const ships = [];
  const addShip = (coordinates) => ships.push(CreateShip(coordinates));

  const gameboardInfo = {
    missedAttacks: [],
    sunkenShips: [],
    hits: [],
    possibleAttacks: [],
    allShipsSunk: false,
  };
  for (let i = 0; i < 64; i += 1) gameboardInfo.possibleAttacks.push(i);
  const getGameboardInfo = () => gameboardInfo;

  const isShipHit = (coordinate) => {
    let status = false;
    ships.forEach((ship) => {
      if (ship.coordinates.includes(coordinate)) status = true;
    });
    return status;
  };

  const findShip = (coordinate) => {
    let specificShip;
    ships.forEach((ship) => {
      if (ship.coordinates.includes(coordinate)) specificShip = ship;
    });
    return specificShip;
  };

  const areAllShipsSunk = () => {
    let status = true;
    ships.forEach((ship) => {
      if (!ship.isSunk()) status = false;
    });
    return status;
  };

  const recieveAttack = (coordinate) => {
    if (isShipHit(coordinate)) {
      const hitShip = findShip(coordinate);
      hitShip.hit(coordinate);

      gameboardInfo.hits.push(coordinate);
      if (hitShip.isSunk()) {
        gameboardInfo.sunkenShips.push(hitShip.coordinates);
        hitShip.coordinates.forEach((shipCoordinate) => {
          const index = gameboardInfo.hits.indexOf(shipCoordinate);
          gameboardInfo.hits.splice(index, 1);
        });
      }
    } else {
      gameboardInfo.missedAttacks.push(coordinate);
    }
    gameboardInfo.allShipsSunk = areAllShipsSunk();
    const index = gameboardInfo.possibleAttacks.indexOf(coordinate);
    gameboardInfo.possibleAttacks.splice(index, 1);
  };

  return { addShip, recieveAttack, getGameboardInfo };
};

export default CreateGameboard;
