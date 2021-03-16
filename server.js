const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const usersRouter = require("./routes/usersRouter");
const recordsRouter = require("./routes/recordsRouter");

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(express.json());

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

// available routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes

app.use("/users", usersRouter);
app.use("/records", recordsRouter);

// error handling
app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});