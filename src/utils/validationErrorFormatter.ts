interface ValidationError {
    msg: string;
    // Add other properties if needed
}

export const validationErrorFormatter = (error: ValidationError): string => error.msg;

