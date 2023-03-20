import axios from "axios";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export { getAllDiaries };
