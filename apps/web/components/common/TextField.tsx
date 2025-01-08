import React from "react";
import {
  useController,
  Control,
  FieldValues,
  FieldPath,
  PathValue,
} from "react-hook-form";
import { TextField as MuiTextField } from "@mui/material";

interface ControlProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  defaultValue: PathValue<TFieldValues, FieldPath<TFieldValues>>;
  rules?: object;
}

export const TextField = <TFieldValues extends FieldValues>({
  name,
  control,
  label = "",
  defaultValue,
  rules,
}: ControlProps<TFieldValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules });

  return (
    <>
      <MuiTextField
        label={label}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={error?.message || ""}
        fullWidth
        variant="outlined"
        sx={{marginTop:"10px"}}
      />
    </>
  );
};
