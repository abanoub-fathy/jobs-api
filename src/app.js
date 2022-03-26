require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectToDB = require("./db/db");

// configure express
const app = express();
app.use(express.json());

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
