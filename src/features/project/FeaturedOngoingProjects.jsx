import { Box, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";

import Project from "./Project";

function FeaturedOngoingProjects({ projects }) {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <SvgIcon fontSize="small">
          <PlayCircleOutlineIcon />
        </SvgIcon>
        <Typography variant="h6">Ongoing Projects</Typography>
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

export default FeaturedOngoingProjects;
