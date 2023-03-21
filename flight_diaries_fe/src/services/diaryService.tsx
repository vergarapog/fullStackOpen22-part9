import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((res) => res.data);
};

const addDiary = (obj: NewDiary) => {
  return axios.post<Diary[]>(baseUrl, obj).then((res) => res.data);
};

export { getAllDiaries, addDiary };
