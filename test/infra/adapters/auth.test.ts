import { ITokenGenerator } from 'src/core/interfaces/adapters/jwt';
import { Auth } from '../../../src/infra/adpaters/jwt/Auth';
let authAdapter: ITokenGenerator;

describe('Auth', () => {
  beforeAll(() => {
    authAdapter = new Auth();
  });
  it('should generate a valid JWT token', () => {
    const payload = { userId: '123', role: 'admin' };

    const token = authAdapter.generate(payload);

    expect(token).toBeDefined();

    expect(typeof token).toBe('string');
  });
});
