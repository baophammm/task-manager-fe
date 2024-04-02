import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

import AlertMsg from "../components/AlertMsg";

import LogoTextCompound from "../components/LogoTextCompound";

function BlankLayout() {
  return (
    <Box
      sx={{
        m: -1,
        minHeight: "100dvh",
        minWidth: "100dvw",

        backgroundColor: "background.secondary",
        color: "text.secondary",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LogoTextCompound sx={{ height: 80, pb: 1 }} />
      <AlertMsg />
      <Outlet />
    </Box>
  );
}

export default BlankLayout;
