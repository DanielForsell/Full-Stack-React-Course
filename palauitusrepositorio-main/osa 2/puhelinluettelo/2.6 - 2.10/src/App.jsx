import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [showAll, setShowAll] = useState('')

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(showAll))
    

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handlePersonNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handlePersonShow = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }

  
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handlePersonShow={handlePersonShow} />

      <h3>Add a new</h3>

      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handlePersonNumber={handlePersonNumber}
      />

      <h3>Numbers</h3>

      <Persons persons={personToShow} />
    </div>
  )

}

export default App