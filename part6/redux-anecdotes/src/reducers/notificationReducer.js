import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            return action.payload
        }
    }
})

export const newNotification = (message, time) => {
    return (dispatch) => {
        dispatch(showNotification(message))
        setTimeout(() => dispatch(showNotification(null)), time * 1000)
    }
}

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer