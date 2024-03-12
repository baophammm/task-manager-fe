import {
  Box,
  Card,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import TaskCard from "./TaskCard";
import TaskSquare from "./TaskSquare";

const RootBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  height: 1,
  width: "100%",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
}));

const TASKS_BY_STATUSES = [
  {
    name: "Backlog",
    label: "Backlog",
    backgroundColor: "primary.main",
    color: "primary.contrastText",
  },
  {
    name: "InProgress",
    label: "In Progress",
    backgroundColor: "success.light",
    color: "success.contrastText",
  },
  {
    name: "Completed",
    label: "Completed",
    backgroundColor: "info.main",
    color: "info.contrastText",
  },
  {
    name: "Archived",
    label: "Archived",
    backgroundColor: "error.dark",
    color: "error.contrastText",
  },
];

function renderSquare(i, [totalX, totalY], [taskX, taskY], task) {
  const x = i % totalX;
  const y = Math.floor(i / totalY);
  const isTaskHere = x === taskX && y === taskY;
  const taskCard = isTaskHere ? <TaskCard task={task} /> : null;

  return (
    <div key={i} style={{}}>
      <TaskSquare>{taskCard}</TaskSquare>
    </div>
  );
}
function TaskByStatusBoard({ tasks }) {
  let totalX = 0; //total number of categories
  let totalY = 0; //number of tasks of the category with highest number of tasks
  TASKS_BY_STATUSES.forEach((taskStatus) => {
    const selectedStatusTasks = tasks.filter(
      (task) => task.taskStatus === taskStatus.name
    );
    if (selectedStatusTasks.length) {
      totalX += 1;
      if (selectedStatusTasks.length > totalY) {
        totalY = selectedStatusTasks.length;
      }
    }
  });
  // console.log(totalX, totalY);

  const squares = [];

  for (let i = 0; i < totalX * totalY; i++) {}
  return (
    <RootBox>
      <ImageList
        sx={{
          // border: "1px solid yellow",
          height: {
            xs: "calc(100vh - 150px)",
            md: "calc(100vh - 170px)",
          },
          m: 0,
          gridAutoFlow: "column",
          gridTemplateColumns: `repeat(auto-fill,minmax(300px,1fr)) !important`,
          gridAutoColumns: `minmax(300px, 1fr)`,

          borderRadius: "8px",
        }}
      >
        {TASKS_BY_STATUSES.map((taskStatus) => {
          const selectedStatusTasks = tasks.filter(
            (task) => task.taskStatus === taskStatus.name
          );

          if (selectedStatusTasks.length) {
            return (
              <Box
                key={taskStatus.name}
                sx={{
                  border: "3px solid",
                  borderColor: taskStatus.backgroundColor,
                  borderRadius: "8px",
                  color: taskStatus.backgroundColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">{taskStatus.label}</Typography>

                {/* <Stack
                  spacing={2}
                  alignItems="center"
                  sx={{
                    // border: "1px solid red",
                    height: 1,
                  }}
                > */}
                <ImageList
                  cols={1}
                  sx={{
                    border: "1px solid red",
                    height: {
                      xs: "calc(100vh - 170px)",
                      md: "calc(100vh - 190px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {selectedStatusTasks.map((task) => (
                    <ImageListItem key={task._id} cols={1}>
                      <TaskCard task={task} />
                    </ImageListItem>
                  ))}
                </ImageList>
                {/* </Stack> */}
              </Box>
            );
          } else {
            return null;
          }
        })}
      </ImageList>
    </RootBox>
  );
}

export default TaskByStatusBoard;
