import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  ImageList,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BallotIcon from "@mui/icons-material/Ballot";
import EqualizerIcon from "@mui/icons-material/Equalizer";

import React, { createContext, useEffect, useState } from "react";

import HomePageProjects from "../features/home/HomePageProjects";
import HomePageDashBoard from "../features/home/HomePageDashBoard";
import HomeNavSideBar from "../features/home/HomeNavSideBar";

const now = new Date();

export const HomePageContext = createContext();

const StyledHomeNavSideBarGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function HomePage() {
  const [isOpeningHomeNavSideBar, setIsOpeningHomeNavSideBar] = useState(true);

  const [currentTab, setCurrentTab] = useState("projects");

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const HOME_TABS = [
    {
      value: "projects",
      icon: <BallotIcon sx={{ fontSize: 24 }} />,
      component: <HomePageProjects />,
    },
    {
      value: "dashboard",
      icon: <EqualizerIcon sx={{ fontSize: 24 }} />,
      component: <HomePageDashBoard />,
    },
  ];

  return (
    <HomePageContext.Provider
      value={{
        isOpeningHomeNavSideBar,
        setIsOpeningHomeNavSideBar,
        currentTab,
        setCurrentTab,
        handleChangeTab,
        HOME_TABS,
      }}
    >
      <Box
        component="main"
        sx={{
          // border: "4px solid green",
          height: { xs: "calc(100vh - 90px)", md: "calc(100vh - 110px)" },
        }}
      >
        <Container
          maxWidth={1}
          sx={{
            // border: "2px solid red",
            p: 0,
            height: 1,
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            sx={{
              // border: "5px solid blue",
              margin: 0,
              ml: { xs: 0, md: -3 },
              mr: -3,
              height: "100%",
              width: "100vw",
              // display: { xs: "none", md: "flex" },
              display: "flex",
            }}
          >
            <StyledHomeNavSideBarGrid
              item
              xs={isOpeningHomeNavSideBar ? 6 : 1.5}
              md={isOpeningHomeNavSideBar ? 3 : 0.5}
              xl={isOpeningHomeNavSideBar ? 2.5 : 0.5}
              sx={{
                // border: "3px solid green",
                backgroundColor: "background.secondary",
                color: "text.secondary",

                height: 1,
                width: 1,
              }}
            >
              <HomeNavSideBar />
            </StyledHomeNavSideBarGrid>

            <Grid
              item
              xs={isOpeningHomeNavSideBar ? 6 : 10.5}
              md={isOpeningHomeNavSideBar ? 9 : 11.5}
              xl={isOpeningHomeNavSideBar ? 9.5 : 11.5}
              sx={{
                // border: "3px solid red",
                height: 1,
                width: 1,
              }}
            >
              {HOME_TABS.map((tab) => {
                const isMatched = tab.value === currentTab;
                return (
                  isMatched && (
                    <Box
                      key={tab.value}
                      sx={{
                        // border: "1px solid blue",
                        // width: "110%",
                        // height: "110%",
                        height: "calc(100vh - 110px)",
                        ml: -2,
                        mt: -2,
                      }}
                    >
                      {tab.component}
                    </Box>
                  )
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </HomePageContext.Provider>
  );
}

export default HomePage;
