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
      const users = await db.collection("users");
      const data = await users.get();
      const usersArray = [];
      if (data.empty) {
        res.status(404).send("No record found");
      } else {
        data.forEach((doc) => {
          const user = {
            docID: doc.id,
            id: doc.data().id,
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            username: doc.data().username,
            password: doc.data().password,
            gender: doc.data().gender,
            height: doc.data().height,
            aditionalData: doc.data().aditionalData,
            measurements: doc.data().measurements,
          };
          usersArray.push(user);
        });
        res.send(usersArray);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// read one
router.get("/read/:id", (req, res) => {
  (async () => {
    try {
      console.log(req.params.id, "req.params.id");
      const id = req.params.id;
      const user = await db.collection("users").doc(id);
      const data = await user.get();
      if (!data.exists) {
        res.status(404).send("User with the given ID was not found");
      } else {
        const myNewObj = {
          docID: doc.id,
          id: doc.data().id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          username: doc.data().username,
          password: doc.data().password,
          gender: doc.data().gender,
          height: doc.data().height,
          aditionalData: doc.data().aditionalData,
          measurements: doc.data().measurements,
        };
        res.send(myNewObj);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// post
router.post("/create", urlencodedParser, async (req, res) => {
  try {
    const usersDB = db.collection("users");
    await usersDB.add({
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      role: "user",
      measurements: req.body.measurements,
    });
    console.log(req.body);
    res.status(200).json({ message: "saved successfully" });
  } catch (error) {
    console.log("something went wrong, please try again later");
    return res.status(500).send(error);
  }
});

// update
router.put("/update/:id", (req, res) => {
  (async () => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = await db.collection("users").doc(id);
      await user.update(data);
      res.send("Record updated successfuly");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

// delete
router.delete("/delete/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("users").doc(req.params.id);
      await document.delete();
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = router;
