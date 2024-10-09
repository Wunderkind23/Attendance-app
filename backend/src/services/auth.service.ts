import { User } from '../database/models/user.model';
import BadRequestError from '../errors/badrequest.error';
import BaseService from './base.service';
import BCRYPT from '../utils/bcrypt.utils';
import notificationClient from '../clients/notification.client';
import JWT from '../utils/jwt.utils';
import { EmailAttributeI } from '../interface/email.interface';
import { DecodedToken } from '../interface/auth.interface';
import UnAuthorizedError from '../errors/unauthorized.error';

class AuthService extends BaseService<User> {
  constructor() {
    super(User, 'User');
  }

  public verifyToken(token: string): DecodedToken {
    try {
      const payload = JWT.verifyToken(token) as unknown as User;
      return { payload, expired: false };
    } catch (error) {
      return {
        payload: null,
        expired: error.message.includes('expired') ? error.message : error,
      };
    }
  }

  public removePassword(data: User) {
    const { password, ...others } = data.toJSON();
    return { ...others };
  }

  public generateAccessToken(data: User) {
    const { email, isVerified, id } = data;
    const payload = { email, isVerified, id };
    const token = JWT.generateToken(payload);
    return token;
  }

  public async register(data: Partial<User>) {
    const { name, email, password } = data;

    const isExisting = await this.getOrError({ email });

    if (isExisting) {
      throw new BadRequestError(`User Already Exists!`);
    }

    const user = await User.create({ name, email, password });

    console.log(user.password);

 

    const token = this.generateAccessToken(user);

    // const verifyLink = `http://localhost:3008/id?userId=${user.id}&token=${token}`;

    // const emailPayload: EmailAttributeI = {
    //   to: email,
    //   subject: 'Email Verification',
    //   templateName: 'VerifyAccount',
    //   replacements: {
    //     name,
    //     email,
    //     id: user.id,
    //     verifyLink,
    //   },
    // };

    // const sendMail = await notificationClient.sendMessages(emailPayload);

    return true;
  }

  public async verifyAccount(id: string, token: string) {
    const user = await this.getOrError({ id }, true);

    const tokenInfo = JWT.verifyToken(token);

    if (user.id !== tokenInfo['id']) {
      throw new BadRequestError('You are not authorized');
    }

    await user.update({ isVerified: true });
    const removePassword = this.removePassword(user);
    return removePassword;
  }

  public async signIn(data: Partial<User>) {
    const { email, password } = data;

    const user = await this.getOrError({ email }, true);

    const passwordChecker = BCRYPT.comparePassword(user.password, password);

    if (!passwordChecker) {
      throw new BadRequestError(`Email or Password not Correct`);
    }

    if (!user.isVerified) {
      throw new UnAuthorizedError(`Please verify you account`);
    }

    const token = this.generateAccessToken(user);
    const updated = this.removePassword(user);

    return { user: updated, token };
  }

  public async get(id: number) {
    const user = await this.getOrError({ id }, true);
    return user;
  }
}

export default new AuthService();
