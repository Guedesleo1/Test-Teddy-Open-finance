import { UsersDomain } from '../../src/domain/entities/users-domain';

describe('Users Domain', () => {
  test('should create Users domain', () => {
    const newLogin = UsersDomain.create({
      name: 'Leonardo',
      email: 'leonardo@gmail.com',
      password: '1234567',
      userId: 'fa13da30-b732-4666-bf43-91717a184ec9'
    });
    expect(newLogin).toBeInstanceOf(UsersDomain);
    expect(newLogin).toHaveProperty('userId');
    expect(newLogin).toHaveProperty('name');
    expect(newLogin).toHaveProperty('email');
    expect(newLogin).toHaveProperty('password');
  });
});
