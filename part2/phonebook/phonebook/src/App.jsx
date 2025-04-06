import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addContact= (event) => {
    event.preventDefault()

    setPersons([...persons, 
      {name: newName}
    ])
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={(event) => {setNewName(event.target.value)}}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map((item,index)=> {
        return (<p key={item.name+index}>{item.name}</p>)
      })}
      </div>
    </div>
  )
}

export default App