import patientsData from '../../data/patients.json'

import { PublicPatient, Patient, NewPatient } from '../types'

import { v1 as uuid } from 'uuid'
// const getAll = (): Array<Patient>[] => {
//     return patientsData;
// }

const getNoSSNPatients = (): PublicPatient[] => {
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
        ...patient,
        entries: []
    }

    patientsData.push(newPatient)
    return newPatient;
}

const getPatientById = (id: any): Patient | undefined => {
    return patientsData.find(patient => patient.id === id)
}

export default {
    getNoSSNPatients,
    addPatient,
    getPatientById
}