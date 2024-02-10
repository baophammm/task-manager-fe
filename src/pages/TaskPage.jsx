import React, { useEffect, useState } from "react";
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

function TaskPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const handleSubmit = (searchQuery) => {
    setSearch(searchQuery);
  };

  const taskStatuses = [
    { value: "Backlog", label: "Backlog" },
    { value: "Pending", label: "Pending" },
    { value: "InProgress", label: "In Progress" },
    { value: "WaitingForReview", label: "Waiting For Review" },
    { value: "Reviewed", label: "Reviewed" },
    { value: "Completed", label: "Completed" },
    { value: "Archived", label: "Archived" },
  ];
  const tasks = [
    {
      _id: "65b3499a4c6a8565f33a5b48",

      title: "Task 0 for myself",
      description: "",
      taskStatus: "Backlog",
      priority: "High",
      assigneeId: "65acd12b3aff9916a1810f51",

      startAt: {
        $date: "2024-02-01T00:00:00.000Z",
      },
      dueAt: {
        $date: "2024-03-01T00:00:00.000Z",
      },
      files: [],
      createdBy: "65acd12b3aff9916a1810f51",

      commentCount: 0,
      createdAt: {
        $date: "2024-01-26T05:56:42.397Z",
      },
      updatedAt: {
        $date: "2024-01-27T10:47:29.261Z",
      },
      __v: 0,
    },
    {
      _id: "65b4af9c9cebd146255802cc",

      title: "Some task for Bao - Project 1",
      description: "Task for Bao, Created By Bao, in Project !",
      taskStatus: "Backlog",
      priority: "High",
      projectId: "65b0b398de33baddf9af8166",

      assigneeId: "65acd12b3aff9916a1810f51",

      files: [],
      createdBy: "65acd12b3aff9916a1810f51",

      commentCount: 0,
      createdAt: {
        $date: "2024-01-27T07:24:12.618Z",
      },
      updatedAt: {
        $date: "2024-01-27T07:24:12.618Z",
      },
      __v: 0,
    },
    {
      _id: "65bb26fa8f9ce0f98a0c7347",

      title: "Some Personal Task ",
      description: "Task by Bao - for Bao",
      taskStatus: "Backlog",
      priority: "High",
      assigneeId: "65acd12b3aff9916a1810f51",

      files: [],
      createdBy: "65acd12b3aff9916a1810f51",
      commentCount: 0,
      createdAt: {
        $date: "2024-02-01T05:07:06.680Z",
      },
      updatedAt: {
        $date: "2024-02-01T05:07:06.680Z",
      },
      __v: 0,
    },
  ];

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
            <TaskFilter />
          </Grid>
          <Grid item xs={6} sm={8} md={10}>
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Tasks</Typography>
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
              <TasksSearch />
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
                <Pagination count={3} size="small" />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default TaskPage;
