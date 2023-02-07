import patientsData from '../../data/patients';

import { PublicPatient, Patient, NewPatient, NewEntry } from '../types';

import { v1 as uuid } from 'uuid';
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
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };

    patientsData.push(newPatient);
    return newPatient;
};

const getPatientById = (id: any): Patient | undefined => {
    return patientsData.find(patient => patient.id === id);
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
    const patient = patientsData.find(p => p.id === patientId);
    if (!patient) throw new Error("Patiend dont exist!");

    const currentDate = new Date().toJSON().slice(0, 10);

    const newEntry = { ...entry, id: uuid(), date: currentDate }

    const updatedPatient = { ...patient, entries: patient.entries.concat(newEntry) };

    patientsData.map(p => p.id !== patientId ? p : updatedPatient)

    return updatedPatient

}

export default {
    getNoSSNPatients,
    addPatient,
    getPatientById,
    addEntry
};