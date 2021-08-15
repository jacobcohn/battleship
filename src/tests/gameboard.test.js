import ship from '../ship';
import gameboard from '../gameboard';

jest.mock('ship');

describe('the gameboard', () => {
  it('should call ship when add ship is called', () => {
    const coordinates = [0, 1, 2];
    const shipMockFunction = jest.fn();
    ship.mockImplementation((args) => shipMockFunction(args));

    const exampleGameboard = gameboard();
    exampleGameboard.addShip(coordinates);

    expect(shipMockFunction).toHaveBeenCalled();
    expect(shipMockFunction.mock.calls[0][0]).toEqual(coordinates);
  });

  describe('when get missed attacks is called', () => {
    it('should return 2 missed attacks if 2 attacks missed', () => {
      const exampleGameboard = gameboard();
      exampleGameboard.recieveAttack(5);
      exampleGameboard.recieveAttack(6);

      expect(exampleGameboard.getMissedAttacks()).toContain(5);
      expect(exampleGameboard.getMissedAttacks()).toContain(6);
    });

    it('should return 0 missed attacks if all attack hit ships', () => {
      const coordinates = [33, 34, 35, 36];
      ship.mockReturnValue({ coordinates, hit: () => {} });

      const exampleGameboard = gameboard();
      exampleGameboard.addShip(coordinates);
      exampleGameboard.recieveAttack(coordinates[0]);
      exampleGameboard.recieveAttack(coordinates[1]);

      expect(exampleGameboard.getMissedAttacks()).toEqual([]);
    });
  });

  describe('when attack is recieved', () => {
    it('should call ship.hit for attacks where a ship is hit', () => {
      const coordinates = [12, 13, 14, 15];
      const hitMockFunction = jest.fn();
      ship.mockReturnValue({ coordinates, hit: hitMockFunction });

      const exampleGameboard = gameboard();
      exampleGameboard.addShip(coordinates);
      exampleGameboard.recieveAttack(13);
      exampleGameboard.recieveAttack(14);

      expect(hitMockFunction.mock.calls[0][0]).toBe(13);
      expect(hitMockFunction.mock.calls[1][0]).toBe(14);
    });

    it('should not call ship.hit for attacks where a ship is not hit', () => {
      const coordinates = [12, 13, 14, 15];
      const hitMockFunction = jest.fn();
      ship.mockReturnValue({ coordinates, hit: hitMockFunction });

      const exampleGameboard = gameboard();
      exampleGameboard.addShip(coordinates);
      exampleGameboard.recieveAttack(19);
      exampleGameboard.recieveAttack(33);

      expect(hitMockFunction).not.toHaveBeenCalled();
    });
  });

  describe('when are all ships sunk is called', () => {
    it('should return true if all ships are sunk', () => {
      ship.mockReturnValueOnce({ isSunk: () => true });
      ship.mockReturnValueOnce({ isSunk: () => true });

      const exampleGameboard = gameboard();
      exampleGameboard.addShip();
      exampleGameboard.addShip();

      expect(exampleGameboard.areAllShipsSunk()).toBe(true);
    });

    it('should return false if all ships are sunk', () => {
      ship.mockReturnValueOnce({ isSunk: () => true });
      ship.mockReturnValueOnce({ isSunk: () => false });

      const exampleGameboard = gameboard();
      exampleGameboard.addShip();
      exampleGameboard.addShip();

      expect(exampleGameboard.areAllShipsSunk()).toBe(false);
    });
  });
});
