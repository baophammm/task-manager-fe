import React, { useContext } from "react";
import { Box, Stack } from "@mui/material";
import ProjectPageControl from "./ProjectPageControl";
import LoadingScreen from "../../components/LoadingScreen";
import TaskByStatusDraggable from "../task/TaskByStatusDraggable";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";
import { FormProvider } from "../../components/form";
import ProjectChartDisplay from "./ProjectChartDisplay";

function ProjectDetailDisplay() {
  const {
    isDisplayingProjectCharts,
    methods,
    selectedProject,
    isLoadingTask,
    tasks,
    filters,
    location,
  } = useContext(ProjectDetailPageContext);

  return (
    <Stack spacing={1} alignItems="center" sx={{ width: 1, height: 1 }}>
      <Box sx={{ width: 1, p: 1 }}>
        <FormProvider methods={methods}>
          <ProjectPageControl
            selectedProject={selectedProject}
            location={location}
          />
        </FormProvider>
      </Box>

      {isLoadingTask ? (
        <LoadingScreen />
      ) : isDisplayingProjectCharts ? (
        <ProjectChartDisplay />
      ) : (
        <TaskByStatusDraggable tasks={tasks} filters={filters} />
      )}
    </Stack>
  );
}

export default ProjectDetailDisplay;
