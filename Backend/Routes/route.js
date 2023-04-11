const express = require("express");
const router = express.Router();
const sendEmail = require("../Controller/sendEmail");
const {
  Customer,
  Manager,
  Publication,
  DeliveryMan,
} = require("../Database/db");
const authController = require("../Controller/authController");

//Get all the current publications
router.get("/get-publication", async (req, res) => {
  const publications = await Publication.find({});
  let result = new Set();
  publications.forEach((publication) => {
    result.add(publication.name);
  });
  res.send(Array.from(result));
});

//Get all the customers that are suscribed to NewsFlow
router.get("/get-customer", async (req, res) => {
  const customers = await Customer.find({});
  res.send(customers);
});

//Get all the delivery-man
router.get("/get-delivery-man", async (req, res) => {
  const deliveryMan = await DeliveryMan.find({});
  res.send(deliveryMan);
});

//Read cookie to store the session i.e. to get the jwt token in order to perform authentication
router.get("/read-cookie", async (req, res) => {
  const cks = req.cookies;
  const token = cks.jwt;
  if (!token) {
    {
      res.send([]);
      return;
    }
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
    const deliveryMan = await DeliveryMan.findOne({ _id: id });
    if (deliveryMan) {
      res.send([deliveryMan, { role: "deliveryMan" }]);
      return;
    }
    return [];
  }
});

//To clear the cookies present in the browser. This function is called when the user logged out from my app
//If the user log in from another account then no need to clear the cookie as the jwt token value will get overwritten
router.get("/clear-cookie", (req, res) => {
  res.clearCookie("jwt");
  res.end();
  res.send("Logged out Successfully");
});

//This call the signup function present in the Controller Directory
router.post("/signup", authController.signup);
//This call the login function present in the Controller Directory
router.post("/login", authController.login);

//This returns all the available languages for a given publication
router.post("/get-lang", async (req, res) => {
  const pub = req.body.publication;
  const publications = await Publication.find({ name: pub });
  let result = [];
  publications.forEach((publ) => {
    result.push(publ.language);
  });
  res.send(result);
});

//Function to add a customer
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
    subscriptions: [publication],
    recievedThisMonth: [{ publication: publication, noOfCopies: 0 }],
    houseNo: chouseNo,
    lastPaid: new Date(),
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

//Function to remove a customer if present
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

//Function to add a publication. It first checks if the publication already exist and if not then it add the publication
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

//function to remove a publication. It first check if there is such a publication or not. If such a publication exists
//then it remove that publication
router.post("/remove-publication", async (req, res) => {
  name = req.body.publication;
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

//function to withold a particular subcription for a user. It first check if the user is subscribed to that publication.
//If the user is subscribed then it moves the subscription to the withold list
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

//function to handle requests of customers.
//A customer can request for subscribe to a publication or unsuscribe from a publication
//While adding the subscription it first check whether the user is already subscribed to the particular publication
//Similarly while unsuscribing a publication it first checks whether the user is subscribed to the publication or not
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
        recievedThisMonth: [
          ...customer.recievedThisMonth,
          { publication: publication, noOfCopies: 0 },
        ],
      });
    }
    res.send("Request processed successfully");
  } else {
    res.send("Invalid request");
  }
});

//Function to generate a bill
//A user's due amount is shown in the bill along with all the publication and number of copies of a particular publication recieved
router.post("/generate-bill", async (req, res) => {
  const { name, email, paid } = req.body;
  console.log(email);
  const customer = await Customer.findOne({ email: email });
  if (!customer) {
    res.send("err");
    return;
  }
  await Customer.updateOne(customer, {
    amountDue: customer.amountDue - paid,
    lastPaid: new Date(),
  });
  const updCust = await Customer.findOne({ email: email });
  res.send(updCust);
});
router.get("/send-mail", async (req, res) => {
  const allCustomer = await Customer.find({});
  const reqCustomer = [];
  allCustomer.forEach((customer) => {
    if (
      Math.ceil(
        Math.abs(new Date(customer.lastPaid) - new Date()) /
          (1000 * 60 * 60 * 24)
      ) > 59
    ) {
      reqCustomer.push(customer);
    }
  });
  sendEmail.sendEmail(reqCustomer);
  res.send("Mails sent successfully");
});

//Function to generate the delivery list of all the customers for a delivery man
router.post("/get-delivery", async (req, res) => {
  const location = req.body.loc;
  const allCust = await Customer.find({ location: location });
  const reqArr = [];
  allCust.forEach((cust) => {
    cust.subscriptions.forEach((sub) => {
      reqArr.push({
        name: cust.name,
        houseNo: cust.houseNo,
        publication: sub.name,
        language: sub.language,
      });
    });
  });
  res.send(reqArr);
});

//When the delivery man confirms a delivery then the amount associated with the publication is
//added to the due amount of the user and 2.5% of the publication price is added to the salary of delivery man
//note: I have simply added the price of the publication in the salary of the delivery man and calculate the 2.5% of the total
//while distributing the salary
router.post("/add-money", async (req, res) => {
  const { name, houseNo, publication, language } = req.body;
  console.log(req.body.name);
  const pub = await Publication.findOne({
    name: publication,
    language: language,
  });
  const customer = await Customer.findOne({ name: name, houseNo: houseNo });
  let newRecieve = [];
  let newSubscriptions = [...customer.subscriptions];
  customer.recievedThisMonth.forEach((publ) => {
    if (
      pub.name === publ.publication.name &&
      pub.language === publ.publication.language
    ) {
      newRecieve.push({ publication: pub, noOfCopies: publ.noOfCopies + 1 });
    } else {
      newRecieve.push(publ);
    }
  });
  const today = new Date();
  customer.witholdSubscriptions.forEach((publ) => {
    if (today >= publ.endDate) {
      newSubscriptions.push(publ.publication);
    }
  });
  await Customer.updateOne(
    { name: name, houseNo: houseNo },
    {
      amountDue: customer.amountDue + pub.price,
      recievedThisMonth: [...newRecieve],
      subscription: [...newSubscriptions],
    }
  );
  const cks = req.cookies;
  const token = cks.jwt;
  const payLoad = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  const id = payLoad.id;
  const deliveryMan = await DeliveryMan.findOne({ _id: id });
  console.log(deliveryMan);
  console.log(pub);
  DeliveryMan.updateOne(deliveryMan, {
    earningThisMonth: deliveryMan.earningThisMonth + pub.price,
  });
  res.send("Delivery Successful");
});

module.exports = router;
