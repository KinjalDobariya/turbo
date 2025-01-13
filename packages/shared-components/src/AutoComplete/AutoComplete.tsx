import * as React from "react";
import Chip from "@mui/material/Chip";
import { Autocomplete as MuiAutocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

type option = {
  title: string;
};
export const Autocomplete = ({ data }) => {
  return (
    <>
      <MuiAutocomplete
        multiple
        id="tags-outlined"
        options={data}
        getOptionLabel={(option: option) => option.title}
        defaultValue={[]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
    </>
  );
};
