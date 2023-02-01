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

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id)

    if (patient) {
        res.status(200).json(patient)
    } else {
        res.status(400)
    }
})

export default router