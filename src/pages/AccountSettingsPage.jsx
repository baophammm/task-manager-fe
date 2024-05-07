import React, { useState } from "react";

import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useAuth from "../hooks/useAuth";
import AccountSettings from "../features/user/AccountSettings";
import PasswordSettings from "../features/user/PasswordSettings";

const TabWrapperStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: "5px",
  gap: "5px",
  marginBottom: "20px",
}));

const TabButtonStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.components.MuiButton.styleOverrides.root.borderRadius,
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  cursor: "pointer",
}));

function AccountSettingsPage() {
  const { user } = useAuth();

  const [currectAccountTab, setCurrectAccountTab] = useState("account");

  const ACCOUNT_TABS = [
    {
      value: "account",
      label: "Account",
      component: <AccountSettings user={user} />,
    },
    {
      value: "password",
      label: "Password",
      component: <PasswordSettings user={user} />,
    },
  ];

  const AccountSettingTabListBtnGroup = (
    <TabWrapperStyle>
      <TabButtonStyle
        onClick={() => setCurrectAccountTab("account")}
        sx={{
          backgroundColor:
            currectAccountTab === "account"
              ? "action.focus"
              : "background.paper",
        }}
      >
        <Typography>Account</Typography>
      </TabButtonStyle>
      <TabButtonStyle
        onClick={() => setCurrectAccountTab("password")}
        sx={{
          backgroundColor:
            currectAccountTab === "password"
              ? "action.focus"
              : "background.paper",
        }}
      >
        <Typography>Password</Typography>
      </TabButtonStyle>
    </TabWrapperStyle>
  );
  return (
    <Container
      maxWidth="xl"
      sx={{
        p: 2,
        height: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          height: 1,
        }}
      >
        {AccountSettingTabListBtnGroup}
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currectAccountTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Box>
    </Container>
  );
}

export default AccountSettingsPage;
