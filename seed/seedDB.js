const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User");
const Record = require("../models/Record");
const dotenv = require("dotenv");
dotenv.config();
console.log("We run the Seed script");


(async function () {

  const connectionStr = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

    try {
      await User.deleteMany({});
      console.log(`Old users moved to a better place, Spandau`);
    } catch (error) {
      console.log(error);
    }

    // We need to drop records
    try {
      await Record.deleteMany({});
      console.log(`Old record moved to a better place, the woods`);
    } catch (error) {
      console.log(error);
    }


  // We construct 10 fake Users and 20 fake records
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      // create a fake user
      const userData = {
          firstName:faker.name.firstName(),
          lastName:faker.name.lastName(),
          email: faker.internet.email(),
          nickName:faker.internet.userName(),
          password: "1234567",
          avatar: faker.internet.avatar(),

      };
      console.log(`User ${userData.email} has been created`);

      const user = new User(userData);
      return user.save();
    });

    try{
      await Promise.all(userPromises);
      console.log("we stored 10 users in DB");
    }
    catch(error){
      console.log(error)
    }


//Record Promises
    const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      // create a fake record
      const recordData = {
          cover: faker.image.abstract(),
          title:faker.lorem.word(),
          artist: faker.name.jobType(),
          year:faker.date.past(),
      };
      console.log(`record ${recordData.title} has been created`);

      const record = new Record(recordData);
      return record.save();
    });

    try{
      await Promise.all(recordPromises);
      console.log("we stored 20 records in DB");
    }
    catch(error){
      console.log(error)
    }
    mongoose.connection.close();
})();


