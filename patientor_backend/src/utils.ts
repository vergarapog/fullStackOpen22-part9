import {
  NewPatientEntry,
  Gender,
  LogEntryWithoutId,
  HealthCheckRating,
  Diagnose,
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
          date: parseDate(object.date),
          type: object.type,
          specialist: parseSpecialist(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          description: parseDescription(object.description),
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
          date: parseDate(object.date),
          type: object.type,
          specialist: parseSpecialist(object.specialist),
          employerName: parseEmployerName(object.employerName),
          diagnosisCodes: parseDiagnosisCodes(object),
          description: parseDescription(object.description),
          sickLeave: parseSickLeave(object),
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
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: object.type,
          description: parseDescription(object.description),
          diagnosisCodes: parseDiagnosisCodes(object),
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newLogEntry;
      }
      break;
    default:
      throw new Error("Invalid Log Entry type");
  }

  throw new Error(
    "Incorrect data: some fields are missing for type: " + object.type
  );
};

const parseDescription = (description: unknown): string => {
  if (description === "" || !isString(description)) {
    throw new Error("Invalid or missing description " + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (date === "" || !isString(date)) {
    throw new Error("Invalid or missing date " + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if (specialist === "" || !isString(specialist)) {
    throw new Error("Invalid or missing specialist " + specialist);
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (employerName === "" || !isString(employerName)) {
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
    if (
      discharge.date === "" ||
      discharge.criteria === "" ||
      !isString(discharge.date) ||
      !isString(discharge.criteria)
    ) {
      throw new Error(
        "Invalid or missing properties of discharge: " + discharge
      );
    }
    return { date: discharge.date, criteria: discharge.criteria };
  }

  throw new Error("Incorrect discharge object: some fields are missing");
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnose["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnose["code"]>;
};

// const parseSickLeave = (
//   sickLeave: unknown
// ): { startDate: string; endDate: string } | undefined => {
//   if (!sickLeave || typeof sickLeave !== "object") {
//     throw new Error("Incorrect or missing data");
//   }

//   if ("startDate" in sickLeave && "endDate" in sickLeave) {
//     if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
//       throw new Error(
//         "Invalid or missing  properties of sickLeave: " + sickLeave
//       );
//     }
//     return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
//   }

//   throw new Error("Incorrect sickLeave object: some fields are missing");
// };

const parseSickLeave = (
  logEntry: unknown
): { startDate: string; endDate: string } | undefined => {
  if (!logEntry || typeof logEntry !== "object") {
    throw new Error("Incorrect or missing data");
  } // narrows logEntry type from unknown into object

  if ("sickLeave" in logEntry) {
    const { sickLeave } = logEntry;
    if (!sickLeave || typeof sickLeave !== "object") {
      throw new Error("Incorrect or missing data");
    } // narrows logEntry.sickLeave property from unknown into object so we can access startDate and endDate

    if ("startDate" in sickLeave && "endDate" in sickLeave) {
      if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate)) {
        throw new Error(
          "Invalid or missing  properties of sickLeave: " + sickLeave
        );
      }
      return { startDate: sickLeave.startDate, endDate: sickLeave.endDate };
    }
  }
  return undefined;
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
    !isHealthCheckRating(Number(healthCheckRating))
  ) {
    throw new Error(
      "Invalid or missing healthCheckRating " + healthCheckRating
    );
  }

  return Number(healthCheckRating);
};
