import React, { useState } from "react";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import patientService from "../../services/patients";
import { FormValues, Patient } from "../../types";
import { useGlobalContext } from "../../context";
import axios from "axios";
import ErrorMessage from "../shared/ErrorMessage";

type Props = {
  singlePatient: Patient | undefined;
};

type EntryType = "Hospital" | "OccupationalHealthcare" | "HealthCheck" | null;

const CreateEntryButton: React.FC<Props> = ({ singlePatient }) => {
  const { patients, setPatients, setErrorMessage } = useGlobalContext();

  const [showSubButtons, setShowSubButtons] = useState(false);
  const [entryType, setEntryType] = useState<EntryType>(null); //testing for multi select, remove later

  const handleMouseEnter = () => {
    setShowSubButtons(true);
  };

  const handleMouseLeave = () => {
    setShowSubButtons(false);
  };

  const handleSubButtonClick = (entryType: EntryType) => {
    setEntryType(entryType);
    setShowSubButtons(false);
  };

  const handleSubmit = async (newEntry: FormValues) => {
    try {
      const { id } = singlePatient as Patient;
      const addedEntry = await patientService.addPatientLogEntry(newEntry, id);

      if (singlePatient) {
        const updatedEntries = singlePatient?.entries.concat(addedEntry);

        const patientWithNewEntry: Patient = {
          ...singlePatient,
          entries: updatedEntries,
        };

        setPatients(
          patients.map((p) => {
            return p.id === id ? patientWithNewEntry : p;
          })
        );
      }

      setEntryType(null);

      console.log(addedEntry + "added");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          setErrorMessage(message);
        } else {
          setErrorMessage("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setErrorMessage("Unknown error");
      }
    }
  };

  return (
    <div className={`relative transition-all `}>
      <div
        className={`w-max my-3 ${
          showSubButtons ? "bg-gray-100 rounded-lg pr-5 pt-2 pb-2  shadow" : ""
        }`}
      >
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded ${
            showSubButtons ? "text-center" : ""
          }`}
          onClick={handleMouseEnter}
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
      <ErrorMessage />
      {entryType === "Hospital" && (
        <HospitalEntryForm handleSubmit={handleSubmit}>
          <CancelButton entryType={entryType} setEntryType={setEntryType} />
        </HospitalEntryForm>
      )}
      {entryType === "OccupationalHealthcare" && (
        <OccupationalEntryForm handleSubmit={handleSubmit}>
          <CancelButton entryType={entryType} setEntryType={setEntryType} />
        </OccupationalEntryForm>
      )}
      {entryType === "HealthCheck" && (
        <HealthCheckEntryForm handleSubmit={handleSubmit}>
          <CancelButton entryType={entryType} setEntryType={setEntryType} />
        </HealthCheckEntryForm>
      )}
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
          type="button"
          onClick={() => setEntryType(null)}
          className="bg-red-500 py-1 px-2 rounded text-white tracking-wide"
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
