import * as bcrypt from 'bcrypt';

export class HashRepository implements IHashInterface {
  hash(plain: string): Promise<string> {}

  compare(plain: string, hashed: string): Promise<boolean> {}
}
