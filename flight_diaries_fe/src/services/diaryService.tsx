import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = async () => {
  const res = await axios.get<Diary[]>(baseUrl);
  return res.data;
};

const addDiary = async (obj: NewDiary) => {
  const res = await axios.post<Diary[]>(baseUrl, obj);
  return res.data;
};

export { getAllDiaries, addDiary };

//.then way
// const getAllDiaries = () => {
//   return axios.get<Diary[]>(baseUrl).then((res) => res.data);
// };

// const addDiary = (obj: NewDiary) => {
//   return axios.post<Diary[]>(baseUrl, obj).then((res) => res.data);
// };
