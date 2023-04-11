import {
  NewPatientEntry,
  Gender,
  LogEntryWithoutId,
  HealthCheckRating,
} from "./types";

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

const isString = (text: unknown): text is string => {
  return typeof text === "string";
};

const parseName = (name: unknown): string => {
  if (name === "" || !isString(name)) {
    throw new Error("Invalid or missing name " + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Invalid or missing date " + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Invalid or missing ssn " + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (gender === "" || !isString(gender) || !isGender(gender)) {
    throw new Error("Invalid or missing gender " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (occupation === "" || !isString(occupation)) {
    throw new Error("Invalid or missing occupation " + occupation);
  }
  return occupation;
};

export const parseUUID = (uuid: unknown): string => {
  if (!uuid || !isString(uuid)) {
    throw new Error("Incorrect or wrong uuid: " + uuid);
  }

  return uuid;
};

export const toNewPatientLogEntry = (object: unknown): LogEntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (!("type" in object)) {
    throw new Error("Type of Log Entry missing");
  }

  switch (object.type) {
    case "Hospital":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object &&
        "discharge" in object
      ) {
        const newLogEntry: LogEntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          discharge: parseDischarge(object.discharge),
        };
        return newLogEntry;
      }
      break;
    case "OccupationalHealthcare":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object &&
        "employerName" in object
      ) {
        const newLogEntry: LogEntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          employerName: parseEmployerName(object.employerName),
        };
        return newLogEntry;
      }
      break;
    case "HealthCheck":
      if (
        "description" in object &&
        "date" in object &&
        "specialist" in object &&
        "type" in object &&
        "healthCheckRating" in object
      ) {
        const newLogEntry: LogEntryWithoutId = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newLogEntry;
      }
      break;
    default:
      throw new Error("Invalid Log Entry type");
  }

  throw new Error("Incorrect data: some fields are missing");
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Invalid or missing description " + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!isString(date)) {
    throw new Error("Invalid or missing date " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Invalid or missing specialist " + specialist);
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Invalid or missing employerName " + employerName);
  }
  return employerName;
};

const parseDischarge = (
  discharge: unknown
): { date: string; criteria: string } => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in discharge && "criteria" in discharge) {
    if (!isString(discharge.date) || !isString(discharge.criteria)) {
      throw new Error(
        "Invalid or missing  properties of discharge: " + discharge
      );
    }
    return { date: discharge.date, criteria: discharge.criteria };
  }

  throw new Error("Incorrect discharge object: some fields are missing");
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (
    healthCheckRating === "" ||
    !isString(healthCheckRating) ||
    !isHealthCheckRating(Number(healthCheckRating))
  ) {
    throw new Error(
      "Invalid or missing healthCheckRating " + healthCheckRating
    );
  }

  return Number(healthCheckRating);
};
