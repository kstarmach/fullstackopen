interface ResultValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (daily_exercise: number[], target: number): ResultValues => {
    //if (!daily_exercise.length) throw new Error('Empty array')

    const average = daily_exercise.reduce((a, b) => a + b, 0) / daily_exercise.length;
    const success = average > target ? true : false;
    const rating = Math.floor(Math.random() * 3);
    let ratingDescription;

    if (rating === 3) {
        ratingDescription = 'doin great, keep that';
    } else if (rating === 2) {
        ratingDescription = 'not too bad but could be better';
    } else {
        ratingDescription = 'do you even lift bro?';
    }

    return {
        periodLength: daily_exercise.length,
        trainingDays: daily_exercise.filter(d => d != 0).length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};

// print process.argv
// process.argv.forEach(function (val, index, array) {
//     console.log(index + ': ' + val);
// });

// const daily_exercise_input = [];

// for (let i = 3; i < process.argv.length; i++) {
//     const n = Number(process.argv[i]);
//     if (!isNaN(n)) {
//         throw new Error("Argument is not a number");
//     }
//     daily_exercise_input.push(n);
// }

// const daily_exercise: number[] = daily_exercise_input;
// const target = Number(process.argv[2]);


// try {
//     console.log(calculateExercises(daily_exercise, target));
// } catch (error) {
//     console.log(error);
// }

export default calculateExercises