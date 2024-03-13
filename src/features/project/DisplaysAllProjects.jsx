import React from "react";
import ProjectsDisplayController from "./ProjectsDisplayController";
import { Container } from "@mui/material";
import ProjectListWithPagination from "./ProjectListWithPagination";

function DisplaysAllProjects() {
  return (
    <Container
      maxWidth={1}
      sx={{
        // border: "1px solid red",
        height: 1,
      }}
    >
      <ProjectsDisplayController />
      <ProjectListWithPagination />
    </Container>
  );
}

export default DisplaysAllProjects;
