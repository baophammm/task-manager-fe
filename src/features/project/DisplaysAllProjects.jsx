import React from "react";
import ProjectsDisplayController from "./ProjectsDisplayController";
import { Box } from "@mui/material";
import ProjectListWithPagination from "./ProjectListWithPagination";

function DisplaysAllProjects() {
  return (
    <Box
      sx={{
        width: 1,
        height: 1,
      }}
    >
      <ProjectsDisplayController />
      <ProjectListWithPagination />
    </Box>
  );
}

export default DisplaysAllProjects;
