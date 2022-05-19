const Person = ({person, onClick}) => (
    <div>
        {person.name} {person.number}
        <button onClick={onClick}>
            delete
        </button>
    </div>
)   

export default Person