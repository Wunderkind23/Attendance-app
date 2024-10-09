class CustomError extends Error {
  private _code: number;
  private _errors?: Array<any>;

  constructor(message: string, code: number, errors?: Array<any>) {
    super(message);
    this._code = code;
    this._errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  get code(): number | undefined {
    return this._code;
  }

  get errors(): Array<any> | undefined {
    return this._errors;
  }
}

export default CustomError;
