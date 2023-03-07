/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getPatientsNoSSN());
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newEntry = patientsService.addPatient({
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation,
    });
    return res.send(newEntry);
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

export default router;
