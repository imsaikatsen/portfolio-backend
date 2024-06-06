const Blog = require("../models/blog");
const multer = require("multer");
const upload = require("../helper/multerHelper");

exports.add_blog = async (req, res) => {
  upload.single("blogImage")(req, res, async (err) => {
    try {
      // Check for multer upload error
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: "Error uploading image" });
      } else if (err) {
        return res
          .status(400)
          .json({ message: "An unexpected error occurred" });
      }

      const { title, description } = req.body;

      // Check if both title and description are provided
      if (!title || !description || !req.file) {
        return res
          .status(400)
          .json({ message: "Title, description, and blog image are required" });
      }

      // Create a new blog post
      const newBlog = new Blog({
        title,
        description,
        blogImage: req.file.path.replace(/\\/g, "/"), // Save path to the uploaded image
      });
      // Save the new blog post to the database
      await newBlog.save();

      // Return the newly created blog post
      res.status(201).json(newBlog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

// Get all Blogs

exports.get_all_blogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.get_single_blog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.update_single_blog = async (req, res) => {
  upload.single("blogImage")(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.log("Multer Error", err);
        return res.status(400).json({ message: "Error uploading image" });
      } else if (err) {
        console.log("Unknown Error", err);
        return res
          .status(400)
          .json({ message: "An unexpected error occurred" });
      }

      const { title, description } = req.body;

      let updatedData = {
        title,
        description,
      };

      if (req.file) {
        updatedData.blogImage = req.file.path.replace(/\\/g, "/");
      }

      const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, {
        new: true,
      });

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: error.message });
    }
  });
};
exports.delete_single_blog = async (req, res) => {
  try {
    const result = await Blog.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
