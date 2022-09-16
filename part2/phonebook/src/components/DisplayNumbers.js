const DisplayNumbers = ({ persons, deleteButton }) => {
    return (
        <>
            <h2>Numbers</h2>
            <table>
                <tbody>
                    {persons.map(person =>
                        <Number
                            key={person.id}
                            name={person.name}
                            number={person.number}
                            deleteButton={deleteButton}
                            id={person.id}
                        />
                    )}
                </tbody>
            </table>
        </>
    )
}

const Number = ({ name, number, id, deleteButton }) => {

    return (
        <tr style={{ textAlign: "left" }}>
            <td >
                {name}
            </td>
            <td>
                {number}
            </td>
            <td>
                <button onClick={() => deleteButton(id)}>delete</button>
            </td>
        </tr>
    )
}

export default DisplayNumbers