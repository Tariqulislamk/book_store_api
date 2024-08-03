import { createBook, GetBookData, deleteBook, getBooks, getBookById, getBookByAuthorId } from "./bookModel";
import { Request, Response, NextFunction } from "express";

// Start the Controller of Create Author
export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let responseData: any;
    let responseError: any;

    let reqBody = req.body;
    try {
        responseData = await createBook(reqBody, req, res);
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

    const reqQuery = req.query as unknown as Partial<GetBookData>;

    // Cast and validate req.query to GetBookData
    const queryData: GetBookData = {
        p_ID: reqQuery.p_ID ? Number(reqQuery.p_ID) : null,
        p_Paginate: reqQuery.p_Paginate || false, 
        p_rowsPerPage: reqQuery.p_rowsPerPage ? Number(reqQuery.p_rowsPerPage) : 0,
        p_requestedPage: reqQuery.p_requestedPage ? Number(reqQuery.p_requestedPage) : 0,
        p_searchValue: reqQuery.p_searchValue || null,
        p_orderByColumn: reqQuery.p_orderByColumn || null,
        p_orderBy: reqQuery.p_orderBy ? reqQuery.p_orderBy : 'asc' 
    };

    try {
        responseData = await getBooks(queryData);
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

export const getABook = async (req: Request, res: Response) => {
    try {
      const user = await getBookById(Number(req.params.id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };


export const deleteABook = async (req: Request, res: Response, next: NextFunction ) => {
    try {
      await deleteBook(Number(req.params.id));
      res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
      res.status(500).json({ error });
    }
  };


  export const getBooksByAuthorID = async (req: Request, res: Response) => {
    try {
      const user = await getBookByAuthorId(Number(req.params.id));
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  };



