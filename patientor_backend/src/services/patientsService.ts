import patientEntries from "../../data/patientEntries";
import { PatientEntry, PatientNoSSN } from "../types";

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

export default {
  getPatients,
  getPatientsNoSSN,
};
