import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { createCommentOnTask } from "./commentSlice";
import { IconButton, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UserProfilePicture from "../user/UserProfilePicture";

function CommentForm({ taskId }) {
  const [content, setContent] = useState("");
  const { user } = useAuth();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentOnTask({ taskId, content }));
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" alignItems="center" sx={{ px: 2 }}>
        <UserProfilePicture targetUser={user} />
        <TextField
          fullWidth
          size="small"
          value={content}
          placeholder="Write a comment..."
          onChange={(event) => setContent(event.target.value)}
          sx={{
            ml: 2,
            mr: 1,
            "& fieldset": {
              borderWidth: "1px !important",
              borderColor: (theme) =>
                `${theme.palette.grey[500_32]} !important`,
            },
          }}
        />
        <IconButton type="submit">
          <SendIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Stack>
    </form>
  );
}

export default CommentForm;
