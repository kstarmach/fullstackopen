import express from 'express';
import patientService from '../services/patientService';
import { Entry } from '../types';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNoSSNPatients());
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);


        const addPatient = patientService.addPatient(newPatient);
        res.json(addPatient);
    } catch (error) {
        res.status(400).send('something went wrong!');
    }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getPatientById(req.params.id);

    if (patient) {
        res.status(200).json(patient);
    } else {
        res.status(400);
    }
});

router.post('/:id/entries', (req, res) => {
    try {
        const patientId = req.params.id;
        const entry: Entry = req.body;

        res.json(patientService.addEntry(patientId, entry));
    } catch (error) {
        res.status(404).send("something went wrong!")
    }
})

export default router;