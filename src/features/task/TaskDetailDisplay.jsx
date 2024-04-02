import { Box, ImageList } from "@mui/material";
import React, { useContext } from "react";

import SingleTaskGeneralInfoSection from "./SingleTaskGeneralInfoSection";
import SingleTaskDescriptionSection from "./SingleTaskDescriptionSection";
import SingleTaskFilesSection from "./SingleTaskFilesSection";
import SingleTaskChecklistSection from "../checklist/SingleTaskChecklistSection";
import SingleTaskCommentSection from "../comment/SingleTaskCommentSection";
import { TaskDetailModalContext } from "./TaskDetailModal";

function TaskDetailDisplay({ sx }) {
  const { selectedTask } = useContext(TaskDetailModalContext);

  return (
    <Box sx={{ ...sx }}>
      <ImageList
        cols={1}
        sx={{
          maxHeight: "calc(100vh - 146px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SingleTaskGeneralInfoSection />
        <SingleTaskDescriptionSection />
        {selectedTask?.files.length > 0 && <SingleTaskFilesSection />}
        <SingleTaskChecklistSection />
        <SingleTaskCommentSection />
      </ImageList>
    </Box>
  );
}

export default TaskDetailDisplay;
