const express = require("express");
const cors = require("cors");
const trackerDataRoute = require("./trackerData.route");

// middleware
// httpLogger
const httpLogger = require("../utils/logger/httpLogger");
// errors
const {
  returnError,
  logErrorMiddleware,
} = require("../middleware/errorHandler");

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);
app.use(httpLogger);
app.use("/api/tracker", trackerDataRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to firebase." });
});

// middleware for logging errors
app.use(logErrorMiddleware);
// middleware for returning response,
// even if there was an error
app.use(returnError);

module.exports = app;
