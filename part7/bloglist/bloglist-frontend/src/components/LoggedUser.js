import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';
import LoginForm from './LoginForm';

const LoggedUser = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <p>
          {user.name} logged in
          <button onClick={() => dispatch(logoutUser())}>logout</button>
        </p>
      )}
    </div>
  );
};

export default LoggedUser;
