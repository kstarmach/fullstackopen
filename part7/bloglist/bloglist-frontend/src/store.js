import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogRerducer from './reducers/blogReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogRerducer,
  },
});

export default store;
