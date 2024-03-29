import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(
    baseUrl + '/' + newObject.id,
    newObject,
    config
  );

  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(token);
  const response = await axios.delete(baseUrl + '/' + id, config);
  return response.data;
};

const commentBlog = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(
    baseUrl + '/' + id + '/comments',
    { comment },
    config
  );

  return response.data;
};

const blogs = {
  getAll,
  setToken,
  create,
  update,
  remove,
  commentBlog,
};

export default blogs;
