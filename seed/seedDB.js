const mongoose = require("mongoose");
const faker = require("faker");
const User = require("../models/User");
const Record = require("../models/Record");
const dotenv = require("dotenv");
dotenv.config();
console.log("We run the Seed script");

(async function () {
  const connectionStr = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.MONGO_URI}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const coversArr = [
    "https://lastfm.freetls.fastly.net/i/u/300x300/b7e1387c15974583b145baa628b5bd9d.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/bc774aa1cd93455aa894c23e4dcf147e.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/24c41a77c55f55c85227aad3e6b6b34c.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/6b9962167f0f258bb712a30559042847.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/47a9e7f9bb42465bb17de9bb6443a20d.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/e3a5ab5db593474c90186f1d27675d4c.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/fbaca4fa04144408a926fca8c5fb7ea0.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/35be2516b85d426a9949e76545b6e171.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/1b842adc148bf1617efec1285d7aa3cd.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/c0e5c74b9892065101998d04cad4599d.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/95b9d688f9d3cdbf5ef49fc621a979c2.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/be398921906837fe629cc074c74a9788.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/e3d5f839692f40c6a0e1b718b5470d0a.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/698f6f6e7bddbca607a051d5bea778d8.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/dbc1a14d7d2643c75ef78c3d012ea226.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/4801131728db41cfb1b8f128bfae88a1.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/ea1478526a2947adb91787f63a5d96cb.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/42b3ef00cb4a49cfc9342c0bf363de2d.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/24de212fd96528ffdd548bf499c0d161.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/908111b97f5f41c783376fc81535ab01.png",
    "https://lastfm.freetls.fastly.net/i/u/300x300/e04d824b2d764487ac2f23cf55523d55.png",
  ];

  let mapedCovers = coversArr.map((disc) => disc);
  console.log("object :>> ", mapedCovers);
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
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        nickName: faker.internet.userName(),
        password: "1234567",
        avatar: faker.internet.avatar(),
      };
      console.log(`User ${userData.email} has been created`);

      const user = new User(userData);
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log("we stored 10 users in DB");
  } catch (error) {
    console.log(error);
  }

  // Record Promises
  const recordPromises = Array(20)
    .fill(null)
    .map((a, i) => {
      // create a fake record
      const recordData = {
        cover: coversArr[i],
        title: faker.lorem.word(),
        artist: faker.name.jobType(),
        year: faker.date.past(),
        price: faker.finance.amount(20, 50, 0),
      };
      console.log(
        `record ${recordData.title} has been created:${recordData.price}`
      );

      const record = new Record(recordData);
      return record.save();
    });

  try {
    await Promise.all(recordPromises);
    console.log("we stored 20 records in DB");
  } catch (error) {
    console.log(error);
  }
  mongoose.connection.close();
})();
