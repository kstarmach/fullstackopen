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
      const updatedBlog = action.payload;
      const { id } = updatedBlog;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

const { appendBlog, setBlogs, removeBlog, updateBlog } = blogSlice.actions;

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

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(removeBlog(id));
    dispatch(
      newNotification({
        message: 'Blog successfully deleted',
        errorType: 'success',
      })
    );
  };
};

export const likeBlog = (blogToUpdate) => {
  return async (dispatch) => {
    await blogService.update(blogToUpdate);
    dispatch(updateBlog(blogToUpdate));

    dispatch(
      newNotification({
        message: 'Blog successfully updated',
        errorType: 'success',
      })
    );
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const blogToUpdate = await blogService.commentBlog(id, comment);
    dispatch(updateBlog(blogToUpdate));

    dispatch(
      newNotification({
        message: 'Comment added',
        errorType: 'success',
      })
    );
  };
};

export default blogSlice.reducer;
