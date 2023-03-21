import { useState, useEffect } from "react";

import AllDiaryEntries from "./components/AllDiaryEntries";
import EntryForm from "./components/EntryForm";

import { getAllDiaries } from "./services/diaryService";
import { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div className="App">
      <EntryForm />
      <AllDiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
