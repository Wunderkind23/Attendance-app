import { Request } from 'express';
import { ValidationResult } from 'joi';

export type RequestBodyValidator = (req: Request) => ValidationResult;


