import diagnosesData from '../../data/diagnoses.json';

import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosesData as Array<Diagnosis>;

const getAll = (): Array<Diagnosis> => {
    return diagnoses;
};

const getByCode = (code: any): Diagnosis | undefined => {
    return diagnosesData.find(d => d.code === code)
}

export default {
    getByCode,
    getAll
};