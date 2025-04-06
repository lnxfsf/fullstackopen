import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([ { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [filterValue, setFilterValue] = useState("");

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
      <div>
          filter show with 
          <input
            value={filterValue}
            onChange={(event) => {
              setFilterValue(event.target.value);
            }} 
          />

        </div>


<h2>Add a new</h2>
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
        {persons.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase())).map((item, index) => {
          return <p key={item.name}>{item.name} {item.number}</p>;
        })}
      </div>
    </div>
  );
};

export default App;
