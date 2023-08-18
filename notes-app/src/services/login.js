import axios from "axios";

const baseUrl = "/api/login";

const login = async (user) => {
  let loggedinUser = await axios.post(baseUrl, user);
  return loggedinUser.data;
};

// const create = (note) => {
//   return axios.post(baseUrl, note);
// };

// const update = (id, updatedNote) => {
//   return axios.put(`${baseUrl}/${id}`, updatedNote);
// };

export default { login };
