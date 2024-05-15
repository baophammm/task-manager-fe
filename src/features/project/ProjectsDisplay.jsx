import { Stack } from "@mui/material";
import React, { useContext } from "react";
import ProjectsHeader from "./ProjectsHeader";
import DisplaysFeaturedProjects from "./DisplaysFeaturedProjects";
import DisplaysAllProjects from "./DisplaysAllProjects";
import LoadingScreen from "../../components/LoadingScreen";
import { RouterContext } from "../../routes";
import { ProjectPageContext } from "../../pages/ProjectPage";

function ProjectsDisplay() {
  const { isDisplayingFeaturedProjects } = useContext(RouterContext);
  const { isLoading } = useContext(ProjectPageContext);
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
