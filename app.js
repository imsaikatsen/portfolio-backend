const express = require("express");
const cors = require("cors");
const path = require("path");
const connectToDatabase = require("./database/database");
require("dotenv").config();

const app = express();

// Connect to the database
connectToDatabase();

app.use(express.json());
app.use(cors());

// Serve static files from the assets directory
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(require("./routers/router"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
