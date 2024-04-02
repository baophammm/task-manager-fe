import { Check } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  SvgIcon,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addTagToTask,
  getSingleTask,
  removeTagFromTask,
} from "../task/taskSlice";
import { TaskDetailModalContext } from "../task/TaskDetailModal";
import EditTagForm from "./EditTagForm";
import Tag from "./Tag";

function TagList({ task, tags }) {
  const taskTagList = task.tags.map((tag) => tag._id);

  return (
    <Box className="full-width-children">
      <Typography className="full-width-children" variant="body">
        Current Project Tags
      </Typography>
      <Box
        className="full-width-children"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
      >
        {tags.length > 0 ? (
          <Box className="full-width-children">
            {tags.map((tag) => (
              <Tag
                key={tag._id}
                tag={tag}
                taskId={task._id}
                taskTagList={taskTagList}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body2">No tags found</Typography>
        )}
      </Box>
    </Box>
  );
}

export default TagList;
