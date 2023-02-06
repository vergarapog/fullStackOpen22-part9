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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
