import React from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteCommentOfTask, getCommentsOfTask } from "./commentSlice";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { fDate } from "../../utils/formatTime";
import UserProfilePicture from "../user/UserProfilePicture";

function CommentCard({ comment }) {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { commentsByTask, currentPageByTask, totalCommentsByTask } =
    useSelector((state) => state.comment);

  const currentUserId = user._id;
  const commentUserId = comment?.author?._id;
  const commentId = comment._id;
  const taskId = comment.targetId;

  const handleDeleteComment = () => {
    const result = window.confirm("Want to delete this comment?");
    if (result) {
      const numberOfComments = commentsByTask[taskId].length;
      const page =
        numberOfComments <= 1
          ? currentPageByTask[taskId] - 1
          : currentPageByTask[taskId];
      dispatch(deleteCommentOfTask({ commentId, taskId })).then(() => {
        dispatch(getCommentsOfTask({ taskId, page }));
      });
    }
  };
  return (
    <Stack direction="row" spacing={2} sx={{ position: "relative" }}>
      <UserProfilePicture targetUser={comment.author} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.firstName} {comment.author?.lastName}
          </Typography>

          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2">{comment.content}</Typography>
      </Paper>
      {currentUserId === commentUserId ? (
        <IconButton
          onClick={handleDeleteComment}
          sx={{
            zIndex: 9,
            m: 0,
            p: 0,
            position: "absolute",
            top: -10,
            right: -10,

            backgroundColor: "grey.400",
            color: "#fff",

            "&:hover": {
              color: "grey.500",
            },
          }}
        >
          <ClearIcon />
        </IconButton>
      ) : (
        <></>
      )}
    </Stack>
  );
}

export default CommentCard;
