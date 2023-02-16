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

  console.log(daily_exercises, target);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);

  res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log("app running on port 3002");
});
