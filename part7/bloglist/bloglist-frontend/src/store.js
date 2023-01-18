import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogRerducer from './reducers/blogReducer';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogRerducer,
    user: userReducer,
  },
});

export default store;
