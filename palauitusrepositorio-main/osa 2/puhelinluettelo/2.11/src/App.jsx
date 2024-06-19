import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')  
  const [showAll, setShowAll] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

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