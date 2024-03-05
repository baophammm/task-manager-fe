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
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";

import SearchInput from "../components/SearchInput";
import Filter from "../components/Filter";
import TaskCard from "../features/task/TaskCard";
import { TasksSearch } from "../features/task/TasksSearch";
import TaskFilter from "../features/task/TaskFilter";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getTasks } from "../features/task/taskSlice";
import useAuth from "../hooks/useAuth";
import { FormProvider } from "../components/form";

export const TaskPageContext = createContext();

function TaskPage({ location }) {
  const [page, setPage] = useState(1);
  const { isLoading, currentPageTasks, tasksById, totalPages } = useSelector(
    (state) => state.task
  );

  const { user } = useAuth();
  const defaultValues = {
    taskStatus: "",
    priority: "",
    assigneeId: user._id,
    projectId: null,
    startBefore: null,
    startAfter: null,
    dueBefore: null,
    dueAfter: null,
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
      value={{ filters, setFilters, handleFilterSelection }}
    >
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Grid item xs={6} sm={4} md={2}>
              <FormProvider methods={methods}>
                <TaskFilter />
              </FormProvider>
            </Grid>
            <Grid item xs={6} sm={8} md={10}>
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">Tasks</Typography>
                  </Stack>
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
                        Add
                      </Button>
                    </Link>
                  </div>
                </Stack>
                <FormProvider methods={methods}>
                  <TasksSearch />
                </FormProvider>
                <Grid container spacing={3}>
                  {tasks.map((task) => (
                    <Grid key={task._id} item xs={12} md={6} lg={4}>
                      <TaskCard task={task} />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    size="small"
                    onChange={(e, page) => setPage(page)}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </TaskPageContext.Provider>
  );
}

export default TaskPage;
