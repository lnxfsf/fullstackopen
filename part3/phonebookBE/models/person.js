const mongoose = require('mongoose')

const password = process.env.MONGODB_PASS

const url = `mongodb+srv://igorlerinc7:${password}@cluster0.n3bexs7.mongodb.net/fullstackopen?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose
  .connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
/* 
  content: {
    type: String,
    minLength: 5,
    required: true
  }, */
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: true
  },
  number: {
    type: String,
    required: true,

    validate: {
      validator: function(v)  {
        return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
      },
      message: props => `${props.value} is not a valid phone number! Format must be XX-XXXXXXX or XXX-XXXXXXXX`
    }

  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)

/* 
/* if (process.argv.length === 3) {
Person.find({}).then((result) => {
  console.log("phonebook:");

  result.forEach((person) => {
    console.log(`${person.name} ${person.number}`);
  });

  mongoose.connection.close();
}); */
