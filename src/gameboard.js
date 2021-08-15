import createShip from './ship';

const gameboard = () => {
  const ships = [];
  const addShip = (coordinates) => ships.push(createShip(coordinates));

  const missedAttacks = [];
  const getMissedAttacks = () => missedAttacks;

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

  const recieveAttack = (coordinate) => {
    if (isShipHit(coordinate)) {
      findShip(coordinate).hit(coordinate);
    } else missedAttacks.push(coordinate);
  };

  const areAllShipsSunk = () => {
    let status = true;
    ships.forEach((ship) => {
      if (!ship.isSunk()) status = false;
    });
    return status;
  };

  return { addShip, getMissedAttacks, recieveAttack, areAllShipsSunk };
};

export default gameboard;
