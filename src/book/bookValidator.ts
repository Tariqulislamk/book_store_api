import { body, query } from "express-validator";

export const createValidator = [
  body("title").not().isEmpty().withMessage("title Is Required"),
  body("published_date").not().isEmpty().withMessage("published_date Is Required"),
  body("authorID").not().isEmpty().withMessage("authorID Is Required"),
];

export const updateValidator = [
  body("bookID").not().isEmpty().withMessage("bookID Is Required"),
  body("title").not().isEmpty().withMessage("title Is Required"),
  body("published_date").not().isEmpty().withMessage("published_date Is Required"),
  body("authorID").not().isEmpty().withMessage("authorID Is Required"),
];

export const getValidator = [];

