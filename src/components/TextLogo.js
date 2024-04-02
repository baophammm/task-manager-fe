import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";
import TextLogoSvg from "../TextLogoSvg";

function TextLogo({ disabledLink = false, sx }) {
  const textLogo = (
    <Box sx={{ height: 45, ...sx }}>
      <TextLogoSvg />
    </Box>
  );
  if (disabledLink) {
    return <>{textLogo}</>;
  }
  return <RouterLink to="/">{textLogo}</RouterLink>;
}

export default TextLogo;
