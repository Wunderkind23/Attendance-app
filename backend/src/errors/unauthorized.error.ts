import CustomError from './custom.error';

class UnAuthorizedError extends CustomError {
  constructor(message: string, errors?: Array<any>) {
    super(message || 'Unauthorized Error', 401, errors);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default UnAuthorizedError;
