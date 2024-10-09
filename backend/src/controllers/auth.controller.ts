import serverConfig from '../configs/server.config';
import ApplicationError from '../errors/application.error';
import authService from '../services/auth.service';
import { Request, Response, NextFunction } from 'express';

class AuthController {
  public async SignUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const { body } = req;

      const emailSent = await authService.register(body);

      if (!emailSent) {
        throw new ApplicationError(`Try again later`);
      }

      return res.status(201).json({
        message: 'Account created successfully, Verify Account',
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Auth Controller, Sign Up method: ${error}`,
      );
      next(error);
    }
  }

  public async VerifyAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    try {
      const {
        query: { id, token },
      } = req;

      const response = await authService.verifyAccount(
        id as string,
        token as string,
      );

      return res.status(201).json({
        message: 'user verified successfully',
        data: response,
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Auth Controller, Verify Account method: ${error}`,
      );
      next(error);
    }
  }

  public async SignIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { body } = req;

      const { user, token } = await authService.signIn(body);

      res.status(200).json({
        message: 'Sign in successful',
        data: {
          data: user,
          token: token,
        },
      });
    } catch (error) {
      serverConfig.DEBUG(
        `Error occurred at Auth Controller, Sign In method: ${error}`,
      );
      next(error);
    }
  }
}

export default AuthController;
