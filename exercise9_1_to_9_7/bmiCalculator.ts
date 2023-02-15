interface BMIInputValues {
  value1: number;
  value2: number;
}

const parseBmiArguments = (args: Array<string>): BMIInputValues => {
  if (args.length < 4) throw new Error("not enough arguments");
  if (args.length > 4) throw new Error("too much arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers");
  }
};

const calculateBMI = (height: number, weight: number): string => {
  const bmi: number = weight / ((height / 100) * (height / 100));
  let bmiCategory;

  switch (true) {
    case bmi < 16:
      bmiCategory = "Underweight (Severe thinness)";
      break;
    case bmi >= 16 && bmi < 16.9:
      bmiCategory = "Underweight (Moderate thinness)";
      break;
    case bmi >= 17 && bmi < 18.4:
      bmiCategory = "Underweight (Mild thinness)";
      break;
    case bmi >= 18.5 && bmi < 24.9:
      bmiCategory = "Normal (healthy weight)";
      break;
    case bmi >= 25 && bmi < 29.9:
      bmiCategory = "Overweight (Pre-obese)";
      break;
    case bmi >= 30 && bmi < 34.9:
      bmiCategory = "Obese (Class I)";
      break;
    case bmi >= 35 && bmi < 39.9:
      bmiCategory = "Obese (Class II)";
      break;
    case bmi >= 40:
      bmiCategory = "Obese (Class III)";
      break;

    default:
      throw new Error("Provided values were not numbers");
  }

  return bmiCategory;
};

try {
  const { value1, value2 } = parseBmiArguments(process.argv);

  console.log(calculateBMI(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Something has happened. ";
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message;
  }
  console.log(errorMessage);
}

export default calculateBMI;
