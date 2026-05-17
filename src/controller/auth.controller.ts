import type {NextFunction, Request, Response} from 'express';
import * as authService from '../services/auth.service';
import {AppError} from "../errors/AppError";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }
        const user = await authService.register({ email, password });
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError('Email and password are required', 400);
        }
        const result = await authService.login({ email, password });
        res.json(result);
    } catch (err) {
        next(err);
    }
}
