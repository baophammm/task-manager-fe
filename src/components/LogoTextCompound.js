import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";
import React from "react";
import LogoSvg from "../LogoSvg";
import TextLogoSvg from "../TextLogoSvg";
import Logo from "./Logo";
import TextLogo from "./TextLogo";

const logoRatio = 0.75;
const compountStandardHeight = 45;

function LogoTextCompound({ disabledLink = false, sx }) {
  const compoundHeight = sx.height;
  const logoTextCompound = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 0.5,
        height: compoundHeight ? compoundHeight : compountStandardHeight,
        ...sx,
      }}
    >
      <Logo
        sx={{
          height: compoundHeight
            ? compoundHeight * logoRatio
            : compountStandardHeight * logoRatio,
        }}
      />
      <TextLogo
        sx={{
          height: compoundHeight ? compoundHeight : compountStandardHeight,
        }}
      />
    </Box>
  );
  if (disabledLink) {
    return <>{logoTextCompound}</>;
  }
  return <RouterLink to="/">{logoTextCompound}</RouterLink>;
}

export default LogoTextCompound;
