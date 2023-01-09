import { createSlice } from "@reduxjs/toolkit"

const initialState = null
let timeoutID;
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state, action) {
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            return action.payload
        }
    }
})

export const newNotification = (message, time) => {
    return (dispatch) => {
        dispatch(showNotification(message))
        timeoutID = setTimeout(() => dispatch(showNotification(null)), time * 1000)
    }
}

export const { showNotification } = notificationSlice.actions
export default notificationSlice.reducer