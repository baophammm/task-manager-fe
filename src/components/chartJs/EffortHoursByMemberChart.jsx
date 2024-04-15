import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  Interaction,
  layouts,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Bar, Chart, Line } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  zoomPlugin
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      align: "center",
      display: false,
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

function EffortHoursByMemberChart({ project, tasks }) {
  let projectMembers;
  if (project) {
    ({ projectMembers } = project);
  }

  const labels = [];
  const effortHoursByMemberData = [];
  const backgroundColor = [];
  const borderColor = [];

  if (projectMembers) {
    projectMembers.forEach((member) => {
      // lables
      labels.push(`${member.firstName} ${member.lastName}`);

      // data
      const memberTasks = tasks.filter(
        (task) => task.assignee._id === member._id
      );
      const memberEffortHours = memberTasks.reduce((acc, task) => {
        return acc + task.effort;
      }, 0);

      effortHoursByMemberData.push(memberEffortHours);

      // background color
      // generate random dark colors for back ground color, not repetitive
      const randomColor = `rgba(${Math.floor(Math.random() * 100)},${Math.floor(
        Math.random() * 100
      )},${Math.floor(Math.random() * 100)}`;
      backgroundColor.push(randomColor + ",0.2)");

      // border color
      borderColor.push(randomColor + ")");
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Effort Hours",
        data: effortHoursByMemberData,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box
      sx={{
        border: "2px solid black",
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        height: "500px",
        pb: 10,
      }}
    >
      <Typography variant="h5">Effort Hours by Member</Typography>
      <Bar data={data} options={options} />
    </Box>
  );
}

export default EffortHoursByMemberChart;
