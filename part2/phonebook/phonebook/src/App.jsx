import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState();
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const addContact = (event) => {
    event.preventDefault();

    if (
      persons.find((item) => {
        return item.name === newName;
      })
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newPhone }]);
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

      <Persons persons={persons} filterValue={filterValue} />
    </div>
  );
};

export default App;
