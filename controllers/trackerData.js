const router = require("express").Router();
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const db = admin.firestore();
const { v4: uuidv4 } = require("uuid");

// read all
router.get("/read", (req, res) => {
  (async () => {
    try {
      const comments = await db.collection("users");
      const data = await comments.get();
      const commentsArray = [];
      if (data.empty) {
        res.status(404).send("No comments record found");
      } else {
        data.forEach((doc) => {
          const comment = {
            docID: doc.id,
            name: doc.data().name,
            username: doc.data().username,
            id: doc.data().id,
          };
          commentsArray.push(comment);
        });
        res.send(commentsArray);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = router;
