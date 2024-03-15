import { Stack } from "@mui/material";
import React, { useContext } from "react";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsDisplayController from "./ProjectsDisplayController";
import DisplaysFeaturedProjects from "./DisplaysFeaturedProjects";
import DisplaysAllProjects from "./DisplaysAllProjects";
import { ProjectPageContext } from "../../pages/ProjectPage";
import LoadingScreen from "../../components/LoadingScreen";
import { RouterContext } from "../../routes";

function ProjectsDisplay() {
  const { isLoading, isDisplayingFeaturedProjects } = useContext(RouterContext);

  return (
    <Stack
      spacing={1}
      alignItems="center"
      sx={{
        // border: "1px solid red",
        // position: { xs: "absolute", md: "relative" },

        width: { xs: "100dvw", md: 1 },
        ml: { xs: 1, sm: -1 },
        mt: -1,
      }}
    >
      <ProjectsHeader />
      {isLoading ? (
        <LoadingScreen />
      ) : isDisplayingFeaturedProjects ? (
        <DisplaysFeaturedProjects />
      ) : (
        <DisplaysAllProjects />
      )}
    </Stack>
  );
}

export default ProjectsDisplay;
