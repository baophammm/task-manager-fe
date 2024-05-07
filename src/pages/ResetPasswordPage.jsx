import React, { useState } from "react";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().required("New password is required"),
  newPasswordConfirmation: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Password must match"),
});

const defaultValues = {
  newPassword: "",
  newPasswordConfirmation: "",
};

function ResetPasswordPage() {
  // Get data from search params
  let [searchParams, setSearchParams] = useSearchParams();
  let verificationCode = searchParams.get("verificationCode");
  let token = searchParams.get("token");

  console.log("CHECKING", verificationCode, token);

  const auth = useAuth();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);

  const PASSWORD_FIELDS = [
    {
      name: "newPassword",
      label: "New Password",
      showState: showNewPassword,
      setShowState: setShowNewPassword,
    },
    {
      name: "newPasswordConfirmation",
      label: "Confirm New Password",
      showState: showNewPasswordConfirmation,
      setShowState: setShowNewPasswordConfirmation,
    },
  ];

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { newPassword } = data;
    try {
      await auth.resetUserPassword(
        {
          verificationCode,
          resetPasswordToken: token,
          newPassword,
        },
        () => {
          toast.success("Password reset successfully. Please login again!");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      );
    } catch (error) {
      toast.error(error.message);
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="center">
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <Alert
            severity="info"
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            Reset your password here. After resetting your password, you will be
            redirected to the login page.
          </Alert>

          {PASSWORD_FIELDS.map((field) => (
            <FTextField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.showState ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => field.setShowState((prev) => !prev)}
                      edge="end"
                    >
                      {field.showState ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ))}

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ResetPasswordPage;
