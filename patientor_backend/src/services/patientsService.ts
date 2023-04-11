import patientEntries from "../../data/patientEntries";
import {
  Entry,
  LogEntryWithoutId,
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

const addPatientLogEntry = (logEntry: LogEntryWithoutId, id: string): Entry => {
  const logId = parseUUID(uuid1());

  const patient = patientEntries.find((p) => p.id === id);

  const newPatientLogEntry = {
    id: logId,
    ...logEntry,
  };

  patient?.entries.push(newPatientLogEntry);

  return newPatientLogEntry;
};

export default {
  getPatients,
  getPatientsNoSSN,
  getPatientsNonSensitive,
  addPatient,
  addPatientLogEntry,
};
