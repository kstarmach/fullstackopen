import { NewPatient, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (!text || !isString(text)) {
        throw new Error('Incorrect or missing input');
    }

    return text;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + String(gender));
    }
    return gender;
};

type Fields = { name: unknown, dateOfBirth: unknown, occupation: unknown, gender: unknown, ssn: unknown };

const toNewPatient = ({ name, dateOfBirth, occupation, gender, ssn }: Fields): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        occupation: parseString(occupation),
        gender: parseGender(gender),
        ssn: parseString(ssn)
    };

    return newPatient;
};

export default toNewPatient;