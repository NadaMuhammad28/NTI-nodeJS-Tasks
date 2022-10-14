const fs = require("fs");
const readFromJson = (fileName) => {
  let myResult;
  try {
    myResult = JSON.parse(fs.readFileSync(fileName));
  } catch (e) {
    myResult = [];
  }
  return myResult;
};
const writeToJson = (data, fileName = "todo.json") => {
  fs.writeFileSync(fileName, JSON.stringify(data));
};
module.exports = {
  readFromJson,
  writeToJson,
};
