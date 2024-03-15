import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FSelect({ name, children, labelColor, inputColor, ...other }) {
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
          InputLabelProps={{
            style: { color: labelColor || "inherit", zIndex: 0 },
          }}
          InputProps={{
            style: { color: inputColor || "inherit", zIndex: 0 },
          }}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}

export default FSelect;
