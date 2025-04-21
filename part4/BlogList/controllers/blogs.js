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

module.exports = router;
