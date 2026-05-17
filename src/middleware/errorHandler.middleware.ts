import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export const errorHandlerMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Known operational error (thrown by us)
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
        return;
    }

    // Prisma errors
    if (err.constructor.name === 'PrismaClientKnownRequestError') {
        const prismaErr = err as any;
        if (prismaErr.code === 'P2025') {
            // Record not found
            res.status(404).json({ status: 'error', message: 'Record not found' });
            return;
        }
        if (prismaErr.code === 'P2002') {
            // Unique constraint violation
            res.status(409).json({ status: 'error', message: 'Value already exists' });
            return;
        }
    }

    // Unknown / unexpected error — don't leak details
    console.error('UNEXPECTED ERROR:', err);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong. Please try again later.',
    });
};
