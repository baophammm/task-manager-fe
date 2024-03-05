import React, { createContext, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteSingleProject,
  getProjects,
  getSingleProject,
  leaveProject,
} from "../features/project/projectSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LoadingScreen from "../components/LoadingScreen";
import { getTasks } from "../features/task/taskSlice";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";
import TaskCard from "../features/task/TaskCard";
import useAuth from "../hooks/useAuth";

import ProjectDetailTaskFilter from "../features/project/ProjectDetailTaskFilter";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import ProjectMemberIconStack from "../features/project/ProjectMemberIconStack";
import ProjectInformation from "../features/project/ProjectInformation";
import ProjectPageControl from "../features/project/ProjectPageControl";
import ProjectInformationDrawer from "../features/project/ProjectInformationDrawer";
import TaskByStatusBoard from "../features/task/TaskByStatusBoard";

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

  const [isOpeningProjectInfo, setIsOpeningProjectInfo] = useState(false);

  const { selectedProject, isLoading: isLoadingProject } = useSelector(
    (state) => state.project,
    shallowEqual
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

  useEffect(() => {
    if (projectId) {
      dispatch(getSingleProject(projectId));
      dispatch(getTasks({ projectId, limit: 1000, ...filters }));
    }
  }, [dispatch, projectId, filters]);

  return (
    <ProjectDetailPageContext.Provider
      value={{
        isOpeningProjectInfo,
        setIsOpeningProjectInfo,
        filters,
        setFilters,
        handleFilterSelection,
      }}
    >
      <FormProvider methods={methods}>
        <Box
          component="main"
          sx={{
            // border: "1px solid green",
            // p: 0,
            height: {
              xs: "calc(100vh - 90px)",
              md: "calc(100vh - 100px)",
            },
          }}
        >
          <Container
            maxWidth
            sx={{
              // border: "1px solid orange",

              p: 0,

              height: 1,
            }}
          >
            {isLoadingProject ? (
              <LoadingScreen />
            ) : (
              selectedProject && (
                <>
                  <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    sx={{
                      // border: "1px solid blue",
                      height: "100%",

                      width: 1,
                      maxWidth: "100%",

                      m: 0,
                      display: {
                        xs: "none",
                        md: "flex",
                      },
                    }}
                  >
                    <StyledProjectInformationGrid
                      item
                      md={isOpeningProjectInfo ? 3 : 0.5}
                      xl={isOpeningProjectInfo ? 2.5 : 0.5}
                      sx={{
                        // border: "1px solid green",
                        // height: "calc(100vh - 110px)",
                        height: 1,
                        p: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <ProjectInformation
                        selectedProject={selectedProject}
                        location={location}
                      />
                    </StyledProjectInformationGrid>
                    <Grid
                      item
                      md={isOpeningProjectInfo ? 9 : 11.5}
                      // lg={9.5}
                      xl={isOpeningProjectInfo ? 9.5 : 11.5}
                      sx={{
                        // border: "1px solid green",
                        height: "calc(100vh - 110px)",
                      }}
                    >
                      <Stack spacing={1}>
                        <ProjectPageControl
                          selectedProject={selectedProject}
                          location={location}
                        />
                        {isLoadingTask ? (
                          <LoadingScreen />
                        ) : (
                          <TaskByStatusBoard tasks={tasks} />
                        )}
                      </Stack>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      // border: "1px solid red",

                      width: "100vw",
                      px: 0,
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
                      <ProjectPageControl
                        selectedProject={selectedProject}
                        location={location}
                      />
                    </Box>

                    <Grid
                      container
                      sx={{
                        // border: "1px solid blue",
                        height: 1,
                        width: 1,
                        display: {
                          xs: "flex",
                          md: "none",
                        },
                      }}
                    >
                      <StyledProjectInformationGrid
                        item
                        xs={isOpeningProjectInfo ? 6 : 0.5}
                        sx={{
                          // border: "1px solid orange",
                          height: 1,

                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <ProjectInformation
                          selectedProject={selectedProject}
                          location={location}
                        />
                      </StyledProjectInformationGrid>
                      <Grid
                        item
                        xs={isOpeningProjectInfo ? 6 : 11.5}
                        sx={{
                          // border: "1px solid green",

                          height: 1,
                        }}
                      >
                        <TaskByStatusBoard tasks={tasks} />
                      </Grid>
                    </Grid>

                    {/* <ProjectInformationDrawer
                      project={selectedProject}
                      location={location}
                    /> */}
                  </Box>
                </>
              )
            )}
          </Container>
        </Box>
      </FormProvider>
    </ProjectDetailPageContext.Provider>
  );
}

export default ProjectDetailPage;
