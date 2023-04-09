const express = require("express");
const router = express.Router();
const {
  Customer,
  Manager,
  Publication,
  DeliveryMan,
} = require("../Database/db");

router.get("/all-publications", (req, res) => {
  const publications = Publication.find({});
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
module.exports = router;
