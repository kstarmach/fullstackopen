import { createSlice } from '@reduxjs/toolkit';
import { newNotification } from './notificationReducer';
import loginServices from '../services/login';
import blogService from '../services/blogs';

const loginSlice = createSlice({
  name: 'login',
  initialState: [],
  reducers: {
    setLogin(state, action) {
      return action.payload;
    },
  },
});

export const initializeLogin = () => {
  return (dispatch) => {
    const userJson = JSON.parse(
      window.localStorage.getItem('loggedBlogappUser')
    );

    if (userJson) {
      dispatch(setLogin(userJson));
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    const user = await loginServices.login({
      username,
      password,
    });

    if (user) {
      const userJson = JSON.stringify(user);
      blogService.setToken(userJson.token);
      window.localStorage.setItem('loggedBlogappUser', userJson);
      dispatch(setLogin(user));
    }

    dispatch(
      newNotification({
        message: 'successfully log-in',
        errorType: 'success',
      })
    );
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.clear();
    dispatch(setLogin(null));
    dispatch(
      newNotification({
        message: 'successfully log-out',
        errorType: 'success',
      })
    );
  };
};

const { setLogin } = loginSlice.actions;
export default loginSlice.reducer;
