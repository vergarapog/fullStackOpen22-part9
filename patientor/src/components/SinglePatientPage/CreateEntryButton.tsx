import React, { useState } from "react";

type Props = {
  onCreateEntry: (entryType: string) => void;
};

const CreateEntryButton: React.FC<Props> = ({ onCreateEntry }) => {
  const [showSubButtons, setShowSubButtons] = useState(false);

  const handleMouseEnter = () => {
    setShowSubButtons(true);
  };

  const handleMouseLeave = () => {
    setShowSubButtons(false);
  };

  const handleSubButtonClick = (entryType: string) => {
    onCreateEntry(entryType);
    setShowSubButtons(false);
  };

  return (
    <div className={`relative transition-all `}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=" w-max"
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Entry
        </button>

        <div
          className={`transition-all bg-gray-400  ${
            showSubButtons
              ? "opacity-100 translate-y-2 translate-x-1 p-2 rounded"
              : "opacity-0 "
          }`}
        >
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => handleSubButtonClick("Hospital")}
          >
            Hospital
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => handleSubButtonClick("OccupationalHealthcare")}
          >
            OccupationalHealthcare
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleSubButtonClick("HealthCheck")}
          >
            HealthCheck
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEntryButton;
