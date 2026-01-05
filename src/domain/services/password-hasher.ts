export abstract class PasswordHasher {
  abstract compare(plain: string, hashed: string): Promise<boolean>;
}
