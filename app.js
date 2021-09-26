const port = process.env.PORT || 5000;
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});
const app = require("./routes");

console.log("PORT", process.env.PORT);

//  Listen on port 5000
app.listen(port, () => console.info(`Listening on port ${port}`));
