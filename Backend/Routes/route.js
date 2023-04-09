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
