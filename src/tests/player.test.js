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
});
