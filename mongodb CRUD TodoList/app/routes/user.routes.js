const router = require("express").Router();
const connect = require("../db/connect");
const task = require("../controller/user.controller");
const ObjectId = require("mongodb").ObjectId;

router.get("/", task.index);
//add route
router.get("/add", task.add);
router.post("/add", task.addLogic);

//show route
router.get("/task/:id", task.show);
//delete route

router.get("/del/:id", task.del);

//edit route
router.get("/edit/:id", task.edit);
router.post("/edit/:id", task.editLogic);
module.exports = router;
