const router = require("express").Router();
const deal = require("../controller/deal");
const dbFile = "app/db/users.json";
const userController = require("../controller/user.controller");
//route to home
router.get("/", userController.routeHome);

//route to add user(post method)
router.get("/add", userController.renderAddClient);

router.post("/addPost", userController.addClient);

//route to a single user
router.get("/single/:accNum", userController.showClient);
//---------------------------------------------------------------------
//route to add a transaction page
router.get("/addop/:accNum", userController.routeAddTransaction);

//post the add transaction
router.post("/addopPost", userController.AddTransaction);
//---------------------------------------------------------------------

//---------------------------------------------------------------------
//route to withdraw a transaction page
router.get("/withdraw/:accNum", userController.routeWithdrawTransaction);

//post the add transaction
router.post("/withdrawPost", userController.withdrawTransaction);
//---------------------------------------------------------------------
module.exports = router;
