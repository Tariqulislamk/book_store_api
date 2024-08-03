import express from "express";
import { Request, Response, NextFunction } from "express";
import { returnIfHasValidationError } from "../utils/errorHandler";
import { createValidator, getValidator, updateValidator } from "./authorValidator";
import { create, get, deleteAnAuthor, getAnAuthor } from "./authorController";
import { getBooksByAuthorID } from "../book/bookController";

const router = express.Router();

router.post("/", createValidator, returnIfHasValidationError, (req: Request, res: Response, next: NextFunction) => {
  create(req, res, next);
});

router.put('/', updateValidator, returnIfHasValidationError, (req: Request, res: Response, next: NextFunction) => {
    create(req, res, next);
});
router.get('/', getValidator, returnIfHasValidationError, (req: Request, res: Response, next: NextFunction) => {
    get(req, res, next);
});

router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  getAnAuthor(req, res);
});
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    deleteAnAuthor(req, res, next);
});

router.get('/:id/books', (req: Request, res: Response, next: NextFunction) => {
  getBooksByAuthorID(req, res);
});


export default router;
