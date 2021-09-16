import CreateGameboard from '../gameboard';
import CreateComputer from '../computer';

jest.mock('gameboard');

describe('the computer when sendAttack is called', () => {
  let recieveAttackMockFn;
  beforeEach(() => {
    recieveAttackMockFn = jest.fn();
  });

  const getGameboardInfo = (hitCoordinates, notPossibleAttacks) => {
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

    return gameboardInfo;
  };

  const setUpGameboard = (hitCoordinates, notPossibleAttacks) => {
    CreateGameboard.mockReturnValue({
      getGameboardInfo: () => getGameboardInfo(hitCoordinates, notPossibleAttacks),
      recieveAttack: (args) => recieveAttackMockFn(args),
    });
  };

  const setUpGameboardWithAdditionalHits = (hitCoordinates, notPossibleAttacks, additionalHits) => {
    const gameboardInfoMockFn = jest.fn();
    for (let i = 0; i <= additionalHits.length; i += 1) {
      gameboardInfoMockFn.mockReturnValueOnce(
        getGameboardInfo([...hitCoordinates, ...additionalHits.slice(0, i)], notPossibleAttacks),
      );
    }

    CreateGameboard.mockReturnValue({
      getGameboardInfo: () => gameboardInfoMockFn(),
      recieveAttack: (args) => recieveAttackMockFn(args),
    });
  };

  it('should call gameboard.recieveAttack', () => {
    setUpGameboard([], []);

    const computer = CreateComputer(CreateGameboard());
    computer.sendAttack();

    expect(recieveAttackMockFn).toHaveBeenCalled();
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

  describe('when there is a line of hits that can be added to', () => {
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
        it('on the same row', () => {
          setUpGameboard([8, 9], []);
          const computer = CreateComputer(CreateGameboard());

          for (let i = 0; i < 5; i += 1) {
            computer.sendAttack();

            const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
            expect(attackedCoordinate).toBe(10);
          }
        });

        it('on gameboard', () => {
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

  describe('when there is a line of hits that cannot be added to', () => {
    // this means that some ships are parallel to each other and adjacent

    describe('should return a coordinate that adds to a new line', () => {
      it('when new line is horizontal', () => {
        setUpGameboard([12, 20], [4, 28]);
        const computer = CreateComputer(CreateGameboard());
        computer.sendAttack();

        const possibleNextCoordinates = [11, 13, 19, 21];
        const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
        expect(possibleNextCoordinates.includes(attackedCoordinate)).toBe(true);
      });

      it('when new line is vertical', () => {
        setUpGameboard([10, 11], [9, 12]);
        const computer = CreateComputer(CreateGameboard());
        computer.sendAttack();

        const possibleNextCoordinates = [2, 3, 18, 19];
        const attackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
        expect(possibleNextCoordinates.includes(attackedCoordinate)).toBe(true);
      });
    });

    describe('should return a coordinate that adds to a new line and is possible', () => {
      it('when new line is horizontal', () => {
        setUpGameboard([12, 20], [4, 28, 11, 13, 19]);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 5; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(attackedCoordinate).toBe(21);
        }
      });

      it('when new line is vertical', () => {
        setUpGameboard([10, 11], [9, 12, 2, 3, 19]);
        const computer = CreateComputer(CreateGameboard());

        for (let i = 0; i < 5; i += 1) {
          computer.sendAttack();

          const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
          expect(attackedCoordinate).toBe(18);
        }
      });

      describe('should return a coordinate that adds to a new line and is', () => {
        it('on the same row', () => {
          setUpGameboard([8, 16], [0, 24, 9]);
          const computer = CreateComputer(CreateGameboard());

          for (let i = 0; i < 5; i += 1) {
            computer.sendAttack();

            const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
            expect(attackedCoordinate).toBe(17);
          }
        });

        it('on gameboard', () => {
          setUpGameboard([2, 3], [1, 4, 10]);
          const computer = CreateComputer(CreateGameboard());

          for (let i = 0; i < 5; i += 1) {
            computer.sendAttack();

            const attackedCoordinate = recieveAttackMockFn.mock.calls[i][0];
            expect(attackedCoordinate).toBe(11);
          }
        });
      });
    });
  });

  describe('when there is more than a single line of hits', () => {
    it('should add a third coordinate to the new line', () => {
      setUpGameboardWithAdditionalHits([10, 11], [9, 12, 2, 3, 19], [18]);
      const computer = CreateComputer(CreateGameboard());
      computer.sendAttack();
      computer.sendAttack();

      const firstAttackedCoordinate = recieveAttackMockFn.mock.calls[0][0];
      expect(firstAttackedCoordinate).toBe(18);
      const secondAttackedCoordinate = recieveAttackMockFn.mock.calls[1][0];
      expect(secondAttackedCoordinate).toBe(26);
    });

    it('should add a fourth coordinate to the new line', () => {
      setUpGameboardWithAdditionalHits([13, 21], [5, 29, 12, 14, 22], [20, 19]);
      const computer = CreateComputer(CreateGameboard());
      computer.sendAttack();
      computer.sendAttack();
      computer.sendAttack();

      const thirdAttackedCoordinate = recieveAttackMockFn.mock.calls[2][0];
      expect(thirdAttackedCoordinate).toBe(18);
    });
  });

  describe('when didWin is called', () => {
    it('should return true if won', () => {
      const getGameboardInfoMockFn = jest.fn();
      getGameboardInfoMockFn.mockReturnValue({ areShipsSunk: true });
      CreateGameboard.mockReturnValue({ getGameboardInfo: () => getGameboardInfoMockFn() });

      const player = CreateComputer(CreateGameboard());

      expect(player.didWin()).toBe(true);
    });

    it('should return false if lost', () => {
      const getGameboardInfoMockFn = jest.fn();
      getGameboardInfoMockFn.mockReturnValue({ areShipsSunk: false });
      CreateGameboard.mockReturnValue({ getGameboardInfo: () => getGameboardInfoMockFn() });

      const player = CreateComputer(CreateGameboard());

      expect(player.didWin()).toBe(false);
    });
  });
});
