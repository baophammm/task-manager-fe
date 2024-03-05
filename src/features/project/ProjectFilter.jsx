import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import React, { useContext, useState } from "react";
import { FDateField, FSelect } from "../../components/form";
import { ProjectPageContext } from "../../pages/ProjectPage";
import dayjs from "dayjs";
// import { reset } from "numeral";

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
    options: ["All", "Owner", "Manager", "Member"],
  },
  { name: "startAfter", label: "Start After", fieldType: "date" },
  { name: "startBefore", label: "Start Before", fieldType: "date" },
  { name: "dueAfter", label: "Due After", fieldType: "date" },
  { name: "dueBefore", label: "Due Before", fieldType: "date" },
];

function ProjectFilter() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(ProjectPageContext);

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
                value={dayjs(filters[filter.name])}
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() =>
            setFilters({
              ...filters,
              projectStatus: "",
              currentUserRole: "",
              startAfter: null,
              startBefore: null,
              dueAfter: null,
              dueBefore: null,
            })
          }
        >
          Reset Filters
        </Button>
      </Box>
    </Menu>
  );

  return (
    <Box
      sx={{
        // border: "1px solid green",
        height: "100%",
      }}
    >
      <Card
        sx={{
          width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: { xs: "none", xl: "flex", flexDirection: "column" },
            }}
          >
            <Typography variant="h6">Project Filters</Typography>
            <Stack spacing={2}>
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
                      value={dayjs(filters[filter.name])}
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
                onClick={() =>
                  setFilters({
                    ...filters,
                    projectStatus: "",
                    currentUserRole: "",
                    startAfter: null,
                    startBefore: null,
                    dueAfter: null,
                    dueBefore: null,
                  })
                }
              >
                Reset Filters
              </Button>
            </Stack>
          </Box>
          <Box
            sx={{
              display: { xs: "flex", xl: "none" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenFilterMenu}
            >
              <FilterListIcon />
            </IconButton>
            {filterMenu}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProjectFilter;
