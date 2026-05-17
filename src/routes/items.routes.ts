import { Router} from "express";
import {getAll, create, getById, remove, update} from "../controller/items.controller";
import {authMiddleware} from "../middleware";

const router = Router();

router.use(authMiddleware);

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;
