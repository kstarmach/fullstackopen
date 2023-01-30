type BMI_Categories = 'Underweight' | 'Normal (healthy weight)' | 'Overweight (Pre-obese)' | 'Obese';

const calculateBmi = (height: number, mass: number): BMI_Categories => {
    const bmi = (mass / (height * height)) * 10000;
    console.log(bmi);

    if (bmi < 18) {
        return 'Underweight';
    } else if (bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi < 30) {
        return 'Overweight (Pre-obese)';
    } else {
        return 'Obese';
    }
};

// const height = Number(process.argv[2]);
// const weight = Number(process.argv[3]);

// console.log(calculateBmi(height, weight));

export default calculateBmi;

