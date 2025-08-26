const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require('jsonwebtoken')


// get all blogs
router.get("/", (request, response) => {
  Blog.find({}).populate('user', {username: 1, name: 1}).then((blogs) => {
    response.json(blogs);
  });
});


// create new blog
router.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })  
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user
  });

  const savedBlog = await blog.save();

  // Add blog in user's , blog list of id
  const userObj = await User.findById(user);
  if (!userObj) {
    return response.status(400).json({ error: "User not found" });
  }
  userObj.blogs = userObj.blogs.concat(savedBlog._id);
  
  await userObj.save();

  response.status(201).json(savedBlog);
});

// delete blog by id
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


// update blog by id
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
