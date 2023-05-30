const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Secret key used to sign JWTs
const secretKey = "your-secret-key";

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to authenticate requests
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = decoded;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Route to generate a JWT
app.post("/login", (req, res) => {
  // Replace this with your actual authentication logic
  const username = req.body.username;
  const password = req.body.password;

  // Verify the username and password
  if (username === "admin" && password === "password") {
    const user = {
      username: username,
      role: "admin",
    };

    // Generate a JWT
    const token = jwt.sign(user, secretKey);

    res.json({ token: token });
  } else {
    res.sendStatus(401);
  }
});

// Protected route that requires authentication
app.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully!", user: req.user });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
