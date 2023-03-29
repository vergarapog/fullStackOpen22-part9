export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = Omit<Patient, "id" | "entries">;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  entries: Entry[];
  occupation: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PatientNoSSN = Omit<Patient, "ssn">;

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;
