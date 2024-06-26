import {
  Box,
  Button,
  Chip,
  IconButton,
  ImageList,
  Stack,
  Typography,
} from "@mui/material";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeIcon from "@mui/icons-material/Grade";

import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectMemberIconStack from "../user/ProjectMemberIconStack";
import { fDate } from "../../utils/formatTime";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  addProjectToFavorite,
  removeProjectFromFavorite,
} from "../user/userSlice";
import BurndownChart from "../../components/chartJs/BurndownChart";

function ProjectInformation({ location }) {
  const { user } = useAuth();
  const currentUserId = user._id;
  const params = useParams();
  const projectId = params.projectId;

  const {
    selectedProject,
    isOpeningProjectInfo,
    setIsOpeningProjectInfo,
    setIsUpdatingProject,
    isDisplayingProjectCharts,
    setIsDisplayingProjectCharts,
    tasks,
  } = useContext(ProjectDetailPageContext);

  const projectOwnerId = selectedProject?.projectOwner._id;

  const isProjectOwner = currentUserId === projectOwnerId ? true : false;

  const currentUserFavoriteProjects = user.favoriteProjects;
  const favoriteProjectList = currentUserFavoriteProjects.find(
    (project) => project === projectId
  );

  const defaultFavoriteProjectState = favoriteProjectList ? true : false;

  const [isFavoriteProject, setIsFavoriteProject] = useState(
    defaultFavoriteProjectState
  );

  const dispatch = useDispatch();

  const handleAddFavoriteProject = () => {
    if (isFavoriteProject) {
      dispatch(
        removeProjectFromFavorite({ userId: currentUserId, projectId })
      ).then(() => {
        setIsFavoriteProject(false);
      });
    } else {
      dispatch(addProjectToFavorite({ userId: currentUserId, projectId })).then(
        () => {
          setIsFavoriteProject(true);
        }
      );
    }
  };

  const chartKey = `${selectedProject?.id}-${tasks?.length}`;

  const ProjectInfoSection = (
    <Box
      sx={{
        height: 1,
        width: 1,
        m: 0,
      }}
    >
      <Stack
        spacing={2}
        sx={{
          height: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            onClick={() => setIsOpeningProjectInfo(false)}
          >
            <KeyboardDoubleArrowLeftIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{selectedProject?.title}</Typography>
          <IconButton
            size="large"
            aria-label="favorite project"
            aria-controls="menu-projectdetailcontrolbutton"
            aria-haspopup="true"
            onClick={handleAddFavoriteProject}
          >
            {isFavoriteProject ? (
              <GradeIcon sx={{ color: "#f1c40f" }} />
            ) : (
              <StarOutlineIcon />
            )}
          </IconButton>
        </Box>
        <ImageList
          cols={1}
          sx={{
            width: 1,
            height: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Box>
              <Typography variant="span" fontWeight="bold">
                Description:{" "}
              </Typography>
              <Typography variant="span">
                {selectedProject?.description}
              </Typography>
            </Box>
            <Box>
              <Typography variant="span" fontWeight="bold">
                Creator:{" "}
              </Typography>
              <Typography variant="span">
                {selectedProject?.projectOwner.firstName}{" "}
                {selectedProject?.projectOwner.lastName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="span" fontWeight="bold">
                Status:{" "}
              </Typography>
              <Chip label={selectedProject?.projectStatus} color="primary" />
            </Box>
          </Box>
          <Box
            sx={{
              "&:hover": {
                color: "info.dark",
              },
            }}
          >
            <Link
              to={`/projects/${projectId}/projectMembers`}
              state={{ backgroundLocation: location }}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography fontWeight="bold">Project Members:</Typography>
              {selectedProject?.projectMembers && (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <ProjectMemberIconStack
                    projectMembers={selectedProject.projectMembers}
                  />
                </Stack>
              )}
            </Link>
          </Box>

          {selectedProject?.startAt && (
            <Box>
              <Typography variant="span" fontWeight="bold">
                Start date:{" "}
              </Typography>
              <Typography variant="span">
                {fDate(selectedProject?.startAt)}
              </Typography>
            </Box>
          )}

          {selectedProject?.dueAt && (
            <Box>
              <Typography variant="span" fontWeight="bold">
                Due date:{" "}
              </Typography>

              <Typography variant="span">
                {fDate(selectedProject?.dueAt)}
              </Typography>
            </Box>
          )}
          <Button
            variant="contained"
            disabled={!isProjectOwner}
            onClick={() => setIsUpdatingProject(true)}
            sx={{ mt: 1 }}
          >
            Update Project
          </Button>
          <Box
            onClick={() => setIsDisplayingProjectCharts(true)}
            sx={{
              height: "400px",
              display: isDisplayingProjectCharts ? "none" : "flex",
              gap: "4px",
              "&:hover": {
                backgroundColor: "background.paper",
                cursor: "pointer",
              },
            }}
          >
            {selectedProject && tasks && (
              <BurndownChart
                key={chartKey}
                project={selectedProject}
                tasks={tasks}
              />
            )}
          </Box>
        </ImageList>
      </Stack>
    </Box>
  );

  const result = () =>
    isOpeningProjectInfo ? (
      ProjectInfoSection
    ) : (
      <Box
        sx={{
          height: 1,
          width: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton
          size="small"
          color="inherit"
          sx={{ mb: 1 }}
          onClick={() => setIsOpeningProjectInfo(true)}
        >
          <KeyboardDoubleArrowRightIcon fontSize="large" />
        </IconButton>
      </Box>
    );
  return result();
}

export default ProjectInformation;
