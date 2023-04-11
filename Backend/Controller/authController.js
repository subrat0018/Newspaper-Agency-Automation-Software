const { DeliveryMan, Manager } = require("../Database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const process = require("process");

const maxAge = 60 * 60 * 24;

//Creating a jwt token so that I can store the session and to make authentication more easy
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge });
};

//Function for signing up
//We hashed the password using bcrypt js and store the hashed password in the database
//If manager creates a delivery man and do not mention the password then it
//automatically generates a password of length 8 and send the password via email to the user
const signup = async (req, res, next) => {
  password = "";
  if (req.body.password) password = req.body.password;
  else password = crypto.randomBytes(4).toString("hex");
  const hashedPass = await bcrypt.hash(password, 10);
  if (req.body.role === "manager") {
    mname = req.body.name;
    memail = req.body.email;
    const isDeliveryManExist = await DeliveryMan.findOne({ email: memail });
    const isManagerExist = await Manager.findOne({ email: memail });
    if (isDeliveryManExist || isManagerExist) {
      res.send("This email is already exists");
      return;
    }
    manager = new Manager({ name: mname, email: memail, password: hashedPass });
    manager.save();
    res.send("Registered successfully");
  } else {
    dname = req.body.name;
    demail = req.body.email;
    dlocation = req.body.location;
    if (!dlocation) dlocation = "Rourkela";
    deliveryManObj = {
      name: dname,
      email: demail,
      location: dlocation,
      earningThisMonth: 0,
      password: hashedPass,
    };
    const isDeliveryManExist = await DeliveryMan.findOne({ email: demail });
    const isManagerExist = await Manager.findOne({ email: demail });
    if (isDeliveryManExist || isManagerExist) {
      res.send("This email is already exists");
      return;
    }
    deliveryMan = new DeliveryMan(deliveryManObj);
    deliveryMan.save();
    res.send("Registered successfully");
  }
};

//Login function to authenticate the user
//I used bcrypt's compare function to compare the hashed password to the given password
const login = async (req, res, next) => {
  const userName = req.body.email;
  const password = req.body.password;
  const manager = await Manager.findOne({ email: userName });
  const deliveryMan = await DeliveryMan.findOne({ email: userName });
  let user;
  let role;
  if (manager) {
    user = manager;
    role = "manager";
  } else if (deliveryMan) {
    user = deliveryMan;
    role = "deliveryMan";
  } else {
    res.send("This user does not exist");
    return;
  }
  const isAuthenticated = await bcrypt.compare(password, user.password);
  if (isAuthenticated) {
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.send("Logged In");
  } else {
    res.send("Email and password does not match");
  }
};
module.exports = { signup, login };
