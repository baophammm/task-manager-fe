import { Box, IconButton, Tab, Tabs } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useContext } from "react";
import { capitalCase } from "change-case";

import { HomePageContext } from "../../pages/HomePage";

function HomeNavSideBar() {
  const {
    isOpeningHomeNavSideBar,
    setIsOpeningHomeNavSideBar,
    currentTab,
    handleChangeTab,
    HOME_TABS,
  } = useContext(HomePageContext);

  const HomeNavSideBarBox = (
    <Box
      sx={{
        // border: "1px solid red",
        height: 1,
        width: 1,
        ml: -1,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          // border: "1px solid blue",
          width: 1,
          display: "flex",
          direction: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => setIsOpeningHomeNavSideBar(false)}>
          <ArrowBackIosNewIcon style={{ color: "white" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: 1,
          height: 1,
          mt: 4,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={currentTab}
          onChange={(e, value) => handleChangeTab(value)}
          aria-label="Vertical tabs example"
          sx={{
            mr: 6,
            borderRight: 1,
            borderColor: "divider",
            width: 1,
          }}
        >
          {HOME_TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              label={capitalCase(tab.value)}
              sx={{
                width: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );

  const ClosedHomeNavSideBarBox = (
    <Box
      sx={{
        // border: "1px solid orange",
        width: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton
        size="small"
        sx={{ mb: 1 }}
        onClick={() => setIsOpeningHomeNavSideBar(true)}
      >
        <ArrowForwardIosIcon style={{ color: "white" }} />
      </IconButton>
    </Box>
  );
  return (
    <>{isOpeningHomeNavSideBar ? HomeNavSideBarBox : ClosedHomeNavSideBarBox}</>
  );
}

export default HomeNavSideBar;
