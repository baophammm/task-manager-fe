import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function SingleTaskCommentSection({ taskId }) {
  console.log("TASK ID IN COMMENT SECTION", taskId);
  return (
    <Stack spacing={2} sx={{ width: 1 }}>
      <Typography variant="h5">Comments</Typography>
      <CommentForm taskId={taskId} />
      <CommentList taskId={taskId} />
    </Stack>
  );
}

export default SingleTaskCommentSection;
