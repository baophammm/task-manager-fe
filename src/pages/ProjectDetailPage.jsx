import React, { createContext, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getSingleProject } from "../features/project/projectSlice";
import {
  Box,
  Card,
  Container,
  CssBaseline,
  Drawer,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingScreen from "../components/LoadingScreen";
import { getTasks } from "../features/task/taskSlice";
import { useForm } from "react-hook-form";
import { FTextField, FormProvider } from "../components/form";

import ProjectInformation from "../features/project/ProjectInformation";
import ProjectPageControl from "../features/project/ProjectPageControl";

import TaskByStatusDraggable from "../features/task/TaskByStatusDraggable";
import UpdateProjectDrawer from "../features/project/UpdateProjectDrawer";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

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

  const { selectedProject, isLoading: isLoadingProject } = useSelector(
    (state) => state.project
  );

  const {
    currentPageTasks,
    tasksById,
    isLoading: isLoadingTask,
  } = useSelector((state) => state.task);

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  const defaultValuesProjectTaskFilter = {
    taskStatus: "",
    priority: "",
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

  // ERROR TESTING: getSIngle project not passing in correctly,
  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projectId) {
      // dispatch(getSingleProject(projectId));
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
      }}
    >
      <Box
        component="main"
        sx={{
          // border: "1px solid green",
          // p: 0,

          // width: "100dvw",
          height: {
            xs: "calc(100vh - 90px)",
            md: "calc(100vh - 110px)",
          },
        }}
      >
        <Container
          maxWidth={"100%"}
          sx={{
            // border: "1px solid orange",
            p: 0,

            height: 1,
          }}
        >
          <Grid
            container
            spacing={2}
            alignItems="flex-start"
            sx={{
              // border: "1px solid red",
              height: 1,
              // height: "calc(100dvh - 120px)",
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
                // border: "3px solid green",
                backgroundColor: "background.secondary",
                color: "text.secondary",
                height: 1,
                // width: 1,
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
                // border: "1px solid green",
                backgroundColor: "background.default",
                height: 1,
                // width: 1,
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
        </Container>
      </Box>
    </ProjectDetailPageContext.Provider>
  );
}

export default ProjectDetailPage;
