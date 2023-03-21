import { useState } from "react";
import { addDiary } from "../services/diaryService";

const EntryForm = () => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newDiary = {
      date,
      visibility,
      weather,
    };
    // try {
    //   addDiary(newDiary).then((data) => set);
    //   setDate("");
    //   setVisibility("");
    //   setWeather("");
    // } catch (error) {}
  };

  return (
    <div className="my-16" onSubmit={handleSubmit}>
      <h1 className="font-bold text-2xl">Add new entry</h1>
      <form action="">
        <div className="space-x-2">
          <label htmlFor="date">date:</label>
          <input
            className="border"
            value={date}
            id="date"
            type="text"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="visibility">visibility:</label>
          <input
            className="border"
            value={visibility}
            id="visibility"
            type="text"
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div className="space-x-2">
          <label htmlFor="weather">weather:</label>
          <input
            className="border"
            value={weather}
            id="weather"
            type="text"
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <button className="p-2 bg-slate-700 text-white rounded" type="submit">
          add
        </button>
      </form>
    </div>
  );
};

export default EntryForm;
