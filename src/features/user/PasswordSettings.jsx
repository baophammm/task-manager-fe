import React, { useState } from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Alert, InputAdornment, IconButton, Box } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const PasswordSettingsSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  newPasswordConfirmation: Yup.string()
    .required("Please confirm your new password")
    .oneOf([Yup.ref("newPassword")], "Password must match"),
});

const defaultValues = {
  currentPassword: "",
  newPassword: "",
  newPasswordConfirmation: "",
};

function PasswordSettings({ user }) {
  const auth = useAuth();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirmation, setShowNewPasswordConfirmation] =
    useState(false);

  const PASSWORD_FIELDS = [
    {
      name: "currentPassword",
      label: "Current Password",
      showState: showCurrentPassword,
      setShowState: setShowCurrentPassword,
    },
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
    resolver: yupResolver(PasswordSettingsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { currentPassword, newPassword } = data;
    try {
      await auth.updateUserPassword(
        {
          userId: user._id,
          currentPassword,
          newPassword,
        },
        () => {
          toast.success("Password updated successfully. Please login again!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      );
    } catch (error) {
      toast.error(error.message);
      setError("responseError", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          height: "100%",
          minHeight: "500px",
        }}
      >
        <Box
          sx={{
            border: "4px solid",
            borderColor: "action.focus",
            borderRadius: "4px",

            py: 4,
            px: 2,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {!!errors.responseError && (
                <Alert
                  severity="error"
                  sx={{
                    backgroundColor: "background.default",
                    color: "text.primary",
                  }}
                >
                  {errors.responseError.message}
                </Alert>
              )}
              <Alert
                severity="info"
                sx={{
                  backgroundColor: "background.default",
                  color: "text.primary",
                }}
              >
                Change your password here. After saving, you'll be logged out.
              </Alert>
            </Box>
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
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Save
            </LoadingButton>
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
}

export default PasswordSettings;
