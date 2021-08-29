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
    adjacentCoordinates.push(hitCoordinate - 8);
    adjacentCoordinates.push(hitCoordinate + 8);

    const possibleAdjacentCoordinates = adjacentCoordinates.filter((coordinate) =>
      gameboardInfo.possibleAttacks.includes(coordinate),
    );
    const index = Math.floor(Math.random() * possibleAdjacentCoordinates.length);

    return possibleAdjacentCoordinates[index];
  };

  const addCoordinateToLine = (gameboardInfo) => {
    const sortedHits = gameboardInfo.hits.sort((a, b) => a - b);
    const nextCoordinateDistance = sortedHits[1] - sortedHits[0];
    const onLineCoordinates = [];

    onLineCoordinates.push(sortedHits[0] - nextCoordinateDistance);
    onLineCoordinates.push(sortedHits[sortedHits.length - 1] + nextCoordinateDistance);

    const possibleOnLineCoordinates = onLineCoordinates.filter(
      (coordinate) =>
        gameboardInfo.possibleAttacks.includes(coordinate) &&
        (nextCoordinateDistance === 8 || determineRow(coordinate) === determineRow(sortedHits[0])),
    );

    const index = Math.floor(Math.random() * possibleOnLineCoordinates.length);
    return possibleOnLineCoordinates[index];
  };

  const getCoordinate = () => {
    const gameboardInfo = enemyGameboard.getGameboardInfo();
    if (!gameboardInfo.hits.length) return randomCoordinate(gameboardInfo);
    if (gameboardInfo.hits.length === 1) return secondCoordinate(gameboardInfo);
    return addCoordinateToLine(gameboardInfo);
  };

  const sendAttack = () => {
    const coordinate = getCoordinate();
    enemyGameboard.recieveAttack(coordinate);
  };

  return { sendAttack };
};

export default CreateComputer;
