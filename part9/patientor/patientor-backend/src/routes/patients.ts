import express from 'express'
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNoSSNPatients());
})

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);


        const addPatient = patientService.addPatient(newPatient)
        res.json(addPatient)
    } catch (error) {
        res.status(400).send('something went wrong!');
    }
})

export default router