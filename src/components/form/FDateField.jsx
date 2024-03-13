import { useFormContext, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TextField } from "@mui/material";

function FDateField({ name, date, setDate, labelColor, ...other }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={date ? dayjs(date, "YYYY-MM-DD") : null}
      render={({ field, fieldState: { error } }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                width: "100%",
                p: 0,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: "100%",
                }}
              >
                <DatePicker
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                  format="DD/MM/YY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newDate) => {
                    const formattedDate = newDate
                      ? newDate.format("YYYY-MM-DD")
                      : null;
                    field.onChange(formattedDate);
                  }}
                  {...other}
                  sx={{ width: "100%" }}
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
        );
      }}
    ></Controller>
  );
}

export default FDateField;
