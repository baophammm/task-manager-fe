import { Box, Checkbox, IconButton, SvgIcon, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteSingleSubTask,
  getSubTasksOfSingleTask,
  updateSubTaskIsChecked,
} from "./subTaskSlice";
import { Clear } from "@mui/icons-material";

function SubTaskCard({ subTask }) {
  const dispatch = useDispatch();

  const handleUpdateSubTaskIsChecked = () => {
    dispatch(
      updateSubTaskIsChecked({
        subTaskId: subTask._id,
        isChecked: !subTask.isChecked,
      })
    ).then(() => {
      dispatch(getSubTasksOfSingleTask({ taskId: subTask.task }));
    });
  };

  const handleDeleteSubTask = () => {
    dispatch(deleteSingleSubTask(subTask._id)).then(() => {
      dispatch(getSubTasksOfSingleTask({ taskId: subTask.task }));
    });
  };

  return (
    <Box
      sx={{
        borderRadius: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        "&:hover .iconButton": {
          visibility: "visible",
        },
      }}
    >
      <Box
        onClick={handleUpdateSubTaskIsChecked}
        sx={{
          height: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          gap: 1,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Checkbox checked={subTask.isChecked} sx={{ color: "gray" }} />
        <Typography>{subTask.subTaskText}</Typography>
      </Box>
      <Box>
        <IconButton
          className="iconButton"
          onClick={handleDeleteSubTask}
          sx={{ visibility: "hidden" }}
        >
          <SvgIcon fontSize="small">
            <ClearIcon />
          </SvgIcon>
        </IconButton>
      </Box>
    </Box>
  );
}

export default SubTaskCard;
