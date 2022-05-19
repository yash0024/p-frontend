import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Error from './Error'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '12345',
      id: 1 
  }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(intialPeople => {
      setPersons(intialPeople)
    })
  }, [])

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const updateSearchField = (event) => {
    setSearchField(event.target.value)
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    const person = {
      name: newName,
      number: newNumber,
    }

    personService
    .create(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNotification(`Added ${newName}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    })
    .catch(error => {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
  setNewName('')
  setNewNumber('')
  }

  const removePerson = id => {
    const person = persons.find(person => person.id === id) 
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id != id))
        setNotification(`Deleted ${person.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
    }
} 

  const peopleToDisplay = persons.filter(person => person.name.includes(searchField))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
      <Filter onChange={updateSearchField} value={searchField} />
      <h2>add a new</h2>
      <PersonForm 
        onSubmit={addNewPerson}
        nameValue={newName}
        nameOnChange={updateName}
        numberValue={newNumber}
        numberOnChange={updateNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={peopleToDisplay} onRemove={removePerson}/>
    </div>
  )
}

export default App