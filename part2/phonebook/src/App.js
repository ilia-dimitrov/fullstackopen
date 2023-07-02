import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { useEffect, useState } from "react";
import personFunc from "./services/persons";

const App = () => {
  useEffect(() => {
    personFunc.getAll().then((response) => setPersons(response));
  }, []);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [number, setNumber] = useState([]);
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="notification">{message}</div>;
  };
  const Error = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  function handleRemove(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      personFunc
        .remove(person.id)
        .then(() => {
          const updatedPersons = persons.filter((x) => x.id !== person.id);
          setPersons(updatedPersons);
        })
        .catch((error) => {
          setError(
            `Information of ${person.name} has alreadyt been removed from server`
          );
          setTimeout(() => {
            setError(null);
          }, 4000);
        });
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handlePhone = (event) => {
    setNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  const handlePerson = (event) => {
    event.preventDefault();
    const nameCheck = {
      name: newName,
      number: number,
    };

    const duplicateExists = persons.find((person) => person.name === newName);

    if (duplicateExists) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (confirmUpdate) {
        personFunc
          .update(duplicateExists.id, nameCheck)
          .then((response) => {
            const updatedPersons = persons.map((person) =>
              person.id === response.id ? response : person
            );
            setPersons(updatedPersons);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      personFunc
        .create(nameCheck)
        .then((response) => {
          setPersons(persons.concat(response));
          setNotification(`Added ${nameCheck.name}`);
          setTimeout(() => {
            setNotification(null);
          }, 4000);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setNewName("");
    setNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={error} />
      <Filter search={search} handleSearch={handleSearch} />
      <h1>Add a new</h1>
      <PersonForm
        handleForm={handlePerson}
        valueName={newName}
        handleName={handleName}
        valueNumber={number}
        handlePhone={handlePhone}
      />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        persons={persons}
        search={search}
        deletion={handleRemove}
      />
    </div>
  );
};

export default App;
