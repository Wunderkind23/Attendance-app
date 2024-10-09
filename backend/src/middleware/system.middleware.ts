import { NextFunction, Request, Response } from 'express';
import serverConfig from '../configs/server.config';
import CustomError from '../errors/custom.error';
import { RequestBodyValidator } from '../interface/function.interface';
import { ValidationError } from 'joi';

class SystemMiddleware {
  public errorHandler(
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response {
    try {
      const isProduction = serverConfig.NODE_ENV === 'production';
      const isDev = serverConfig.NODE_ENV === 'dev';

      const errCode = err.code;
      let errMessage: CustomError | object = {};

      if (res.headersSent) {
        next(err);
      }

      if (isDev) console.log(err);

      if (!isProduction) {
        serverConfig.DEBUG(err.stack);
        errMessage = err;
      }

      if (errCode === 500 && isProduction) {
        return res.status(500).json({
          message: 'Internal server error',
        });
      }

      if (err instanceof ValidationError) {
        return res.status(400).json({
          message: err.message,
          error: err.details.map((msg) => {
            return msg.message;
          }),
        });
      }

      if (err instanceof CustomError) {
        return res.status(err.code).json({
          message: err.message,
          error: {
            ...(err.errors && { errors: err.errors }),
            ...(!isProduction && { trace: errMessage }),
          },
        });
      }

      return res.status(500).json({
        message: 'Internal server error',
      });
    } catch (error) {
      serverConfig.DEBUG(`Error occurred at System Middleware`);
    }
  }

  public validateRequestBody(validator: RequestBodyValidator) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = validator(req);

      if (error) throw error;

      req.body = value;

      next();
    };
  }
}

export default new SystemMiddleware();
