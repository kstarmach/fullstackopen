import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses';
import patinetsRouter from './routes/patients';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnosis', diagnosesRouter);
app.use('/api/patients', patinetsRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
