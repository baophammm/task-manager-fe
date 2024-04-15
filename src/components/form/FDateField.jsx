import { useFormContext, Controller } from "react-hook-form";
import dayjs from "dayjs";
import FormHelperText from "@mui/material/FormHelperText";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { TextField } from "@mui/material";

function FDateField({
  name,
  date,
  setDate,
  svgColor,
  labelColor,
  inputColor,
  spanColor,
  ...other
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={date ? dayjs(date, "YYYY-MM-DD") : null}
      render={({ field }) => {
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
                  error={!!error} // Set error prop to true if error is not undefined
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
                  sx={{
                    width: "100%",
                    zIndex: 0,
                    svg: { color: svgColor || "inherit" },
                    label: { color: labelColor || "inherit" },
                    input: { color: inputColor || "inherit" },
                    span: { color: spanColor || "red" },
                    borderRadius: "12px",
                    border: error ? "3px solid red" : "3px solid transparent",
                  }}
                />
                {error && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {error.message}
                  </FormHelperText>
                )}
              </div>
            </DemoContainer>
          </LocalizationProvider>
        );
      }}
    ></Controller>
  );
}

export default FDateField;
