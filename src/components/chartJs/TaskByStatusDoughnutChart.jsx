import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "@mui/material";

const TASKS_BY_STATUSES = [
  {
    name: "Backlog",
    label: "Backlog",
    backgroundColor: "info.main",
    color: "info.contrastText",
  },
  {
    name: "InProgress",
    label: "In Progress",
    backgroundColor: "warning.main",
    color: "warning.contrastText",
  },
  {
    name: "Completed",
    label: "Completed",
    backgroundColor: "success.main",
    color: "success.contrastText",
  },
  {
    name: "Archived",
    label: "Archived",
    backgroundColor: "error.dark",
    color: "error.contrastText",
  },
];

ChartJS.register(ArcElement, Tooltip, Legend);

const labels = TASKS_BY_STATUSES.map((status) => status.label);

function TaskByStatusDoughnutChart({ tasks }) {
  const defaultFilterTaskStatuses = TASKS_BY_STATUSES.map(
    (status) => status.label
  );
  const [filterTaskStatusList, setFilterTaskStatusList] = useState(
    defaultFilterTaskStatuses
  );

  const handleClickLegend = (legendItem) => {
    if (filterTaskStatusList.includes(legendItem.text)) {
      setFilterTaskStatusList(
        filterTaskStatusList.filter((status) => status !== legendItem.text)
      );
    } else {
      setFilterTaskStatusList([...filterTaskStatusList, legendItem.text]);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        display: true,

        onClick: function (event, legendItem, legend) {
          // Your custom logic
          handleClickLegend(legendItem);

          // Manually implement the default behavior
          legend.chart.toggleDataVisibility(legendItem.index);
          legend.chart.update();
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        right: 40,
        left: 40,
        bottom: 0,
      },
    },
  };

  const taskCountByStatus = TASKS_BY_STATUSES.map((status) => {
    const selectedStatusTasks = tasks.filter(
      (task) => task.taskStatus === status.name
    );
    return selectedStatusTasks.length;
  });
  const theme = useTheme();
  const backgroundColors = TASKS_BY_STATUSES.map(
    (status) =>
      theme.palette[status.backgroundColor.split(".")[0]][
        status.backgroundColor.split(".")[1]
      ]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Tasks per Status",
        data: taskCountByStatus,
        backgroundColor: backgroundColors,
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const totalTasks = tasks.filter((task) => {
    const taskLabel = TASKS_BY_STATUSES.find(
      (status) => status.name === task.taskStatus
    ).label;
    return filterTaskStatusList.includes(taskLabel);
  }).length;

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: "background.secondary",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        height: "500px",
      }}
    >
      <Typography variant="h5">Tasks per Status</Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Doughnut data={data} options={options} />
        <Typography
          variant="body2"
          textAlign="center"
          fontWeight="bold"
          style={{
            position: "absolute",
            bottom: "50%",
            transform: "translateY(-50%)",
          }}
        >
          Tasks ({totalTasks})
        </Typography>
      </Box>
    </Box>
  );
}

export default TaskByStatusDoughnutChart;
