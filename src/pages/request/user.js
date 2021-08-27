import axios from 'axios';

const getAllUsers = async () => {
  const url = 'http://localhost:3000/accounts/';
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createUser = async (name, email, password, isAdmin) => {
  const url = 'http://localhost:3000/accounts/';
  return axios.post(url, { name, email, password, isAdmin });
};

export { getAllUsers, createUser };
