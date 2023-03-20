import { getAllDiaries } from "../services/diaryService";
import { useState, useEffect } from "react";
import { Diaries } from "../types";

const AllDiaryEntries = () => {
  const [diaries, setDiaries] = useState<Diaries[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
    console.log(diaries);
  }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl mb-5">Diary Entries</h2>
      <ul className="space-y-4">
        {diaries.map((diary) => {
          return (
            <li key={diary.id}>
              <h3 className="font-bold text-xl mb-3">{diary.date}</h3>
              <p>visibility: {diary.visibility}</p>
              <p>weather: {diary.visibility}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AllDiaryEntries;
