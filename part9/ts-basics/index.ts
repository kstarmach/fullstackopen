import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator'

const app = express();
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(weight) || isNaN(height)) {
        res.status(400).send({
            error: "malformatted parameters"
        });
    }
    res.send({
        weight: weight,
        height: height,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body

    if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
        res.status(400).send({
            error: "malformatted parameters"
        })
    }

    if (!daily_exercises || !target) {
        res.status(400).send({
            error: "parameters missing"
        })
    }
    const response = calculateExercises(daily_exercises, Number(target))
    res.json(response)
    //res.send()
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});