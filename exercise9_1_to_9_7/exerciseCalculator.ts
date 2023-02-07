interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: string
  ratingDescription: string
  target: number
  average: number
}

interface Rating {
  rating: string
  ratingDescription: string
}

const parseExerciseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error("not enough arguments")

  const argsNum = args.slice(2, args.length).map((item) => {
    if (!isNaN(Number(item))) {
      return Number(item)
    } else {
      throw new Error("All values should be numbers")
    }
  })

  console.log(argsNum)

  return argsNum
}

const computeRating = (average: number, target: number): Rating => {
  let timeShortage = target - average

  if (average > target) {
    return {
      rating: "3 (highest)",
      ratingDescription: "nigg thats good ngl",
    }
  } else if (timeShortage > 0.01 && timeShortage < 0.9) {
    return {
      rating: "2 (middle)",
      ratingDescription: "kulang ng 5-55 minutes per day",
    }
  } else if (timeShortage > 1) {
    return {
      rating: "1 (lowest)",
      ratingDescription: "kulang ng more than one hour per day",
    }
  }
}

const calculateExercises = (
  daysPerHour: Array<number>,
  target: number
): Result => {
  let periodLength = daysPerHour.length

  let trainingDays = daysPerHour.reduce((accu, curr) => {
    if (curr > 0) {
      return accu + 1
    } else {
      return accu
    }
  }, 0)

  let average =
    daysPerHour.reduce((accu, curr) => {
      return accu + curr
    }, 0) / periodLength

  let { rating, ratingDescription } = computeRating(average, target)

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: true,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  }
}

try {
  const args = parseExerciseArguments(process.argv)
  console.log(calculateExercises(args.slice(1, args.length), args[0]))
} catch (error: unknown) {
  let errorMessage = "Something has gone wrong. "
  if (error instanceof Error) {
    errorMessage += "Error: " + error.message
  }
  console.log(errorMessage)
}
