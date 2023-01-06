import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: null,
    reducers: {
        newFilter(state, action) {
            state = action.payload
            return state
        }
    }
})

export const { newFilter } = filterSlice.actions
export default filterSlice.reducer