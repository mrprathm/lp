const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let data = [];

// Get all items
app.get("/items", (req, res) => {
  res.json(data);
});

// Get an item by ID
app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const item = data.find((item) => item.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Create a new item
app.post("/items", (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedItem = req.body;
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    data[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

// Delete an item by ID
app.delete("/items/:id", (req, res) => {
  const itemId = req.params.id;
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
