import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { loginUser } from '../reducers/loginReducer';
import { Button } from '@mui/material';

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      username: username.value,
      password: password.value,
    };

    dispatch(loginUser(user));
    resetUsername();
    resetPassword();

    navigate('/');
  };

  if (user) {
    return '';
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" {...username} />
        </div>
        <div>
          <TextField label="password" {...password} />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-button"
        >
          login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
