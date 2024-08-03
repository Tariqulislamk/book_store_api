import express from 'express';

import { webPort, hostAddress, executeSql } from './config';
import authorRoute from './author/authorRoute';
import bookRoute from './book/bookRoute';

const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(express.json()); // Middleware to parse JSON bodies

// API Endpoint
app.use('/authors', authorRoute);
app.use('/books', bookRoute);

// Build and run the server
app.listen(webPort, () => {
    console.log(`Server running at ${hostAddress}`);
});
