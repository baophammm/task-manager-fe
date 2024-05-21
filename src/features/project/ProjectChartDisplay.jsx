import React, { useContext } from "react";
import { Box, ImageList } from "@mui/material";

import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";
import BurndownChart from "../../components/chartJs/BurndownChart";
import TaskByStatusDoughnutChart from "../../components/chartJs/TaskByStatusDoughnutChart";
import TaskCompletionTrackingChart from "../../components/chartJs/TaskCompletionTrackingChart";

function ProjectChartDisplay() {
  const { selectedProject, tasks } = useContext(ProjectDetailPageContext);

  return (
    <>
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
        <Box
          sx={{
            height: "500px",
          }}
        >
          <BurndownChart project={selectedProject} tasks={tasks} />
        </Box>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box
            sx={{
              flexGrow: { md: 0, xl: 1 },
              width: { xs: 1, lg: "400px" },
            }}
          >
            <TaskByStatusDoughnutChart tasks={tasks} />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              width: { xs: 1, lg: "400px" },
            }}
          >
            <TaskCompletionTrackingChart
              project={selectedProject}
              tasks={tasks}
            />
          </Box>
        </Box>
      </ImageList>
    </>
  );
}

export default ProjectChartDisplay;
