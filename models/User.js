const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");

// JWT Secret to create and validate tokens
const secretKey = "thisisalongandsecurestring2.0";

//UserSchema - contains rules about how every User should look like
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, mix: 3, max: 50 },
    lastName: { type: String, required: true, mix: 3, max: 50 },
    email: { type: String, unique: true, required: true, mix: 7, max: 50 },
    nickName: { type: String, required: true, mix: 3, max: 50, unique: true },
    password: { type: String, required: true, mix: 3, max: 50 },
    avatar: {
      type: String,
      required: false,
      default: "/images/guy4.jpg",
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (docOriginal, docToReturn) => {
        delete docToReturn.password;
      },
    },
  }
);

// pre save hook - will get triggered by these actions:
// - user.save()
// - User.create()
// - User.insertMany()
UserSchema.pre("save", function () {
  const user = this;
  // convert plain password to password hash (but ONLY if password was modified)
  if (user.isModified("password")) {
    user.password = bcryptjs.hashSync(user.password, 8); // 8 = salting rounds
  }
});

UserSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});

// Generate token method
UserSchema.methods.generateAuthToken = function () {
  console.log(this); // user
  const user = this;
  // additionally making sure, the JWT ticket itself will expire at some point (in this case in 3 hours)
  const token = jwt
    .sign({ _id: user._id.toString() }, secretKey, { expiresIn: "3h" })
    .toString();

  return token;
};

// Find By token
UserSchema.statics.findByToken = function (token) {
  const User = this;

  // Decode the cookie
  try {
    // if the token is valid then we get back whatever we
    // signed the cookie with  -> { _id: user._id.toString() }
    let decoded = jwt.verify(token, secretKey);
    console.log(`decoded`, decoded);
    return User.findOne({ _id: decoded._id });
  } catch (error) {
    return;
  }
};
//User model => out interface to db (=users collection )
const User = model("User", UserSchema);

module.exports = User;
