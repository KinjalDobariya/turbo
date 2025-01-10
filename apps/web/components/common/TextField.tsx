import React from "react";
import {
  useController,
  Control,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { TextField as MuiTextField } from "@mui/material";

interface ControlProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  defaultValue?: string;
  error?: boolean;
  helperText?: string;
}

export const TextField = <TFieldValues extends FieldValues>({
  name,
  control,
  label,
  error = false,
  helperText = "",
}: ControlProps<TFieldValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <>
      <MuiTextField
        label={label}
        value={value || ""}
        onChange={onChange}
        error={error || !!fieldError}
        helperText={helperText || fieldError?.message || ""}
        fullWidth
        variant="outlined"
        sx={{ marginTop: "10px" }}
      />
    </>
  );
};
