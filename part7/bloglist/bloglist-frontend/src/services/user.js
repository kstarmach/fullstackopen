// import axios from 'axios';
// const baseUrl = '/api/users';

//let token = null;

const setUser = (user) => {
  const userJson = JSON.stringify(user);
  window.localStorage.setItem('loggedBlogappUser', userJson);
  //token = user.token;
};

const getUser = () => {
  const loggedUser = JSON.parse(
    window.localStorage.getItem('loggedBlogappUser')
  );
  if (loggedUser) {
    //token = loggedUser.token;
    return loggedUser;
  }
  return null;
};

export default { setUser, getUser };
