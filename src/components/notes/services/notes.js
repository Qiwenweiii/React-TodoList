import axios from "axios";

const baseUrl = "https://warm-refuge-55188.herokuapp.com/api/notes";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};
const create = (newObj) => {
  const request = axios.post(baseUrl, newObj);
  return request.then((response) => response.data);
};

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then((response) => response.data);
};

export default { getAll, create, update };
