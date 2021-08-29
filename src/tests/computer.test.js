import CreateGameboard from '../gameboard';
import CreateComputer from '../computer';

jest.mock('gameboard');

describe('the computer when sendAttack is called', () => {
  let recieveAttackMockFn;
  beforeEach(() => {
    recieveAttackMockFn = jest.fn();
  });

  const initialGameboardInfo = () => {
    const gameboardInfo = {
      missedAttacks: [],
      sunkenShips: [],
      hits: [],
      possibleAttacks: [],
      allShipsSunk: false,
    };
    for (let i = 0; i < 64; i += 1) gameboardInfo.possibleAttacks.push(i);
    return gameboardInfo;
  };

  it('should call gameboard.recieveAttack', () => {
    CreateGameboard.mockReturnValue({
      getGameboardInfo: () => initialGameboardInfo(),
      recieveAttack: (args) => recieveAttackMockFn(args),
    });

    const computer = CreateComputer(CreateGameboard());
    computer.sendAttack();

    expect(recieveAttackMockFn).toHaveBeenCalled();
  });

  it('when there are no hits should return both even or odd coordinates', () => {
    CreateGameboard.mockReturnValue({
      getGameboardInfo: () => initialGameboardInfo(),
      recieveAttack: (args) => recieveAttackMockFn(args),
    });

    const computer = CreateComputer(CreateGameboard());
    computer.sendAttack();
    const remainder = recieveAttackMockFn.mock.calls[0][0] % 2;

    for (let i = 1; i <= 10; i += 1) {
      computer.sendAttack();
      expect(recieveAttackMockFn.mock.calls[i][0] % 2).toBe(remainder);
    }
  });

  describe('when there is one hit', () => {
    const setUpSingleHit = (hitCoordinate, notPossibleAttacks) => {
      const gameboardInfo = {
        missedAttacks: [],
        sunkenShips: [],
        hits: [],
        possibleAttacks: [],
        allShipsSunk: false,
      };
      for (let i = 0; i < 64; i += 1) {
        if (i === hitCoordinate) i += 1;
        gameboardInfo.possibleAttacks.push(i);
      }
      notPossibleAttacks.forEach((coordinate) => {
        const index = gameboardInfo.possibleAttacks.indexOf(coordinate);
        gameboardInfo.possibleAttacks.splice(index, 1);
      });
      gameboardInfo.hits.push(hitCoordinate);

      CreateGameboard.mockReturnValue({
        getGameboardInfo: () => gameboardInfo,
        recieveAttack: (args) => recieveAttackMockFn(args),
      });
    };

    it('should return an adjacent coordinate', () => {
      setUpSingleHit(12, []);

      const computer = CreateComputer(CreateGameboard());
      computer.sendAttack();

      const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
      expect(typeof attackedCoordinate).toBe('number');
      const adjacentCoordinates = [11, 13, 4, 20];
      expect(adjacentCoordinates.includes(attackedCoordinate)).toBe(true);
    });

    it('should return only possible adjacent coordinates', () => {
      setUpSingleHit(12, [11, 13, 4]);
      const computer = CreateComputer(CreateGameboard());
      computer.sendAttack();

      const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
      expect(attackedCoordinate).toBe(20);
    });

    describe('should return all adjacent coordinates but', () => {
      it('left side because the hit is on the left edge', () => {
        setUpSingleHit(16, []);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 20; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(typeof attackedCoordinate).toBe('number');
          const adjacentCoordinates = [17, 8, 24];
          expect(adjacentCoordinates.includes(attackedCoordinate)).toBe(true);
        }
      });

      it('right side because the hit is on the right edge', () => {
        setUpSingleHit(31, []);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 20; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(typeof attackedCoordinate).toBe('number');
          const adjacentCoordinates = [30, 23, 39];
          expect(adjacentCoordinates.includes(attackedCoordinate)).toBe(true);
        }
      });

      it('upper side because the hit is on the top edge', () => {
        setUpSingleHit(4, []);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 20; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(typeof attackedCoordinate).toBe('number');
          const adjacentCoordinates = [3, 5, 12];
          expect(adjacentCoordinates.includes(attackedCoordinate)).toBe(true);
        }
      });

      it('lower side because the hit is on the bottom edge', () => {
        setUpSingleHit(62, []);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 20; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(typeof attackedCoordinate).toBe('number');
          const adjacentCoordinates = [61, 63, 54];
          expect(adjacentCoordinates.includes(attackedCoordinate)).toBe(true);
        }
      });
    });
  });
});
