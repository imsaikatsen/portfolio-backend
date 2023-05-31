const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database/database");
const authController = require("./controller/authController");
const jwtMiddleware = require("./middleware/jwtMiddleware");
require("dotenv").config();

const app = express();

// Connect to the database
connectToDatabase();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.post("/api/register", authController.register);
app.post("/api/login", authController.login);
app.get("/api/protected", jwtMiddleware, (req, res) => {
  res.json({ message: "Protected route" });
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
