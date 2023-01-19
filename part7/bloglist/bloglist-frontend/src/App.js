import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import Notifiaction from './components/Notification';
import Navbar from './components/NavBar';

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

  return (
    <div>
      <Navbar />
      <Notifiaction />

      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default App;
