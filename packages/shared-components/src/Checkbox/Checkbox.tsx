import { Checkbox as MuiCheckbox, FormControlLabel } from "@mui/material";
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

type ControlProps<TFieldValues extends FieldValues> = {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  options: { id: string; name: string }[];
  defaultValue?: string;
};

type CategoryProps = {
  id: string;
  name: string;
};

export const Checkbox = <TFieldValues extends FieldValues>({
  name,
  control,
  options,
}: ControlProps<TFieldValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error: fieldError },
  } = useController({ name, control });

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: CategoryProps
  ) => {
    const checked = e.target.checked;
    let newValue = [...(value || [])];

    if (checked) {
      newValue.push(category);
    } else {
      newValue = newValue.filter(
        (item: { id: string }) => item.id !== category.id
      );
    }

    onChange(newValue);
  };

  return (
    <div>
      {options.map((option) => (
        <FormControlLabel
          key={option.id}
          control={
            <MuiCheckbox
              checked={value?.some(
                (item: { id: string }) => item.id === option.id
              )}
              onChange={(e) => handleCheckboxChange(e, option)}
            />
          }
          label={option.name}
        />
      ))}
      {fieldError && <span>{fieldError.message}</span>}{" "}
    </div>
  );
};
