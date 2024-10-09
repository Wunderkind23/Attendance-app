import CustomError from './custom.error';

class BadRequestError extends CustomError {
  constructor(message: string, errors?: Array<any>) {
    super(message || 'Bad Request Error', 400, errors);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default BadRequestError;
