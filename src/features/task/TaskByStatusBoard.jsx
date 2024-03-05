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
    name: "WaitingForReview",
    label: "Waiting For Review",
    backgroundColor: "neutral",
    color: "inherit",
  },
  {
    name: "Reviewed",
    label: "Reviewed",
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
function TasksByStatusSingleLine({ tasks }) {
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
              <ListItem
                key={taskStatus.name}
                sx={{
                  border: "3px solid",
                  borderColor: taskStatus.backgroundColor,
                  borderRadius: "8px",
                  padding: "0",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  color: taskStatus.backgroundColor,
                }}
              >
                <Typography variant="h5">{taskStatus.label}</Typography>
                <Box
                  sx={{
                    minHeight: "80%",
                    maxHeight: "80%",
                    width: "100%",
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <List
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                      }}
                    >
                      {selectedStatusTasks.map((task) => (
                        <ImageListItem key={task._id} cols={1}>
                          <TaskCard task={task} />
                        </ImageListItem>
                      ))}
                    </List>
                  </Stack>
                </Box>
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </ImageList>
    </RootBox>
  );
}

export default TasksByStatusSingleLine;
