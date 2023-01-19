import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import BlogList from './components/BlogList';
import BlogDetails from './components/BlogDetails';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import Notifiaction from './components/Notification';
import Navbar from './components/NavBar';
import LoginForm from './components/LoginForm';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeLogin } from './reducers/loginReducer';
import { initializeAllUsers } from './reducers/usersReducer';

import { Container } from '@mui/material';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeLogin());
    dispatch(initializeAllUsers());
    dispatch(initializeBlogs());
  }, []);

  return (
    <Container>
      <Navbar />
      <Notifiaction />
      {/* <LoginForm /> */}
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Container>
  );
};

export default App;
