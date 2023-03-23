import axios from "axios";
import { useState, useEffect } from "react";

import AllDiaryEntries from "./components/AllDiaryEntries";
import EntryForm from "./components/EntryForm";
import ErrorMessage from "./components/ErrorMessage";

import { addDiary, getAllDiaries } from "./services/diaryService";
import { Diary } from "./types";

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  const handleAddDiary = async (
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
      const data = await addDiary(newDiary);
      setDiaries(diaries.concat(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const slicedErrorMessage = error.response?.data.replace(
          "Something went wrong.",
          ""
        );
        setErrorMessage(slicedErrorMessage);
      } else {
        throw error;
      }
    }
  };

  return (
    <div className="App">
      {errorMessage && (
        <ErrorMessage
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      <EntryForm handleAddDiary={handleAddDiary} />
      <AllDiaryEntries diaries={diaries} />
    </div>
  );
}

export default App;
