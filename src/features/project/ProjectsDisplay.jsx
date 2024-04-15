import { Stack } from "@mui/material";
import React, { useContext } from "react";
import ProjectsHeader from "./ProjectsHeader";
import DisplaysFeaturedProjects from "./DisplaysFeaturedProjects";
import DisplaysAllProjects from "./DisplaysAllProjects";
import LoadingScreen from "../../components/LoadingScreen";
import { RouterContext } from "../../routes";

function ProjectsDisplay() {
  const { isLoading, isDisplayingFeaturedProjects } = useContext(RouterContext);

  return (
    <Stack
      spacing={0}
      alignItems="center"
      sx={{
        width: 1,
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
