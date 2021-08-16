import CreateShip from '../ship';
import CreateGameboard from '../gameboard';

jest.mock('ship');

describe('the gameboard', () => {
  it('should call ship when add ship is called', () => {
    const coordinates = [0, 1, 2];
    const shipMockFunction = jest.fn();
    CreateShip.mockImplementation((args) => shipMockFunction(args));

    const gameboard = CreateGameboard();
    gameboard.addShip(coordinates);

    expect(shipMockFunction).toHaveBeenCalled();
    expect(shipMockFunction.mock.calls[0][0]).toEqual(coordinates);
  });

  describe('when get missed attacks is called', () => {
    it('should return 2 missed attacks if 2 attacks missed', () => {
      const gameboard = CreateGameboard();
      gameboard.recieveAttack(5);
      gameboard.recieveAttack(6);

      expect(gameboard.getMissedAttacks()).toContain(5);
      expect(gameboard.getMissedAttacks()).toContain(6);
    });

    it('should return 0 missed attacks if all attack hit ships', () => {
      const coordinates = [33, 34, 35, 36];
      CreateShip.mockReturnValue({ coordinates, hit: () => {} });

      const gameboard = CreateGameboard();
      gameboard.addShip(coordinates);
      gameboard.recieveAttack(coordinates[0]);
      gameboard.recieveAttack(coordinates[1]);

      expect(gameboard.getMissedAttacks()).toEqual([]);
    });
  });

  describe('when attack is recieved', () => {
    it('should call ship.hit for attacks where a ship is hit', () => {
      const coordinates = [12, 13, 14, 15];
      const hitMockFunction = jest.fn();
      CreateShip.mockReturnValue({ coordinates, hit: hitMockFunction });

      const gameboard = CreateGameboard();
      gameboard.addShip(coordinates);
      gameboard.recieveAttack(13);
      gameboard.recieveAttack(14);

      expect(hitMockFunction.mock.calls[0][0]).toBe(13);
      expect(hitMockFunction.mock.calls[1][0]).toBe(14);
    });

    it('should not call ship.hit for attacks where a ship is not hit', () => {
      const coordinates = [12, 13, 14, 15];
      const hitMockFunction = jest.fn();
      CreateShip.mockReturnValue({ coordinates, hit: hitMockFunction });

      const gameboard = CreateGameboard();
      gameboard.addShip(coordinates);
      gameboard.recieveAttack(19);
      gameboard.recieveAttack(33);

      expect(hitMockFunction).not.toHaveBeenCalled();
    });
  });

  describe('when are all ships sunk is called', () => {
    it('should return true if all ships are sunk', () => {
      CreateShip.mockReturnValueOnce({ isSunk: () => true });
      CreateShip.mockReturnValueOnce({ isSunk: () => true });

      const gameboard = CreateGameboard();
      gameboard.addShip();
      gameboard.addShip();

      expect(gameboard.areAllShipsSunk()).toBe(true);
    });

    it('should return false if all ships are sunk', () => {
      CreateShip.mockReturnValueOnce({ isSunk: () => true });
      CreateShip.mockReturnValueOnce({ isSunk: () => false });

      const gameboard = CreateGameboard();
      gameboard.addShip();
      gameboard.addShip();

      expect(gameboard.areAllShipsSunk()).toBe(false);
    });
  });
});
