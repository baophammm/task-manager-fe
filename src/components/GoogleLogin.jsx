import React, { useEffect, useState } from "react";
import { GOOGLE_CLIENT_ID } from "../app/config";
import { jwtDecode } from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Box } from "@mui/material";

function GoogleLogin({ from }) {
  const auth = useAuth();

  const navigate = useNavigate();

  // TODO - update this useState to redux login later

  async function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID Token" + response.credential);
    var userObject = jwtDecode(response.credential);
    // console.log(userObject);
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

    // document.getElementById("signInDiv").hidden = true;
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

      // google.accounts.id.prompt(); // TODO error here
    };
    document.body.appendChild(script);
  }, []);

  return (
    <Box
      id="signInDiv"
      sx={{
        width: 1,
        alignItems: "stretch",
      }}
    ></Box>
  );
}

export default GoogleLogin;
