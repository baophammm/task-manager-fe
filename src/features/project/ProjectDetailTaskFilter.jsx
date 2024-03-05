import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";
import { FDateField, FSelect } from "../../components/form";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { getProjectMembers } from "../user/userSlice";

function ProjectDetailTaskFilter({ projectId }) {
  const { filters, setFilters, handleFilterSelection } = useContext(
    ProjectDetailPageContext
  );

  const { currentPageUsers, usersById } = useSelector((state) => state.user);

  const assigneeOptions = currentPageUsers.map((assigneeId) => ({
    value: assigneeId,
    label: `${usersById[assigneeId].firstName} ${usersById[assigneeId].lastName} | ${usersById[assigneeId].email} `,
  }));
  assigneeOptions.unshift({ value: "All", label: "All" });

  const TASK_FILTERS = [
    {
      name: "taskStatus",
      label: "Task Status",
      fieldType: "select",
      options: [
        { value: "All", label: "All" },
        { value: "Backlog", label: "Backlog" },
        { value: "InProgress", label: "In Progress" },
        { value: "WaitingForReview", label: "Waiting For Review" },
        { value: "Reviewed", label: "Reviewed" },
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
    {
      name: "assigneeId",
      label: "Assignee",
      fieldType: "select",
      options: assigneeOptions,
    },
    { name: "startAfter", label: "Start After", fieldType: "date" },
    { name: "startBefore", label: "Start Before", fieldType: "date" },
    { name: "dueAfter", label: "Due After", fieldType: "date" },
    { name: "dueBefore", label: "Due Before", fieldType: "date" },
  ];

  const [anchorElProjectTaskFilter, setAnchorElProjectTaskFilter] =
    useState(null);

  const handleOpenProjectTaskFilterMenu = (event) => {
    setAnchorElProjectTaskFilter(event.currentTarget);
  };

  const handleCloseProjectTaskFilterMenu = () => {
    setAnchorElProjectTaskFilter(null);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectMembers({ projectId, limit: 1000 }));
  }, [dispatch, projectId]);

  const projectTaskFilterMenu = (
    <Menu
      id="menu-projecttaskfilter"
      anchorEl={anchorElProjectTaskFilter}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(anchorElProjectTaskFilter)}
      onClose={handleCloseProjectTaskFilterMenu}
      sx={{
        display: "block",
      }}
    >
      {TASK_FILTERS?.map((filter) => {
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
                {filter?.options?.map((option) => (
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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            setFilters({
              ...filters,
              taskStatus: "",
              priority: "",
              assigneeId: "",
              startAfter: "",
              startBefore: "",
              dueAfter: "",
              dueBefore: "",
            });
          }}
        >
          Reset Filters
        </Button>
      </Box>
    </Menu>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 1,
      }}
    >
      <Button
        startIcon={
          <SvgIcon fontSize="small">
            <FilterListIcon />
          </SvgIcon>
        }
        variant="contained"
        sx={{ display: { xs: "none", md: "flex" } }}
        onClick={handleOpenProjectTaskFilterMenu}
      >
        Filters
      </Button>

      <IconButton
        size="small"
        aria-label="project detail task filter"
        aria-controls="menu-projectdetailtaskfilter"
        aria-haspopup="true"
        sx={{ display: { xs: "flex", md: "none" } }}
        onClick={handleOpenProjectTaskFilterMenu}
      >
        <FilterListIcon />
      </IconButton>
      {projectTaskFilterMenu}
    </Box>
  );
}

export default ProjectDetailTaskFilter;
