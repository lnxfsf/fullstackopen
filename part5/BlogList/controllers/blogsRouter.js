const router = require("express").Router();
const Blog = require("../models/Blog");
const User = require("../models/User");
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// get all blogs
router.get("/", (request, response) => {
  Blog.find({}).populate('user', {username: 1, name: 1}).then((blogs) => {
    response.json(blogs);
  });
});


// create new blog
router.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
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
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })  
    }

    const { id } = request.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: 'only the creator can delete this blog' });
    }

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
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })  
    }

    const { id } = req.params;
    const { title, author, url, likes, user } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'blog not found' });
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return res.status(403).json({ error: 'only the creator can update this blog' });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, author, url, likes, user },
      { new: true, runValidators: true, context: "query" }
    ).populate('user', { username: 1, name: 1 });

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
});



module.exports = router;
