import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    //const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        //dispatch(createAnecdote(content))
        //dispatch(showNotification(`You just created new anectode`, 1))
        props.createAnecdote(content)
        props.showNotification(`You just created new anectode`, 1)
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

const mapDispatchToProp ={
    createAnecdote,
    showNotification
}

export default connect(null, mapDispatchToProp)(AnecdoteForm)