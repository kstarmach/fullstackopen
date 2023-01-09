import { connect } from "react-redux"
import { newFilter } from "../reducers/filterReducer"

const Filter = (props) => {
    //const dispatch = useDispatch()

    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        event.preventDefault()
        const filter = event.target.value
        //dispatch(newFilter(filter))
        props.newFilter(filter)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProp = {
    newFilter
}

export default connect(null, mapDispatchToProp)(Filter)