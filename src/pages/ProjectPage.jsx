import React, { createContext, useEffect, useState } from "react";
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
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import ProjectsByRoleSingleLine from "../features/project/ProjectsByRoleSingleLine";
import useAuth from "../hooks/useAuth";

export const ProjectPageContext = createContext();

function ProjectPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { isLoading, currentPageProjects, projectsById } = useSelector(
    (state) => state.project
  );

  const defaultValues = {
    projectStatus: "",
    currentUserRole: "",
    startAfter: "",
    startBefore: "",
    dueAfter: "",
    dueBefore: "",
    search: "",
  };

  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm({
    defaultValues,
  });

  const { reset } = methods;

  const handleFilterSelection = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects({ page, limit: 1000, ...filters }));
  }, [page, filters, dispatch]);

  return (
    <ProjectPageContext.Provider
      value={{ filters, setFilters, handleFilterSelection }}
    >
      <FormProvider methods={methods}>
        <Box
          component="main"
          sx={{
            // border: "1px solid green",
            height: "calc(100vh - 110px)",
          }}
        >
          <Container
            maxWidth
            sx={{
              // border: "1px solid orange ",
              pl: {
                xs: 0,
                sm: 0,
              },

              pt: {
                xs: 0,
                md: 2,
              },
              maxHeight: 1,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid
              container
              alignItems="flex-start"
              spacing={2}
              sx={{
                // border: "1px solid blue",
                height: "100%",
                width: "100%",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Grid
                item
                lg={1.5}
                xl={2}
                sx={{
                  // border: "1px solid green",
                  height: {
                    lg: "100%",
                    xl: "calc(100vh - 120px)",
                  },
                }}
              >
                <ProjectFilter resetFilter={reset} />
              </Grid>
              <Grid item md={10.5} xl={10}>
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                  >
                    <Typography variant="h5">Projects</Typography>
                    <Box
                      sx={{
                        flexGrow: 1,
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        pr: 2,
                      }}
                    >
                      <ProjectsSearch />
                    </Box>
                    <div>
                      <Link
                        to={`/projects/new`}
                        state={{ backgroundLocation: location }}
                      >
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
                      </Link>
                    </div>
                  </Stack>

                  {isLoading ? (
                    <LoadingScreen />
                  ) : (
                    <ProjectsByRoleSingleLine user={user} projects={projects} />
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Box
              alignItems="center"
              sx={{
                // border: "1px solid red",
                maxWidth: "100vw",
                px: 1,
                display: {
                  xs: "flex",
                  md: "none",
                },
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  // border: "1px solid blue",
                  width: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ProjectFilter />
                <Box
                  sx={{
                    flexGrow: 1,
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    pr: 2,
                  }}
                >
                  <ProjectsSearch />
                </Box>
                <div>
                  <Link
                    to={`/projects/new`}
                    state={{ backgroundLocation: location }}
                  >
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
                  </Link>
                </div>
              </Box>
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <ProjectsByRoleSingleLine user={user} projects={projects} />
              )}
            </Box>
          </Container>
        </Box>
      </FormProvider>
    </ProjectPageContext.Provider>
  );
}

export default ProjectPage;
