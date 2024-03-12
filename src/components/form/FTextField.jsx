import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, placeholderTextColor, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          InputProps={{
            style: { color: placeholderTextColor || "inherit" },
            inputProps: {
              style: { color: placeholderTextColor || "inherit" },
            },
          }}
          {...other}
        />
      )}
    ></Controller>
  );
}

export default FTextField;
