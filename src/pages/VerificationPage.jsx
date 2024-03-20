import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LoadingScreen from "../components/LoadingScreen";
import { toast } from "react-toastify";
function VerificationPage() {
  const [isVerified, setIsVerified] = useState(false);

  const auth = useAuth();
  const params = useParams();
  const verificationCode = params.verificationCode;

  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (verificationCode) {
        try {
          await auth.verify({ verificationCode }, () => {
            setIsVerified(true);
            navigate("/", { replace: true });
          });
        } catch (error) {
          toast.error(error.message);
          setTimeout(() => {
            setIsVerified(true);
            navigate("/login", { replace: true });
          }, 2000);
        }
      }
    };

    verifyEmail();
  }, []);

  return (
    <Box>
      {isVerified ? (
        <Typography variant="h6">Moving to Home Page ...</Typography>
      ) : (
        <>
          <LoadingScreen />
          <Typography variant="h6">Verifying ...</Typography>
        </>
      )}
    </Box>
  );
}

export default VerificationPage;
