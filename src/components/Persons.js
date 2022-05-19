import Person from "./Person"

const Persons = ({persons, onRemove}) => {
    return (
    <div>
    {persons.map(person => 
      <Person key={person.id} person={person} onClick={() => onRemove(person.id)}/>
      )}
    </div>)
} 

export default Persons