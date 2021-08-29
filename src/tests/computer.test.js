import CreateGameboard from '../gameboard';
import CreateComputer from '../computer';

jest.mock('gameboard');

describe('the computer when sendAttack is called', () => {
  let recieveAttackMockFn;
  beforeEach(() => {
    recieveAttackMockFn = jest.fn();
  });

  const setUpGameboard = (hitCoordinates, notPossibleAttacks) => {
    const gameboardInfo = {
      missedAttacks: [],
      sunkenShips: [],
      hits: [],
      possibleAttacks: [],
      allShipsSunk: false,
    };
    for (let i = 0; i < 64; i += 1) gameboardInfo.possibleAttacks.push(i);
    [...hitCoordinates, ...notPossibleAttacks].forEach((coordinate) => {
      const index = gameboardInfo.possibleAttacks.indexOf(coordinate);
      gameboardInfo.possibleAttacks.splice(index, 1);
    });
    hitCoordinates.forEach((coordinate) => gameboardInfo.hits.push(coordinate));

    CreateGameboard.mockReturnValue({
      getGameboardInfo: () => gameboardInfo,
      recieveAttack: (args) => recieveAttackMockFn(args),
    });
  };

  it('should call gameboard.recieveAttack', () => {
    setUpGameboard([], []);

    const computer = CreateComputer(CreateGameboard());
    computer.sendAttack();

    expect(recieveAttackMockFn).toHaveBeenCalled();
  });

  it('when there are no hits should return both even or odd coordinates', () => {
    setUpGameboard([], []);

    const computer = CreateComputer(CreateGameboard());
    computer.sendAttack();
    const remainder = recieveAttackMockFn.mock.calls[0][0] % 2;

    for (let i = 1; i <= 10; i += 1) {
      computer.sendAttack();
      expect(recieveAttackMockFn.mock.calls[i][0] % 2).toBe(remainder);
    }
  });

  describe('when there is one hit', () => {
    it('should return an adjacent coordinate', () => {
      setUpGameboard([12], []);

      const computer = CreateComputer(CreateGameboard());
      computer.sendAttack();

      const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
      expect(typeof attackedCoordinate).toBe('number');
      const adjacentCoordinates = [11, 13, 4, 20];
      expect(adjacentCoordinates.includes(attackedCoordinate)).toBe(true);
    });

    it('should return only possible adjacent coordinates', () => {
      setUpGameboard([12], [11, 13, 4]);
      const computer = CreateComputer(CreateGameboard());
      computer.sendAttack();

      const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
      expect(attackedCoordinate).toBe(20);
    });

    describe('should return all adjacent coordinates but', () => {
      it('left side because the hit is on the left edge', () => {
        setUpGameboard([16], []);
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
        setUpGameboard([31], []);
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
        setUpGameboard([4], []);
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
        setUpGameboard([62], []);
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

  describe('when there is a non-ending line of hits', () => {
    describe('should return a coordinate that adds to that line', () => {
      it('horizontally', () => {
        setUpGameboard([12, 13], []);
        const computer = CreateComputer(CreateGameboard());
        computer.sendAttack();

        const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
        expect(typeof attackedCoordinate).toBe('number');
        const coordinateAddingToLine = [11, 14];
        expect(coordinateAddingToLine.includes(attackedCoordinate)).toBe(true);
      });

      it('vertically', () => {
        setUpGameboard([26, 34], []);
        const computer = CreateComputer(CreateGameboard());
        computer.sendAttack();

        const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
        expect(typeof attackedCoordinate).toBe('number');
        const coordinateAddingToLine = [18, 42];
        expect(coordinateAddingToLine.includes(attackedCoordinate)).toBe(true);
      });
    });

    describe('should return a coordinate that adds to that line and is possible', () => {
      it('horizontally', () => {
        setUpGameboard([12, 13], [11]);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 5; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(attackedCoordinate).toBe(14);
        }
      });

      it('vertically', () => {
        setUpGameboard([26, 34], [42]);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 5; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(attackedCoordinate).toBe(18);
        }
      });

      describe('should return a coordinate that adds to that line and is', () => {
        it('not on another row', () => {
          setUpGameboard([8, 9], []);
          const computer = CreateComputer(CreateGameboard());

          for (let i = 0; i < 5; i += 1) {
            computer.sendAttack();

            const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
            expect(attackedCoordinate).toBe(10);
          }
        });

        it('not on gameboard', () => {
          setUpGameboard([3, 11], []);
          const computer = CreateComputer(CreateGameboard());

          for (let i = 0; i < 5; i += 1) {
            computer.sendAttack();

            const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
            expect(attackedCoordinate).toBe(19);
          }
        });
      });
    });
  });
});
