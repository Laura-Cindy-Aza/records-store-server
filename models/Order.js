const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//OrderSchema - contains rules about how every Order should look like
const OrderSchema = new Schema(
  {
    records: [
      {
        record: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],

    totalPrice: { type: Number, required: true },
    userId: {
      type: Schema.Types.ObjectId, // all references have to have ObjectId
      ref: "User", // tell mongoose in WHICH collection to look up this ID
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

OrderSchema.virtual("Your Order ").get(function () {
  return "Your total is " + this.totalPrice;
});

//User model => out interface to db (=users collection )
const Order = model("Order", OrderSchema);

module.exports = Order;
