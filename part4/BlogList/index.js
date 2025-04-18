const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const password = process.env.MONGODB_PASS;

const Blog = mongoose.model("Blog", blogSchema);

const mongoUrl = `mongodb+srv://igorlerinc7:${password}@cluster0.n3bexs7.mongodb.net/fullstackopen?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUrl);

app.use(express.json());

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
