require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectToDB = require("./db/db");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");

// configure express
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(xss());
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// routes
app.use("/api/v1/users", require("./routes/user"));
app.use("/api/v1/jobs", require("./routes/job"));

// middlewares
app.use(require("./middlewares/not-found"));
app.use(require("./middlewares/errors-middleware"));

// start the app
const start = async () => {
  try {
    // connect to db
    await connectToDB();
    console.log("Connected to DB...");

    // launch the server
    const port = process.env.PORT;
    app.listen(port, console.log(`App is Launched on port ${port}`));
  } catch (e) {
    console.log("Cannot connect to db...");
    console.log(e.message);
  }
};

start();

/*
 ** - cors
 ** - helmet
 ** - xss-clean
 ** - express-rate-limit
 */
