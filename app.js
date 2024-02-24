const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./database/database");
require("dotenv").config();

const app = express();

// Connect to the database
connectToDatabase();

app.use(express.json());
app.use(cors());

app.use(require("./routers/router"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
