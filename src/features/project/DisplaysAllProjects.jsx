import React from "react";
import ProjectsDisplayController from "./ProjectsDisplayController";
import { Container } from "@mui/material";
import ProjectListWithPagination from "./ProjectListWithPagination";

function DisplaysAllProjects() {
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        // border: "1px solid red",
        // height: {
        //   xs: "calc(100vh - 170px)",
        //   sm: "calc(100vh - 160px)",
        //   md: "calc(100vh - 168px)",
        // },
        height: 1,
      }}
    >
      <ProjectsDisplayController />
      <ProjectListWithPagination />
    </Container>
  );
}

export default DisplaysAllProjects;
