import ship from '../ship';

describe('the ship', () => {
  it('should display coordinates when coordinates is called', () => {
    const coordinates = [4, 12, 20, 28, 36];
    const exampleShip = ship(coordinates);
    expect(exampleShip.coordinates).toBe(coordinates);
  });

  it('should return all hits when getHits is called', () => {
    const exampleShip = ship([5, 6, 7]);
    exampleShip.hit(7);
    exampleShip.hit(5);
    expect(exampleShip.getHits()).toContain(7);
    expect(exampleShip.getHits()).toContain(5);
  });

  describe('when isSunk is called', () => {
    it('should return false if ship is not sunk', () => {
      const exampleShip = ship([12, 13, 14, 15]);
      exampleShip.hit(12);
      exampleShip.hit(13);
      expect(exampleShip.isSunk()).toBe(false);
    });

    it('should return true if ship is sunk', () => {
      const exampleShip = ship([1, 2, 3]);
      exampleShip.hit(3);
      exampleShip.hit(2);
      exampleShip.hit(1);
      expect(exampleShip.isSunk()).toBe(true);
    });
  });
});
