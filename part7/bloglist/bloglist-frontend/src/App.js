import { useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
//import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notifiaction from './components/Notification';

//import blogService from './services/blogs';
////import loginServices from './services/login';

//import { newNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import User from './components/User';
import { initializeUser } from './reducers/userReducer';

const App = () => {
  // const [user, setUser] = useState(null);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, []);

  // useEffect(() => {
  //   const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
  //   if (loggedUserJson) {
  //     const user = JSON.parse(loggedUserJson);
  //     setUser(user);
  //     blogService.setToken(user.token);
  //   }
  // }, []);

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const user = await loginServices.login({
  //       username,
  //       password,
  //     });
  //     window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUser(user);
  //     setUsername('');
  //     setPassword('');

  //     dispatch(
  //       newNotification({
  //         message: 'successfully log-in',
  //         errorType: 'success',
  //       })
  //     );
  //   } catch (exception) {
  //     dispatch(
  //       newNotification({
  //         message: exception.response.data.error,
  //         errorType: 'error',
  //       })
  //     );
  //   }
  // };

  // const handleLogout = () => {
  //   setUser(null);
  //   window.localStorage.clear();
  //   dispatch(
  //     newNotification({
  //       message: 'successfully log-out',
  //       errorType: 'success',
  //     })
  //   );
  // };

  const blogFormRef = useRef();

  return (
    <div>
      <User />
      <Notifiaction />

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <BlogList />
    </div>
  );
};

export default App;
