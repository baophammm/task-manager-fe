import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ClearIcon from "@mui/icons-material/Clear";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteSingleTask } from "./taskSlice";
import { TaskDetailModalContext } from "./TaskDetailModal";
import AddChecklistForm from "../checklist/AddChecklistForm";

const StyledButtonContainer = styled(Box)(({ theme }) => ({
  width: "100%",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: "100%",
  fontSize: "0.8rem",

  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: 1,
}));

function TaskDetailPageControl() {
  const {
    from,
    disableUpdateTask,
    setIsUpdatingTask,
    handleOpenAddFileFormMenu,
    AddFileFormMenu,

    handleOpenAddTagFormMenu,
    AddTagFormMenu,
  } = useContext(TaskDetailModalContext);
  const params = useParams();

  const taskId = params.taskId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteTask = () => {
    const result = window.confirm(
      "Are you sure that you want to delete this task?"
    );
    if (result) {
      dispatch(deleteSingleTask(taskId)).then(() => navigate(from));
    }
  };

  // add checklist
  const [anchorElAddChecklistFormMenu, setAnchorElAddChecklistMenu] =
    useState(null);
  const handleOpenAddChecklistFormMenu = (event) => {
    if (event) {
      setAnchorElAddChecklistMenu(event.currentTarget);
    }
  };

  const handleCloseAddChecklistFormMenu = () => {
    setAnchorElAddChecklistMenu(null);
  };

  const AddChecklistFormMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-addchecklistform"
      anchorEl={anchorElAddChecklistFormMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElAddChecklistFormMenu)}
      onClose={handleCloseAddChecklistFormMenu}
    >
      <Box>
        <AddChecklistForm
          taskId={taskId}
          handleCloseAddChecklistFormMenu={handleCloseAddChecklistFormMenu}
          sx={{ width: 300 }}
        />
      </Box>
    </Menu>
  );

  const CONTROL_BUTTONS = [
    {
      label: "Edit",
      icon: <UpgradeIcon />,
      action: () => setIsUpdatingTask(true),
    },
    {
      label: "Tags",
      icon: <LocalOfferIcon />,
      action: handleOpenAddTagFormMenu,
      menu: AddTagFormMenu,
    },
    {
      label: "Checklists",
      icon: <LibraryAddCheckIcon />,
      action: handleOpenAddChecklistFormMenu,
      menu: AddChecklistFormMenu,
    },
    {
      label: "Attachments",
      icon: <AttachFileIcon />,
      action: handleOpenAddFileFormMenu,
      menu: AddFileFormMenu,
    },
    { label: "Delete", icon: <ClearIcon />, action: handleDeleteTask },
  ];

  // Task Detail Page Control Button Menu
  const [
    anchorElTaskDetailPageControlButtonMenu,
    setAnchorElTaskDetailPageControlButtonMenu,
  ] = useState(null);

  const handleOpenTaskDetailPageControlButtonMenu = (event) => {
    setAnchorElTaskDetailPageControlButtonMenu(event.currentTarget);
    console.log("CHECKING", anchorElTaskDetailPageControlButtonMenu);
  };

  const handleCloseTaskDetailPageControlButtonMenu = () => {
    setAnchorElTaskDetailPageControlButtonMenu(null);
  };

  const TaskDetailPageControlButtonMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-taskdetailpagecontrolbutton"
      anchorEl={anchorElTaskDetailPageControlButtonMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElTaskDetailPageControlButtonMenu)}
      onClose={handleCloseTaskDetailPageControlButtonMenu}
    >
      {CONTROL_BUTTONS.map((button, index) => (
        <MenuItem
          key={index}
          onClick={() => {
            handleCloseTaskDetailPageControlButtonMenu();
            button.action();
          }}
        >
          <StyledButtonContainer>
            <StyledButton
              startIcon={<SvgIcon fontSize="small">{button.icon}</SvgIcon>}
              variant="contained"
              color={button.label === "Delete" ? "error" : "primary"}
              onClick={button.action}
              sx={button.label === "Delete" ? { color: "error.main" } : {}}
            >
              {button.label}
            </StyledButton>
            {button.menu && button.menu}
          </StyledButtonContainer>
        </MenuItem>
      ))}
    </Menu>
  );
  return (
    <>
      <Box
        sx={{
          width: "136px",

          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          gap: 1,
        }}
      >
        {CONTROL_BUTTONS.map((button, index) => (
          <StyledButtonContainer key={index}>
            <StyledButton
              startIcon={<SvgIcon fontSize="small">{button.icon}</SvgIcon>}
              variant="contained"
              color={button.label === "Delete" ? "error" : "primary"}
              onClick={
                button.menu ? (event) => button.action(event) : button.action
              }
              disabled={disableUpdateTask}
            >
              {button.label}
            </StyledButton>
            {button.menu && button.menu}
          </StyledButtonContainer>
        ))}
      </Box>
      {!disableUpdateTask && (
        <Box
          sx={{
            height: 1,
            width: "30px",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <IconButton onClick={handleOpenTaskDetailPageControlButtonMenu}>
            <SvgIcon fontSize="large">
              <MoreVertIcon sx={{ color: "primary.main" }} />
            </SvgIcon>
          </IconButton>
          {TaskDetailPageControlButtonMenu}
        </Box>
      )}
    </>
  );
}

export default TaskDetailPageControl;
