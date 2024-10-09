import CustomError from './custom.error';

class ApplicationError extends CustomError {
  constructor(message: string, errors?: Array<any>) {
    super(message || 'Application Error', 500, errors);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export default ApplicationError;
