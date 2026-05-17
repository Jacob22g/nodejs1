import type {NextFunction, Request, Response} from 'express';
import {getAllItems, getItemById, createItem, updateItem, deleteItem} from "../services/items.service";
import {AppError} from '../errors/AppError';

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const items = await getAllItems();
        res.json(items);
    } catch (err) {
        next(err);
    }
}

export const getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const item = await getItemById(req.params.id);
        if (!item) throw new AppError('Item not found', 404);
        res.json(item);
    } catch (err) {
        next(err);
    }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {name, description, score} = req.body;
        if (!name || !description || !score) {
            throw new AppError('Name, description and score are required', 400);
        }
        const userId = req.user!.userId
        const item = await createItem({name, description, score, userId});
        res.status(201).json(item);
    } catch (err) {
        next(err);
    }
}

export const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = req.params.id;
        const {name, description, score} = req.body;
        if (!name && !description && !score) {
            throw new AppError('Name, description and score are required', 400);
        }
        const item = await updateItem(id, {name, description, score});
        if (!item) {
            throw new AppError('Item not found', 404);
        }
        res.json(item);
    } catch (err) {
        next(err);
    }
}

export const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> => {
    try {
        await deleteItem(req.params.id);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}
