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
        // border: "4px solid orange",
        width: 1,
        m: 0,
        height: { xs: "calc(100vh - 249px)", md: "calc(100vh-240px)" },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <Box sx={{ height: 1, width: 1 }}> */}
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
      {/* </Box> */}
    </ImageList>
  );
}

export default ProjectListWithPagination;
