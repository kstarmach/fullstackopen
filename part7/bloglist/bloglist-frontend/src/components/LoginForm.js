import { useDispatch } from 'react-redux';
import { useField } from '../hooks';
import { loginUser } from '../reducers/loginReducer';

const LoginForm = () => {
  const username = useField('text');
  const password = useField('password');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      username: username.value,
      password: password.value,
    };

    dispatch(loginUser(user));

    // try {
    //   const user = await loginServices.login({
    //     username.value,
    //     password.value,
    //   });
    //   window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    //   blogService.setToken(user.token);

    //   dispatch(
    //     newNotification({
    //       message: 'successfully log-in',
    //       errorType: 'success',
    //     })
    //   );
    // } catch (exception) {
    //   dispatch(
    //     newNotification({
    //       message: exception.response.data.error,
    //       errorType: 'error',
    //     })
    //   );
    // }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
