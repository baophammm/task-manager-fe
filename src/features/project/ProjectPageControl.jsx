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

import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectDetailTaskFilter from "./ProjectDetailTaskFilter";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deleteSingleProject, leaveProject } from "./projectSlice";

import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

import { LoadingButton } from "@mui/lab";

function ProjectPageControl({ selectedProject, location }) {
  const { isLoadingProject } = useContext(ProjectDetailPageContext);

  const { user } = useAuth();
  const currentUserId = user._id;

  const params = useParams();
  const projectId = params.projectId;

  const projectOwnerId = selectedProject?.projectOwner._id;
  const projectLeadIds = selectedProject?.projectLeads;

  const isProjectOwner = currentUserId === projectOwnerId ? true : false;
  const disableAddTask =
    currentUserId !== projectOwnerId && !projectLeadIds?.includes(currentUserId)
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
      {!disableAddTask && (
        <MenuItem>
          <Box width={1}>
            <Link
              to={`/projects/${projectId}/tasks/new`}
              state={{ backgroundLocation: location }}
            >
              <LoadingButton
                fullWidth
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                loading={isLoadingProject}
                style={{ justifyContent: "flex-start" }}
              >
                Task
              </LoadingButton>
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
              <LoadingButton
                fullWidth
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                disabled={!isProjectOwner}
                loading={isLoadingProject ? true : undefined}
                style={{ justifyContent: "flex-start" }}
              >
                Member
              </LoadingButton>
            </Link>
          </Box>
        </MenuItem>
      )}
      <MenuItem>
        <Box width={1}>
          {isProjectOwner ? (
            <LoadingButton
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
              loading={isLoadingProject}
              onClick={handleDeleteProject}
            >
              Delete Project
            </LoadingButton>
          ) : (
            <LoadingButton
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
              loading={isLoadingProject}
              onClick={handleLeaveProject}
            >
              Leave Project
            </LoadingButton>
          )}
        </Box>
      </MenuItem>
    </Menu>
  );
  return (
    <Box
      sx={{
        width: 1,
        height: "40px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={1}>
        <Box>
          <Link to={`/projects`}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowBackIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{ p: 1 }}
            >
              Projects
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
          }}
        >
          <ProjectDetailTaskFilter projectId={projectId} />
          {!disableAddTask && (
            <Box>
              <Link
                to={`/projects/${projectId}/tasks/new`}
                state={{ backgroundLocation: location }}
              >
                <LoadingButton
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  disabled={disableAddTask}
                  loading={isLoadingProject}
                  sx={{ p: 1 }}
                >
                  Task
                </LoadingButton>
              </Link>
            </Box>
          )}
          {isProjectOwner && (
            <Box sx={{ ml: 1 }}>
              <Link
                to={`/projects/${projectId}/projectMembers/new`}
                state={{ backgroundLocation: location }}
              >
                <LoadingButton
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  disabled={!isProjectOwner}
                  loading={isLoadingProject}
                  sx={{ p: 1 }}
                >
                  Member
                </LoadingButton>
              </Link>
            </Box>
          )}
        </Box>
      </Stack>

      <Stack flexDirection="row">
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <Box>
            {disableAddTask ? (
              <LoadingButton
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                disabled={disableAddTask}
                loading={isLoadingProject}
                sx={{ p: 1 }}
              >
                Task
              </LoadingButton>
            ) : (
              <Link
                to={`/projects/${projectId}/tasks/new`}
                state={{ backgroundLocation: location }}
              >
                <LoadingButton
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  disabled={disableAddTask}
                  loading={isLoadingProject}
                  sx={{ p: 1 }}
                >
                  Task
                </LoadingButton>
              </Link>
            )}
          </Box> */}
          {/* <Box sx={{ px: "6px" }}>
            {isProjectOwner ? (
              <Link
                to={`/projects/${projectId}/projectMembers/new`}
                state={{ backgroundLocation: location }}
              >
                <LoadingButton
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  disabled={!isProjectOwner}
                  loading={isLoadingProject}
                  sx={{ p: 1 }}
                >
                  Member
                </LoadingButton>
              </Link>
            ) : (
              <LoadingButton
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                disabled={!isProjectOwner}
                loading={isLoadingProject}
                sx={{ p: 1 }}
              >
                Member
              </LoadingButton>
            )}
          </Box> */}

          <Box>
            {isProjectOwner ? (
              <LoadingButton
                startIcon={
                  <SvgIcon fontSize="small">
                    <ClearIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  p: 1,
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
                loading={isLoadingProject}
                onClick={handleDeleteProject}
              >
                Delete Project
              </LoadingButton>
            ) : (
              <LoadingButton
                startIcon={
                  <SvgIcon fontSize="small">
                    <LogoutIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{
                  p: 1,
                  backgroundColor: "error.main",
                  "&:hover": {
                    backgroundColor: "error.dark",
                  },
                }}
                loading={isLoadingProject}
                onClick={handleLeaveProject}
              >
                Leave Project
              </LoadingButton>
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
