import { Request, Router, Response } from 'express';
import authRoute from './auth.route';

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Attendance App',
      });
    });

    this.router.use('/auth', authRoute);

    this.router.all('*', (req: Request, res: Response) => {
      res.status(401).json({
        msg: 'Resource Not Found, So Shift!',
      });
    });
  }
}

export default new Routes().router;
