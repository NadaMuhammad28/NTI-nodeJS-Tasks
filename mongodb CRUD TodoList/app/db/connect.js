const MongoClient = require("mongodb").MongoClient;
const { DBURL, DBNAME } = process.env;
const connect = (cb) => {
  MongoClient.connect(DBURL, (err, client) => {
    if (err) return cb(err, null);
    const db = client.db(DBNAME);
    cb(null, db);
  });
};
module.exports = connect;
