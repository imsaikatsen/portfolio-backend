// models/Project.js

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: false,
  },
  projectDescription: {
    type: String,
    required: false,
  },
  projectImage: {
    type: String,
    required: false,
  },
  projectTools: {
    type: [String],
    required: false,
  },
  projectGithubLink: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
