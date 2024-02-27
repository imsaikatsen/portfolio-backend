const Blog = require("../models/blog");
exports.add_blog = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Check if both title and description are provided
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    // Create a new blog post
    const newBlog = new Blog({
      title,
      description,
    });

    // Save the new blog post to the database
    await newBlog.save();

    // Return the newly created blog post
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
    blog.title = req.body.title;
    blog.description = req.body.description;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
