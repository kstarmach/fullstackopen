import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { newNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      state.map((blog) => blog.id !== action.payload.id);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});
const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    dispatch(setBlogs(await blogService.getAll()));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
    dispatch(
      newNotification({
        message: 'New Blog added',
        errorType: 'success',
      })
    );
  };
};

export default blogSlice.reducer;
