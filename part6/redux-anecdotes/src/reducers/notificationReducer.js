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

export const newNotification = (message) => {
    return (dispatch) => {
        dispatch(showNotification(message))
        setTimeout(() => dispatch(showNotification(null)), 5000)
    }
}

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer