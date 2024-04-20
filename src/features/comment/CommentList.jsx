import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { COMMENT_PER_TASK } from "../../app/config";
import { useDispatch } from "react-redux";
import { getCommentsOfTask } from "./commentSlice";
import { Pagination, Stack, Typography } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import CommentCard from "./CommentCard";

function CommentList({ taskId }) {
  const {
    commentsByTask,
    commentsById,
    totalComments,
    isLoading,
    currentPage,
  } = useSelector(
    (state) => ({
      commentsByTask: state.comment.commentsByTask[taskId],
      totalComments: state.comment.totalCommentsByTask[taskId],
      currentPage: state.comment.currentPageByTask[taskId] || 1,
      commentsById: state.comment.commentsById,
      isLoading: state.comment.isLoading,
    }),
    shallowEqual
  );

  const totalPages = Math.ceil(totalComments / COMMENT_PER_TASK);

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getCommentsOfTask({ taskId }));
    }
  }, [taskId, dispatch]);

  let renderComments;

  if (commentsByTask) {
    const comments = commentsByTask.map((commentId) => commentsById[commentId]);
    renderComments = (
      <Stack spacing={1.5}>
        {comments.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderComments = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5} sx={{ px: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle">
          {totalComments > 1
            ? `${totalComments} comments`
            : totalComments === 1
            ? `${totalComments} comment`
            : "No comment"}
        </Typography>
        {totalComments > COMMENT_PER_TASK && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => {
              dispatch(getCommentsOfTask({ taskId, page }));
            }}
          />
        )}
      </Stack>
      {renderComments}
    </Stack>
  );
}

export default CommentList;
