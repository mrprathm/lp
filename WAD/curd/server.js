const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let data = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main Street',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    address: '789 Oak Drive',
    email: 'michael@example.com',
    phone: '555-555-5555',
  },
  {
    id: 4,
    name: 'Emily Williams',
    address: '321 Cedar Lane',
    email: 'emily@example.com',
    phone: '555-222-3333',
  },
  {
    id: 5,
    name: 'David Brown',
    address: '567 Pine Road',
    email: 'david@example.com',
    phone: '555-777-8888',
  },
  {
    id: 6,
    name: 'Sarah Taylor',
    address: '987 Maple Street',
    email: 'sarah@example.com',
    phone: '555-444-9999',
  },
  {
    id: 7,
    name: 'Robert Anderson',
    address: '543 Birch Avenue',
    email: 'robert@example.com',
    phone: '555-666-2222',
  },
  {
    id: 8,
    name: 'Jennifer Wilson',
    address: '876 Elm Street',
    email: 'jennifer@example.com',
    phone: '555-111-7777',
  },
];

// Get all items
app.get('/items', (req, res) => {
  res.json(data);
});

// Get an item by ID
app.get('/items/:id', (req, res) => {
  const itemId = Number(req.params.id);
  const item = data.find((item) => item.id === itemId);
  console.log(item);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.status(201).json(newItem);
});

// Update an item by ID
app.put('/items/val/:id', (req, res) => {
  const itemId = Number(req.params.id);
  const updatedItem = req.body; // Retrieve the updated item data from the request body

  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem }; // Merge the updated item data into the existing item object
    res.json(data[index]); // Respond with the updated item
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete an item by ID
app.delete('/items/delete/:id', (req, res) => {
  const itemId = req.params.id;
  const index = data.findIndex((item) => item.id === itemId);
  if (index !== -1) {
    const deletedItem = data.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
