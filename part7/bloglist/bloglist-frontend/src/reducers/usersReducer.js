import { createSlice } from '@reduxjs/toolkit';
import userServices from '../services/users';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload;
    },
  },
});

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const user = await userServices.getAllUsers();
    dispatch(setAllUsers(user));
  };
};

const { setAllUsers } = usersSlice.actions;
export default usersSlice.reducer;
