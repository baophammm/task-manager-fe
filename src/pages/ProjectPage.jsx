import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../features/project/projectSlice";

import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";

import ProjectFilter from "../features/project/ProjectFilter";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FormProvider } from "../components/form";

import ProjectsDisplay from "../features/project/ProjectsDisplay";
import { RouterContext } from "../routes";
import { debounce } from "lodash";

export const ProjectPageContext = createContext();

const StyledProjectFilterGrid = styled(Grid)(({ theme }) => ({
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function ProjectPage() {
  const { isDisplayingFeaturedProjects, setIsDisplayingFeaturedProjects } =
    useContext(RouterContext);

  const [page, setPage] = useState(1);

  const location = useLocation();

  const [isOpeningProjectFilter, setIsOpeningProjectFilter] = useState(false);

  const {
    isLoading,
    currentPageProjects,
    projectsById,
    totalPages,
    totalProjects,
  } = useSelector((state) => state.project);

  const defaultValues = {
    projectStatus: "",
    currentUserRole: "",
    startAfter: null,
    startBefore: null,
    dueAfter: null,
    dueBefore: null,
    search: "",
    sortBy: "created_at_desc",
  };

  const [filters, setFilters] = useState(defaultValues);

  const methods = useForm({
    defaultValues,
  });

  const handleFilterSelection = (field, value) => {
    setIsDisplayingFeaturedProjects(false);
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );

  const dispatch = useDispatch();

  const debounceGetProjects = useCallback(
    debounce((nextValue) => dispatch(getProjects(nextValue)), 1000),
    []
  );
  useEffect(() => {
    if (isDisplayingFeaturedProjects) {
      dispatch(getProjects({ page: 1, limit: 1000 }));
    } else {
      if (filters.search) {
        debounceGetProjects({ page, ...filters });
      } else {
        dispatch(getProjects({ page, ...filters }));
      }
    }
  }, [
    isDisplayingFeaturedProjects,
    page,
    filters,
    dispatch,
    debounceGetProjects,
  ]);

  return (
    <ProjectPageContext.Provider
      value={{
        location,
        isLoading,
        projects,
        totalPages,
        totalProjects,
        page,
        setPage,
        filters,
        setFilters,
        handleFilterSelection,
        methods,
        isOpeningProjectFilter,
        setIsOpeningProjectFilter,
      }}
    >
      <Box
        component="main"
        sx={{
          height: { xs: "calc(100vh-90px)", md: "calc(100vh - 110px)" },
        }}
      >
        <Container
          maxWidth={"100%"}
          sx={{
            p: 0,
            height: 1,
          }}
        >
          <Grid
            container
            alignItems="flex-start"
            spacing={2}
            sx={{
              margin: 0,
              ml: { xs: -3, md: -3 },
              height: "100%",
              width: "100dvw",
              display: "flex",
            }}
          >
            <StyledProjectFilterGrid
              item
              xs={0}
              md={isOpeningProjectFilter ? 3 : 0.5}
              xl={isOpeningProjectFilter ? 2.5 : 0.5}
              sx={{
                backgroundColor: "background.secondary",
                color: "text.secondary",

                height: 1,
                width: 1,
                pr: 2,

                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: { xs: "center", md: "center" },
              }}
            >
              <Box
                width={1}
                sx={{
                  height: 1,
                }}
              >
                <FormProvider methods={methods}>
                  <ProjectFilter />
                </FormProvider>
              </Box>
            </StyledProjectFilterGrid>
            <Grid
              item
              xs={12}
              md={isOpeningProjectFilter ? 9 : 11.5}
              xl={isOpeningProjectFilter ? 9.5 : 11.5}
              sx={{
                height: 1,
                width: { xs: 1, md: 1 },
              }}
            >
              <ProjectsDisplay />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProjectPageContext.Provider>
  );
}

export default ProjectPage;
