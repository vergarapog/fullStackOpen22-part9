export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NewPatientEntry = Omit<PatientEntry, "id">;

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type PatientNoSSN = Omit<PatientEntry, "ssn">;
