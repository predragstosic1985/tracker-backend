// const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const { v4: uuidv4 } = require("uuid");

// read all
exports.getUsers = (req, res, next) => {
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
            email: doc.data().email,
            password: doc.data().password,
            height: doc.data().height,
            aditionalData: doc.data().aditionalData,
            measurements: doc.data().measurements,
          };

          usersArray.push(user);
        });

        res.send(usersArray);
      }
    } catch (error) {
      next(error);
    }
  })();
};

// read one
exports.getUser = (req, res, next) => {
  (async () => {
    try {
      const id = req.params.id;
      const user = await db.collection("users").doc(id);

      const doc = await user.get();

      if (!doc.exists) {
        res.status(404).send("User with the given ID was not found");
      } else {
        const myNewObj = {
          docID: doc.id,
          id: doc.data().id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          username: doc.data().username,
          email: doc.data().email,
          password: doc.data().password,
          height: doc.data().height,
          aditionalData: doc.data().aditionalData,
          measurements: doc.data().measurements,
        };
        res.send(myNewObj);
      }
    } catch (error) {
      next(error);
    }
  })();
};

// post
exports.createUser = async (req, res, next) => {
  try {
    const usersDB = db.collection("users");
    await usersDB.add({
      id: uuidv4(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: "user",
      measurements: req.body.measurements,
    });

    res.status(200).json({ message: "saved successfully" });
  } catch (error) {
    next(error);
  }
};

// update
exports.updateUser = (req, res, next) => {
  (async () => {
    try {
      const id = req.params.id;
      const data = req.body;
      const user = await db.collection("users").doc(id);
      const doc = await user.get();

      if (!doc.exists) {
        res.status(404).send("User with the given ID was not found");
      } else {
        await user.update(data);
        res.send("Record updated successfuly");
      }
    } catch (error) {
      next(error);
    }
  })();
};

// delete
exports.deleteUser = (req, res, next) => {
  (async () => {
    try {
      const document = await db.collection("users").doc(req.params.id);

      if (!document) {
        res.status(404).send("User with the given ID was not found");
      } else {
        await document.delete();
        return res.status(200).send("Record deleted successfuly");
      }
    } catch (error) {
      next(error);
    }
  })();
};
