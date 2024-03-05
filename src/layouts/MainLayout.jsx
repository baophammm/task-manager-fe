import { Box, CssBaseline, Divider, Stack } from "@mui/material";
import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import AlertMsg from "../components/AlertMsg";

function MainLayout() {
  return (
    <>
      <CssBaseline />
      <Stack sx={{ minHeight: "100vh", minWidth: "100vw" }}>
        <MainHeader />
        <AlertMsg />
        {/* <Stack
        direction="row"
        sx={{ minHeight: "calc(100vh - 120px)", border: "1px solid red" }}
      >
        <SideNav /> */}
        <Outlet />
        {/* </Stack> */}
        <Box sx={{ flexGrow: 1 }} />
        <MainFooter />
      </Stack>
    </>
  );
}

export default MainLayout;
