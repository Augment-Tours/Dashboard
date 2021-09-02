/* eslint-disable camelcase */
import axios from 'axios';

const getAllArModels = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/armodels/`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createArModel = async (
  name,
  description,
  model,
  x_location,
  y_location,
  z_location,
  x_scale,
  y_scale,
  z_scale,
  floor,
  museums_id,
  image
) => {
  const url = `${process.env.REACT_APP_BACKEND}/armodels/`;
  return axios.post(url, {
    name,
    description,
    model,
    x_location,
    y_location,
    z_location,
    floor,
    x_scale,
    y_scale,
    z_scale,
    museums_id,
    image
  });
};

export { getAllArModels, createArModel };
