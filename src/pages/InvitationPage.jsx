import { Box, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import OutboxIcon from "@mui/icons-material/Outbox";
import IncomingInvitations from "../features/invitation/IncomingInvitations";
import SentInvitations from "../features/invitation/SentInvitations";

import { capitalCase } from "change-case";

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

function InvitationPage() {
  const [currentTab, setCurrentTab] = useState("incomingInvitations");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };
  const INVITATION_TABS = [
    {
      value: "incomingInvitations",
      icon: <MoveToInboxIcon sx={{ fontSize: 24 }} />,
      component: <IncomingInvitations />,
    },
    // {
    //   value: "sentInvitations",
    //   icon: <OutboxIcon sx={{ fontSize: 24 }} />,
    //   component: <SentInvitations />,
    // },
  ];
  return (
    <Container sx={{ p: 2 }}>
      {/* <Card
        sx={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          mb: "12px",
        }}
      >
        <TabsWrapperStyle>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => handleChangeTab(value)}
          >
            {INVITATION_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={capitalCase(tab.value)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              />
            ))}
          </Tabs>
        </TabsWrapperStyle>
      </Card> */}

      {INVITATION_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </Container>
  );
}

export default InvitationPage;
