const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/route");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/NewsFlowDB");
const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", router);
app.listen(5000, () => {
  console.log("App is listening at the port no: 5000");
});
