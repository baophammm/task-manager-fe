import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FSelect({ name, children, labelColor, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          InputLabelProps={{ style: { color: labelColor || "black" } }}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default FSelect;
