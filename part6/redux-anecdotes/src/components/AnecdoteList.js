import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, initializeAnecdotes } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === null) {
            return state.anecdotes
        }
        return state.anecdotes
            .filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
     const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, [dispatch]);

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        dispatch(voteAnecdote(anecdote))
        dispatch(newNotification(`you voted '${anecdote.content}'`, 3))
    }

    return (
        <>
            {
                sortedAnecdotes.map(anecdote =>
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