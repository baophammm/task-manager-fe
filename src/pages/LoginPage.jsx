import React, { useEffect, useState } from "react";

import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import useAuth from "../hooks/useAuth";

import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Container,
  Stack,
  Link,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import GoogleLogin from "../components/GoogleLogin";
import ForgotPasswordResetModal from "../features/user/ForgotPasswordResetModal";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      setError("responseError", error);
    }
  };

  const [isSendingPasswordResetRequest, setIsSendingPasswordResetRequest] =
    useState(false);

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="center">
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
              Don't have an account?{" "}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Alert>
          </Box>

          <FTextField name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember me" />

          <Link
            component={RouterLink}
            variant="subtitle2"
            onClick={() => setIsSendingPasswordResetRequest(true)}
          >
            Forgot password?
          </Link>
        </Stack>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <LoadingButton
            fullWidth
            size="medium"
            type="submit"
            variant="contained"
            loadingPosition="center"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>

          <GoogleLogin from={from} />
        </Box>
      </FormProvider>
      {isSendingPasswordResetRequest && (
        <ForgotPasswordResetModal
          setIsSendingPasswordResetRequest={setIsSendingPasswordResetRequest}
        />
      )}
    </Container>
  );
}

export default LoginPage;
