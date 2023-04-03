import diagnoses from "../../data/diagnosesEntries";
import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};
