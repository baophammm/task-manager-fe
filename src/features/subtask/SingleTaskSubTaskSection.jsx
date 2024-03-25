import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import SubTaskList from "./SubTaskList";
import { useDispatch } from "react-redux";
import AddSubTask from "./AddSubTask";

function SingleTaskSubTaskSection({ taskId }) {
  const dispatch = useDispatch();

  return (
    <Stack spacing={2} sx={{ width: 1 }}>
      <Typography variant="h5">Sub - Tasks</Typography>
      <SubTaskList taskId={taskId} />
      <AddSubTask taskId={taskId} />
    </Stack>
  );
}

export default SingleTaskSubTaskSection;
