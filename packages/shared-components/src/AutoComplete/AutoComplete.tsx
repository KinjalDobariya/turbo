  import * as React from "react";
  import Chip from "@mui/material/Chip";
  import { Autocomplete as MuiAutocomplete } from "@mui/material";
  import TextField from "@mui/material/TextField";

  type Option = {
    id: string;
    name: string;
  };

  interface AutocompleteProps {
    data: Option[];
    onChange: (event: any, newValue: Option[]) => void;
    value: Option[];
  }

  export const Autocomplete = ({ data, onChange, value }: AutocompleteProps) => {
    return (
      <MuiAutocomplete
        multiple
        id="tags-outlined"
        options={data}
        getOptionLabel={(option: Option) => option.name}
        value={value}
        onChange={onChange}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Categories"
            placeholder="Select categories"
          />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip label={option.name} {...getTagProps({ index })} key={index} />
          ))
        }
        sx={{minWidth:"300px",marginBottom:"30px"}}
      />
    );
  };
