import { Container, ImageList, Typography } from "@mui/material";
import React, { useContext } from "react";
import { ProjectPageContext } from "../../pages/ProjectPage";
import useAuth from "../../hooks/useAuth";
import FeaturedStarredProjects from "./FeaturedStarredProjects.jsx";
import FeaturedOngoingProjects from "./FeaturedOngoingProjects";
import FeaturedPlanningProjects from "./FeaturedPlanningProjects.jsx";

function DisplaysFeaturedProjects() {
  const { projects } = useContext(ProjectPageContext);

  const { user } = useAuth();
  const currentUserFavoriteProjects = user.favoriteProjects;

  const starredProjects = projects.filter((project) =>
    currentUserFavoriteProjects.includes(project._id)
  );

  const ongoingProjects = projects.filter(
    (project) => project.projectStatus === "Ongoing"
  );

  const planningProjects = projects.filter(
    (project) => project.projectStatus === "Planning"
  );
  return (
    <Container
      maxWidth={"100%"}
      sx={{
        height: 1,
      }}
    >
      {starredProjects.length ||
      ongoingProjects.length ||
      planningProjects.length ? (
        <ImageList
          cols={1}
          sx={{
            // border: "1px solid orange",
            width: 1,
            m: 0,
            height: {
              xs: "calc(100vh - 170px)",
              sm: "calc(100vh - 160px)",
              md: "calc(100vh - 168px)",
            },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {starredProjects.length ? (
            <FeaturedStarredProjects projects={starredProjects} />
          ) : (
            <></>
          )}

          {ongoingProjects.length ? (
            <FeaturedOngoingProjects projects={ongoingProjects} />
          ) : (
            <></>
          )}

          {planningProjects.length ? (
            <FeaturedPlanningProjects projects={planningProjects} />
          ) : (
            <></>
          )}
        </ImageList>
      ) : (
        <Typography variant="h5">No Project Found</Typography>
      )}
    </Container>
  );
}

export default DisplaysFeaturedProjects;
