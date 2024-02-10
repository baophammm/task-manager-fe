import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Drawer, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: "neutral.800",
  color: "common.white",
  width: 280,
}));

const StyledContainerBox = styled(Box)(({ theme }) => ({
  border: "1px solid blue",
  height: "100%",
  width: "200px",
  backgroundColor: theme.palette.neutral[800],

  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const StyledNavButton = styled(Button)(({ theme }) => ({
  // border: "none",
  border: "1px solid red",
  transition: "all ease-in-out 0.1s",
  width: "100%",
  borderRadius: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",

  // ...(active && {
  //   backgroundColor: "rgba(255, 255, 255, 0.04)",
  // }),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
}));

const StyledIconBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.neutral[400],
  display: "inline-flex",
  justifyContent: "center",
  mr: 2,
  // ...(active && {
  //   color: 'primary.main'
  // })
}));

const StyledTitleBox = styled(Box)(({ theme }) => ({
  color: theme.palette.neutral[400],
  // flexGrow: 1,
  fontFamily: (theme) => theme.typography.fontFamily,
  fontSize: 14,
  fontWeight: 600,
  lineHeight: "24px",
  whiteSpace: "nowrap",
  // ...(active && {
  //   color: "common.white",
  // }),
  // ...(disabled && {
  //   color: "neutral.500",
  // }),
}));
export default function SideNav({ ...sx }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const NAV_PAGES = [
    {
      value: "dashboard",
      title: "Dashboard",
      icon: <SpaceDashboardIcon />,
      link: "/",
    },
    {
      value: "project",
      title: "Project",
      icon: <ListAltIcon />,
      link: "/projects",
    },
    {
      value: "task",
      title: "Task",
      icon: <AssignmentTurnedInIcon />,
      link: "/tasks",
    },
    {
      value: "invitation",
      title: "Invitation",
      icon: <MoveToInboxIcon />,
      link: "/invitations",
    },
    {
      value: "settings",
      title: "Account Settings",
      icon: <SettingsIcon />,
      link: "/settings",
    },
  ];

  const navigate = useNavigate();
  return (
    <StyledContainerBox component="nav">
      <Stack spacing={2} alignItems="center" sx={{ width: "100%" }}>
        {NAV_PAGES.map((navPage) => (
          <StyledNavButton
            key={navPage.value}
            title={navPage.value}
            onClick={() => navigate(navPage.link)}
            sx={{}}
          >
            <StyledIconBox>{navPage.icon}</StyledIconBox>
            <StyledTitleBox>{navPage.title}</StyledTitleBox>
          </StyledNavButton>
        ))}
      </Stack>
    </StyledContainerBox>
  );
}
