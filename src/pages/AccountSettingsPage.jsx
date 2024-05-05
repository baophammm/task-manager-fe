import React, { useCallback, useState } from "react";

import {
  Box,
  Card,
  Container,
  Grid,
  Tabs,
  Tab,
  Typography,
  ButtonGroup,
  Button,
  SvgIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FormProvider, FTextField, FUploadAvatar } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { fData } from "../utils/numberFormat";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";
import AccountSettings from "../features/user/AccountSettings";
import PasswordSettings from "../features/user/PasswordSettings";

const TabsWrapperStyle = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",

  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-end",
    paddingRight: theme.spacing(3),
  },
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
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="account setting tabs"
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "primary.main",
        p: 0.5,
        gap: 0.5,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {ACCOUNT_TABS.map((tab) => (
        <Button
          key={tab.value}
          title={tab.label}
          color="primary"
          onClick={() => setCurrectAccountTab(tab.value)}
          sx={{
            flexGrow: 1,
            backgroundColor:
              currectAccountTab === tab.value ? "primary.dark" : "primary.main",
          }}
        >
          {tab.label}
        </Button>
      ))}
    </ButtonGroup>
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
          maxWidth: "600px",
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
