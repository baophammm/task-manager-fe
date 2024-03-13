import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ClearIcon from "@mui/icons-material/Clear";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSingleTask } from "./taskSlice";

function TaskDetailPageControl({
  selectedTask,
  disableUpdateTask,
  setIsUpdatingTask,
}) {
  const params = useParams();

  const taskId = params.taskid;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    const result = window.confirm(
      "Are you sure that you want to delete this task?"
    );
    if (result) {
      dispatch(deleteSingleTask(taskId)).then(() => navigate("/tasks"));
    }
  };

  const [anchorElUpdateButtons, setAnchorElUpdateButtons] = useState(null);

  const handleOpenUpdateButtonMenu = (event) => {
    setAnchorElUpdateButtons(event.currentTarget);
  };

  const handleCloseUpdateButtonMenu = () => {
    setAnchorElUpdateButtons(null);
  };

  const taskDetailUpdateButtonMenu = (
    <Menu
      id="menu-task-detail-update-buttons"
      anchorEl={anchorElUpdateButtons}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElUpdateButtons)}
      onClose={handleCloseUpdateButtonMenu}
      sx={{
        display: { xs: "block", xl: "none" },
      }}
    >
      <MenuItem onClick={handleCloseUpdateButtonMenu}>
        <Box width={1}>
          <Button
            fullWidth
            startIcon={
              <SvgIcon fontSize="small">
                <UpgradeIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={() => setIsUpdatingTask(true)}
            disabled={disableUpdateTask}
            style={{ justifyContent: "flex-start" }}
          >
            Edit
          </Button>
        </Box>
      </MenuItem>

      <MenuItem onClick={handleCloseUpdateButtonMenu}>
        <Box width={1}>
          <Button
            fullWidth
            startIcon={
              <SvgIcon fontSize="small">
                <ClearIcon />
              </SvgIcon>
            }
            variant="contained"
            style={{ justifyContent: "flex-start" }}
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            onClick={handleDeleteTask}
            disabled={disableUpdateTask}
          >
            Delete
          </Button>
        </Box>
      </MenuItem>
    </Menu>
  );

  const [anchorElBackButtons, setAnchorElBackButtons] = useState(null);

  const handleOpenBackButtonMenu = (event) => {
    setAnchorElBackButtons(event.currentTarget);
  };

  const handleCloseBackButtonMenu = () => {
    setAnchorElBackButtons(null);
  };

  const backButtonMenu = (
    <Menu
      id="menu-task-detail-back-buttons"
      anchorEl={anchorElBackButtons}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElBackButtons)}
      onClose={handleCloseBackButtonMenu}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <MenuItem>
        <Box width={1}>
          <Link to={`/tasks`}>
            <Button
              fullWidth
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBackIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Tasks
            </Button>
          </Link>
        </Box>
      </MenuItem>

      <MenuItem>
        <Box width={1}>
          <Link to={`/projects/${selectedTask?.project?._id}`}>
            <Button
              fullWidth
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBackIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              {selectedTask?.project?.title}
            </Button>
          </Link>
        </Box>
      </MenuItem>
    </Menu>
  );
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      ></Stack>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        {selectedTask?.project ? (
          <Box>
            <IconButton
              size="small"
              aria-label="task detail back buttons"
              aria-controls="menu-task-detail-back-buttons"
              aria-haspopup="true"
              onClick={handleOpenBackButtonMenu}
            >
              <ArrowBackIcon />
            </IconButton>
            {backButtonMenu}
          </Box>
        ) : (
          <Link to={`/tasks`}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBackIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Tasks
            </Button>
          </Link>
        )}
      </Box>

      <Stack
        spacing={1}
        direction="row"
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <Box>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <UpgradeIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={() => setIsUpdatingTask(true)}
            disabled={disableUpdateTask}
          >
            Edit
          </Button>
        </Box>
        <Box>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <ClearIcon />
              </SvgIcon>
            }
            variant="contained"
            sx={{
              backgroundColor: "error.main",
              "&:hover": { backgroundColor: "error.dark" },
            }}
            onClick={handleDeleteTask}
            disabled={disableUpdateTask}
          >
            Delete
          </Button>
        </Box>
      </Stack>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="small"
          aria-label="task detail update buttons"
          aria-controls="menu-task-detail-update-buttons"
          aria-haspopup="true"
          onClick={handleOpenUpdateButtonMenu}
        >
          <MoreVertIcon />
        </IconButton>
        {taskDetailUpdateButtonMenu}
      </Box>
    </Box>
  );
}

export default TaskDetailPageControl;
