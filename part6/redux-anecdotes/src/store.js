import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notificationReducer'


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notification: notificationSlice
    }
})

export default store