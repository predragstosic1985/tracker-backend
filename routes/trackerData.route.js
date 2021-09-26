const router = require("express").Router();
const controller = require("../controllers/trackerData");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/read", controller.getUsers);

router.get("/read/:id", controller.getUser);

router.post("/create", controller.createUser);

router.put("/update/:id", urlencodedParser, controller.updateUser);

router.delete("/delete/:id", controller.deleteUser);

module.exports = router;
