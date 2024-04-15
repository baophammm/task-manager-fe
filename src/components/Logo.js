import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";
import LogoSvg from "../LogoSvg";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ height: 45, ...sx }}>
      <LogoSvg />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
