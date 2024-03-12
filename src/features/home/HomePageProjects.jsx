import { Button, Container, ImageList, Stack, SvgIcon } from "@mui/material";
import StartIcon from "@mui/icons-material/Start";
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getProjects } from "../project/projectSlice";
import LoadingScreen from "../../components/LoadingScreen";
import HomeStarredProjects from "../project/HomeStarredProjects";
import HomeOngoingProjects from "../project/HomeOngoingProjects";
import HomePlanningProjects from "../project/HomePlanningProjects";
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
        //  border: "1px solid purple",
        height: 1,
        p: 0,
      }}
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
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

          <Stack direction="row" justifyContent="flex-end">
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
      )}
    </Container>
  );
}

export default HomePageProjects;
