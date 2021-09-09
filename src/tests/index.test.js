import logic from '../logic';
import dom from '../dom';

jest.mock('logic');
jest.mock('dom');

describe('init', () => {
  it('should call logic.init when initialized', () => {
    const initMockFn = jest.fn();
    logic.init.mockImplementation(initMockFn());

    expect(initMockFn).toHaveBeenCalled();
  });

  it('should call dom.init when initialized', () => {
    const initMockFn = jest.fn();
    dom.init.mockImplementation(initMockFn());

    expect(initMockFn).toHaveBeenCalled();
  });
});
