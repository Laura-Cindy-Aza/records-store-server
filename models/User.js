const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//UserSchema - contains rules about how every User should look like
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, mix: 3, max: 50 },
    lastName: { type: String, required: true, mix: 3, max: 50 },
    email: { type: String, unique: true, required: true, mix: 7, max: 50 },
    nickName: { type: String, required: true, mix: 3, max: 50, unique: true },
    password: { type: String, required: true, mix: 3, max: 50 },
    avatar: { type: String, required: false, default: "../assets/doge2.png" },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (docOriginal, docToReturn) => {
        delete docToReturn.password
      }
    },
  }
);

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

//User model => out interface to db (=users collection )
const User = model("User", UserSchema);

module.exports = User;
