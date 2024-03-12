import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  ImageList,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FilterListIcon from "@mui/icons-material/FilterList";
import { TaskPageContext } from "../../pages/TaskPage";
import { FDateField, FSelect } from "../../components/form";
import dayjs from "dayjs";
import { TasksSearch } from "./TasksSearch";

const TASK_FILTERS = [
  {
    name: "taskStatus",
    label: "Task Status",
    fieldType: "select",
    options: [
      { value: "All", label: "All" },
      { value: "Backlog", label: "Backlog" },
      { value: "InProgress", label: "In Progress" },
      { value: "Completed", label: "Completed" },
      { value: "Archived", label: "Archived" },
    ],
  },
  {
    name: "priority",
    label: "Priority",
    fieldType: "select",
    options: [
      { value: "All", label: "All" },
      { value: "Critical", label: "Critical" },
      { value: "High", label: "High" },
      { value: "Medium", label: "Medium" },
      { value: "Low", label: "Low" },
    ],
  },
  // { name: "projectId", label: "Project", fieldType: "select", options: [] },
  { name: "startAfter", label: "Start After", fieldType: "date" },
  { name: "startBefore", label: "Start Before", fieldType: "date" },
  { name: "dueAfter", label: "Due After", fieldType: "date" },
  { name: "dueBefore", label: "Due Before", fieldType: "date" },
];

function TaskFilter() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(TaskPageContext);

  const { isOpeningTaskFilter, setIsOpeningTaskFilter } =
    useContext(TaskPageContext);

  const [anchorElFilter, setAnchorElFilter] = useState(null);

  const handleOpenFilterMenu = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };

  const filterMenu = (
    <Menu
      id="menu-taskfilter"
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
          <TasksSearch />
        </MenuItem>
      </Box>
      <Box>
        <Typography textAlign="center">Filter</Typography>

        {TASK_FILTERS.map((filter) => {
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
                    <option key={option.value} value={option.value}>
                      {option.label}
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
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setFilters({
                ...filters,
                taskStatus: "",
                priority: "",
                startAfter: "",
                startBefore: "",
                dueAfter: "",
                dueBefore: "",
              });
            }}
            sx={{ width: 1 }}
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
    </Menu>
  );

  const TaskFilterCard = (
    <Box
      sx={{
        // border: "1px solid red",
        height: 1,
        maxHeight: 1,
        width: "100%",

        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          // border: "1px solid red",
          height: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setIsOpeningTaskFilter(false)}>
            <ArrowBackIosNewIcon style={{ color: "white" }} />
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
              Task Search
            </Typography>
            <TasksSearch />
          </Box>
          <Box
            sx={{
              width: 1,
            }}
          >
            <Typography variant="h6" sx={{ mb: 1 }}>
              Task Filters
            </Typography>
            <Stack spacing={1}>
              {TASK_FILTERS.map((filter) => {
                if (filter.fieldType === "select") {
                  return (
                    <FSelect
                      key={filter.name}
                      name={filter.name}
                      label={filter.label}
                      value={filters[filter.name]}
                      labelColor="white"
                      onChange={(e) => {
                        if (e.target.value !== "All") {
                          handleFilterSelection(filter.name, e.target.value);
                        } else {
                          handleFilterSelection(filter.name, null);
                        }
                      }}
                    >
                      {filter.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
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
                variant="contained"
                onClick={() => {
                  setFilters({
                    ...filters,
                    taskStatus: "",
                    priority: "",

                    startAfter: "",
                    startBefore: "",
                    dueAfter: "",
                    dueBefore: "",
                  });
                }}
              >
                Reset Filters
              </Button>
            </Stack>
          </Box>
        </ImageList>
      </Box>
    </Box>
  );

  const taskFilterButtonMenu = (
    <Box
      sx={{
        display: { xs: "flex", xl: "none" },
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton
        size="small"
        aria-label="task filter menu"
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
        {isOpeningTaskFilter ? (
          TaskFilterCard
        ) : (
          <Box
            sx={{
              width: "24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton
              size="small"
              sx={{ mb: 1 }}
              onClick={() => setIsOpeningTaskFilter(true)}
            >
              <ArrowForwardIosIcon style={{ color: "white" }} />
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
        {taskFilterButtonMenu}
      </Box>
    </>
  );
}

export default TaskFilter;
