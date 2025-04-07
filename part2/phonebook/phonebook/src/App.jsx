import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    personService.getAll().then((res) => setPersons(res));
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    const newObject = {
      name: newName,
      number: newPhone,
    };

    if (
      persons.find((item) => {
        return item.name === newName;
      })
    ) {
      // user exists, ask for confirmation if they want to replace it, otherwise do nothing
      if (
        confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const oldUsername = persons.find((item) => {
          return item.name === newName;
        });

        personService
          .update(oldUsername.id, newObject)
          .then((updatedPerson) =>
            setPersons(
              persons.map((p) => (p.id !== oldUsername.id ? p : updatedPerson))
            )
          );
      }
    } else {
      personService
        .create(newObject)
        .then((res) => setPersons([...persons, { ...res }]));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterValue={filterValue} setFilterValue={setFilterValue} />

      <PersonForm
        addContact={addContact}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />

      <Persons
        persons={persons}
        setPersons={setPersons}
        filterValue={filterValue}
      />
    </div>
  );
};

export default App;
