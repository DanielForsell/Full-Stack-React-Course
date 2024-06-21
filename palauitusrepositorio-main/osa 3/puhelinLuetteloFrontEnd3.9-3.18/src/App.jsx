import { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import servicePersons from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  

  const hook = () => {
    console.log('effect')
    servicePersons.getAll().then(initialPersons => {
      console.log('promise fulfilled')
      setPersons(initialPersons)
    })
  }

  useEffect(hook, [])

  console.log(persons);

  const personToShow = persons.filter(person => person.name.toLowerCase().includes(showAll))


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        

        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }

        servicePersons.update(changedPerson.id, changedPerson).then(newPerson => {

          console.log('updated person')
          setPersons(persons.map(person => person.id !== changedPerson.id ? person : newPerson)

          
          
          )
        }
        )

        if (persons.some(person => person.name !== newName)) {
          setErrorMessage(`Person ${newName} is already been removed from server`)
          hook()
          return
        }
        
        setErrorMessage(`Updated person: ${person.name}`)
        
          setTimeout(() => {

            setErrorMessage(null)
          }, 3000);
      }

      return
    }



    const personObject = {
      name: newName,
      number: newNumber
    }

    servicePersons.create(personObject).then(newPerson => {
      console.log('new Person added')
      setPersons(persons.concat(newPerson))
      setErrorMessage(`Added new person: ${newPerson.name}`)
      

      setTimeout(() => {
        setErrorMessage(null)
      }, 3000);

    })

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log('deleting person by id: ', id);
    if (window.confirm(`Are you sure that you want to delete person by id: ${id}?`)) {
      servicePersons.deletePerson(id).then(response => {
        console.log('deleted person')
        setPersons(persons.filter(person => person.id !== id))

        setErrorMessage(`Deleted person by id: ${id}`)
        
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000);

      })
    }


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
      <Notification message={errorMessage}/>
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

      <Persons
        persons={personToShow}
        deletePerson={deletePerson} />
    </div>
  )

}

export default App