import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      align: "center",
      display: true,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += `${context.parsed.y}%`;
          }
          return label;
        },
      },
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20,
        callback: function (value) {
          return `${value}%`;
        },
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
function TaskComplettionTrackingChart({ tasks }) {
  let projectMembers = tasks.map((task) => task.assignee);

  projectMembers = [
    ...new Map(projectMembers.map((member) => [member._id, member])).values(),
  ];

  const labels = [];
  const ongoingTaskPercantageByMemberData = [];
  const earlyTaskPercantageByMemberData = [];
  const ontimeTaskPercantageByMemberData = [];
  const delayedTaskPercantageByMemberData = [];

  if (projectMembers) {
    projectMembers.forEach((member) => {
      // labels
      labels.push(`${member.firstName} ${member.lastName}`);

      // data

      const memberTasks = tasks.filter(
        (task) => task.assignee._id === member._id
      );

      const totalTaskCount = memberTasks.length;

      // ongoing task count - tasks not finished and due date not passed
      const ongoingTaskCount = memberTasks.filter(
        (task) =>
          !task.completedAt &&
          new Date(task.dueAt).getTime() >= new Date().getTime()
      ).length;

      // early task count - tasks finished before due date
      const earlyTaskCount = memberTasks.filter(
        (task) =>
          task.completedAt &&
          new Date(task.completedAt).toISOString().slice(0, 10) <
            new Date(task.dueAt).toISOString().slice(0, 10)
      ).length;

      // on time task count - tasks finished on due date

      const ontimeTaskCount = memberTasks.filter(
        (task) =>
          task.completedAt &&
          new Date(task.completedAt).toISOString().slice(0, 10) ===
            new Date(task.dueAt).toISOString().slice(0, 10)
      ).length;

      // delayed task count - tasks finished after due date or tasks not finished and due date passed
      const delayedTaskCount = memberTasks.filter(
        (task) =>
          (task.completedAt &&
            new Date(task.completedAt).toISOString().slice(0, 10) >
              new Date(task.dueAt).toISOString().slice(0, 10)) ||
          (!task.completedAt && new Date(task.dueAt) < new Date())
      ).length;

      ongoingTaskPercantageByMemberData.push(
        parseFloat(((ongoingTaskCount / totalTaskCount) * 100 || 0).toFixed(2))
      );
      earlyTaskPercantageByMemberData.push(
        parseFloat(((earlyTaskCount / totalTaskCount) * 100 || 0).toFixed(2))
      );
      ontimeTaskPercantageByMemberData.push(
        parseFloat(((ontimeTaskCount / totalTaskCount) * 100 || 0).toFixed(2))
      );
      delayedTaskPercantageByMemberData.push(
        parseFloat(((delayedTaskCount / totalTaskCount) * 100 || 0).toFixed(2))
      );
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Ongoing",
        data: ongoingTaskPercantageByMemberData,
        backgroundColor: "rgb(255, 205, 86)",
        borderWidth: 1,
        borderColor: "white",
      },
      {
        label: "Early",
        data: earlyTaskPercantageByMemberData,
        backgroundColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        borderColor: "white",
      },
      {
        label: "On Time",
        data: ontimeTaskPercantageByMemberData,
        backgroundColor: "rgb(53, 162, 235)",
        borderWidth: 1,
        borderColor: "white",
      },
      {
        label: "Delayed",
        data: delayedTaskPercantageByMemberData,
        backgroundColor: "rgb(255, 99, 132)",
        borderWidth: 1,
        borderColor: "white",
      },
    ],
  };

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
        pb: 10,
      }}
    >
      <Typography variant="h5">Task Completion Tracking</Typography>
      <Bar data={data} options={options} />
    </Box>
  );
}

export default TaskComplettionTrackingChart;
