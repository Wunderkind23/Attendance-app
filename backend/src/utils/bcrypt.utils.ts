import bcrypt from 'bcryptjs';
import authConfig from '../configs/auth.config';

class BCRYPT {
  static encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(authConfig.SALT_ROUND);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }

  static comparePassword(hashedPassword: string, password: string) {
    const isValid = bcrypt.compareSync(password, hashedPassword);
    return isValid;
  }
}

export default BCRYPT;
