const { DeliveryMan, Manager } = require("../Database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const signup = async (req, res, next) => {
  password = "";
  if (req.body.password) password = req.body.password;
  else password = crypto.randomBytes(4).toString("hex");
  const hashedPass = await bcrypt.hash(password, 10);
  if (req.body.user === "manager") {
    mname = req.body.name;
    memail = req.body.email;
    const result = await Manager.findOne({ email: memail });
    if (result) {
      res.send("Email is already exist");
      return;
    }
    manager = new Manager({ name: mname, email: memail, password: hashedPass });
    manager.save();
    res.send("Registered Successfully");
  } else {
    dname = req.body.name;
    demail = req.body.email;
    dlocation = req.body.location;
    deliveryManObj = {
      name: dname,
      email: demail,
      location: dlocation,
      earningThisMonth: 0,
      password: hashedPass,
    };
    const result = await DeliveryMan.findOne({ email: demail });
    if (result) {
      res.send("This email is already exists");
      return;
    }
    deliveryMan = new DeliveryMan(deliveryManObj);
    deliveryMan.save();
    res.send("Registered successfully");
  }
};
module.exports = { signup };
