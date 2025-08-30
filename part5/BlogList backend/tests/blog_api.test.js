const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");

const Blog = require("../models/Blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Understanding JavaScript Closures",
    author: "Jane Doe",
    url: "https://example.com/js-closures",
    likes: 12,
  },
  {
    title: "React Hooks: A Complete Guide",
    author: "John Smith",
    url: "https://example.com/react-hooks",
    likes: 45,
  },
  {
    title: "How to Optimize Your Web Performance",
    author: "Emily Johnson",
    url: "https://example.com/web-performance",
    likes: 27,
  },
  {
    title: "A Beginner's Guide to Docker",
    author: "Michael Brown",
    url: "https://example.com/docker-guide",
    likes: 18,
  },
  {
    title: "Exploring CSS Grid and Flexbox",
    author: "Laura White",
    url: "https://example.com/css-grid-flexbox",
    likes: 33,
  },
  {
    title: "Node.js Streams Explained",
    author: "Robert Lee",
    url: "https://example.com/node-streams",
    likes: 21,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

describe("when there are initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    console.log("Fetched blogs:", response.body);

    assert.strictEqual(
      response.body.length,
      initialBlogs.length,
      `Expected ${initialBlogs.length} blogs, got ${response.body.length}`
    );
  });
});

test("unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  const blog = response.body[0];

  assert(blog.id, "Blog is missing 'id' field");
  assert(!blog._id, "Blog should not have '_id' field");
});

test("creates new post", async () => {
  const postResponse = await api.post("/api/blogs").send({
    title: "Unit",
    author: "igor",
    url: "https://obale.com",
    likes: 34,
  });

  const response = await api.get("/api/blogs");

  assert.strictEqual(postResponse.status, 201);

  assert.strictEqual(response.body.length, initialBlogs.length + 1);

  const newBlog = response.body.find((blog) => blog.title === "Unit");

  assert.strictEqual(newBlog.title, "Unit");
  assert.strictEqual(newBlog.author, "igor");
  assert.strictEqual(newBlog.url, "https://obale.com");
  assert.strictEqual(newBlog.likes, 34);
});

test("deletes a blog post successfully", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToDelete = blogsAtStart.body[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await api.get("/api/blogs");
  const titles = blogsAtEnd.body.map((b) => b.title);

  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1);
  assert(!titles.includes(blogToDelete.title));
});

test("updates the number of likes of a blog post", async () => {
  const blogsAtStart = await api.get("/api/blogs");
  const blogToUpdate = blogsAtStart.body[0];

  const updatedLikes = blogToUpdate.likes + 10;

  const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: updatedLikes })
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(result.body.likes, updatedLikes);

  const updatedBlog = await api.get(`/api/blogs`);
  const likesNow = updatedBlog.body.find((b) => b.id === blogToUpdate.id).likes;

  assert.strictEqual(likesNow, updatedLikes);
});

after(async () => {
  try {
    await mongoose.connection.close();
    console.log("Database connection closed successfully");
  } catch (error) {
    console.error("Error closing database connection:", error);
  }
});
