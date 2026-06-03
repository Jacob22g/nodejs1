import type { NextFunction, Request, Response } from 'express';
import { checkDbConnection } from '../services/health.service';

export const healthCheck = (_req: Request, res: Response): void => {
    res.json({ status: 'ok' });
};

export const readinessCheck = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await checkDbConnection();
        res.json({ status: 'ok', db: 'connected' });
    } catch (err) {
        res.status(503).json({ status: 'error', db: 'disconnected' });
    }
};
