import { createSlice } from '@reduxjs/toolkit';
import userServices from '../services/user';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const initializeUser = () => {
  return async (dispatch) => {
    const user = await userServices.getUser();
    dispatch(setUser(user));
  };
};

const { setUser } = userSlice.actions;
export default userSlice.reducer;
