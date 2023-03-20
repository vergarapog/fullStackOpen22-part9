import React from "react";
import AllDiaryEntries from "./components/AllDiaryEntries";
import EntryForm from "./components/EntryForm";

function App() {
  return (
    <div className="App">
      <EntryForm />
      <AllDiaryEntries />
    </div>
  );
}

export default App;
