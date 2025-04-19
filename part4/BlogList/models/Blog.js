const mongoose = require("mongoose");

const config = require("../utils/config");

const password = config.MONGODB_PASS;
const database = config.MONGODB_DATABASE;
console.log("database", database)

const mongoUrl = `mongodb+srv://igorlerinc7:${password}@cluster0.n3bexs7.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUrl).then(()=> {
  console.log("connected to mongodb")
});

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
