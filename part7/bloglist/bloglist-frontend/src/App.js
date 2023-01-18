import { useState, useEffect, useRef } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Notifiaction from './components/Notification';

import blogService from './services/blogs';
import loginServices from './services/login';

import { newNotification } from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';

const App = () => {
  //const [errorMessage, setErrorMessage] = useState(null);
  //const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  //   useEffect(() => {
  //     blogService.getAll().then((blogs) => setBlogs(blogs));
  //   }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // const handleNotification = (message, errorType) => {
  //     setErrorMessage({ message: message, errorType: errorType })

  //     setTimeout(() => {
  //         setErrorMessage(null)
  //     }, 5000)
  // }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginServices.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      dispatch(
        newNotification({
          message: 'successfully log-in',
          errorType: 'success',
        })
      );
      //handleNotification('successfully log-in', 'success');
    } catch (exception) {
      console.log(exception);
      //handleNotification(exception.response.data.error, 'error');
      dispatch(
        newNotification({
          message: exception.response.data.error,
          errorType: 'error',
        })
      );
      //handleNotification("wrong credentials", "error")
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
    dispatch(
      newNotification({
        message: 'successfully log-out',
        errorType: 'success',
      })
    );
    //handleNotification('successfully log-out', 'success');
  };

  const blogFormRef = useRef();

  //   const addBlog = (newBlog) => {
  //     blogFormRef.current.toggleVisibility();
  //     blogService
  //       .create(newBlog)
  //       .then((returnedBlog) => {
  //         setBlogs(blogs.concat(returnedBlog));

  //         dispatch(
  //           newNotification({
  //             message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
  //             errorType: 'success',
  //           })
  //         );
  //         //handleNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'success');
  //       })
  //       .catch((exception) => {
  //         dispatch(
  //           newNotification({
  //             message: exception.response.data.error,
  //             errorType: 'error',
  //           })
  //         );
  //         //handleNotification(exception.response.data.error, 'error');
  //       });
  //   };

  //   const updateBlog = (updatedBlog) => {
  //     blogService
  //       .update(updatedBlog)
  //       .then(() => {
  //         setBlogs(blogs.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog)));
  //       })
  //       .catch((exception) => {
  //         dispatch(
  //           newNotification({
  //             message: exception.response.data.error,
  //             errorType: 'error',
  //           })
  //         );
  //         //handleNotification(exception.response.data.error, 'error');
  //       });
  //   };

  //   const increaseLike = (blog) => {
  //     blog.likes += 1;
  //     updateBlog(blog);
  //   };

  //   const removeBlog = (blog) => {
  //     if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
  //       blogService
  //         .remove(blog.id)
  //         .then(() => {
  //           setBlogs(blogs.filter((obj) => obj.id !== blog.id));
  //           dispatch(
  //             newNotification({
  //               message: `blog successfully removed`,
  //               errorType: 'success',
  //             })
  //           );
  //           //handleNotification('blog successfully removed', 'success');
  //         })
  //         .catch((exception) => {
  //           dispatch(
  //             newNotification({
  //               message: exception.response.data.error,
  //               errorType: 'error',
  //             })
  //           );

  //           //handleNotification(exception.response.data.error, 'error');
  //         });
  //     }
  //   };

  return (
    <div>
      <h2>blogs</h2>
      <Notifiaction />
      {user === null ? (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm />
          </Togglable>
          {/* <ul className="blogs">
            {blogs
              .sort((b1, b2) => b2.likes - b1.likes)
              .map((blog) => (
                <Blog key={blog.id} blog={blog} increaseLike={increaseLike} removeBlog={removeBlog} />
              ))}
          </ul> */}
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
