import axios from 'axios';

const getAllTargets = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/targets/`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

/* eslint-disable camelcase */
const createTargetImage = async (
  information,
  model,
  x_location,
  y_location,
  floor,
  museums_id,
  type
) => {
  const url = `${process.env.REACT_APP_BACKEND}/targets/`;
  return axios.post(url, { information, model, x_location, y_location, floor, museums_id, type });
};

export { getAllTargets, createTargetImage };
