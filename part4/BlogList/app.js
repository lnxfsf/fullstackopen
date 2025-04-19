const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);


module.exports = app