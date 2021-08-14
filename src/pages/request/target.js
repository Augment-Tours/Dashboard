import axios from 'axios';

const getAllTargets = async () => {
  const url = 'http://localhost:3000/targets/';
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

/* eslint-disable camelcase */
const createTargetImage = async (information, model, x_location, y_location, floor, museums_id) => {
  const url = 'http://localhost:3000/targets/';
  return axios.post(url, { information, model, x_location, y_location, floor, museums_id });
};

export { getAllTargets, createTargetImage };
