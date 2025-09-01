const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const blogsRouter = require("./controllers/blogsRouter");
const usersRouter = require("./controllers/usersRouter")
const loginRouter = require('./controllers/login')


const app = express();
app.use(express.json());


const password = config.MONGODB_PASS;
const database = config.MONGODB_DATABASE;
console.log("database", database)

const mongoUrl = `mongodb+srv://igorlerinc7:${password}@cluster0.n3bexs7.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUrl).then(()=> {
  console.log("connected to mongodb")
});

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter)
app.use('/api/login', loginRouter)


if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

