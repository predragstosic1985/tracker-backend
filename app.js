const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world tracker app setup");
});

app.listen(5000, () => {
  console.log("Server started with express.");
});
