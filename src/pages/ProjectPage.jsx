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
import { styled } from "@mui/material/styles";

import ProjectCard from "../features/project/ProjectCard";
import { ProjectsSearch } from "../features/project/ProjectsSearch";
import ProjectFilter from "../features/project/ProjectFilter";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";
import ProjectsByRoleSingleLine from "../features/project/ProjectsByRoleSingleLine";
import useAuth from "../hooks/useAuth";
import ProjectByRoleBoard from "../features/project/ProjectByRoleBoard";
import ProjectListWithPagination from "../features/project/ProjectListWithPagination";

export const ProjectPageContext = createContext();

const StyledProjectFilterGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function ProjectPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);

  const location = useLocation();

  const [isOpeningProjectFilter, setIsOpeningProjectFilter] = useState(true);

  const {
    isLoading,
    currentPageProjects,
    projectsById,
    totalPages,
    totalProjects,
  } = useSelector((state) => state.project);

  const defaultValues = {
    projectStatus: "",
    currentUserRole: "",
    startAfter: null,
    startBefore: null,
    dueAfter: null,
    dueBefore: null,
    search: "",
    sortBy: "created_at_desc",
  };

  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm({
    defaultValues,
  });

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
    dispatch(getProjects({ page, ...filters }));
  }, [page, filters, dispatch]);

  return (
    <ProjectPageContext.Provider
      value={{
        projects,
        totalPages,
        totalProjects,
        page,
        setPage,
        filters,
        setFilters,
        handleFilterSelection,
        isOpeningProjectFilter,
        setIsOpeningProjectFilter,
      }}
    >
      <Box
        component="main"
        sx={{
          // border: "5px solid green",
          height: { xs: "calc(100vh-90px)", md: "calc(100vh - 110px)" },
          // height: "calc(100vh-110px)",
        }}
      >
        <Container
          maxWidth={1}
          sx={{
            // border: "1px solid orange ",

            p: 0,

            height: 1,
            // display: "flex",
            // flexDirection: "row",
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            sx={{
              // border: "1px solid blue",
              margin: 0,
              ml: { xs: 0, md: -3 },
              mr: -3,
              height: "100%",
              width: "100vw",
              // display: { xs: "none", md: "flex" },
              display: "flex",
            }}
          >
            <StyledProjectFilterGrid
              item
              xs={0}
              md={isOpeningProjectFilter ? 3 : 0.5}
              xl={isOpeningProjectFilter ? 2.5 : 0.5}
              sx={{
                // border: "3px solid green",
                backgroundColor: "background.secondary",
                color: "text.secondary",

                height: 1,
                width: 1,
                pr: 2,

                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: { xs: "center", md: "center" },
              }}
            >
              <Box
                width={1}
                sx={{
                  //  border: "1px solid orange",
                  height: 1,
                }}
              >
                <FormProvider methods={methods}>
                  <ProjectFilter />
                </FormProvider>
              </Box>
            </StyledProjectFilterGrid>
            <Grid
              item
              xs={12}
              md={isOpeningProjectFilter ? 9 : 11.5}
              // lg={isOpeningProjectFilter ? 9.5 : 11.5}
              xl={isOpeningProjectFilter ? 9.5 : 11.5}
              sx={{
                // border: "3px solid red",
                height: 1,
                width: 1,
              }}
            >
              <Stack
                spacing={1}
                sx={
                  {
                    // border: "1px solid black",
                  }
                }
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{ px: 1 }}
                >
                  <Typography variant="h5">My Projects</Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: { xs: "flex", md: "none" },
                        mr: 1,
                      }}
                    >
                      <FormProvider methods={methods}>
                        <ProjectFilter />
                      </FormProvider>
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
                          sx={{ p: 1 }}
                        >
                          Project
                        </Button>
                      </Link>
                    </div>
                  </Box>
                </Stack>

                {isLoading ? (
                  <LoadingScreen />
                ) : (
                  // <ProjectByRoleBoard projects={projects} />
                  <FormProvider methods={methods}>
                    <ProjectListWithPagination projects={projects} />
                  </FormProvider>
                )}
              </Stack>
            </Grid>
          </Grid>
          {/* <Box
            alignItems="center"
            sx={{
              // border: "1px solid red",
              width: "100vw",
              p: 0,
              m: 0,
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
                my: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormProvider methods={methods}>
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
                <ProjectFilter />
              </FormProvider>
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
                    Project
                  </Button>
                </Link>
              </div>
            </Box>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              // <ProjectsByRoleSingleLine user={user} projects={projects} />
              // <ProjectByRoleBoard projects={projects} />
              <FormProvider methods={methods}>
                <ProjectListWithPagination projects={projects} />
              </FormProvider>
            )}
          </Box> */}
        </Container>
      </Box>
    </ProjectPageContext.Provider>
  );
}

export default ProjectPage;
