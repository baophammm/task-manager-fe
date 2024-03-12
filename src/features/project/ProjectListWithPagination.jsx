import {
  Box,
  Grid,
  ImageList,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { ProjectPageContext } from "../../pages/ProjectPage";
import Project from "./Project";
import ProjectSort from "./ProjectSort";

function ProjectListWithPagination() {
  const { projects, totalProjects, totalPages, page, setPage, filters } =
    useContext(ProjectPageContext);

  return (
    <Box
      sx={{
        // border: "3px solid green",
        height: 1,
        maxHeight: 1,
        width: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "50%", md: "33%" },
          }}
        >
          <ProjectSort />
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          // direction="row"
          spacing={1}
          justifyContent={{ xs: "center", md: "flex-end" }}
          alignItems="center"
          sx={{
            //  border: "1px solid red",
            mx: 2,
            width: { xs: "50%", md: "auto" },
          }}
        >
          <Typography variant="subtitle" sx={{ color: "text.primary" }}>
            {totalProjects > 1
              ? `${totalProjects} projects found`
              : totalProjects === 1
              ? `${totalProjects} project found`
              : "No project found"}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </Box>
      <ImageList
        cols={1}
        sx={{
          // border: "1px solid orange",

          height: { xs: "calc(100vh - 220px)", md: "calc(100vh-240px)" },
          width: 1,
          m: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ height: 1, width: 1 }}>
          <Grid container spacing={3} my={1}>
            {projects.map((project) => (
              <Grid key={project._id} item xs={12} md={6} lg={4}>
                <Project project={project} filters={filters} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </ImageList>
    </Box>
  );
}

export default ProjectListWithPagination;
