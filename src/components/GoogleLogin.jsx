import React, { useEffect, useState } from "react";
import { GOOGLE_CLIENT_ID } from "../app/config";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";
import LoadingScreen from "./LoadingScreen";

function GoogleLogin({ from }) {
  const auth = useAuth();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  async function handleCallbackResponse(response) {
    setIsLoading(true);
    const userObject = jwtDecode(response.credential);
    let {
      email,
      given_name: firstName,
      family_name: lastName,
      picture: profilePictureUrl,
      email_verified: isGoogleVerified,
      sub: googleId,
    } = userObject;

    try {
      await auth.loginWithGoogle(
        {
          email,
          firstName: firstName || "",
          lastName: lastName || " ",
          profilePictureUrl,
          isGoogleVerified,
          googleId,
        },
        () => {
          navigate(from, { replace: true });
        }
      );
    } catch (error) {
      toast.error(error.message);
      navigate("/login", { replace: true });
    }

    // document.getElementById("signInDiv").style.hidden = true;
    setIsLoading(false);
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outlined",
        size: "large",
        scope: "profile email",
        width: 190,
        height: 50,
      });

      // TODO error here - Google 3rd party cookies deprecated
      // google.accounts.id.prompt();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Box
      sx={{
        borderRadius: "4px",
        backgroundColor: "background.paper",
        width: "460px",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            width: 1,
            height: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingScreen />
        </Box>
      ) : (
        <div id="signInDiv"></div>
      )}
    </Box>
  );
}

export default GoogleLogin;
