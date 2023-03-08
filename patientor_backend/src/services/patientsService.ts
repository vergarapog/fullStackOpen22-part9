import patientEntries from "../../data/patientEntries";
import { NewPatientEntry, PatientEntry, PatientNoSSN } from "../types";
import { v1 as uuid1 } from "uuid";
import { parseUUID } from "../utils";

const getPatients = (): PatientEntry[] => {
  return patientEntries;
};

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const id = parseUUID(uuid1());

  const newPatient = {
    id,
    ...entry,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSSN,
  addPatient,
};
