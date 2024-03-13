import {
  Button,
  Container,
  ImageList,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import StartIcon from "@mui/icons-material/Start";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProjects } from "../project/projectSlice";
import LoadingScreen from "../../components/LoadingScreen";
import HomeStarredProjects from "../project/FeaturedStarredProjects.jsx";
import HomeOngoingProjects from "../project/FeaturedOngoingProjects.jsx";
import HomePlanningProjects from "../project/FeaturedPlanningProjects.jsx";
import { Link } from "react-router-dom";

function HomePageProjects() {
  const { user } = useAuth();
  const currentUserFavoriteProjects = user.favoriteProjects;

  const [removeFavoriteProjectId, setRemoveFavoriteProjectId] = useState("");

  const removeFavoriteProject = (projectId) => {
    setRemoveFavoriteProjectId(projectId);
  };

  const { currentPageProjects, projectsById, isLoading, error } = useSelector(
    (state) => state.project
  );

  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );

  const starredProjects = projects.filter((project) =>
    currentUserFavoriteProjects.includes(project._id)
  );

  const ongoingProjects = projects.filter(
    (project) => project.projectStatus === "Ongoing"
  );
  const planningProjects = projects.filter(
    (project) => project.projectStatus === "Planning"
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects({ page: 1 }));
  }, [dispatch]);
  return (
    <Container
      maxWidth={1}
      sx={{
        height: 1,
        py: 2,
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : projects.length ? (
        <ImageList
          cols={1}
          sx={{
            // border: "1px solid orange",
            width: 1,
            m: 0,
            height: {
              xs: "calc(100vh - 170px)",
              md: "calc(100vh - 126px)",
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {starredProjects.length ? (
            <HomeStarredProjects projects={starredProjects} />
          ) : (
            <></>
          )}

          {ongoingProjects.length ? (
            <HomeOngoingProjects projects={ongoingProjects} />
          ) : (
            <></>
          )}

          {planningProjects.length ? (
            <HomePlanningProjects projects={planningProjects} />
          ) : (
            <></>
          )}
          <Stack direction="row" justifyContent="flex-start">
            <Link to={`/projects`}>
              <Button
                endIcon={
                  <SvgIcon>
                    <StartIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                All Projects
              </Button>
            </Link>
          </Stack>
        </ImageList>
      ) : (
        <>
          <Typography variant="h4">No Project Found</Typography>
          <Stack direction="row" justifyContent="flex-start">
            <Link to={`/projects`}>
              <Button
                endIcon={
                  <SvgIcon>
                    <StartIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                All Projects
              </Button>
            </Link>
          </Stack>
        </>
      )}
    </Container>
  );
}

export default HomePageProjects;
