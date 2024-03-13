import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../features/project/projectSlice";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

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

import TaskFilter from "../features/task/TaskFilter";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getTasks } from "../features/task/taskSlice";
import useAuth from "../hooks/useAuth";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";

import TaskByStatusDraggable from "../features/task/TaskByStatusDraggable";

export const TaskPageContext = createContext();

const StyledTaskFilterGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function TaskPage() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const location = useLocation();

  const [isOpeningTaskFilter, setIsOpeningTaskFilter] = useState(true);

  const { isLoading, currentPageTasks, tasksById, totalPages } = useSelector(
    (state) => state.task
  );

  const defaultValues = {
    taskStatus: "",
    priority: "",
    assigneeId: user._id,
    projectId: "",
    startBefore: "",
    startAfter: "",
    dueBefore: "",
    dueAfter: "",
    search: "",
  };
  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm({ defaultValues });

  const { reset } = methods;

  const handleFilterSelection = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks({ page, ...filters }));
  }, [page, filters, dispatch]);

  return (
    <TaskPageContext.Provider
      value={{
        filters,
        setFilters,
        handleFilterSelection,
        isOpeningTaskFilter,
        setIsOpeningTaskFilter,
      }}
    >
      <Box
        component="main"
        sx={{
          // border: "2px solid green",
          width: "100vw",
          height: { xs: "calc(100vh-200px)", md: "calc(100vh - 110px)" },
        }}
      >
        <Container
          maxWidth={1}
          sx={{
            // border: "2px solid orange",
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
              // border: "3px solid blue",
              margin: 0,
              ml: { xs: 0, md: -3 },
              mr: -3,
              height: "100%",
              width: "100vw",
              // display: { xs: "none", md: "flex" },
              display: "flex",
            }}
          >
            <StyledTaskFilterGrid
              item
              md={isOpeningTaskFilter ? 3 : 0.5}
              xl={isOpeningTaskFilter ? 2.5 : 0.5}
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
              <Box width={1} sx={{ height: 1 }}>
                <FormProvider methods={methods}>
                  <TaskFilter />
                </FormProvider>
              </Box>
            </StyledTaskFilterGrid>
            <Grid
              item
              xs={12}
              md={isOpeningTaskFilter ? 9 : 11.5}
              xl={isOpeningTaskFilter ? 9.5 : 11.5}
              sx={{ height: 1, width: 1 }}
            >
              <Stack
                spacing={1}
                sx={{
                  // border: "1px solid blue",
                  height: 1,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                  sx={{ px: 1 }}
                >
                  <Typography variant="h5">My Tasks</Typography>
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
                        <TaskFilter />
                      </FormProvider>
                    </Box>
                    <div>
                      <Link
                        to={`/tasks/new`}
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
                          Task
                        </Button>
                      </Link>
                    </div>
                  </Box>
                </Stack>

                {isLoading ? (
                  <LoadingScreen />
                ) : (
                  <TaskByStatusDraggable tasks={tasks} filters={filters} />
                )}
              </Stack>
            </Grid>
          </Grid>
          {/* <Box
              sx={{
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
                  px: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">My Tasks</Typography>
                <Stack direction="row" spacing={1}>
                  <TaskFilter />
                  <div>
                    <Link
                      to={`/tasks/new`}
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
                        Task
                      </Button>
                    </Link>
                  </div>
                </Stack>
              </Box>

              {isLoading ? (
                <LoadingScreen />
              ) : (
                <TaskByStatusDraggable tasks={tasks} filters={filters} />
              )}
            </Box> */}
        </Container>
      </Box>
    </TaskPageContext.Provider>
  );
}

export default TaskPage;
