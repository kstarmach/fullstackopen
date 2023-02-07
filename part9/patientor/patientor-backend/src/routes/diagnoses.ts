import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosesService.getAll());
});

router.post('/', (_req, res) => {
    res.send('Saving diagnose!');
});

router.get('/:code', (req, res) => {
    const diagnosis = diagnosesService.getByCode(req.params.code);
    if (diagnosis) {
        return res.status(200).json(diagnosis)
    } else {
        return res.status(400);
    }
});

export default router;