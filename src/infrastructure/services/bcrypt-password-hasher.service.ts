import { Injectable } from '@nestjs/common';
import { PasswordHasher } from 'src/domain/services/password-hasher';
import { AES, enc } from 'crypto-js';

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  async compare(plain: string, encrypted: string): Promise<boolean> {
    // Implementación temporal basada en AES (según estado actual del proyecto)
    const secretKey = process.env.SECRET_KEY_PASSWORD;
    if (!secretKey) return false;
    try {
      const decrypted = AES.decrypt(encrypted, secretKey).toString(enc.Utf8);
      return plain === decrypted;
    } catch (_) {
      return false;
    }
  }
}
