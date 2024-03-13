import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import React, { useContext } from "react";
import ProjectFilter from "./ProjectFilter";
import { FormProvider } from "../../components/form";
import { Link } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { ProjectPageContext } from "../../pages/ProjectPage";

function ProjectsHeader() {
  const {
    methods,
    location,
    isDisplayingFeaturedProjects,
    setIsDisplayingFeaturedProjects,
    filters,
    setFilters,
  } = useContext(ProjectPageContext);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      sx={{ px: 1 }}
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
              <DoubleArrowIcon />
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
