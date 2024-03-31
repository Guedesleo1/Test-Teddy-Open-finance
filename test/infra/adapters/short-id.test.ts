import { ShortId } from '../../../src/infra/adpaters/short-id/short-id';
import { IShortId } from 'src/core/interfaces/adapters/short-id';
let shrotIdAdapter: IShortId;

describe('ShortId', () => {
  beforeAll(() => {
    shrotIdAdapter = new ShortId();
  });
  it('should generate a short id', () => {
    const generatedId = shrotIdAdapter.generate();
    expect(generatedId).toHaveLength(6);
    expect(typeof generatedId).toBe('string');
  });
});
