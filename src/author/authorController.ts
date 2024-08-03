import { createAuthor, getAuthor, GetAuthorData, deleteAuthor, getAuthorById } from "./authorModel";
import { Request, Response, NextFunction } from "express";

// Start the Controller of Create Author
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let responseData: any;
    let responseError: any;

    let reqBody = req.body;
    try {
        responseData = await createAuthor(reqBody, req, res);
    } catch (error) {
        console.log("CONTROLLER ERROR:", error);
        responseError = { error };
    }

    // Prepare for response return
    if (responseError) {
        res.status(500).send(responseError);
    } else if (responseData) {
        res.json(responseData);
    }
}
// End the controller of Create Author

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let responseError: { error: any } | undefined;
    let responseData: any[] = [];

    const reqQuery = req.query as unknown as Partial<GetAuthorData>;

    // Cast and validate req.query to GetAuthorData
    const queryData: GetAuthorData = {
        p_ID: reqQuery.p_ID ? Number(reqQuery.p_ID) : null,
        p_Paginate: reqQuery.p_Paginate || false, 
        p_rowsPerPage: reqQuery.p_rowsPerPage ? Number(reqQuery.p_rowsPerPage) : 0,
        p_requestedPage: reqQuery.p_requestedPage ? Number(reqQuery.p_requestedPage) : 0,
        p_searchValue: reqQuery.p_searchValue || null,
        p_orderByColumn: reqQuery.p_orderByColumn || null,
        p_orderBy: reqQuery.p_orderBy ? reqQuery.p_orderBy : 'asc' 
    };

    try {
        responseData = await getAuthor(queryData);
    } catch (error) {
        console.log("CONTROLLER ERROR:", error);
        responseError = { error };
    }

    // Prepare for response return
    if (responseError) {
        res.status(500).send(responseError);
    } else {
        res.json(responseData);
    }
};

export const getAnAuthor = async (req: Request, res: Response) => {
    try {
      const user = await getAuthorById(Number(req.params.id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Author not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };


export const deleteAnAuthor = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      await deleteAuthor(Number(req.params.id));
      res.status(200).json({ message: 'Author deleted' });
    } catch (error) {
      res.status(500).json({ error });
    }
  };



