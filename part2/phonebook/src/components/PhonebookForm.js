const PhonebookForm = (props) => {
    return (
        <form onSubmit={props.addPerson}>
            <h2>add a new</h2>
            <FormInput
                label={"name"}
                changeHandler={props.handleNameChange}
                value={props.newName}
            />
            <FormInput
                label={"number"}
                changeHandler={props.handleNumberChange}
                value={props.newNumber}
            />
            <div><button type="submit">add</button></div>
        </form>
    )
}

const FormInput = ({ label, changeHandler, value }) => {
    return (
        <div>
            {label}:
            <input onChange={changeHandler} value={value} />
        </div>
    )
}

export default PhonebookForm