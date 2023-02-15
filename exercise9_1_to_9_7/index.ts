import express from "express";
import calculateBMI from "./bmiCalculator";
const app = express();

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

const PORT = 3002;

app.listen(PORT, () => {
  console.log("app running on port 3002");
});
