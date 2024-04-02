import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getSingleProject } from "../features/project/projectSlice";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingScreen from "../components/LoadingScreen";
import { getTasks } from "../features/task/taskSlice";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";

import ProjectInformation from "../features/project/ProjectInformation";
import ProjectPageControl from "../features/project/ProjectPageControl";

import TaskByStatusDraggable from "../features/task/TaskByStatusDraggable";
import UpdateProjectDrawer from "../features/project/UpdateProjectDrawer";

export const ProjectDetailPageContext = createContext();

const StyledProjectInformationGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId;

  const location = useLocation();

  const [isOpeningProjectInfo, setIsOpeningProjectInfo] = useState(true);
  const [isUpdatingProject, setIsUpdatingProject] = useState(false);

  const {
    selectedProject,
    isLoading: isLoadingProject,
    error,
  } = useSelector((state) => state.project);

  const {
    currentPageTasks,
    tasksById,
    isLoading: isLoadingTask,
  } = useSelector((state) => state.task);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  const defaultValuesProjectTaskFilter = {
    taskStatus: "",
    assigneeId: "",
    startBefore: "",
    startAfter: "",
    dueBefore: "",
    dueAfter: "",
    search: "",
  };

  const [filters, setFilters] = useState(defaultValuesProjectTaskFilter);

  const handleFilterSelection = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const methods = useForm({ defaultValuesProjectTaskFilter });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectId) {
      dispatch(getTasks({ projectId, limit: 1000, ...filters }));
    }
  }, [dispatch, projectId, filters]);

  return (
    <ProjectDetailPageContext.Provider
      value={{
        isOpeningProjectInfo,
        setIsOpeningProjectInfo,
        isUpdatingProject,
        setIsUpdatingProject,
        selectedProject,
        isLoadingProject,
        filters,
        setFilters,
        handleFilterSelection,
        location,
      }}
    >
      <Box
        component="main"
        sx={{
          height: {
            xs: "calc(100vh - 90px)",
            md: "calc(100vh - 110px)",
          },
        }}
      >
        <Container
          maxWidth={"100%"}
          sx={{
            p: 0,
            height: 1,
          }}
        >
          {error === "Project not found or unauthorized to view project" ? (
            <Box
              sx={{
                height: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Typography variant="h3">404 Page not found!</Typography>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Button variant="contained">GO TO HOME</Button>
              </Link>
            </Box>
          ) : (
            <>
              <Grid
                container
                spacing={2}
                alignItems="flex-start"
                sx={{
                  height: 1,
                  width: "100dvw",
                  m: 0,
                  ml: { xs: 0, sm: -3 },
                  display: "flex",
                }}
              >
                <StyledProjectInformationGrid
                  item
                  xs={isOpeningProjectInfo ? 6 : 1.5}
                  md={isOpeningProjectInfo ? 3 : 0.5}
                  xl={isOpeningProjectInfo ? 2.5 : 0.5}
                  justifyContent="center"
                  alignItems="flex-start"
                  sx={{
                    backgroundColor: "background.secondary",
                    color: "text.secondary",
                    height: 1,
                    pr: 2,
                  }}
                >
                  <ProjectInformation
                    selectedProject={selectedProject}
                    location={location}
                  />
                </StyledProjectInformationGrid>
                <Grid
                  item
                  xs={isOpeningProjectInfo ? 6 : 10.5}
                  md={isOpeningProjectInfo ? 9 : 11.5}
                  xl={isOpeningProjectInfo ? 9.5 : 11.5}
                  sx={{
                    backgroundColor: "background.default",
                    height: 1,
                  }}
                >
                  <Stack spacing={1} alignItems="center" sx={{ height: 1 }}>
                    <Box sx={{ width: 1 }}>
                      <FormProvider methods={methods}>
                        <ProjectPageControl
                          selectedProject={selectedProject}
                          location={location}
                        />
                      </FormProvider>
                    </Box>

                    {isLoadingTask ? (
                      <LoadingScreen />
                    ) : (
                      <TaskByStatusDraggable tasks={tasks} filters={filters} />
                    )}
                  </Stack>
                </Grid>
              </Grid>

              <UpdateProjectDrawer
                project={selectedProject}
                isLoading={isLoadingProject}
                isUpdatingProject={isUpdatingProject}
                setIsUpdatingProject={setIsUpdatingProject}
              />
            </>
          )}
        </Container>
      </Box>
    </ProjectDetailPageContext.Provider>
  );
}

export default ProjectDetailPage;
