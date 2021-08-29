const CreateComputer = (enemyGameboard) => {
  const remainder = Math.floor(Math.random());

  const randomCoordinate = (gameboardInfo) => {
    const possibleAttacksWithRemainder = gameboardInfo.possibleAttacks.filter(
      (coordinate) => coordinate % 2 === remainder,
    );
    const index = Math.floor(Math.random() * possibleAttacksWithRemainder.length);
    return possibleAttacksWithRemainder[index];
  };

  const determineRow = (coordinate) => Math.floor(coordinate / 8);

  const secondCoordinate = (gameboardInfo) => {
    const hitCoordinate = gameboardInfo.hits[0];
    const hitCoordinateRow = determineRow(hitCoordinate);

    const adjacentCoordinates = [];
    if (determineRow(hitCoordinate - 1) === hitCoordinateRow) adjacentCoordinates.push(hitCoordinate - 1);
    if (determineRow(hitCoordinate + 1) === hitCoordinateRow) adjacentCoordinates.push(hitCoordinate + 1);
    if (hitCoordinate - 8 > 0) adjacentCoordinates.push(hitCoordinate - 8);
    if (hitCoordinate + 8 < 63) adjacentCoordinates.push(hitCoordinate + 8);

    const possibleAdjacentCoordinates = adjacentCoordinates.filter((coordinate) =>
      gameboardInfo.possibleAttacks.includes(coordinate),
    );
    const index = Math.floor(Math.random() * possibleAdjacentCoordinates.length);

    return possibleAdjacentCoordinates[index];
  };

  const getCoordinate = () => {
    const gameboardInfo = enemyGameboard.getGameboardInfo();
    if (!gameboardInfo.hits.length) return randomCoordinate(gameboardInfo);
    return secondCoordinate(gameboardInfo);
  };

  const sendAttack = () => {
    const coordinate = getCoordinate();
    enemyGameboard.recieveAttack(coordinate);
  };

  return { sendAttack };
};

export default CreateComputer;
