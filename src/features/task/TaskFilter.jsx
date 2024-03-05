import React, { useContext } from "react";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { TaskPageContext } from "../../pages/TaskPage";
import { FDateField, FSelect } from "../../components/form";
import dayjs from "dayjs";

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
  // { name: "projectId", label: "Project", fieldType: "select", options: [] },
  { name: "startAfter", label: "Start After", fieldType: "date" },
  { name: "startBefore", label: "Start Before", fieldType: "date" },
  { name: "dueAfter", label: "Due After", fieldType: "date" },
  { name: "dueBefore", label: "Due Before", fieldType: "date" },
];

function TaskFilter() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(TaskPageContext);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        // mr: "6px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent>
        <Typography variant="h5">Task Filters</Typography>
        <Stack spacing={2}>
          {TASK_FILTERS.map((filter) => {
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
                    handleFilterSelection(filter.name, e.format("YYYY-MM-DD"))
                  }
                />
              );
            }
            return null;
          })}

          <Button
            onClick={() => {
              setFilters({
                ...filters,
                taskStatus: "",
                priority: "",

                startAfter: null,
                startBefore: null,
                dueAfter: null,
                dueBefore: null,
              });
            }}
          >
            Reset Filters
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default TaskFilter;
