import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogRerducer from './reducers/blogReducer';
import usersReducer from './reducers/usersReducer';
import loginReducer from './reducers/loginReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogRerducer,
    users: usersReducer,
    login: loginReducer,
  },
});

export default store;
