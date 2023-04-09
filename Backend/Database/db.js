const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  address: String,
  subscriptions: [publicationSchema],
  witholdSubscriptions: {
    type: [
      {
        publication: publicationSchema,
        time: Number,
      },
    ],
  },
});

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
});

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
