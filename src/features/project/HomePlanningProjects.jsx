import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProjects } from "./projectSlice";
import Project from "./Project";

function HomePlanningProjects({ projects }) {
  return (
    <Box>
      <Typography variant="h5">Planning Projects</Typography>
      <Grid container spacing={1} sx={{ width: 1 }}>
        {projects.map((project) => (
          <Grid key={project._id} item xs={12} md={6} lg={4}>
            <Project project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePlanningProjects;
