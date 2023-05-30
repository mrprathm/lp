const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Set up the middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/crud-demo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a mongoose schema and model
const itemSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemSchema);

// Home route - Display all items
// app.get("/", (req, res) => {
//   Item.find({}, (err, items) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render("index", { items: items });
//     }
//   });
// });
app.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.render("index", { items: items });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

// Create a new item
app.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.newItem,
  });
  newItem.save();
  res.redirect("/");
});

// Delete an item
app.post("/delete", (req, res) => {
  const itemId = req.body.itemId;
  Item.findByIdAndRemove(itemId, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
