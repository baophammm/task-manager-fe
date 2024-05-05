import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Stack,
  TextField,
  Alert,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { FTextField, FormProvider } from "../../components/form";
import { set } from "lodash";
import { toast } from "react-toastify";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  background: theme.palette.action.disabled,

  // border: "2px solid white",
  position: "absolute",
  top: -2,
  left: -2,

  width: "100dvw",
  height: "100dvh",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.secondary,
  border: "1px solid white",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows,
  borderRadius: theme.shape.borderRadius,

  height: "90vh",
  maxHeight: "220px",
  width: "90vw",
  maxWidth: "420px",
  padding: "20px",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "stretch",

  gap: 4,
}));

function ForgotPasswordResetModal({ setIsSendingPasswordResetRequest }) {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleExitSendingPasswordResetRequest = () => {
    setIsSendingPasswordResetRequest(false);
    setError("");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleExitSendingPasswordResetRequest();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length === 0) {
      setError("Email is required");
    } else if (!emailRegex.test(email)) {
      setError("Invalid email format");
    } else {
      try {
        setIsSubmitting(true);
        await auth.requestPasswordReset({ email }, () => {
          setIsSubmitting(false);
          handleExitSendingPasswordResetRequest();
          toast.success("Password reset email sent, please check your inbox");
        });
      } catch (error) {
        toast.error(error.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmitEmail}>
      <ModalWrapperBox>
        <div
          onClick={() => handleExitSendingPasswordResetRequest()}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
          }}
        />

        <ModalBox
          sx={{
            zIndex: 1,
          }}
        >
          <Typography variant="h6" component="h1">
            Forgot your password?
          </Typography>

          <Typography variant="body1" component="p">
            A link to reset your password will be sent to you. The process can
            take several minutes.
          </Typography>

          <Box
            sx={{
              px: 1,
            }}
          >
            <TextField
              fullWidth
              type="email"
              placeholder="Email"
              size="small"
              margin="dense"
              value={email}
              error={!!error}
              helperText={error}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
            />
          </Box>

          <Box>
            <LoadingButton
              size="small"
              type="submit"
              variant="contained"
              loadingPosition="center"
              loading={isSubmitting}
            >
              Send Email
            </LoadingButton>
          </Box>
        </ModalBox>
      </ModalWrapperBox>
    </form>
  );
}

export default ForgotPasswordResetModal;
