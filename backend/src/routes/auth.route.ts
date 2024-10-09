import AuthController from '../controllers/auth.controller';
import systemMiddleware from '../middleware/system.middleware';

import authValidator from '../utils/validators/auth.validator';

import { Router } from 'express';

class AuthRoutes extends AuthController {
  public router: Router;
  constructor() {
    super();
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router
      .route('/register')
      .post(
        systemMiddleware.validateRequestBody(authValidator.signUp),
        this.SignUp,
      );

    this.router
      .route('/sign-in')
      .post(
        systemMiddleware.validateRequestBody(authValidator.signIn),
        this.SignIn,
      );

    this.router.route('/verify').post(this.VerifyAccount);
  }
}

export default new AuthRoutes().router;
