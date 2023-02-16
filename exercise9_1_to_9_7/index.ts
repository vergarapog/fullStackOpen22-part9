/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
import calculateBMI from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req.body);
  res.send("Hello FullStack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    const result = calculateBMI(height, weight);
    return res.send(result);
  } catch (error: unknown) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  try {
    const result = calculateExercises(
      daily_exercises as Array<number>,
      target as number
    );

    return res.send(result);
  } catch (error) {
    let errorMessage = "An error has occured: ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);

    if (error.message === "Parameters missing") {
      return res.status(400).json({ error: "parameters missing" });
    } else if (error.message === "Hours per day aren't an array of numbers") {
      return res
        .status(400)
        .send({ error: "hours per day aren't an array of numbers" });
    } else if (error.message === "Target is not a number") {
      return res.status(400).json({ error: "malformatted parameters" });
    } else {
      return res.status(500).json({ error: "contact admin" });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("app running on port 3002");
});
