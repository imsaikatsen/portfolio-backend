const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwtMiddleware = require("./middleware/jwtMiddleware");
require("dotenv").config();

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//Create userSchema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Create User Model

const User = mongoose.model("User", userSchema);
const app = express();

//Middleware

app.use(express.json());
app.use(cors());

//Routes
app.post("/api/register", async (req, res) => {
  const { name,email,phone, password } = req.body;

  const existingUser = await User.findOne({email})
  if(existingUser) {
    return res.status(409).json({error: "Email already registered"});
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user

  const user = new User({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  //save user to database
  await user.save();
  res.send("User Registered Successfully");
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  //check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid Email or Password");
  }

  //Check if password is not correct

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid Email or Password");
  }

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .header("auth-token", token)
    .send({ message: "Login Successfully Done", token });
});

app.get("/api/protected", jwtMiddleware, (req, res) => {
  res.json({ message: "Protected route" });
});

app.post("/api/hello", jwtMiddleware, (req, res) => {
    res.json({ message: "Hello World" });
  });

//Start Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
