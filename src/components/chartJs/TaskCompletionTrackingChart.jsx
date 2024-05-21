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
import { delay } from "lodash";

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
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        min: 0,
        stepSize: 2,
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

const getSumOfArray = (array) => {
  return array.reduce((total, task) => total + task.effort, 0);
};
function TaskCompletionTrackingChart({ project, tasks }) {
  let projectMembers;
  if (project) {
    ({ projectMembers } = project);
  }

  const labels = [];
  const ongoingTaskHoursByMemberData = [];
  const earlyTaskHoursByMemberData = [];
  const ontimeTaskHoursByMemberData = [];
  const delayedTaskHoursByMemberData = [];

  if (projectMembers) {
    projectMembers.forEach((member) => {
      // labels
      labels.push(`${member.firstName} ${member.lastName}`);

      // data

      const memberTasks = tasks.filter(
        (task) => task.assignee._id === member._id
      );

      // ongoing task hours - tasks not finished and due date not passed
      const ongoingTaskHours = getSumOfArray(
        memberTasks.filter(
          (task) =>
            !task.completedAt &&
            new Date(task.dueAt).getTime() >= new Date().getTime()
        )
      );
      // early task hours - tasks finished before due date
      const earlyTaskHours = getSumOfArray(
        memberTasks.filter(
          (task) =>
            task.completedAt &&
            new Date(task.completedAt).toISOString().slice(0, 10) <
              new Date(task.dueAt).toISOString().slice(0, 10)
        )
      );

      // on time task hours - tasks finished on due date

      const ontimeTaskHours = getSumOfArray(
        memberTasks.filter(
          (task) =>
            task.completedAt &&
            new Date(task.completedAt).toISOString().slice(0, 10) ===
              new Date(task.dueAt).toISOString().slice(0, 10)
        )
      );

      // delayed task hours - tasks finished after due date or tasks not finished and due date passed
      const delayedTaskHours = getSumOfArray(
        memberTasks.filter(
          (task) =>
            (task.completedAt &&
              new Date(task.completedAt).toISOString().slice(0, 10) >
                new Date(task.dueAt).toISOString().slice(0, 10)) ||
            (!task.completedAt && new Date(task.dueAt) < new Date())
        )
      );

      ongoingTaskHoursByMemberData.push(ongoingTaskHours);
      earlyTaskHoursByMemberData.push(earlyTaskHours);
      ontimeTaskHoursByMemberData.push(ontimeTaskHours);
      delayedTaskHoursByMemberData.push(delayedTaskHours);
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Ongoing",
        data: ongoingTaskHoursByMemberData,
        backgroundColor: "rgb(255, 205, 86)",
        borderWidth: 1,
        borderColor: "white",
      },
      {
        label: "Early",
        data: earlyTaskHoursByMemberData,
        backgroundColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        borderColor: "white",
      },
      {
        label: "On Time",
        data: ontimeTaskHoursByMemberData,
        backgroundColor: "rgb(53, 162, 235)",
        borderWidth: 1,
        borderColor: "white",
      },
      {
        label: "Delayed",
        data: delayedTaskHoursByMemberData,
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

export default TaskCompletionTrackingChart;
