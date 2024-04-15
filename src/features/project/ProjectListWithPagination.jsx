import { Grid, ImageList, Typography } from "@mui/material";
import React, { useContext } from "react";

import Project from "./Project";

import { ProjectPageContext } from "../../pages/ProjectPage";

function ProjectListWithPagination() {
  const { projects, filters } = useContext(ProjectPageContext);

  return (
    <ImageList
      cols={1}
      sx={{
        width: 1,
        m: 0,
        px: 2,
        height: {
          xs: "calc(100vh - 230px)",
          sm: "calc(100vh-200px)",
          md: "calc(100vh-210px)",
        },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {projects.length ? (
        <Grid container spacing={3} my={1}>
          {projects.map((project) => (
            <Grid key={project._id} item xs={12} md={6} lg={4}>
              <Project project={project} filters={filters} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5">No Project Found</Typography>
      )}
    </ImageList>
  );
}

export default ProjectListWithPagination;
