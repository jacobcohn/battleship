import CreateShip from '../ship';
import CreateGameboard from '../gameboard';

jest.mock('ship');

describe('the gameboard', () => {
  it('should call ship when add ship is called', () => {
    const coordinates = [0, 1, 2];
    const shipMockFn = jest.fn();
    CreateShip.mockImplementation((args) => shipMockFn(args));

    const gameboard = CreateGameboard();
    gameboard.addShip(coordinates);

    expect(shipMockFn).toHaveBeenCalled();
    expect(shipMockFn.mock.calls[0][0]).toEqual(coordinates);
  });

  describe('when attack is recieved', () => {
    it('should call ship.hit for attacks where a ship is hit', () => {
      const coordinates = [12, 13, 14, 15];
      const hitMockFn = jest.fn();
      CreateShip.mockReturnValue({ coordinates, hit: hitMockFn, isSunk: () => false });

      const gameboard = CreateGameboard();
      gameboard.addShip();
      gameboard.recieveAttack(13);
      gameboard.recieveAttack(14);

      expect(hitMockFn.mock.calls[0][0]).toBe(13);
      expect(hitMockFn.mock.calls[1][0]).toBe(14);
    });

    it('should not call ship.hit for attacks where a ship is not hit', () => {
      const coordinates = [12, 13, 14, 15];
      const hitMockFn = jest.fn();
      CreateShip.mockReturnValue({ coordinates, hit: hitMockFn, isSunk: () => {} });

      const gameboard = CreateGameboard();
      gameboard.addShip();
      gameboard.recieveAttack(19);
      gameboard.recieveAttack(33);

      expect(hitMockFn).not.toHaveBeenCalled();
    });
  });

  describe('when get gameboard info is called', () => {
    describe('missed attacks', () => {
      it('should return 0 missed attacks if 0 attacks missed', () => {
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: () => false });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(5);
        gameboard.recieveAttack(6);

        expect(gameboard.getGameboardInfo().missedAttacks).toEqual([]);
      });

      it('should return 2 missed attacks if 2 attacks missed', () => {
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: () => {} });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(2);
        gameboard.recieveAttack(34);

        expect(gameboard.getGameboardInfo().missedAttacks).toContain(2);
        expect(gameboard.getGameboardInfo().missedAttacks).toContain(34);
      });
    });

    describe('sunken ships', () => {
      it('should return an empty array if no ships sunk', () => {
        const gameboard = CreateGameboard();
        expect(gameboard.getGameboardInfo().sunkenShips).toEqual([]);
      });

      it('should return a set of coordinates if they are from a sunken ship', () => {
        const isSunkMockFn = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValue(true);
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: isSunkMockFn });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(5);
        gameboard.recieveAttack(6);
        gameboard.recieveAttack(7);

        expect(gameboard.getGameboardInfo().sunkenShips).toContain(coordinates);
      });
    });

    describe('hits', () => {
      it('should return an empty array when no ships hit', () => {
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: () => {} });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(2);

        expect(gameboard.getGameboardInfo().hits).toEqual([]);
      });

      it('should return an array of hits if some ships hit', () => {
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: () => {} });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(5);

        expect(gameboard.getGameboardInfo().hits).toContain(5);
      });

      it('should return an empty array if all hits are apart of a sunken ship', () => {
        const isSunkMockFn = jest.fn().mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValue(true);
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: isSunkMockFn });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(5);
        gameboard.recieveAttack(6);
        gameboard.recieveAttack(7);

        expect(gameboard.getGameboardInfo().hits).toEqual([]);
      });
    });

    describe('possibleAttacks', () => {
      it('should return an array 0-63 when all attacks are possible', () => {
        const gameboard = CreateGameboard();

        for (let i = 0; i < 64; i += 1) {
          expect(gameboard.getGameboardInfo().possibleAttacks).toContain(i);
        }
      });

      it('should return an array 0-63 without 43 when only 43 has been attacked', () => {
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: () => {} });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(43);

        expect(gameboard.getGameboardInfo().possibleAttacks).not.toContain(43);
      });
    });

    describe('all ships sunk', () => {
      it('should return false if not all ships sunk', () => {
        const coordinates = [5, 6, 7];
        CreateShip.mockReturnValue({ coordinates, hit: () => {}, isSunk: () => false });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.recieveAttack(0);

        expect(gameboard.getGameboardInfo().allShipsSunk).toBe(false);
      });

      it('should return true if all ships sunk', () => {
        const coordinates1 = [5, 6, 7];
        CreateShip.mockReturnValueOnce({ coordinates: coordinates1, hit: () => {}, isSunk: () => true });
        const coordinates2 = [12, 13, 14];
        CreateShip.mockReturnValueOnce({ coordinates: coordinates2, hit: () => {}, isSunk: () => true });

        const gameboard = CreateGameboard();
        gameboard.addShip();
        gameboard.addShip();
        gameboard.recieveAttack(0);

        expect(gameboard.getGameboardInfo().allShipsSunk).toBe(true);
      });
    });
  });
});
