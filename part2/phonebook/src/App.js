import { useState, useEffect } from 'react'
import personsServices from './services/persons'

import DisplayNumbers from './components/DisplayNumbers'
import PhonebookForm from './components/PhonebookForm'
import Filter from './components/Filter'



const Alert = ({ alert }) => {
  if (alert === null) {
    return <></>
  }
  return (
    <div className={alert.style}>
      {alert.text}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [alert, setAlert] = useState(null)


  useEffect(() => {
    personsServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons =
    (filter === '')
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))


  const addPerson = (event) => {
    event.preventDefault();

    if (!checkIfFormIsCorrect()) {
      alert(`Fill in all required fields!`)
    } else {

      const newPerson = {
        name: newName,
        number: newNumber
      }

      if (!checkIfAlreadyExist) {
        personsServices
          .create(newPerson)
          .then(response => {
            setPersons(persons.concat(response))
            setNewName('');
            setNewNumber('');
          })
          .then(
            setAlert({
              style: "success",
              text: `${newPerson.name} has been added to database.`
            }),
            setTimeout(() => {
              setAlert(null)
            }, 5000)
          )

      } else {
        if (window.confirm(`${newPerson.name} already added to phonebook, replace the old number with a new one?`)) {
          personsServices
            .update(persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase()).id, newPerson)
            .then(() => {
              personsServices
                .getAll()
                .then(response => {
                  setPersons(response)
                })
                .then(
                  setAlert({
                    style: "success",
                    text: `${newPerson.name} has been added to database.`
                  }),
                  setTimeout(() => {
                    setAlert(null)
                  }, 5000)
                )
            })
        }
      }
    }
  }

  const deletePerson = id => {
    if (window.confirm(`Are you sure?`)) {
      personsServices
        .remove(id)
        .then(() => {
          personsServices
            .getAll()
            .then(response => {
              setPersons(response)
            })

        })
        .catch(() => {
          setAlert({
            style: "danger",
            text: `${persons.find(person => person.id === id).name} has already been deleted.`
          })
          personsServices
            .getAll()
            .then(response => {
              setPersons(response)
            })
          setTimeout(() => {
            setAlert(null)
          }, 5000)
        })
    }
  }

  const checkIfAlreadyExist = persons.some(element => {
    if (element.name.toLowerCase() === newName.toLowerCase()) {
      return true;
    }
    return false;
  })

  function checkIfFormIsCorrect() {
    if (newName === '' || newNumber === '') {
      return false;
    }
    return true
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert alert={alert} />
      <Filter handleFilter={handleFilter} />

      <PhonebookForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <DisplayNumbers persons={filteredPersons} filter={filter} deleteButton={deletePerson} />
    </div>
  )
}

export default App