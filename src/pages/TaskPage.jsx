import React, { createContext, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import TaskFilter from "../features/task/TaskFilter";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getTasks } from "../features/task/taskSlice";
import useAuth from "../hooks/useAuth";
import { FormProvider } from "../components/form";
import LoadingScreen from "../components/LoadingScreen";

import TaskByStatusDraggable from "../features/task/TaskByStatusDraggable";
import { debounce } from "lodash";

export const TaskPageContext = createContext();

const StyledTaskFilterGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const taskFilterYupSchema = Yup.object().shape({
  effortGreaterThan: Yup.number("Effort Estimation must be number"),
  effortLessThan: Yup.number("Effort Estimation must be number"),
  startBefore: Yup.date("Start Date must be date"),
  startAfter: Yup.date("Start Date must be date"),
  dueBefore: Yup.date("Due Date must be date"),
  dueAfter: Yup.date("Due Date must be date"),
});

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
    assigneeId: user._id,
    projectId: "",
    effortGreaterThan: "",
    effortLessThan: "",
    startBefore: "",
    startAfter: "",
    dueBefore: "",
    dueAfter: "",
    search: "",
  };
  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm({
    resolver: yupResolver(taskFilterYupSchema),
    defaultValues,
  });

  const { reset } = methods;

  const handleFilterSelection = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const tasks = currentPageTasks.map((taskId) => tasksById[taskId]);

  const dispatch = useDispatch();

  const debounceGetTasks = useCallback(
    debounce((nextValue) => dispatch(getTasks(nextValue)), 1000),
    []
  );

  useEffect(() => {
    if (filters.search) {
      debounceGetTasks({ page, ...filters });
    } else {
      dispatch(getTasks({ page, ...filters }));
    }
  }, [page, filters, dispatch, debounceGetTasks]);

  return (
    <TaskPageContext.Provider
      value={{
        isLoading,
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
          height: { xs: "calc(100vh-90px)", md: "calc(100vh - 110px)" },
        }}
      >
        <Container
          maxWidth={"100%"}
          sx={{
            p: 0,
            height: 1,
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            sx={{
              margin: 0,
              ml: { xs: -3, md: -3 },
              height: "100%",
              width: "100dvw",
              display: "flex",
            }}
          >
            <StyledTaskFilterGrid
              item
              md={isOpeningTaskFilter ? 5 : 0.5}
              xl={isOpeningTaskFilter ? 4 : 0.5}
              sx={{
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
              md={isOpeningTaskFilter ? 7 : 11.5}
              xl={isOpeningTaskFilter ? 8 : 11.5}
              sx={{ height: 1, width: 1 }}
            >
              <Stack
                spacing={1}
                alignItems="center"
                sx={{
                  width: { xs: "100dvw", md: 1 },
                  ml: { xs: 1, sm: -1 },
                  mt: -1,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: 1, px: 1 }}
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
        </Container>
      </Box>
    </TaskPageContext.Provider>
  );
}

export default TaskPage;
