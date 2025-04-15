require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3002;

const Person = require("./models/person");

app.use(cors());

app.use(express.static("dist"));
app.use(express.json());

morgan.token("post-data", (req) => {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-data"
  )
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const date = new Date();

  Person.find({})
  .then((phonebook) => {
    res.send(
      `<p>Phonebook has info for ${
        phonebook.length
      } people</p><p>${new Date()}</p>`
    );

   
  })
  .catch((error) => {
    console.log(error);
    res.status(500).end();
  });


 
});

app.get("/api/persons", (req, res) => {
  Person.find({})
    .then((result) => {
      console.log("phonebook:", result);
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });

  /*  res.json(phonebook); */
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;

  Person.findById(id)
    .then((result) => {
      if (result) {
        console.log("phonebook by Id:", result);
        res.status(200).json(result);
      } else {
        res.status(404).send("Person not found");
      }
    })
    .catch((error) => next(error));

  /* 
  const contact = phonebook.find((contact) => contact.id === id); */

  /* 
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Not found");
  } */
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
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
        console.log("phonebook by Id:", result);
        res.status(204).end();
      } else {
        res.status(404).send("Person not found");
      }
    })
    .catch((error) => next(error));
});

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

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;

  // TODO posle, ces uraditi proveru
  //const existingContact = phonebook.find((contact) => contact.name === name);

  /*  if (existingContact) {
    return res.status(400).json({ error: "Name must be unique" });
  } else  */ if (!name && !number) {
    return res.status(400).json({ error: "Name and number missing" });
  } else if (!name) {
    return res.status(400).json({ error: "Name missing" });
  } else if (!number) {
    return res.status(400).json({ error: "Number missing" });
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
  });

  console.log("treba da doda");
  person
    .save()
    .then((savedContact) => {
      console.log(`added number to phonebook`, savedContact);
      res.status(200).json(savedContact);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).end();
    });

  /* phonebook.push(contact); */

  /* return res.status(200).json({name: name, number: number}); */
});

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


