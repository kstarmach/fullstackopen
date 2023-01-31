import patientsData from '../../data/patients.json'

import { NoSSNPatient, Patient, NewPatient } from '../types'

import { v1 as uuid } from 'uuid'
// const getAll = (): Array<Patient>[] => {
//     return patientsData;
// }

const getNoSSNPatients = (): NoSSNPatient[] => {
    return patientsData.map(({ id, name, gender, dateOfBirth, occupation }) => ({
        id,
        name,
        gender,
        dateOfBirth,
        occupation
    }))
}

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }

    patientsData.push(newPatient)
    return newPatient;
}

export default {
    getNoSSNPatients,
    addPatient
}