import React, { useState, useContext, createContext, useEffect } from "react";
import { Diagnose, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";

interface AppContextType {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
  diagnoses: Diagnose[];
  setDiagnoses: React.Dispatch<React.SetStateAction<Diagnose[]>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppContextType>({
  patients: [],
  setPatients: () => {},
  diagnoses: [],
  setDiagnoses: () => {},
  errorMessage: "",
  setErrorMessage: () => {},
});

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchPatientList = async (): Promise<void> => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    fetchPatientList();

    const fetchDiagnoses = async (): Promise<void> => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

  return (
    <AppContext.Provider
      value={{
        patients,
        setPatients,
        diagnoses,
        setDiagnoses,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
