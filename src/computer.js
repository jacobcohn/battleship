const CreateComputer = (enemyGameboard) => {
  const linesOfHitsInfo = {
    moreThanOneLine: false,
    currentLine: null,
  };

  const randomCoordinate = (gameboardInfo) => {
    const index = Math.floor(Math.random() * gameboardInfo.possibleAttacks.length);
    return gameboardInfo.possibleAttacks[index];
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

  const sortArray = (hitsArray) => hitsArray.sort((a, b) => a - b);

  const isSingleLine = (hitsArray) => {
    const sortedHitsArray = sortArray(hitsArray);
    const initialDifference = sortedHitsArray[1] - sortedHitsArray[0];

    let status = true;
    let currentCoordinate = sortedHitsArray[0];
    sortedHitsArray.forEach((coordinate) => {
      if (coordinate !== currentCoordinate) status = false;
      currentCoordinate += initialDifference;
    });

    return status;
  };

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

  const resetLinesOfHitsInfo = () => {
    linesOfHitsInfo.moreThanOneLine = false;
    linesOfHitsInfo.currentLine = null;
  };

  const singleLineCoordinate = (gameboardInfo) => {
    const lineOfHits = sortArray(gameboardInfo.hits);
    const onLineCoordinates = getPossibleOnLineCoordinates(lineOfHits, gameboardInfo.possibleAttacks);
    if (onLineCoordinates.length) return addCoordinateToLine(onLineCoordinates);
    return adjacentAndPerpendicularCoordinate(lineOfHits, gameboardInfo.possibleAttacks);
  };

  const multipleLinesCoordinate = (gameboardInfo) => {
    const lineOfHits = sortArray(linesOfHitsInfo.currentLine);
    const onLineCoordinates = getPossibleOnLineCoordinates(lineOfHits, gameboardInfo.possibleAttacks);
    const finalCoordinate = addCoordinateToLine(onLineCoordinates);
    linesOfHitsInfo.currentLine.push(finalCoordinate);
    return finalCoordinate;
  };

  const getCoordinate = () => {
    const gameboardInfo = enemyGameboard.getGameboardInfo();
    if (!gameboardInfo.hits.length) return randomCoordinate(gameboardInfo);
    if (gameboardInfo.hits.length === 1) return secondCoordinate(gameboardInfo);
    if (isSingleLine(gameboardInfo.hits)) {
      resetLinesOfHitsInfo();
      return singleLineCoordinate(gameboardInfo);
    }
    return multipleLinesCoordinate(gameboardInfo);
  };

  const sendAttack = () => {
    const coordinate = getCoordinate();
    enemyGameboard.recieveAttack(coordinate);
  };
  const didWin = () => enemyGameboard.getGameboardInfo().areShipsSunk;

  return { sendAttack, didWin };
};

export default CreateComputer;
