import { NewPatientEntry } from "./types";

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Invalid or missing name: " + name);
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error("Invalid or missing dateOfBirth: " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Invalid or missing ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender)) {
    throw new Error("Invalid or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Invalid or missing occupation: " + occupation);
  }
  return occupation;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

export const parseUUID = (uuid: unknown): string => {
  if (!uuid || !isString(uuid)) {
    throw new Error("Incorrect or wrong uuid: " + uuid);
  }

  return uuid;
};
