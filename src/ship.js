const ship = (coordinates) => {
  const details = {
    length: coordinates.length,
    coordinates,
    hitArray: [],
    isSunk: false,
  };

  const hit = (coordinate) => details.hitArray.push(coordinate);
  const isSunk = () => details.hitArray.length === details.length;

  return { hit, isSunk };
};

export default ship;
