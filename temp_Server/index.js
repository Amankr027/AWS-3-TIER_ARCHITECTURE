// //importing express, environmental variables, bodyparser, router, database connection function and declaring them in a varibale to be using it in our index.js file
// const express = require('express');
// const dotenv = require('dotenv');
// const ConnectDB = require('./db/ConnectDB');
// const app = express();
// const router = require('./routes/DBOperRoutes');
// const bodyParser = require('body-parser');
// const cors = require("cors")
// dotenv.config();
// //using the port in environmental variable or 5000
// const port = process.env.PORT || 5000;

// // middleware to parse incoming request in bodies
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));


// // const corsOptions = {
// //     origin: process.env.CORS_ORIGIN || "*", // Replace with frontend URL in production
// //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
// //     credentials: true
// //   };
// //   app.use(cors(corsOptions));


// app.use(cors())
// // initialize the database connection pool
// let pool;

// (async () => {
//     pool = await ConnectDB();

//     // pass the pool to the routes
//     app.use((req, res, next) => {
//         req.pool = pool;
//         next();
//     });

//     // use the router
//     app.use("/", router);

//     // start the server
//     app.listen(port, () => {
//        console.log(`Server running on port ${port}`);

//     });
// })();


const express = require("express");
const dotenv = require("dotenv");
const ConnectDB = require("./db/ConnectDB");
const router = require("./routes/DBOperRoutes");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration (Allow AWS ALB & Frontend)
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*", // Set frontend ALB URL in AWS
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true // Allows cookies & authentication tokens
};
app.use(cors(corsOptions));

// Initialize Database and Start Server
(async () => {
  try {
    const pool = await ConnectDB();

    // Attach database pool to every request
    app.use((req, res, next) => {
      req.pool = pool;
      next();
    });

    // Use routes
    app.use("/", router);

    // Start the Express server
    app.listen(port, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${port}`);
    });

  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // Exit process if DB connection fails
  }
})();
