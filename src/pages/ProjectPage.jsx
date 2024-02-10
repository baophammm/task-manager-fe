import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../features/project/projectSlice";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ProjectCard from "../features/project/ProjectCard";
import { ProjectsSearch } from "../features/project/ProjectsSearch";
import ProjectFilter from "../features/project/ProjectFilter";

function ProjectPage() {
  const [page, setPage] = useState(1);
  const { currentPageProjects, projectsById, totalProjects, totalPages } =
    useSelector((state) => state.project);

  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects({ page }));
  }, [page, dispatch]);

  const [search, setSearch] = useState("");
  const handleSubmit = (searchQuery) => {
    setSearch(searchQuery);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={6} sm={4} md={2} sx={{ border: "1px solid red" }}>
            <ProjectFilter />
          </Grid>
          <Grid item xs={6} sm={8} md={10}>
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Projects</Typography>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <Button
                      color="inherit"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <ArrowUpOnSquareIcon />
                        </SvgIcon>
                      }
                    >
                      Import
                    </Button>
                    <Button
                      color="inherit"
                      startIcon={
                        <SvgIcon fontSize="small">
                          <ArrowDownOnSquareIcon />
                        </SvgIcon>
                      }
                    >
                      Export
                    </Button>
                  </Stack>
                </Stack>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </div>
              </Stack>
              <ProjectsSearch />
              <Grid container spacing={3}>
                {projects.map((project) => (
                  <Grid key={project._id} item xs={12} md={6} lg={4}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Pagination count={3} size="small" />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectPage;
