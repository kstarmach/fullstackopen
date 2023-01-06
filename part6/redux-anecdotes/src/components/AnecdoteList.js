import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === null) {
            return state.anecdotes.sort((a, b) => b.votes - a.votes)
        }
        return state.anecdotes
            .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a, b) => b.votes - a.votes)
    })
    // const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote.id))
        dispatch(newNotification(`you voted '${anecdote.content}'`))
    }

    return (
        <>
            {
                anecdotes.map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AnecdoteList