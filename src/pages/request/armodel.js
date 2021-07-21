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

export { getAllArModels };