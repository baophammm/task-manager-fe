import { Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { TaskDetailModalContext } from "../task/TaskDetailModal";

function SingleTaskCommentSection() {
  // { taskId }
  const { taskId } = useContext(TaskDetailModalContext);
  return (
    <Stack spacing={2} sx={{ width: 1 }}>
      <Typography variant="h5">Comments</Typography>
      <CommentForm taskId={taskId} />
      <CommentList taskId={taskId} />
    </Stack>
  );
}

export default SingleTaskCommentSection;
