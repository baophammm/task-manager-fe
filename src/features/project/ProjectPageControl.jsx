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
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProjectDetailTaskFilter from "./ProjectDetailTaskFilter";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deleteSingleProject, leaveProject } from "./projectSlice";
import ProjectDetailTasksSearch from "../task/ProjectDetailTasksSearch";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

function ProjectPageControl({ selectedProject, location }) {
  const { setIsOpeningProjectInfo } = useContext(ProjectDetailPageContext);

  const { user } = useAuth();
  const currentUserId = user._id;
  const projectId = selectedProject._id;

  const projectOwnerId = selectedProject?.projectOwner._id;
  const projectManagerIds = selectedProject?.projectManagers;

  const isProjectOwner = currentUserId === projectOwnerId ? true : false;
  const disableAddTask =
    currentUserId !== projectOwnerId &&
    !projectManagerIds?.includes(currentUserId)
      ? true
      : false;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteProject = () => {
    const result = window.confirm(
      "Are you sure that you want to delete this project?"
    );
    if (result) {
      dispatch(deleteSingleProject(projectId));
      navigate("/projects");
    }
  };

  const handleLeaveProject = () => {
    const result = window.confirm(
      "Are you sure you want to leave this project?"
    );
    if (result) {
      dispatch(leaveProject({ projectId, memberId: currentUserId }));
      navigate("/projects");
    }
  };

  const [
    anchorElProjectPageControlButtonMenu,
    setAnchorElProjectPageControlButtonMenu,
  ] = useState(null);

  const handleOpenProjectPageControlButtonMenu = (event) => {
    setAnchorElProjectPageControlButtonMenu(event.currentTarget);
  };

  const handleCloseProjectPageControlButtonMenu = () => {
    setAnchorElProjectPageControlButtonMenu(null);
  };

  const projectPageControlButtonMenu = (
    <Menu
      id="menu-projectpagecontrolbutton"
      anchorEl={anchorElProjectPageControlButtonMenu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElProjectPageControlButtonMenu)}
      onClose={handleCloseProjectPageControlButtonMenu}
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <MenuItem>
        <Box width={1}>
          <Button
            fullWidth
            startIcon={
              <SvgIcon fontSize="small">
                <InfoIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={() => {
              setIsOpeningProjectInfo(true);
              handleCloseProjectPageControlButtonMenu();
            }}
            style={{ justifyContent: "flex-start" }}
          >
            Project Info
          </Button>
        </Box>
      </MenuItem>
      {!disableAddTask && (
        <MenuItem>
          <Box width={1}>
            <Link
              to={`/projects/${projectId}/tasks/new`}
              state={{ backgroundLocation: location }}
            >
              <Button
                fullWidth
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                style={{ justifyContent: "flex-start" }}
              >
                Task
              </Button>
            </Link>
          </Box>
        </MenuItem>
      )}
      {isProjectOwner && (
        <MenuItem>
          <Box width={1}>
            <Link
              to={`/projects/${projectId}/projectMembers/new`}
              state={{ backgroundLocation: location }}
            >
              <Button
                fullWidth
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                disabled={!isProjectOwner}
                style={{ justifyContent: "flex-start" }}
              >
                Member
              </Button>
            </Link>
          </Box>
        </MenuItem>
      )}
      <MenuItem>
        <Box width={1}>
          {isProjectOwner ? (
            <Button
              fullWidth
              startIcon={
                <SvgIcon fontSize="small">
                  <ClearIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{
                backgroundColor: "error.main",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
              style={{ justifyContent: "flex-start" }}
              onClick={handleDeleteProject}
            >
              Delete Project
            </Button>
          ) : (
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <LogoutIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{
                backgroundColor: "error.main",
                "&:hover": {
                  backgroundColor: "error.dark",
                },
              }}
              onClick={handleLeaveProject}
            >
              Leave Project
            </Button>
          )}
        </Box>
      </MenuItem>
    </Menu>
  );
  return (
    <Box
      sx={{
        // border: "1px solid green",
        width: 1,
        height: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Link to={`/projects`}>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <ArrowBackIcon />
              </SvgIcon>
            }
            variant="contained"
          >
            Projects
          </Button>
        </Link>
      </Box>
      {/* <Box
        sx={{
          // border: "1px solid red",
          flexGrow: 1,
          height: "48px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ProjectDetailTasksSearch />
      </Box> */}
      <Stack flexDirection="row">
        <ProjectDetailTaskFilter projectId={projectId} />
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            {disableAddTask ? (
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                disabled={disableAddTask}
              >
                Task
              </Button>
            ) : (
              <Link
                to={`/projects/${projectId}/tasks/new`}
                state={{ backgroundLocation: location }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  disabled={disableAddTask}
                >
                  Task
                </Button>
              </Link>
            )}
          </Box>

          <Box sx={{ px: "6px" }}>
            {isProjectOwner ? (
              <Link
                to={`/projects/${projectId}/projectMembers/new`}
                state={{ backgroundLocation: location }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  disabled={!isProjectOwner}
                >
                  Member
                </Button>
              </Link>
            ) : (
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                disabled={!isProjectOwner}
              >
                Member
              </Button>
            )}
          </Box>

          <Box>
            {isProjectOwner ? (
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <ClearIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
                onClick={handleDeleteProject}
              >
                Delete Project
              </Button>
            ) : (
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <LogoutIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
                onClick={handleLeaveProject}
              >
                Leave Project
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: {
              xs: "flex",
              md: "none",
              justifyContent: "center",
              alignItems: "center",
            },
          }}
        >
          <IconButton
            size="small"
            aria-label="project detail control buttons"
            aria-controls="menu-projectdetailcontrolbutton"
            aria-haspopup="true"
            onClick={handleOpenProjectPageControlButtonMenu}
          >
            <MoreVertIcon />
          </IconButton>
          {projectPageControlButtonMenu}
        </Box>
      </Stack>
    </Box>
  );
}

export default ProjectPageControl;
