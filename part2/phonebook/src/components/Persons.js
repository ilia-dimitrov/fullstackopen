const Persons = ({ filteredPersons, persons, search, deletion }) => {
  return (
    <>
      {search
        ? filteredPersons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}{" "}
              <button
                onClick={() => {
                  deletion(person);
                }}
              >
                delete
              </button>
            </p>
          ))}
    </>
  );
};

export default Persons;
