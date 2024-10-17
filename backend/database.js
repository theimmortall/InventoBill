const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/", {
    })
    .then((data) => {
      console.log("connecting to database....");

      console.log(`mongoose connected with server: mongodb://localhost:27017/`);
    });
};

module.exports = connectDatabase;

