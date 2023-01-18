import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const newNotification = (message) => {
  return (dispatch) => {
    dispatch(setNotification(message));

    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
