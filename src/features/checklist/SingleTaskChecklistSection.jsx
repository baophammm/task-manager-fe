import React, { useContext, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { getChecklistsOfTask } from "./checklistSlice";
import { useDispatch } from "react-redux";
import { Box, Stack } from "@mui/material";

import Checklist from "./Checklist";
import LoadingScreen from "../../components/LoadingScreen";
import { TaskDetailModalContext } from "../task/TaskDetailModal";

function SingleTaskChecklistSection() {
  const { taskId } = useContext(TaskDetailModalContext);

  const {
    checklistIds,
    checklistsById,
    totalChecklists,
    checklistItemsByChecklist,
    totalChecklistItemsbyChecklist,
    checklistItemsById,
    isLoading,
  } = useSelector(
    (state) => ({
      checklistIds: state.checklist.checklistsByTask[taskId],
      checklistsById: state.checklist.checklistsById,
      totalChecklists: state.checklist.totalChecklistsByTask[taskId],
      checklistItemsByChecklist: state.checklist.checklistItemsByChecklist,
      totalChecklistItemsbyChecklist:
        state.checklist.totalChecklistItemsByChecklist,
      checklistItemsById: state.checklist.checklistItemsById,
      isLoading: state.checklist.isLoading,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getChecklistsOfTask(taskId));
    }
  }, [taskId, dispatch]);

  let renderChecklists;

  if (checklistIds) {
    let checklists = {};
    checklistIds.forEach((checklistId) => {
      checklists[checklistId] = {
        ...checklistsById[checklistId],
        checklistItems: checklistItemsByChecklist[checklistId].map(
          (checklistItemId) => checklistItemsById[checklistItemId]
        ),
        totalChecklistItems: totalChecklistItemsbyChecklist[checklistId],
      };
    });

    renderChecklists = (
      <Stack spacing={1}>
        {Object.keys(checklists).map((checklistId) => (
          <Checklist key={checklistId} checklist={checklists[checklistId]} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderChecklists = <LoadingScreen />;
  }
  return <Box>{totalChecklists > 0 && renderChecklists}</Box>;
}

export default SingleTaskChecklistSection;
