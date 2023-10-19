import SquarePipeForLab from './square.pipe';

describe('1-square pipe (isolation) testing:', () => {
  let square: SquarePipeForLab;

  beforeAll(() => {
    square = new SquarePipeForLab();
  });

  it('expect to return 16 when passing 4', () => {
    expect(square.transform(4)).toBe(16);
  });
  it("expect to return 'Not a number' when passing wrong parameter", () => {
    expect(square.transform('not number')).toBe('Not a number');
  });
});
