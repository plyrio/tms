export class User {
  constructor(
    public readonly id: number,
    public name: string,
    public email: string,
    private password?: string,
    public googleId?: string,
    public githubId?: string,
    public stack?: string,
  ) {}

  public changeName(newName: string) {
    this.name = newName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPasswordHashed(): string {
    return this.password;
  }

  public setPasswordHashed(hashed: string) {
    this.password = hashed;
  }

  public async comparePassword(
    plain: string,
    compareFn: (plain: string, hashed: string) => Promise<boolean>,
  ): Promise<boolean> {
    return compareFn(plain, this.password);
  }

  public linkGoogleId(googleId: string) {
    this.googleId = googleId;
  }
  public linkGithubId(githubId: string) {
    this.githubId = githubId;
  }

  public getStack(stack: string) {
    this.stack = stack;
  }
}
