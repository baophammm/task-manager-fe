import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FTextField({ name, placeholderTextColor, labelColor, ...other }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
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
            InputLabelProps={{
              style: { color: labelColor || "inherit", zIndex: 0 },
            }}
            {...other}
          />
        );
      }}
    ></Controller>
  );
}

export default FTextField;
