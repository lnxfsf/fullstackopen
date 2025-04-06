import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: '040-123456'}]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

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
      <form onSubmit={addContact}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(event) => {
              setNewName(event.target.value);
            }}
          />

        </div>

        <div>
        number:{" "}
          <input
            value={newPhone}
            onChange={(event) => {
              setNewPhone(event.target.value);
            }}
          />
          
        </div>


        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((item, index) => {
          return <p key={item.name}>{item.name} {item.number}</p>;
        })}
      </div>
    </div>
  );
};

export default App;
