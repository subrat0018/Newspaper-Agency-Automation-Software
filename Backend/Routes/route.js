const express = require("express");
const router = express.Router();
const {
  Customer,
  Manager,
  Publication,
  DeliveryMan,
} = require("../Database/db");

router.get("/get-publication", async (req, res) => {
  const publications = await Publication.find({});
  let result = new Set();
  publications.forEach((publication) => {
    result.add(publication.name);
  });
  res.send(Array.from(result));
});

router.post("/get-lang", async (req, res) => {
  const pub = req.body.publication;
  const publications = await Publication.find({ name: pub });
  let result = [];
  publications.forEach((publ) => {
    result.push(publ.language);
  });
  res.send(result);
});

router.post("/add-customer", async (req, res) => {
  cname = req.body.name;
  cemail = req.body.email;
  clocation = req.body.location;
  cpname = req.body.publication;
  cplang = req.body.language;
  chouseNo = req.body.houseNo;
  const publication = await Publication.findOne({
    name: cpname,
    language: cplang,
  });
  if (!publication) {
    res.send("No Such publication exists");
    return;
  }
  customerObj = {
    name: cname,
    email: cemail,
    location: clocation,
    amountDue: 0,
    subscriptions: publication,
    houseNo: chouseNo,
  };
  const result = await Customer.findOne({ email: cemail });
  if (result) {
    res.send("Customer email is already exists");
    return;
  }
  customer = new Customer(customerObj);
  customer.save();
  res.send("Customer added successfully");
});

router.post("/remove-customer", async (req, res) => {
  cname = req.body.name;
  clocation = req.body.location;
  const isPresent = await Customer.findOne({
    name: cname,
    location: clocation,
  });
  if (!isPresent) {
    res.send("No such Customer Exist");
    return;
  }
  await Customer.deleteOne({ name: cname, location: clocation });
  res.send("Customer removed successfully");
});

router.post("/add-delivery-man", async (req, res) => {
  dname = req.body.name;
  demail = req.body.email;
  dlocation = req.body.location;
  deliveryManObj = {
    name: dname,
    email: demail,
    location: dlocation,
    earningThisMonth: 0,
  };
  const result = await DeliveryMan.findOne({ email: demail });
  if (result) {
    res.send("This email is already exists");
    return;
  }
  deliveryMan = new DeliveryMan(deliveryManObj);
  deliveryMan.save();
  res.send("Delivery Man added successfully");
});

router.post("/remove-delivery-man", async (req, res) => {
  dname = req.body.name;
  dlocation = req.body.location;
  const isPresent = await DeliveryMan.findOne({
    name: dname,
    location: dlocation,
  });
  if (!isPresent) {
    res.send("No such DeliveryMan Exist");
    return;
  }
  await DeliveryMan.deleteOne({ name: dname, location: dlocation });
  res.send("DeliveryMan removed successfully");
});

router.post("/add-publication", async (req, res) => {
  name = req.body.name;
  language = req.body.language;
  price = req.body.price;
  name = name.toLowerCase();
  language = language.toLowerCase();
  const result = await Publication.findOne({ name: name, language: language });
  if (result) {
    res.send("Publication already exist");
    return;
  }
  const newPublication = new Publication({
    name: name,
    language: language,
    price: price,
  });
  newPublication.save();
  res.send("Successfully saved the publication");
});

router.post("/remove-publication", async (req, res) => {
  name = req.body.name;
  language = req.body.language;
  name = name.toLowerCase();
  language = language.toLowerCase();
  const result = await Publication.findOne({ name: name, language: language });
  if (!result) {
    res.send("No such publication exists!");
    return;
  }
  await Publication.deleteOne({ name: name, language: language });
  res.send("Publication deleted successfully");
});

module.exports = router;
