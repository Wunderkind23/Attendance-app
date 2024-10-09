import { User } from '../database/models/user.model';
import jwt from 'jsonwebtoken';
import authConfig from '../configs/auth.config';

class JWT {
  static generateToken(payload: Partial<User>) {
    const token = jwt.sign(payload, authConfig.JWT_SECRET, {
      expiresIn: authConfig.TOKEN_EXPIRES,
    });

    return token;
  }

  static async decodeToken(token: string) {
    const decoded = jwt.decode(token);
    return decoded;
  }

  static verifyToken(token: string) {
    const isValid = jwt.verify(token, authConfig.JWT_SECRET);
    return isValid;
  }
}

export default JWT;
