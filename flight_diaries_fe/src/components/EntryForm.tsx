import { useState } from "react";

interface EntryFormProps {
  handleAddDiary: (
    date: string,
    visibility: string,
    weather: string,
    comment: string
  ) => void;
}

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      props.handleAddDiary(date, visibility, weather, comment);
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
    } catch (error) {
      console.log("Error in adding diaries from Entry Form Component");
    }
  };

  return (
    <div className="my-16" onSubmit={handleSubmit}>
      <h1 className="font-bold text-2xl">Add new entry</h1>
      <form action="" className="space-y-3">
        <div className="space-x-2">
          <label htmlFor="date">Date:</label>
          <input
            className="border"
            value={date}
            id="date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex space-x-3">
          <div>Visibility: </div>
          <div className="space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="great"
                  name="visibility"
                  value="great"
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="great">Great</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="good"
                  name="visibility"
                  value="good"
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="good">Good</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="ok"
                  name="visibility"
                  value="ok"
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="ok">Ok</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="poor"
                  name="visibility"
                  value="poor"
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="poor">Poor</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <div>Weather: </div>
          <div className="space-x-2">
            <div className="flex flex-col">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="sunny"
                  name="weather"
                  value="sunny"
                  onChange={(e) => setWeather(e.target.value)}
                />
                <label htmlFor="sunny">Sunny</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="rainy"
                  name="weather"
                  value="rainy"
                  onChange={(e) => setWeather(e.target.value)}
                />
                <label htmlFor="rainy">Rainy</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="cloudy"
                  name="weather"
                  value="cloudy"
                  onChange={(e) => setWeather(e.target.value)}
                />
                <label htmlFor="cloudy">Cloudy</label>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="stormy"
                  name="weather"
                  value="stormy"
                  onChange={(e) => setWeather(e.target.value)}
                />
                <label htmlFor="stormy">Stormy</label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="windy"
                  name="weather"
                  value="windy"
                  onChange={(e) => setWeather(e.target.value)}
                />
                <label htmlFor="windy">Windy</label>
              </div>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <label htmlFor="comment">comment:</label>
          <input
            className="border"
            value={comment}
            id="comment"
            type="text"
            onChange={(e) => setComment(e.target.value)}
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
