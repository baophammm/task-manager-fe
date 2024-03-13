import { Box, CssBaseline, Divider, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <>
      <CssBaseline />
      <Stack sx={{ minHeight: "100vh", minWidth: "100vw" }}>
        <MainHeader />
        <AlertMsg />

        <Outlet />

        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </>
  );
}

export default MainLayout;
