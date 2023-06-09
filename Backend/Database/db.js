const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Publication schema
const publicationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

//Customer Schema
const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  amountDue: {
    type: Number,
  },
  location: {
    type: String,
    required: true,
  },
  houseNo: Number,
  lastPaid: Date,
  subscriptions: [publicationSchema],
  recievedThisMonth: [{ publication: publicationSchema, noOfCopies: Number }],
  witholdSubscriptions: {
    type: [
      {
        publication: publicationSchema,
        startDate: Date,
        endDate: Date,
        time: Number,
      },
    ],
  },
});

//Manager Schema
const managerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});
const deliveryManSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  earningThisMonth: {
    type: Number,
  },
  password: String,
});

//Creating a collection of each of the physical entity
const Customer = new mongoose.model("Customer", customerSchema);
const Manager = new mongoose.model("Manager", managerSchema);
const Publication = new mongoose.model("Publication", publicationSchema);
const DeliveryMan = new mongoose.model("DeliveryMan", deliveryManSchema);
module.exports = {
  Customer,
  Manager,
  Publication,
  DeliveryMan,
};
