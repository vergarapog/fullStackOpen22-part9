import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getPatientsNoSSN());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    return res.send(addedEntry);
  } catch (error) {
    let errorMessage = "Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    return res.status(400).send(errorMessage);
  }
});

export default router;
