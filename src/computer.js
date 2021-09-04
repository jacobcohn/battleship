const CreateComputer = (enemyGameboard) => {
  const remainder = Math.floor(Math.random());
  const linesOfHitsInfo = {
    moreThanOneLine: false,
    currentLine: null,
  };

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

  const sortSingleLine = (gameboardInfo) => gameboardInfo.hits.sort((a, b) => a - b);

  const getPossibleOnLineCoordinates = (lineOfHits, possibleAttacks) => {
    const nextCoordinateDistance = lineOfHits[1] - lineOfHits[0];
    const onLineCoordinates = [];

    onLineCoordinates.push(lineOfHits[0] - nextCoordinateDistance);
    onLineCoordinates.push(lineOfHits[lineOfHits.length - 1] + nextCoordinateDistance);

    const possibleOnLineCoordinates = onLineCoordinates.filter(
      (coordinate) =>
        possibleAttacks.includes(coordinate) &&
        (nextCoordinateDistance === 8 || determineRow(coordinate) === determineRow(lineOfHits[0])),
    );

    return possibleOnLineCoordinates;
  };

  const addCoordinateToLine = (possibleOnLineCoordinates) => {
    const index = Math.floor(Math.random() * possibleOnLineCoordinates.length);
    return possibleOnLineCoordinates[index];
  };

  const adjacentAndPerpendicularCoordinate = (lineOfHits, possibleAttacks) => {
    const distanceBetweenCurrentLine = lineOfHits[1] - lineOfHits[0];
    let distanceBetweenNewLine;
    if (distanceBetweenCurrentLine !== 1) {
      distanceBetweenNewLine = 1;
    } else distanceBetweenNewLine = 8;

    const adjacentCoordinates = [];
    lineOfHits.forEach((coordinate) => {
      adjacentCoordinates.push([coordinate - distanceBetweenNewLine, coordinate]);
      adjacentCoordinates.push([coordinate + distanceBetweenNewLine, coordinate]);
    });

    const possibleAdjacentCoordinates = adjacentCoordinates.filter(
      (array) =>
        possibleAttacks.includes(array[0]) &&
        (distanceBetweenNewLine === 8 || determineRow(array[0]) === determineRow(array[1])),
    );

    const index = Math.floor(Math.random() * possibleAdjacentCoordinates.length);
    linesOfHitsInfo.moreThanOneLine = true;
    linesOfHitsInfo.currentLine = possibleAdjacentCoordinates[index];
    return possibleAdjacentCoordinates[index][0];
  };

  const getCoordinate = () => {
    const gameboardInfo = enemyGameboard.getGameboardInfo();
    if (!gameboardInfo.hits.length) return randomCoordinate(gameboardInfo);
    if (gameboardInfo.hits.length === 1) return secondCoordinate(gameboardInfo);

    const lineOfHits = sortSingleLine(gameboardInfo);
    const onLineCoordinates = getPossibleOnLineCoordinates(lineOfHits, gameboardInfo.possibleAttacks);
    if (onLineCoordinates.length) return addCoordinateToLine(onLineCoordinates);
    return adjacentAndPerpendicularCoordinate(lineOfHits, gameboardInfo.possibleAttacks);
  };

  const sendAttack = () => {
    const coordinate = getCoordinate();
    enemyGameboard.recieveAttack(coordinate);
  };

  return { sendAttack };
};

export default CreateComputer;
