import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import StarIcon from "@mui/icons-material/Star";
import React, { useContext } from "react";
import ProjectFilter from "./ProjectFilter";
import { FormProvider } from "../../components/form";
import { Link } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { ProjectPageContext } from "../../pages/ProjectPage";
import { RouterContext } from "../../routes";

function ProjectsHeader() {
  const {
    methods,
    location,
    // isDisplayingFeaturedProjects,
    // setIsDisplayingFeaturedProjects,
    filters,
    setFilters,
  } = useContext(ProjectPageContext);

  const { isDisplayingFeaturedProjects, setIsDisplayingFeaturedProjects } =
    useContext(RouterContext);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ width: 1, px: 1 }}
    >
      <Typography variant="h5">
        {isDisplayingFeaturedProjects
          ? "My Featured Projects"
          : "All My Projects"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            mr: 1,
          }}
        >
          <FormProvider methods={methods}>
            <ProjectFilter />
          </FormProvider>
        </Box>

        <Button
          startIcon={
            <SvgIcon fontSize="small">
              {isDisplayingFeaturedProjects ? (
                <AllInclusiveIcon />
              ) : (
                <StarIcon />
              )}
            </SvgIcon>
          }
          variant="contained"
          sx={{ p: 1, mx: 1 }}
          onClick={() => {
            if (isDisplayingFeaturedProjects === false) {
              setFilters({
                ...filters,
                projectStatus: "",
                currentUserRole: "",
                startAfter: "",
                startBefore: "",
                dueAfter: "",
                dueBefore: "",
                search: "",
              });
            }
            setIsDisplayingFeaturedProjects(!isDisplayingFeaturedProjects);
          }}
        >
          {isDisplayingFeaturedProjects ? "All" : "Featured"}
        </Button>

        <div>
          <Link to={`/projects/new`} state={{ backgroundLocation: location }}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PlusIcon />
                </SvgIcon>
              }
              variant="contained"
              sx={{ p: 1 }}
            >
              Project
            </Button>
          </Link>
        </div>
      </Box>
    </Stack>
  );
}

export default ProjectsHeader;
