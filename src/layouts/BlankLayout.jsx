import React, { useContext } from "react";

import { Box, IconButton, Stack } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { Outlet } from "react-router-dom";

import AlertMsg from "../components/AlertMsg";
import LogoTextCompound from "../components/LogoTextCompound";
import { AppContext } from "../App";

function BlankLayout() {
  const { mode, toggleMode } = useContext(AppContext);

  return (
    <Box
      sx={{
        m: -1,
        minHeight: "100dvh",
        minWidth: "100dvw",
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          m: 1,
        }}
      >
        <IconButton onClick={toggleMode} color="inherit">
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <LogoTextCompound sx={{ height: 80, pb: 1 }} />
      <AlertMsg />
      <Outlet />
    </Box>
  );
}

export default BlankLayout;
