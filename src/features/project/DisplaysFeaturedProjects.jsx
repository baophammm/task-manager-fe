import { Box, ImageList, Typography } from "@mui/material";
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
    <Box
      sx={{
        width: 1,
        height: 1,
        px: 1,
      }}
    >
      {starredProjects.length ||
      ongoingProjects.length ||
      planningProjects.length ? (
        <ImageList
          cols={1}
          sx={{
            width: "100%",
            m: 0,
            px: 2,
            height: {
              xs: "calc(100vh - 164px)",
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
    </Box>
  );
}

export default DisplaysFeaturedProjects;
