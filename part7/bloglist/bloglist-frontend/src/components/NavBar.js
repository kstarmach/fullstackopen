import { AppBar, Toolbar, IconButton, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/loginReducer';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            User list
          </Button>
          {user ? (
            <Button
              sx={{ marginLeft: 'auto' }}
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              component={Link}
              sx={{ marginLeft: 'auto' }}
              to="/login"
            >
              Login
            </Button>
          )}
          {/* <LoggedUser /> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default NavBar;
