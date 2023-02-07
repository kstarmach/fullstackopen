import { Diagnosis, healthCheckRating } from "../types";
import { FormikProps, FieldProps, Field, ErrorMessage, } from "formik";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { FormControl, Input, MenuItem, Typography, TextField as TextFieldMUI } from "@material-ui/core";
import { useState } from "react";

export type RatingOption = {
    value: healthCheckRating;
    label: string;
};

export type TypeOption = {
    value: string;
    label: string;
};

type SelectFieldProps = {
    name: string;
    //label: string;
    options: RatingOption[];
};

type SelectFieldProps2 = {
    name: string;
    options: TypeOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;

export const SelectField = ({ name, options }: SelectFieldProps) => (
    <>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            //abel={label}
            component={FormikSelect}
            name={name}
        //placeholder={healthCheckRating.Healthy}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

export const SelectType = ({ name, options }: SelectFieldProps2) => (
    <>
        <Field
            fullWidth
            style={{ marginBottom: "0.5em" }}
            //placeholder="Select Type"
            component={FormikSelect}
            name={name}
        >
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label || option.value}
                </MenuItem>
            ))}
        </Field>
    </>
);

interface TextProps extends FieldProps {
    label: string;
    placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
    <div style={{ marginBottom: "1em" }}>
        <TextFieldMUI
            fullWidth
            label={label}
            placeholder={placeholder}
            {...field}
        />
        <Typography variant="subtitle2" style={{ color: "red" }}>
            <ErrorMessage name={field.name} />
        </Typography>
    </div>
);


export const DiagnosisSelection = ({
    diagnoses,
    setFieldValue,
    setFieldTouched,
}: {
    diagnoses: Diagnosis[];
    setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
    setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
    const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
    const field = "diagnosisCodes";
    const onChange = (data: string[]) => {
        setDiagnoses([...data]);
        setFieldTouched(field, true);
        setFieldValue(field, selectedDiagnoses);
    };

    const stateOptions = diagnoses.map((diagnosis) => ({
        key: diagnosis.code,
        text: `${diagnosis.name} (${diagnosis.code})`,
        value: diagnosis.code,
    }));

    return (
        <FormControl style={{ width: 552, marginBottom: '30px' }}>
            <InputLabel>Diagnoses</InputLabel>
            <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])} input={<Input />}>
                {stateOptions.map((option) => (
                    <MenuItem key={option.key} value={option.value}>
                        {option.text}
                    </MenuItem>
                ))}
            </Select>
            <ErrorMessage name={field} />
        </FormControl>
    );
};