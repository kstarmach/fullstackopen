import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Patient } from "../types";

const PatientDetails = () => {
    const [patient, setPatient] = useState<Patient | undefined>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)         // eslint-disable-line @typescript-eslint/no-floating-promises 
            .then(resp => {
                setPatient(resp.data);
            });

    }, [id]);

    if (!patient) return null;

    return (
        <Container>
            <br />
            <Typography variant="h4">{patient.name} </Typography>
            <i>{patient.gender}</i>
            <div>ssh: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
        </Container>
    );

};

export default PatientDetails;