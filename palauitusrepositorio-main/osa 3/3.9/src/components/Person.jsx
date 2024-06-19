const Persons = ({ persons, deletePerson }) => {
  const label = 'delete'

  return (
    <div>
      {persons.map((person) =>
        <li key={person.id}> {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>{label}</button></li>
      )}
    </div>
  )
}

export default Persons