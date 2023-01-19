import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notifiaction from './components/Notification';
import LoggedUser from './components/LoggedUser';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeLogin } from './reducers/loginReducer';
import { initializeAllUsers } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeAllUsers());
    dispatch(initializeBlogs());
  }, []);

  const blogFormRef = useRef();

  return (
    <div>
      <Notifiaction />
      <LoggedUser />

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default App;
