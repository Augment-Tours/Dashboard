import axios from 'axios';

const getAllMuseums = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/museums/`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createMuseum = async (name, description, image) => {
  const url = `${process.env.REACT_APP_BACKEND}/museums/`;
  return axios.post(url, { name, description, image });
};

export { getAllMuseums, createMuseum };
