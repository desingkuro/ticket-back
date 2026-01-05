export type TokenRole = { id: number; name: string };
export type TokenPayload = { id: number; role: TokenRole | null };

export abstract class TokenService {
  abstract sign(payload: TokenPayload): string;
}
