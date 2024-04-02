import React, { useContext, useState } from "react";
import { TaskDetailModalContext } from "../task/TaskDetailModal";
import { useDispatch } from "react-redux";
import { addTagToTask, removeTagFromTask } from "../task/taskSlice";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  SvgIcon,
  Typography,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import EditTagForm from "./EditTagForm";

function Tag({ tag, taskId, taskTagList }) {
  const { menuPosition, setMenuPosition, isLoading } = useContext(
    TaskDetailModalContext
  );

  const dispatch = useDispatch();

  const handleTagToTask = (event, tagId) => {
    event.preventDefault();
    setMenuPosition(menuPosition);

    if (taskTagList.includes(tagId)) {
      // remove tag from task
      dispatch(removeTagFromTask({ taskId, tagId }));
    } else {
      // add tag to task
      dispatch(addTagToTask({ taskId, tagId }));
    }
  };

  const [anchorElEditTagMenu, setAnchorElEditTagMenu] = useState(null);
  const [editTagMenuPosition, setEditTagMenuPosition] = useState(null);

  const handleOpenEditTagMenu = (event) => {
    // event.preventDefault();
    setEditTagMenuPosition(menuPosition);
    // setAnchorElEditTagMenu(event.currentTarget);
  };

  const handleCloseEditTagMenu = () => {
    // setAnchorElEditTagMenu(null);
    setEditTagMenuPosition(null);
  };

  const EditTagMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-edittag"
      anchorReference="anchorPosition"
      anchorPosition={editTagMenuPosition}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(editTagMenuPosition)}
      onClose={handleCloseEditTagMenu}
    >
      <Box>
        <EditTagForm
          tag={tag}
          handleCloseEditTagMenu={handleCloseEditTagMenu}
          isLoading={isLoading}
          taskId={taskId}
          sx={{ width: "300px" }}
        />
      </Box>
    </Menu>
  );
  return (
    <Box
      key={tag._id}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 0.2,
      }}
    >
      <Checkbox
        checked={taskTagList.includes(tag._id)}
        onClick={(event) => handleTagToTask(event, tag._id)}
        sx={{ color: "gray" }}
      />
      <Box
        onClick={(event) => handleTagToTask(event, tag._id)}
        sx={{
          flexGrow: 1,
          backgroundColor: `tag.${tag.color}.${tag.colorShade}`,
          borderRadius: "4px",
          padding: "2px 4px",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: `tag.${tag.color}.contrastText`,
          }}
        >
          {tag.tagLabel}
        </Typography>
      </Box>
      <Box>
        <IconButton onClick={handleOpenEditTagMenu}>
          <SvgIcon fontSize="small">
            <ModeEditIcon />
          </SvgIcon>
        </IconButton>
        {EditTagMenu}
      </Box>
    </Box>
  );
}

export default Tag;
