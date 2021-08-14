/* eslint-disable camelcase */
import axios from 'axios';

const getAccountByEmail = async (email) => {
  const url = `http://localhost:3000/accounts/getBy/email?email=${email}`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const isUserAdmin = async (email) =>
  getAccountByEmail(email)
    .then((res) => {
      console.log(res.isAdmin);
      return res.isAdmin;
    })
    .catch((err) => console.log(err));

export { getAccountByEmail, isUserAdmin };
