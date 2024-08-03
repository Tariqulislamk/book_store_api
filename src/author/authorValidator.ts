import { body, query } from "express-validator";

export const createValidator = [
  body("name").not().isEmpty().withMessage("name Is Required"),
  body("birthDate").not().isEmpty().withMessage("birthDate Date Is Required"),
];

export const updateValidator = [
  body("authorID").not().isEmpty().withMessage("authorID Is Required"),
  body("name").not().isEmpty().withMessage("name Is Required"),
  body("birthDate").not().isEmpty().withMessage("birthDate Is Required"),
];

export const getValidator = [];

