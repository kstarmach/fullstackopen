import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button";
import React from "react";
import HealthRatingBar from "../components/HealthRatingBar";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { addEntry, setPatientDetails, useStateValue } from "../state";


const DiagnosisDetails: React.FC<{ diagnosisCode: string }> = ({ diagnosisCode }) => {
    const [diagnosis, setDiagnosis] = useState<Diagnosis | undefined>();

    useEffect(() => {
        const fetchDiagnosis = async () => {
            try {
                await axios
                    .get<Diagnosis>(`${apiBaseUrl}/diagnosis/${diagnosisCode}`)
                    .then(response => setDiagnosis(response.data));
            } catch (e) {
                console.error(e);
            }
        };
        void fetchDiagnosis();
    }, [diagnosisCode]);

    if (!diagnosis) return null;

    return (
        <li>{diagnosis.code} {' '} {diagnosis.name}</li>
    );
};

// const HospitalEntry:
export const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled entry type: ${JSON.stringify(value)}`
    );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
        <Box m={2}>
            <Card variant="outlined">
                <CardContent>

                    <p> {entry.date}<br /><i>{entry.description}</i></p>
                    <p>discharge: {entry.discharge.date}</p>
                    <p>criteria: {entry.discharge.criteria}</p>
                    <ul>
                        {entry.diagnosisCodes ? entry.diagnosisCodes.map((val, idx) =>
                            <DiagnosisDetails key={idx} diagnosisCode={val} />
                        ) : ''}
                    </ul>

                    <p>diagnose by {entry.specialist}</p>
                </CardContent>
            </Card>
        </Box>
    );
};
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    return (
        <Box m={2}>
            <Card variant="outlined">
                <CardContent>

                    <p> {entry.date}<br /><i>{entry.description}</i></p>
                    <HealthRatingBar rating={entry.healthCheckRating} showText={true} />
                    <ul>
                        {entry.diagnosisCodes ? entry.diagnosisCodes.map((val, idx) =>
                            <DiagnosisDetails key={idx} diagnosisCode={val} />
                        ) : ''}
                    </ul>

                    <p>diagnose by {entry.specialist}</p>
                </CardContent>
            </Card>
        </Box>
    );
};

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
        <Box m={2}>
            <Card variant="outlined">
                <CardContent>

                    <p> {entry.date}<br /><i>{entry.description}</i></p>
                    <p>Employer: {entry.employerName}</p>
                    <ul>
                        {entry.diagnosisCodes ? entry.diagnosisCodes.map((val, idx) =>
                            <DiagnosisDetails key={idx} diagnosisCode={val} />
                        ) : ''}
                    </ul>
                    {entry.sickLeave ?
                        <div>
                            <span>From: {entry.sickLeave?.startDate}</span>
                            <span>To: {entry.sickLeave?.endDate}</span>
                        </div>
                        : ''}

                    <p>diagnose by {entry.specialist}</p>
                </CardContent>
            </Card>
        </Box>
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    const result = () => {
        switch (entry.type) {
            case "Hospital":
                return <Hospital entry={entry} />;
            case "HealthCheck":
                return <HealthCheck entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcare entry={entry} />;
            default:
                assertNever(entry);
        }
    };
    return <React.Fragment>{result()}</React.Fragment>;
};

const PatientDetails = () => {
    //const [patient, setPatient] = useState<Patient | undefined>();
    const [{ patient }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();
    const { id } = useParams<{ id: string }>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (apiBaseUrl && id) {
                let e;
                if (values.type === "Hospital") {
                    e = { ...values, healthCheckRating: undefined, employerName: undefined, sickLeave: undefined };
                }
                if (values.type === "OccupationalHealthcare") {
                    e = { ...values, healthCheckRating: undefined, discharge: undefined };
                }
                if (values.type === "HealthCheck") {
                    e = { ...values, discharge: undefined, employerName: undefined, sickLeave: undefined };
                }

                const { data: newEntry } = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}/entries`, e);
                //dispatchEvent({type: "ADD_"})

                dispatch(addEntry(newEntry));
                closeModal();
            }
        } catch (error: unknown) {
            setError("Unknown error");
        }
    };

    useEffect(() => {
        //// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        //// eslint-disable-line @typescript-eslint/no-floating-promises 

        const fetchPatientDetails = async () => {
            try {
                if (apiBaseUrl && id) {
                    const url: string | undefined = `${apiBaseUrl}/patients/${id}`;
                    const { data: patientDetailFromApi } = await axios.get<Patient>(url);
                    //setPatient(resp.data);
                    dispatch(setPatientDetails(patientDetailFromApi));
                }
            } catch (error) {
                console.log(error);
            }
        };
        void fetchPatientDetails();
    }, [dispatch, id]);

    if (!patient) return null;

    return (
        <Container>
            <br />
            <Typography variant="h4">{patient.name} </Typography>
            <i>{patient.gender}</i>
            <div>ssh: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            <br />

            <div>
                <Typography variant="h6"><b>entries</b> </Typography>
                {patient.entries?.map((e, idx) =>
                    <EntryDetails key={idx} entry={e} />
                )}
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </Container>
    );

};

export default PatientDetails;