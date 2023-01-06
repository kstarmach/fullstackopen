import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationSlice from './reducers/notificationReducer'
import filterSlice from './reducers/filterReducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterSlice,
        notification: notificationSlice
    }
})

export default store