const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/NewFlowDB");

const Schema = mongoose.Schema;

const publicationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  english: {
    type: Boolean,
  },
  hindi: {
    type: Boolean,
  },
  odia: {
    type: Boolean,
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
  subscriptions: [publicationSchema],
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
