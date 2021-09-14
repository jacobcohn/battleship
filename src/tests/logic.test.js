import CreateGameboard from '../gameboard';
import randomizeShips from '../randomizeShips';
import CreatePlayer from '../player';
import CreateComputer from '../computer';
import logic from '../logic';
import dom from '../dom';

jest.mock('gameboard');
jest.mock('randomizeShips');
jest.mock('player');
jest.mock('computer');
jest.mock('dom');

describe('logic', () => {
  beforeEach(() => {
    randomizeShips.mockReturnValue([]);
    CreateGameboard.mockReturnValue({ addShip: () => {} });
  });

  afterEach(() => jest.clearAllMocks());

  describe('when logic.init is called', () => {
    beforeEach(() => logic.init());

    it('should call CreateGameboard twice', () => {
      expect(CreateGameboard.mock.calls.length).toBe(2);
    });

    it('should call dom.recieveGameboards once', () => {
      expect(dom.recieveGameboards.mock.calls.length).toBe(1);
    });

    it('should call randomizeShips twice', () => {
      expect(randomizeShips.mock.calls.length).toBe(2);
    });

    it('should call CreatePlayer once', () => {
      expect(CreatePlayer.mock.calls.length).toBe(1);
    });

    it('should call CreateComputer once', () => {
      expect(CreateComputer.mock.calls.length).toBe(1);
    });
  });

  describe('when logic.isCoordinatePossibleAttack', () => {
    beforeEach(() => {
      CreateGameboard.mockReturnValue({
        addShip: () => {},
        getGameboardInfo: () => ({ possibleAttacks: [0] }),
      });
      logic.init();
    });

    it('should return true when it is possible', () => {
      expect(logic.isCoordinatePossibleAttack(0)).toBe(true);
    });

    it('should return false when it is not possible', () => {
      expect(logic.isCoordinatePossibleAttack(1)).toBe(false);
    });
  });

  describe('when logic.gameLoop is called', () => {
    describe('should call dom.displayWinner', () => {
      it('when player has won', () => {
        CreatePlayer.mockReturnValue({ sendAttack: () => {}, didWin: () => true });

        logic.init();
        logic.gameLoop();

        expect(dom.displayWinner).toHaveBeenCalled();
      });

      it('when computer has won', () => {
        CreatePlayer.mockReturnValue({ sendAttack: () => {}, didWin: () => false });
        CreateComputer.mockReturnValue({ sendAttack: () => {}, didWin: () => true });

        logic.init();
        logic.gameLoop();

        expect(dom.displayWinner).toHaveBeenCalled();
      });
    });

    it('should call player.sendAttack and computer.sendAttack', () => {
      const sendAttackMockFn = jest.fn();
      CreatePlayer.mockReturnValue({ sendAttack: () => sendAttackMockFn(), didWin: () => false });
      CreateComputer.mockReturnValue({ sendAttack: () => sendAttackMockFn(), didWin: () => false });

      logic.init();
      logic.gameLoop();

      expect(sendAttackMockFn.mock.calls.length).toBe(2);
    });
  });
});
