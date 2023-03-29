import patientEntries from "../../data/patientEntries";
import {
  NewPatientEntry,
  NonSensitivePatient,
  Patient,
  PatientNoSSN,
} from "../types";
import { v1 as uuid1 } from "uuid";
import { parseUUID } from "../utils";

const getPatients = (): Patient[] => {
  return patientEntries;
};

const getPatientsNoSSN = (): PatientNoSSN[] => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, entries, occupation }) => {
      return {
        id,
        name,
        dateOfBirth,
        gender,
        entries,
        occupation,
      };
    }
  );
};

const getPatientsNonSensitive = (): NonSensitivePatient[] => {
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

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = parseUUID(uuid1());

  const newPatient = {
    id,
    entries: [],
    ...entry,
  };
  patientEntries.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNoSSN,
  getPatientsNonSensitive,
  addPatient,
};
