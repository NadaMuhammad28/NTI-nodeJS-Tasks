const deal = require("../controller/deal");
const dbFile = "app/db/users.json";

const createOperation = (operation, value) => {
  return {
    operation: operation,
    value,
  };
};
class controller {
  static routeHome = (req, res) => {
    const allUsers = deal.readFromJson(dbFile);
    res.render("home", {
      pageTitle: "Home",
      allUsers,
    });
  };

  //////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////

  //route to add user(post method)

  static renderAddClient = (req, res) => {
    res.render("add", {
      pageTitle: "Add Client",
      title: "Add New Client",
    });
  };

  static addClient = (req, res) => {
    const user = {
      accNum: Date.now(),
      ...req.body,
      operations: [],
      remainingBalance: req.body.initBalnce,
    };

    let allUSers = deal.readFromJson(dbFile);
    allUSers.push(user);
    deal.writeToJson(allUSers, dbFile);
    res.redirect("/");
  };

  //route to a single user
  static showClient = (req, res) => {
    let isFound = true;
    const accNum = req.params.accNum;
    const allUsers = deal.readFromJson(dbFile);
    const userData = allUsers.find((user) => user.accNum == accNum);
    const allOperations = userData.operations;
    if (!userData) isFound = false;
    res.render("single", {
      pageTitle: "Client Account Information",
      userData,
      isFound,
      allOperations,
    });
  };

  //---------------------------------------------------------------------
  //route to add a transaction page
  static routeAddTransaction = (req, res) => {
    const accNum = req.params.accNum;
    const allUsers = deal.readFromJson(dbFile);
    const userData = allUsers.find((u) => u.accNum == accNum);
    res.render("addop", {
      pageTitle: "Add A Deposite",
      title: "Deposite",
      userData,
    });
  };

  static AddTransaction = (req, res) => {
    let addedAmount = req.body.value;
    const opr = createOperation("add", addedAmount);

    // console.log(opr);
    let accNum = req.body.accNum;
    let remainingBalance = req.body.remainingBalance;

    const allUsers = deal.readFromJson(dbFile);
    const userData = allUsers.find((u) => u.accNum == accNum);
    // console.log(userData);
    userData.operations.push(opr);
    userData.remainingBalance = +remainingBalance + +addedAmount;

    deal.writeToJson(allUsers, dbFile);

    res.redirect("/");
  };
  static routeWithdrawTransaction = (req, res) => {
    const accNum = req.params.accNum;
    const allUsers = deal.readFromJson(dbFile);
    const userData = allUsers.find((u) => u.accNum == accNum);
    res.render("withdraw", {
      pageTitle: "Withdraw",
      title: "Withdraw",
      userData,
    });
  };

  static withdrawTransaction = (req, res) => {
    let withdrawnAmount = req.body.value;
    const opr = createOperation("withdraw", withdrawnAmount);
    // console.log(opr);
    let accNum = req.body.accNum;
    let remainingBalance = req.body.remainingBalance;

    const allUsers = deal.readFromJson(dbFile);
    const userData = allUsers.find((u) => u.accNum == accNum);
    // console.log(userData);
    userData.operations.push(opr);

    userData.remainingBalance = +remainingBalance - +withdrawnAmount;

    deal.writeToJson(allUsers, dbFile);
    res.redirect("/");
  };
}

module.exports = controller;
