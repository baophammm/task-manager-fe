import {
  Box,
  Button,
  IconButton,
  ImageList,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import React, { useContext, useState } from "react";
import { FDateField, FSelect } from "../../components/form";
import { ProjectPageContext } from "../../pages/ProjectPage";
import dayjs from "dayjs";
import { ProjectsSearch } from "./ProjectsSearch";

const PROJECT_FILTERS = [
  {
    name: "projectStatus",
    label: "Project Status",
    fieldType: "select",
    options: ["All", "Planning", "Ongoing", "Done"],
  },
  {
    name: "currentUserRole",
    label: "Your Project Role",
    fieldType: "select",
    options: ["All", "Owner", "Lead", "Member"],
  },
  { name: "startAfter", label: "Start After", fieldType: "date" },
  { name: "startBefore", label: "Start Before", fieldType: "date" },
  { name: "dueAfter", label: "Due After", fieldType: "date" },
  { name: "dueBefore", label: "Due Before", fieldType: "date" },
];

function ProjectFilter() {
  const {
    isOpeningProjectFilter,
    setIsOpeningProjectFilter,
    filters,
    setFilters,
    handleFilterSelection,
  } = useContext(ProjectPageContext);

  const [anchorElFilter, setAnchorElFilter] = useState(null);

  const handleOpenFilterMenu = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };

  const filterMenu = (
    <Menu
      id="menu-projectfilter"
      anchorEl={anchorElFilter}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElFilter)}
      onClose={handleCloseFilterMenu}
      sx={{
        display: { xs: "block", xl: "none" },
      }}
    >
      <Box>
        <Typography textAlign="center">Search</Typography>
        <MenuItem>
          <ProjectsSearch />
        </MenuItem>
      </Box>
      <Box>
        <Typography textAlign="center">Filter</Typography>
        {PROJECT_FILTERS.map((filter) => {
          if (filter.fieldType === "select") {
            return (
              <MenuItem key={filter.name}>
                <FSelect
                  name={filter.name}
                  label={filter.label}
                  value={filters[filter.name]}
                  onChange={(e) => {
                    if (e.target.value !== "All") {
                      handleFilterSelection(filter.name, e.target.value);
                    } else {
                      handleFilterSelection(filter.name, null);
                    }
                  }}
                >
                  {filter.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </FSelect>
              </MenuItem>
            );
          } else if (filter.fieldType === "date") {
            return (
              <MenuItem key={filter.name}>
                <FDateField
                  name={filter.name}
                  label={filter.label}
                  value={
                    filters[filter.name] ? dayjs(filters[filter.name]) : null
                  }
                  onChange={(e) =>
                    handleFilterSelection(filter.name, e.format("YYYY-MM-DD"))
                  }
                />
              </MenuItem>
            );
          }
          return null;
        })}
        <Box
          sx={{
            width: 1,
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() =>
              setFilters({
                ...filters,
                projectStatus: "",
                currentUserRole: "",
                startAfter: null,
                startBefore: null,
                dueAfter: null,
                dueBefore: null,
                search: "",
              })
            }
            sx={{ width: 1 }}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
    </Menu>
  );

  const ProjectFilterCard = (
    <Box
      sx={{
        height: 1,
        maxHeight: 1,
        width: "100%",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: 1,
          display: "flex",
          flexDirection: "column",
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
            onClick={() => setIsOpeningProjectFilter(false)}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        <ImageList
          cols={1}
          sx={{
            height: "calc(100vh - 180px)",
            maxHeight: 1,
            width: 1,
            m: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              width: 1,
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Project Search
            </Typography>
            <ProjectsSearch />
          </Box>
          <Box
            sx={{
              width: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
              }}
            >
              Project Filters
            </Typography>
            <Stack spacing={1}>
              {PROJECT_FILTERS.map((filter) => {
                if (filter.fieldType === "select") {
                  return (
                    <FSelect
                      key={filter.name}
                      name={filter.name}
                      label={filter.label}
                      value={filters[filter.name]}
                      onChange={(e) => {
                        if (e.target.value !== "All") {
                          handleFilterSelection(filter.name, e.target.value);
                        } else {
                          handleFilterSelection(filter.name, null);
                        }
                      }}
                    >
                      {filter.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </FSelect>
                  );
                } else if (filter.fieldType === "date") {
                  return (
                    <FDateField
                      key={filter.name}
                      name={filter.name}
                      label={filter.label}
                      value={
                        filters[filter.name]
                          ? dayjs(filters[filter.name])
                          : null
                      }
                      onChange={(e) =>
                        handleFilterSelection(
                          filter.name,
                          e.format("YYYY-MM-DD")
                        )
                      }
                    />
                  );
                }
                return null;
              })}

              <Button
                variant="contained"
                onClick={() =>
                  setFilters({
                    ...filters,
                    projectStatus: "",
                    currentUserRole: "",
                    startAfter: "",
                    startBefore: "",
                    dueAfter: "",
                    dueBefore: "",
                    search: "",
                  })
                }
              >
                Reset Filters
              </Button>
            </Stack>
          </Box>
        </ImageList>
      </Box>
    </Box>
  );

  const projectFilterButtonMenu = (
    <Box
      sx={{
        display: { xs: "flex", xl: "none" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        size="small"
        aria-label="project filter menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenFilterMenu}
      >
        <FilterListIcon />
      </IconButton>
      {filterMenu}
    </Box>
  );
  return (
    <>
      <Box
        sx={{
          height: 1,
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        {isOpeningProjectFilter ? (
          ProjectFilterCard
        ) : (
          <Box
            sx={{
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
              onClick={() => setIsOpeningProjectFilter(true)}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          height: 1,
          display: {
            xs: "flex",
            md: "none",
          },
        }}
      >
        {projectFilterButtonMenu}
      </Box>
    </>
  );
}

export default ProjectFilter;
