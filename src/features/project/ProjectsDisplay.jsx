import { Stack } from "@mui/material";
import React, { useContext } from "react";
import ProjectsHeader from "./ProjectsHeader";
import ProjectsDisplayController from "./ProjectsDisplayController";
import DisplaysFeaturedProjects from "./DisplaysFeaturedProjects";
import DisplaysAllProjects from "./DisplaysAllProjects";
import { ProjectPageContext } from "../../pages/ProjectPage";
import LoadingScreen from "../../components/LoadingScreen";

function ProjectsDisplay() {
  const { isLoading, isDisplayingFeaturedProjects } =
    useContext(ProjectPageContext);

  return (
    <Stack
      spacing={1}
      sx={
        {
          // border: "1px solid black",
        }
      }
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
