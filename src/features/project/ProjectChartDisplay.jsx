import React, { useContext } from "react";
import { Box, Typography, Card, ImageList } from "@mui/material";

import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";
import BurndownChart from "../../components/chartJs/BurndownChart";
import TaskByStatusDoughnutChart from "../../components/chartJs/TaskByStatusDoughnutChart";
import TaskByMemberBarChart from "../../components/chartJs/TaskByMemberBarChart";
import EffortHoursByMemberChart from "../../components/chartJs/EffortHoursByMemberChart";
import TaskComplettionTrackingChart from "../../components/chartJs/TaskComplettionTrackingChart";

function ProjectChartDisplay() {
  const { selectedProject, tasks } = useContext(ProjectDetailPageContext);

  return (
    <ImageList
      className="full-width-children"
      sx={{
        width: 1,
        height: {
          xs: "calc(100vh - 160px)",
          md: "calc(100vh - 170px)",
        },
        p: { xs: 1, md: 3 },
        px: { xs: 1, md: 5 },
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: 3,

        "&::-webkit-scrollbar": {
          WebkitAppearance: "none",
        },

        "&::-webkit-scrollbar:vertical": {
          width: "11px",
        },
        "&::-webkit-scrollbar:horizontal": {
          height: "11px",
        },
        "&::-webkit-scrollbar-thumb": {
          borderRadius: "8px",
          border: "2px solid",
          borderColor: "background.default",
          backgroundColor: "text.disabled",
        },
      }}
    >
      <BurndownChart project={selectedProject} tasks={tasks} />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: 1, lg: "400px" },
          }}
        >
          <TaskByStatusDoughnutChart tasks={tasks} />
        </Box>
        <Box
          sx={{
            width: { xs: 1, lg: "400px" },
          }}
        >
          <TaskComplettionTrackingChart tasks={tasks} />
        </Box>
        <Box
          sx={{
            width: { xs: 1, lg: "400px" },
          }}
        >
          <EffortHoursByMemberChart project={selectedProject} tasks={tasks} />
        </Box>
      </Box>
    </ImageList>
  );
}

export default ProjectChartDisplay;
