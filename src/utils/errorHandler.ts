import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validationErrorFormatter } from './validationErrorFormatter';

export const returnIfHasValidationError = (req: Request, res: Response, next: NextFunction) => {
    const errorsFormatted = validationResult(req).formatWith(validationErrorFormatter);
    if (!errorsFormatted.isEmpty()) {
        console.log(errorsFormatted);
        console.log('Has many error');
        res.status(400).json(errorsFormatted.mapped());
        return;
    }

    next();
};
