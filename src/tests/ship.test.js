import ship from '../ship';

describe('ship functions', () => {
  test('isSunk false', () => {
    const exampleShip = ship([12, 13, 14, 15]);
    exampleShip.hit(12);
    exampleShip.hit(13);
    expect(exampleShip.isSunk()).toBe(false);
  });

  test('isSunk true', () => {
    const exampleShip = ship([1, 2, 3]);
    exampleShip.hit(3);
    exampleShip.hit(2);
    exampleShip.hit(1);
    expect(exampleShip.isSunk()).toBe(true);
  });
});
