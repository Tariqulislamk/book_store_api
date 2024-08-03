import { executeSql } from "../config";

// Define the data type for the author
interface AuthorData {
  authorID?: number;
  name: string;
  bio?: string;
  birthDate: string;
}

// Start the Model of Create Author
export const createAuthor = async (
  data: AuthorData,
  req: any,
  res: any
): Promise<any> => {
  let responseData: any;
  let query: any;
  if (!data.authorID) {
    query = `CALL Sp_CreateAuthor ('${data.name}','${
      data.bio ? data.bio : ""
    }','${data.birthDate}' ) ;`;
  } else {
    query = `CALL Sp_UpdateAuthor (${data.authorID},'${data.name}','${
      data.bio ? data.bio : ""
    }','${data.birthDate}' ) ;`;
  }

  // ************** End of query **************//
  console.log("Query:", query);
  // Run the query
  let queryResult: any;
  try {
    queryResult = await executeSql(query);
  } catch (error) {
    console.log("MODEL ERROR:", error);
    throw error;
  }

  // Start of manipulate data if need
  try {
    responseData = queryResult;
  } catch (error) {
    throw error;
  }
  // End of manipulate data if need

  // Return data
  if (responseData) {
    return responseData;
  } else {
    throw new Error("Response not found");
  }
};
// End the Model of Create Author

// Define the expected shape of the data parameter
export interface GetAuthorData {
  p_ID?: number | null;
  p_Paginate: boolean;
  p_rowsPerPage: number;
  p_requestedPage: number;
  p_searchValue: any;
  p_orderByColumn: any;
  p_orderBy: string;
}

// Start the Model of Get author
export const getAuthor = async (data: GetAuthorData): Promise<any> => {
  let responseData: any;

  // ************** Preparing query for get author **************//
  let query = `CALL Sp_GetAuthors ('${data.p_ID ?? null}',${data.p_Paginate},${
    data.p_rowsPerPage
  },${data.p_requestedPage},${data.p_searchValue},${data.p_orderByColumn},'${
    data.p_orderBy
  }');`;
  // ************** End of query **************//
  console.log(query);

  // Run the query
  let queryResult: any;
  try {
    queryResult = await executeSql(query);
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }

  // Start of manipulate data if need
  try {
    responseData = queryResult[0]; // assuming queryResult is an array
  } catch (error) {
    throw new Error(`Data manipulation error: ${error}`);
  }
  // End of manipulate data if need

  // Return data
  if (responseData) {
    return responseData;
  } else {
    throw new Error("Not found");
  }
};
// End the Model of Get author

//Get Author by id

export const getAuthorById = async (id: number): Promise<any> => {
  let responseData: any;
  let query = `SELECT * FROM authors WHERE authorID = ${id}`;
  console.log(query);

  // Run the query
  let queryResult: any;
  try {
    queryResult = await executeSql(query);
  } catch (error) {
    throw new Error(`Database error: ${error}`);
  }

  // Start of manipulate data if need
  try {
    responseData = queryResult[0]; // assuming queryResult is an array
  } catch (error) {
    throw new Error(`Data manipulation error: ${error}`);
  }
  // End of manipulate data if need

  // Return data
  if (responseData) {
    return responseData;
  } else {
    throw new Error("Not found");
  }
};

export const deleteAuthor = async (id: number): Promise<void> => {
  await executeSql(`DELETE FROM authors WHERE authorID=${id}`);
};


