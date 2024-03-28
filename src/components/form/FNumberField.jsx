import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FNumberField({ name, placeholderTextColor, labelColor, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type="number" // Set the input type to "number"
          step="0.5" // Allow increments of 0.5
          error={!!error}
          helperText={error?.message}
          InputProps={{
            style: { color: placeholderTextColor || "inherit" },
            inputProps: {
              style: { color: placeholderTextColor || "inherit" },
            },
          }}
          InputLabelProps={{
            style: { color: labelColor || "inherit", zIndex: 0 },
          }}
          {...other}
        />
      )}
    ></Controller>
  );
}

export default FNumberField;
