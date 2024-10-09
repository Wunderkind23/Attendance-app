import CustomError from './custom.error';

class NotFoundError extends CustomError {
  constructor(message: string, errors?: Array<any>) {
    super(message || 'Not found error', 404, errors);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default NotFoundError;
