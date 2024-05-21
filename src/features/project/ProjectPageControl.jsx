import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import ClearIcon from "@mui/icons-material/Clear";
import LogoutIcon from "@mui/icons-material/Logout";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import InsertChartIcon from "@mui/icons-material/InsertChart";

import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectDetailTaskFilter from "./ProjectDetailTaskFilter";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { deleteSingleProject, leaveProject } from "./projectSlice";

import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

import { LoadingButton } from "@mui/lab";

const TabWrapperStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  gap: "4px",
  padding: "2px",
}));

const TabButtonStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.components.MuiButton.styleOverrides.root.borderRadius,
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(1),
  cursor: "pointer",
  gap: "4px",
}));

function ProjectPageControl({ selectedProject, location }) {
  const {
    isLoadingProject,
    isDisplayingProjectCharts,
    setIsDisplayingProjectCharts,
  } = useContext(ProjectDetailPageContext);

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

  const ProjectDisplayTabList = (
    <TabWrapperStyle>
      <TabButtonStyle
        onClick={() => setIsDisplayingProjectCharts(false)}
        sx={{
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: isDisplayingProjectCharts
            ? "background.paper"
            : "action.focus",
        }}
      >
        <SvgIcon>
          <ViewKanbanIcon />
        </SvgIcon>
        <Typography>Kanban</Typography>
      </TabButtonStyle>
      <TabButtonStyle
        onClick={() => setIsDisplayingProjectCharts(true)}
        sx={{
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: isDisplayingProjectCharts
            ? "action.focus"
            : "background.paper",
        }}
      >
        <SvgIcon>
          <InsertChartIcon />
        </SvgIcon>
        <Typography>Dashboard</Typography>
      </TabButtonStyle>
    </TabWrapperStyle>
  );

  // const ProjectDisplayTabList = (
  //   <ButtonGroup
  //     variant="outlined"
  //     color="warning"
  //     aria-label="project display tabs"
  //     sx={{
  //       border: "2px solid",
  //       borderColor: "warning.main",
  //     }}
  //   >
  //     <Button
  //       title="Kanban View"
  //       color="warning"
  //       onClick={() => setIsDisplayingProjectCharts(false)}
  //       sx={{
  //         borderRadius: "2px",
  //         width: { sx: "40px", md: "80px" },
  //         p: 0,
  //         backgroundColor: isDisplayingProjectCharts
  //           ? "transparent"
  //           : "warning.light",

  //         color: isDisplayingProjectCharts
  //           ? "warning.dark"
  //           : "warning.contrastText",
  //       }}
  //     >
  //       <SvgIcon fontSize="medium">
  //         <ViewKanbanIcon />
  //       </SvgIcon>
  //     </Button>
  //     <Button
  //       title="Chart View"
  //       color="warning"
  //       onClick={() => setIsDisplayingProjectCharts(true)}
  //       sx={{
  //         borderRadius: "2px",
  //         width: { sx: "40px", md: "80px" },
  //         p: 0,
  //         backgroundColor: isDisplayingProjectCharts
  //           ? "warning.light"
  //           : "transparent",
  //         color: isDisplayingProjectCharts
  //           ? "warning.contrastText"
  //           : "warning.dark",
  //       }}
  //     >
  //       <SvgIcon fontSize="medium">
  //         <InsertChartIcon />
  //       </SvgIcon>
  //     </Button>
  //   </ButtonGroup>
  // );

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
        {/* <Box>
          <Link to={`/projects`}>
            <Button
              variant="contained"
              size="small"
              sx={{
                height: 1,
                aspectRatio: "1 / 1",
                minWidth: 0,
                p: 1,
                mr: 0.7,
              }}
            >
              <SvgIcon fontSize="small">
                <ArrowBackIcon />
              </SvgIcon>
            </Button>
          </Link>
        </Box> */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
          }}
        >
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
        <ProjectDetailTaskFilter projectId={projectId} />

        {ProjectDisplayTabList}
      </Stack>

      <Stack flexDirection="row" sx={{ pr: 1 }}>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
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
            },
            justifyContent: "center",
            alignItems: "center",
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
