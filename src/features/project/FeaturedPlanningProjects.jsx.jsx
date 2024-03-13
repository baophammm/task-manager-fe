import { Box, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getProjects } from "./projectSlice";
import Project from "./Project";

function FeaturedPlanningProjects({ projects }) {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <SvgIcon fontSize="small">
          <NoteAltIcon />
        </SvgIcon>
        <Typography variant="h6">Planning Projects</Typography>
      </Stack>
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

export default FeaturedPlanningProjects;
