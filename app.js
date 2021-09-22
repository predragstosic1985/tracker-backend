// Imports
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const trackerData = require("./controllers/trackerData");

app.use(express.json());
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.use("/api/tracker", trackerData);

//  Listen on port 5000
app.listen(port, () => console.info(`Listening on port ${port}`));
