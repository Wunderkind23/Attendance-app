import Joi, { ValidationResult } from 'joi';
import { Request } from 'express';
import BaseValidator from './base.validator';
import { Role } from '../../interface/user.interface';

class AuthValidator extends BaseValidator {
  constructor() {
    super();
  }

  public signUp = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      name: Joi.string().required().min(4),
      email: Joi.string().required().email(),
      password: Joi.string()
        .required()
        .min(8)
        .regex(this.patterns.password)
        .messages({
          'string.pattern.base':
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and must be at least 8 characters long.',
        }),
      role: Joi.string().valid(...Object.values(Role)),
      address: Joi.string().required(),
      phone: Joi.number().required().min(11),
    });

    return this.validate(schema, req);
  };

  public signIn = (req: Request): ValidationResult => {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    });

    return this.validate(schema, req);
  };
}

export default new AuthValidator();
