export class UsersDomain {
  public readonly userId?: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;

  private constructor ({ userId, name, password, email }: UsersDomain) {
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    Object.freeze(this);
  }

  static create (userDTO: UsersDomain) {
    return new UsersDomain({
      userId: userDTO.userId,
      email: userDTO.email,
      name: userDTO.name,
      password: userDTO.password
    });
  }
}
