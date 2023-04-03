import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getPatients());
});

router.get("/:id", (req, res) => {
  const id: string = req.params.id;

  const patient = patientsService.getPatients().find((p) => p.id === id);

  if (!patient) {
    return res.status(404).json(`Patient with id: ${id} not found`);
  }
  return res.status(200).json(patient);
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
