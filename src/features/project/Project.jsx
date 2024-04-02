import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import GradeIcon from "@mui/icons-material/Grade";

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  addProjectToFavorite,
  removeProjectFromFavorite,
} from "../user/userSlice";
import { getProjects } from "./projectSlice";
import { RouterContext } from "../../routes";

const PROJECT_STATUS_ICONS = [
  { projectStatus: "Planning", icon: <PendingActionsIcon /> },
  { projectStatus: "Ongoing", icon: <PlayCircleIcon /> },
  { projectStatus: "Done", icon: <CheckCircleIcon /> },
];

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  // marginBottom: "8px",
  backgroundColor: theme.palette.background.default,
}));

function Project(props) {
  const { isDisplayingFeaturedProjects } = useContext(RouterContext);

  const { user } = useAuth();
  const currentUserId = user._id;
  const projectId = props.project._id;

  // console.log("CHECK CURRENT USER IN PROJECT CARD", user);
  const currentUserFavoriteProjects = user.favoriteProjects;
  const favoriteProjectList = currentUserFavoriteProjects.find(
    (project) => project === projectId
  );

  const isFavorite = favoriteProjectList ? true : false;

  const dispatch = useDispatch();

  const handleAddFavoriteProject = () => {
    if (isFavorite) {
      dispatch(
        removeProjectFromFavorite({ userId: currentUserId, projectId })
      ).then(() => {
        if (props.filters) {
          dispatch(getProjects({ page: 1, ...props.filters }));
        } else {
          if (isDisplayingFeaturedProjects) {
            dispatch(getProjects({ page: 1, limit: 1000 }));
          } else {
            dispatch(getProjects({ page: 1 }));
          }
        }
      });
    } else {
      dispatch(addProjectToFavorite({ userId: currentUserId, projectId }));
      // .then(
      //   () => {
      //     setIsFavoriteProject(true);
      //   }
      // );
    }
  };
  return (
    <StyledContainer>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 3,
        }}
      >
        <CardContent
          sx={{
            p: 0,
            pb: 1,
          }}
        >
          <Box
            sx={{
              // border: "1px solid green",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{props.project.title}</Typography>

            <IconButton
              size="small"
              aria-label="favorite project"
              aria-controls="menu-projectdetailcontrolbutton"
              aria-haspopup="true"
              onClick={(e) => {
                // e.stopPropagation();
                handleAddFavoriteProject();
              }}
            >
              {isFavorite ? (
                <GradeIcon sx={{ color: "#f1c40f" }} />
              ) : (
                <StarOutlineIcon />
              )}
            </IconButton>
          </Box>
          <Box
            sx={{
              width: 1,
              height: "3em",
              lineHeight: "1.5em",
              overflow: "hidden",
            }}
          >
            <Typography variant="span" fontWeight="bold" fontSize="0.875rem">
              Description:{" "}
            </Typography>
            <Typography variant="span" fontSize="0.875rem">
              {props.project.description.length > 80
                ? props.project.description.slice(0, 80) + "..."
                : props.project.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="span" fontWeight="bold" fontSize="0.875rem">
              Task count:
            </Typography>{" "}
            <Typography align="left" variant="span" fontSize="0.875rem">
              {props.project.taskCount}
            </Typography>
          </Box>
          <Box>
            <Typography variant="span" fontWeight="bold" fontSize="0.875rem">
              Member count:
            </Typography>{" "}
            <Typography align="left" variant="span" fontSize="0.875rem">
              {props.project.projectMembers.length}
            </Typography>
          </Box>

          <Typography align="left" variant="body2">
            <Typography variant="span" fontWeight="bold">
              Creator:
            </Typography>{" "}
            {props.project.projectOwner.firstName}{" "}
            {props.project.projectOwner.lastName}
          </Typography>
        </CardContent>

        <Divider />
        <Grid
          container
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={0}
          sx={{
            // border: "1px solid red",
            width: 1,
            m: 0,
            p: 0,
            // px: 2,
          }}
        >
          <Grid item xs={6}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{ height: "100%" }}
            >
              <SvgIcon color="action" fontSize="small">
                {
                  PROJECT_STATUS_ICONS.filter(
                    (icon) => icon.projectStatus === props.project.projectStatus
                  )[0].icon
                }
              </SvgIcon>
              <Typography
                color="text.primary"
                display="inline"
                variant="caption"
                textAlign="center"
              >
                {props.project.projectStatus}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Link to={`/projects/${props.project._id}`}>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ZoomInIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  <Typography variant="caption">Details</Typography>
                </Button>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Card>
    </StyledContainer>
  );
}

export default Project;
