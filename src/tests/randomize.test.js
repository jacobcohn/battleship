import randomize from '../randomize';

describe('randomize should return array with all ships', () => {
  it('having the correct length', () => {
    const shipsArray = randomize();

    const shipsLengths = [];
    shipsArray.forEach((ship) => shipsLengths.push(ship.length));

    expect(shipsLengths.sort((a, b) => a - b)).toEqual([2, 3, 3, 4, 5]);
  });

  it('having different possible coordinates', () => {
    const shipsArray = randomize();

    const coordinates = [];
    shipsArray.forEach((ship) => {
      ship.forEach((coordinate) => coordinates.push(coordinate));
    });

    let lastCoordinate;
    let isDifferentCoordinates = true;
    let isWholeNumber = true;
    let isOnGameboard = true;

    const sortedCoordinates = coordinates.sort((a, b) => a - b);
    sortedCoordinates.forEach((coordinate) => {
      if (coordinate === lastCoordinate) isDifferentCoordinates = false;
      if (coordinate % 1 !== 0) isWholeNumber = false;
      lastCoordinate = coordinate;
    });
    if (sortedCoordinates[0] < 0 || sortedCoordinates[sortedCoordinates.length - 1] > 63) isOnGameboard = false;

    expect(isDifferentCoordinates).toBe(true);
    expect(isWholeNumber).toBe(true);
    expect(isOnGameboard).toBe(true);
  });

  it('being in a straight line', () => {
    const shipsArray = randomize();

    const determineRow = (coordinate) => Math.floor(coordinate / 8);
    const determineColumn = (coordinate) => coordinate % 8;
    let status = true;

    shipsArray.forEach((ship) => {
      let isLine = true;
      const shipsCoordinatesSorted = ship.sort((a, b) => a - b);
      const nextCoordinateDifference = shipsCoordinatesSorted[1] - shipsCoordinatesSorted[0];

      if (nextCoordinateDifference === 1) {
        shipsCoordinatesSorted.forEach((coordinate) => {
          const firstRow = determineRow(shipsCoordinatesSorted[0]);
          if (determineRow(coordinate) !== firstRow) isLine = false;
        });
      } else {
        shipsCoordinatesSorted.forEach((coordinate) => {
          const firstColumn = determineColumn(shipsCoordinatesSorted[0]);
          if (determineColumn(coordinate) !== firstColumn) isLine = false;
        });
      }

      let predictedCoordinate = shipsCoordinatesSorted[0];
      shipsCoordinatesSorted.forEach((coordinate) => {
        if (predictedCoordinate !== coordinate) isLine = false;
        predictedCoordinate += nextCoordinateDifference;
      });

      if (!isLine) status = false;
    });

    expect(status).toBe(true);
  });
});
