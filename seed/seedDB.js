const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User");
const Record = require("../models/Record");
const dotenv = require("dotenv");
dotenv.config();
console.log("We run the Seed script");

(async function () {
  const DB_NAME = process.env.DB_NAME;
  const DB_USER = process.env.DB_USER;
  const DB_PASSWORD = process.env.DB_PASSWORD;
  const MONGO_URI = process.env.MONGO_URI;

  const connectionStr = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${MONGO_URI}/${DB_NAME}?retryWrites=true&w=majority`;

  mongoose
    .connect(connectionStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("MongoDB is connected 😎");
    })
    .catch((error) => {
      console.log("[ERROR] DB Connection failed", error);
    });
  // We construct 10 fake Users and 20 fake records
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      // create a fake user
      const userData = {
          firstName:faker.name.firstName(),
          lastName:faker.name.lastName(),
          nickName:faker.name.
      };
    });
})();
