require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3002

const Person = require('./models/person')

app.use(cors())

app.use(express.static('dist'))
app.use(express.json())

morgan.token('post-data', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
)


app.get('/info', (req, res) => {
  Person.find({})
    .then((phonebook) => {
      res.send(
        `<p>Phonebook has info for ${
          phonebook.length
        } people</p><p>${new Date()}</p>`
      )
    })
    .catch((error) => {
      console.log(error)
      res.status(500).end()
    })
})

app.get('/api/persons', (req, res) => {
  Person.find({})
    .then((result) => {
      console.log('phonebook:', result)
      res.status(200).json(result)
    })
    .catch((error) => {
      console.log(error)
      res.status(500).end()
    })


})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then((result) => {
      if (result) {
        console.log('phonebook by Id:', result)
        res.status(200).json(result)
      } else {
        res.status(404).send('Person not found')
      }
    })
    .catch((error) => next(error))

  /* 
  const contact = phonebook.find((contact) => contact.id === id); */

  /* 
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Not found");
  } */
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  /* 
  const deletingContact = phonebook.find((contact) => contact.id === id); */

  /*  if (deletingContact) {
    phonebook = phonebook.filter((contact) => contact.id !== id);
    return res.status(204).end();
  } else {
    res.status(404).send("Not found");
  } */

  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        console.log('phonebook by Id:', result)
        res.status(204).end()
      } else {
        res.status(404).send('Person not found')
      }
    })
    .catch((error) => next(error))
})

/* 
app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  // TODO posle, ces uraditi proveru
  //const existingContact = phonebook.find((contact) => contact.name === name);


  if (existingContact) {
    return res.status(400).json({ error: "Name must be unique" });
  } else if (!name && !number) {
    return res.status(400).json({ error: "Name and number missing" });
  } else if (!name) {
    return res.status(400).json({ error: "Name missing" });
  } else if (!number) {
    return res.status(400).json({ error: "Number missing" });
  }

  const contact = {
    id: Math.floor(Math.random() * 1000000),
    name,
    number,
  };

  phonebook.push(contact);

  return res.status(200).json(contact);
}); */

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  // TODO posle, ces uraditi proveru
  //const existingContact = phonebook.find((contact) => contact.name === name);

  /*  if (existingContact) {
    return res.status(400).json({ error: "Name must be unique" });
  } else  */ if (!name && !number) {
    return res.status(400).json({ error: 'Name and number missing' })
  } else if (!name) {
    return res.status(400).json({ error: 'Name missing' })
  } else if (!number) {
    return res.status(400).json({ error: 'Number missing' })
  }

  /* const contact = {
    id: Math.floor(Math.random() * 1000000),
    name,
    number,
  };
 */

  const person = new Person({
    name: name,
    number: number,
  })

 
  person
    .save()
    .then((savedContact) => {
      console.log('added number to phonebook', savedContact)
      res.status(200).json(savedContact)
    })
    .catch(error => next(error))

  /* phonebook.push(contact); */

  /* return res.status(200).json({name: name, number: number}); */
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  const { name, number } = req.body

 
  Person.findById(id)
    .then((contact) => {
      if (!contact) {
        return res.status(404).end()
      }

      contact.name = name
      contact.number = number

      return contact.save().then((updatedContact) => {
        res.json(updatedContact)
      })
    })
    .catch((error) => next(error)) 
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
