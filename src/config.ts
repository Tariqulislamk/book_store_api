import { createPool, Pool } from "mysql2/promise";

export const webPort: number = Number(process.env.PORT) || 4050; // Use export PORT=4050 or any port to set port as environment variable from terminal
export const hostAddress: string = `http://localhost:${webPort}`;

export const executeSql = async (query: string): Promise<any> => {
  let result;
  const pool: Pool = createPool({
    host: "localhost",
    user: "root",
    // password: 'yourPassword',
    database: "book_store",
    waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
  });

  try {
    const [rows] = await pool.query(query);
    result = rows;
  } catch (err: any) {
    console.log(err);
    throw new Error(`DATABASE ${err.name}: ${err.message}`);
  } finally {
    await pool.end(); // Ensure the pool is closed after the query
  }
  return result;
};
