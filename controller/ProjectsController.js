const Project = require("../models/Project");
const multer = require("multer");
const upload = require("../helper/multerHelper");

exports.add_project = async (req, res) => {
  upload.single("projectImage")(req, res, async (err) => {
    try {
      // Check for multer upload error
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Error uploading image" });
      } else if (err) {
        return res
          .status(400)
          .json({ message: "An unexpected error occurred" });
      }

      const {
        projectTitle,
        projectDescription,
        projectTools,
        projectGithubLink,
        date,
      } = req.body;

      // Check required fields
      if (
        !projectTitle ||
        !projectDescription ||
        !req.file ||
        !projectTools ||
        !projectGithubLink ||
        !date
      ) {
        return res
          .status(400)
          .json({ message: "All project fields are required" });
      }

      // Create a new project instance
      const newProject = new Project({
        projectTitle,
        projectDescription,
        projectImage: req.file.path, // Save path to the uploaded image
        projectTools: projectTools.split(",").map((tool) => tool.trim()), // Convert tools string to array
        projectGithubLink,
        date,
      });

      // Save the new project to the database
      await newProject.save();

      // Return the newly created project in the response
      res.status(201).json(newProject);
    } catch (error) {
      // Handle any other errors
      res.status(500).json({ message: error.message });
    }
  });
};

exports.list_projects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.log("Error fetching projects", error);
    res.status(500).json({ message: error.message });
  }
};

exports.get_project = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not Found" });
    }
    res.status(200).json(project);
  } catch (error) {
    console.log("Error Fetching Project:", error);
    res.status(500).json({ message: error.message });
  }
};
