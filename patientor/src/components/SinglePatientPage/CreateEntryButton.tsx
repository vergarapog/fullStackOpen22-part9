import React, { useState } from "react";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";

type Props = {
  onCreateEntry: (entryType: EntryType) => void;
};

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck" | null;

const CreateEntryButton: React.FC<Props> = ({ onCreateEntry }) => {
  const [showSubButtons, setShowSubButtons] = useState(false);
  const [entryType, setEntryType] = useState<EntryType>(null);

  const handleMouseEnter = () => {
    setShowSubButtons(true);
  };

  const handleMouseLeave = () => {
    setShowSubButtons(false);
  };

  const handleSubButtonClick = (entryType: EntryType) => {
    onCreateEntry(entryType);
    setEntryType(entryType);
    setShowSubButtons(false);
  };

  return (
    <div className={`relative transition-all `}>
      <div
        onMouseLeave={handleMouseLeave}
        className={`w-max my-3 ${
          showSubButtons ? "bg-gray-200 rounded-lg" : ""
        }`}
      >
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded ${
            showSubButtons ? "text-center" : ""
          }`}
          onMouseEnter={handleMouseEnter}
        >
          Create Entry
        </button>

        <div
          className={`transition-all bg-gray-100 mb-4  ${
            showSubButtons
              ? "opacity-100 translate-y-1  rounded"
              : "opacity-0 h-0 invisible"
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
      {entryType === "Hospital" && <HospitalEntryForm />}
      {entryType === "OccupationalHealthcare" && <OccupationalEntryForm />}
      {entryType === "HealthCheck" && <HealthCheckEntryForm />}
      <CancelButton entryType={entryType} setEntryType={setEntryType} />
    </div>
  );
};

type CancelButtonProps = {
  entryType: EntryType;
  setEntryType: React.Dispatch<React.SetStateAction<EntryType>>;
};

const CancelButton: React.FC<CancelButtonProps> = ({
  entryType,
  setEntryType,
}) => {
  return (
    <>
      {entryType !== null ? (
        <button
          onClick={() => setEntryType(null)}
          className="bg-red-500 py-1 px-2 rounded text-white font-semibold tracking-wide"
        >
          Cancel
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateEntryButton;
