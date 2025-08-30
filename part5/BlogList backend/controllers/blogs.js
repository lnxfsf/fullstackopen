const router = require("express").Router();
const Blog = require("../models/Blog");

router.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

router.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (error) {
    console.error("Error deleting blog:", error);
    response
      .status(500)
      .json({ error: "something went wrong deleting the blog" });
  }
});


// routes/blogs.js or wherever your blogsRouter is
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { likes } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { likes },
      { new: true, runValidators: true, context: "query" }
    );

    if (updatedBlog) {
      res.status(200).json(updatedBlog);
    } else {
      res.status(404).json({ error: "blog not found" });
    }
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});



module.exports = router;
