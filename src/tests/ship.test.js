import CreateShip from '../ship';

describe('the ship', () => {
  it('should display coordinates when coordinates is called', () => {
    const coordinates = [4, 12, 20, 28, 36];
    const ship = CreateShip(coordinates);
    expect(ship.coordinates).toBe(coordinates);
  });

  it('should return all hits when getHits is called', () => {
    const ship = CreateShip([5, 6, 7]);
    ship.hit(7);
    ship.hit(5);
    expect(ship.getHits()).toContain(7);
    expect(ship.getHits()).toContain(5);
  });

  describe('when isSunk is called', () => {
    it('should return false if ship is not sunk', () => {
      const ship = CreateShip([12, 13, 14, 15]);
      ship.hit(12);
      ship.hit(13);
      expect(ship.isSunk()).toBe(false);
    });

    it('should return true if ship is sunk', () => {
      const ship = CreateShip([1, 2, 3]);
      ship.hit(3);
      ship.hit(2);
      ship.hit(1);
      expect(ship.isSunk()).toBe(true);
    });
  });
});
