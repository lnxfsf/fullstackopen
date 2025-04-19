const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs");

const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

module.exports = app;