const express = require("express");
const app = express();

const PORT = 3002;

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (req, res) => {
  const date = new Date();

  res.send(
    `<p>Phonebook has info for ${
      phonebook.length
    } people</p><p>${new Date()}</p>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(phonebook);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = phonebook.find((contact) => contact.id === id);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).send("Not found")
  }

 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
