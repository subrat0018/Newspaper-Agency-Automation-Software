const express = require("express");
const router = express.Router();
const {
  Customer,
  Manager,
  Publication,
  DeliveryMan,
} = require("../Database/db");
const authController = require("../Controller/authController");
router.get("/get-publication", async (req, res) => {
  const publications = await Publication.find({});
  let result = new Set();
  publications.forEach((publication) => {
    result.add(publication.name);
  });
  res.send(Array.from(result));
});

router.get("/get-customer", async (req, res) => {
  const customers = await Customer.find({});
  res.send(customers);
});

router.get("/read-cookie", async (req, res) => {
  const cks = req.cookies;
  const token = cks.jwt;
  if (!token) {
    return {};
  } else {
    const payLoad = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );
    const id = payLoad.id;
    const manager = await Manager.findOne({ _id: id });
    let obj = {};
    if (manager) {
      res.send([manager, { role: "manager" }]);
      return;
    }
    const deliveryMan = await DeliveryMan.findOnde({ _id: id });
    if (deliveryMan) {
      res.send([deliveryMan, { role: "deliveryMan" }]);
      return;
    }
    return {};
  }
});
router.post("/signup", authController.signup);
router.post("/login", authController.login);

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

router.post("/withold-subscription", async (req, res) => {
  cnmae = req.body.customerName;
  cemail = req.body.customerEmail;
  pname = req.body.publicationName;
  plang = req.body.publicationLanguage;
  dueTime = req.body.time;
  const customer = await Customer.findOne({ email: cemail });
  if (!customer) {
    res.send("Customer Does not exist");
    return;
  }
  const subscriptions = customer.subscriptions;
  const witholds = customer.witholdSubscriptions;
  subscriptionFound = null;
  newSubscriptions = [];
  subscriptions.forEach((subscription) => {
    if (subscription.name === pname && subscription.language === plang) {
      subscriptionFound = subscription;
    } else {
      newSubscriptions.push(subscription);
    }
  });
  if (!subscriptionFound) {
    res.send("Customer is not subscribed to this subscription");
    return;
  }
  const currentDate = new Date();
  let curr = new Date();
  dueTime = parseInt(dueTime);
  const lastDate = new Date(curr.setDate(curr.getDate() + dueTime));
  await Customer.updateOne(customer, {
    subscriptions: [...newSubscriptions],
    witholdSubscriptions: [
      ...witholds,
      {
        publication: subscriptionFound,
        time: dueTime,
        startDate: currentDate,
        endDate: lastDate,
      },
    ],
  });
  res.send("Added to withold successfully");
});

router.post("/handle-request", async (req, res) => {
  const cname = req.body.customerName;
  const cloc = req.body.location;
  const rtype = req.body.rtype;
  const pname = req.body.publicationName;
  const plang = req.body.publicationLanguage;
  const customer = await Customer.findOne({ name: cname, location: cloc });
  if (!customer) {
    res.send("Customer does not exist");
    return;
  }
  if (rtype === "unsuscribe") {
    newSubscriptions = [];
    subscriptionFound = false;
    subscriptions = customer.subscriptions;
    subscriptions.forEach((subscription) => {
      if (subscription.name === pname && subscription.language === plang) {
        subscriptionFound = true;
      } else {
        newSubscriptions.push(subscription);
      }
    });
    if (subscriptionFound) {
      await Customer.updateOne(customer, {
        subscriptions: [...newSubscriptions],
      });
      res.send("Request successfully processed");
    } else {
      res.send("Customer is not suscribed to this publication");
    }
  } else if (rtype === "suscribe") {
    newSubscriptions = [];
    subscriptionFound = false;
    subscriptions = customer.subscriptions;
    subscriptions.forEach((subscription) => {
      if (subscription.name === pname && subscription.language === plang) {
        subscriptionFound = true;
      } else {
        newSubscriptions.push(subscription);
      }
    });
    if (subscriptionFound) {
      res.send("Customer is already suscribed to this publication");
    } else {
      const publication = await Publication.findOne({
        name: pname,
        language: plang,
      });
      newSubscriptions.push(publication);
      await Customer.updateOne(customer, {
        subscriptions: [...newSubscriptions],
      });
    }
    res.send("Request processed successfully");
  } else {
    res.send("Invalid request");
  }
});
