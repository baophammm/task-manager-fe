import { Stack, Typography } from "@mui/material";
import React, { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import { getChecklistsOfTask } from "./checklistSlice";
import Checklist from "./Checklist";
import LoadingScreen from "../../components/LoadingScreen";

function ChecklistDisplay({ taskId }) {
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
  return (
    <Stack spacing={1}>
      {!totalChecklists && (
        <Typography variant="subtitle">No checklist</Typography>
      )}
      {renderChecklists}
    </Stack>
    // <div>
    //   <h6>ChecklistDisplay</h6>
    // </div>
  );
}

export default ChecklistDisplay;
