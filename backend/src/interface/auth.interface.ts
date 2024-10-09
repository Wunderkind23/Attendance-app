import { User } from '../database/models/user.model';

export interface DecodedToken {
  payload: User | null;
  expired: string | boolean | Error;
}
