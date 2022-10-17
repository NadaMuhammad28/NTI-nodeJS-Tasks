const connect = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;
class task {
  //add
  static add = (req, res) => {
    res.render("add", { pageTitle: "New Task" });
  };

  static addLogic = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        req.body.status ? (req.body.status = true) : (req.body.status = false);
        await db.collection("tasks").insertOne(req.body);

        res.redirect("/");
      } catch (e) {
        res.send(e.message);
        res.render("err404", { pageTitle: "database error 2" });
      }
    });
  };

  //--------------
  static index = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        const data = await db.collection("tasks").find().toArray();
        res.render("home", {
          pageTitle: "Tasks",
          data,
          isEmpty: !data.length,
        });
      } catch (e) {
        res.render("err404");
      }
    });
  };
  //------------------SHOW----------------------
  static show = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404");
      try {
        const data = await db
          .collection("tasks")
          .findOne({ _id: new ObjectId(req.params.id) });
        // res.send(data);
        res.render("single", {
          pageTitle: "dd",
          data,
        });
      } catch (e) {
        res.send(e);
      }
    });
  };
  //------------------EDIT----------------------

  static edit = (req, res) => {
    res.render("edit", { pageTitle: "Edit Task" });
  };

  static editLogic = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        const updatedData = await db.collection("tasks").updateOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              title: req.body.title,
              content: req.body.content,
              status: req.body.status
                ? (req.body.status = true)
                : (req.body.status = false),
            },
          }
        );
        // req.send(updatedData);
        res.redirect("/");
      } catch (e) {
        res.send(e);
      }
    });
  };

  // delete func
  static del = (req, res) => {
    connect(async (err, db) => {
      if (err) res.render("err404", { pageTitle: "database error 1" });
      try {
        await db
          .collection("tasks")
          .deleteOne({ _id: new ObjectId(req.params.id) });
        res.redirect("/");
      } catch (e) {
        res.send(e.message);
      }
    });
  };
}

module.exports = task;
