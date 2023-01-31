export interface Diagnose {
    code: string,
    name: string,
    lating?: string
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string
}

export type NewPatient = Omit<Patient, 'id'>;

export type NoSSNPatient = Omit<Patient, 'ssn'>;