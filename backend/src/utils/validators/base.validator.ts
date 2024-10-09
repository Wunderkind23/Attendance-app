import { Schema, ValidationResult, AnySchema, ValidationOptions } from 'joi';
import { Request } from 'express';

class BaseValidator {
  protected validationOptions: ValidationOptions = {
    errors: { wrap: { label: '' } },
    abortEarly: false,
  };

  protected patterns = {
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,

    phone:
      /^\+?[1-9]\d{0,2}?[ -]?(\(?\d{1,4}?\)?[ -]?)?\d{1,4}[ -]?\d{1,4}[ -]?\d{1,9}$/,
  };

  protected validate(schema: AnySchema, req: Request) {
    const validated = schema.validate(req.body, this.validationOptions);
    return validated;
  }
}

export default BaseValidator;
