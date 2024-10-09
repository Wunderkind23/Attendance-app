import { config } from 'dotenv';
config();

class AuthConfig {
  public SALT_ROUND = Number(process.env.SALT_ROUND);

  public JWT_SECRET = process.env.JWT_SECRET;

  public TOKEN_EXPIRES = Number(process.env.TOKEN_EXPIRES);
}

export default new AuthConfig();