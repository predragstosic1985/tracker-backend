// Imports
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./permissions.json");
const cors = require("cors");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://playground-47379-default-rtdb.europe-west1.firebasedatabase.app",
});
const db = admin.firestore();
const trackerData = require("./controllers/trackerData");

app.use(express.json());
app.use(cors());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

// const firebaseConfig = {
//   apiKey: "AIzaSyBimhr3Bfr0I4HDwzz5_xJnWgMO70b7s0U",
//   authDomain: "playground-47379.firebaseapp.com",
//   projectId: "playground-47379",
//   storageBucket: "playground-47379.appspot.com",
//   messagingSenderId: "376916100567",
//   appId: "1:376916100567:web:9dc6c683d34b61f59ef792"
// };

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Stole!" });
});

app.use("/api/tracker", trackerData);

//  Listen on port 5000
app.listen(port, () => console.info(`Listening on port ${port}`));
