import axios from 'axios';

const getAllArModels = async (pageNo) => {
    const url = 'http://localhost:3000/armodels/';
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      });
  };

const createArModel = async (name, description, image) => {
  const url = 'http://localhost:3000/armodels/';
  return axios.post(url, { name, description, model, x_location, y_location, floor });
};

export { getAllArModels, createArModel };