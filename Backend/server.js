const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("App is listening at the port no: 5000");
});
