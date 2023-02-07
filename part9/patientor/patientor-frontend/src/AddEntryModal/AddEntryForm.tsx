import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { DiagnosisSelection, SelectField, RatingOption, TextField, TypeOption, SelectType } from "./FormField";
import { useStateValue } from "../state";
import { HealthCheckEntry, healthCheckRating, HospitalEntry, NewEntry, OccupationalHealthcareEntry } from "../types";

export type EntryFormValues = NewEntry;

interface Props {
    onSubmit: (values: EntryFormValues | HospitalEntry | HealthCheckEntry | OccupationalHealthcareEntry) => void;
    onCancel: () => void;
}

const ratingOptions: RatingOption[] = [
    { value: healthCheckRating.CriticalRisk, label: "Critical Risk" },
    { value: healthCheckRating.Healthy, label: "Healthy" },
    { value: healthCheckRating.HighRisk, label: "High Risk" },
    { value: healthCheckRating.LowRisk, label: "Low Risk" },
];

const typeOptions: TypeOption[] = [
    { value: "HealthCheck", label: "Health Check" },
    { value: "Hospital", label: "Hospital" },
    { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
    const [{ diagnoses }] = useStateValue();
    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                specialist: "",
                date: "2022-03-03",
                diagnosisCodes: [''],
                healthCheckRating: healthCheckRating.Healthy,
                employerName: '',
                discharge: { date: "", criteria: "" },
                sickLeave: { startDate: "", endDate: "" }

            }}
            onSubmit={onSubmit}
            validate={(values) => {
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};
                if (!values.type) {
                    errors.type = requiredError;
                }
                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.diagnosisCodes) {
                    errors.diagnosisCodes = requiredError;
                }

                if (values.type === "HealthCheck") {
                    if (!values.healthCheckRating) {
                        errors.healthCheckRating = requiredError;
                    }
                }
                if (values.type === "Hospital") {
                    if (!values.discharge.criteria) {
                        errors.discharge = requiredError;
                    }


                    if (!values.discharge.date.match(/^\d{4}([./-])\d{2}\1\d{2}$/)) {
                        errors.discharge = 'Wrong data format use YYYY-MM-DD';
                        //alert('Wrong data format use YYYY-MM-DD');
                    }

                }
                if (values.type === "OccupationalHealthcare") {
                    if (!values.employerName) {
                        errors.employerName = requiredError;
                    }
                    if (values.sickLeave) {
                        if (!values.sickLeave.startDate.match(/^\d{4}([./-])\d{2}\1\d{2}$/)) {
                            errors.sickLeave = 'Wrong data format use YYYY-MM-DD';
                            //alert('Wrong data format use YYYY-MM-DD');                        

                        }
                        if (!values.sickLeave?.endDate.match(/^\d{4}([./-])\d{2}\1\d{2}$/)) {
                            errors.sickLeave = 'Wrong data format use YYYY-MM-DD';
                            //alert('Wrong data format use YYYY-MM-DD');

                        }
                    }
                }

                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
                return (
                    <Form className="form ui">
                        <SelectType
                            name="type"
                            options={typeOptions}
                        />
                        <Field
                            fullWidth
                            label="description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            fullWidth
                            label="specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection setFieldValue={setFieldValue} setFieldTouched={setFieldTouched} diagnoses={Object.values(diagnoses)} />
                        {values.type === "HealthCheck"
                            ? <SelectField
                                //label="Health Rating"
                                name="healthCheckRating"
                                options={ratingOptions}
                            />
                            : ''}
                        {values.type === "Hospital"
                            ? <>
                                <span>
                                    <Field
                                        label="Discharge Date"
                                        placeholder="YYYY-MM-DD"
                                        name="discharge.date"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="discharge" component="span" >{msg => <p style={{ color: 'red' }}>{msg}</p>}</ErrorMessage>
                                    <Field
                                        label="Discharge criteria"
                                        placeholder="Discharge criteria"
                                        name="discharge.criteria"
                                        component={TextField}
                                    />
                                </span>
                            </>
                            : ''}
                        {values.type === "OccupationalHealthcare"
                            ? <>
                                <Field
                                    label="Employer Name"
                                    placeholder="Employer Name"
                                    name="employerName"
                                    component={TextField}
                                />
                                <span>
                                    <Field
                                        label="Start Date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeave.startDate"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="sickLeave" component="span" >{msg => <p style={{ color: 'red' }}>{msg}</p>}</ErrorMessage>
                                    <Field
                                        label="End Date"
                                        placeholder="YYYY-MM-DD"
                                        name="sickLeave.endDate"
                                        component={TextField}
                                    />
                                    <ErrorMessage name="sickLeave" component="span" >{msg => <p style={{ color: 'red' }}>{msg}</p>}</ErrorMessage>
                                </span>
                            </>
                            : ''}
                        <Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    style={{ float: "left" }}
                                    type="button"
                                    onClick={onCancel}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    style={{
                                        float: "right",
                                    }}
                                    type="submit"
                                    variant="contained"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;