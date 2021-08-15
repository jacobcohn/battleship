const ship = (coordinates) => {
  const hits = [];

  const getHits = () => hits;
  const hit = (coordinate) => hits.push(coordinate);
  const isSunk = () => hits.length === coordinates.length;

  return { coordinates, getHits, hit, isSunk };
};

export default ship;
