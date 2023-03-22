import { useState, useEffect } from "react";

import AllDiaryEntries from "./components/AllDiaryEntries";
import EntryForm from "./components/EntryForm";

import { addDiary, getAllDiaries } from "./services/diaryService";
import { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const handleAddDiary = (
    date: string,
    visibility: string,
    weather: string,
    comment: string
  ) => {
    const newDiary = {
      date,
      visibility,
      weather,
      comment,
    };
    try {
      addDiary(newDiary).then((data) => setDiaries(diaries.concat(data)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <EntryForm handleAddDiary={handleAddDiary} />
      <AllDiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
