import CreateGameboard from '../gameboard';
import CreatePlayer from '../player';

jest.mock('gameboard');

describe('player', () => {
  it('should call gameboard.recieveAttack when sendAttack is called', () => {
    const recieveAttackMockFn = jest.fn();
    CreateGameboard.mockReturnValue({ recieveAttack: (args) => recieveAttackMockFn(args) });

    const player = CreatePlayer(CreateGameboard());
    player.sendAttack(44);
    player.sendAttack(32);

    expect(recieveAttackMockFn.mock.calls[0][0]).toBe(44);
    expect(recieveAttackMockFn.mock.calls[1][0]).toBe(32);
  });

  describe('when didWin is called', () => {
    it('should return true if won', () => {
      const getGameboardInfoMockFn = jest.fn();
      getGameboardInfoMockFn.mockReturnValue({ areShipsSunk: true });
      CreateGameboard.mockReturnValue({ getGameboardInfo: () => getGameboardInfoMockFn() });

      const player = CreatePlayer(CreateGameboard());

      expect(player.didWin()).toBe(true);
    });

    it('should return false if lost', () => {
      const getGameboardInfoMockFn = jest.fn();
      getGameboardInfoMockFn.mockReturnValue({ areShipsSunk: false });
      CreateGameboard.mockReturnValue({ getGameboardInfo: () => getGameboardInfoMockFn() });

      const player = CreatePlayer(CreateGameboard());

      expect(player.didWin()).toBe(false);
    });
  });
});
