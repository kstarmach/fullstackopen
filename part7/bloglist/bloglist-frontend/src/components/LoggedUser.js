import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

const LoggedUser = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login);

  return (
    <div>
      {user === null ? (
        ''
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
