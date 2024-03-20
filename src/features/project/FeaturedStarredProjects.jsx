import { Box, Grid, Stack, SvgIcon, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React from "react";

import Project from "./Project";

function FeaturedStarredProjects({ projects }) {
  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center">
        <SvgIcon fontSize="small">
          <StarBorderIcon />
        </SvgIcon>
        <Typography variant="h6">Starred Projects</Typography>
      </Stack>

      <Grid
        container
        spacing={1}
        sx={{
          width: 1,
        }}
      >
        {projects.map((project) => (
          <Grid key={project._id} item xs={12} md={6} lg={4}>
            <Project project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeaturedStarredProjects;
