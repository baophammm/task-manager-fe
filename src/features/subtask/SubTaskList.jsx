import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getSubTasksOfSingleTask } from "./subTaskSlice";
import { Box, Button, Stack, Typography } from "@mui/material";
import LoadingScreen from "../../components/LoadingScreen";
import SubTaskCard from "./SubTaskCard";

function SubTaskList({ taskId }) {
  const { currentPageSubtasks, subTasksById, totalSubTasks, isLoading } =
    useSelector((state) => state.subTask);

  const subTasks = currentPageSubtasks.map(
    (subTaskId) => subTasksById[subTaskId]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getSubTasksOfSingleTask({ taskId }));
    }
  }, [taskId, dispatch]);

  let renderSubTasks;

  if (subTasks) {
    renderSubTasks = (
      <Stack spacing={1}>
        {subTasks.map((subTask) => (
          <SubTaskCard key={subTask._id} subTask={subTask} />
        ))}
      </Stack>
    );
  } else if (isLoading) {
    renderSubTasks = <LoadingScreen />;
  }

  return (
    <Stack spacing={1.5} sx={{ px: 2 }}>
      {!totalSubTasks && (
        <Typography variant="subtitle">No sub-task</Typography>
      )}
      {renderSubTasks}
    </Stack>
  );
}

export default SubTaskList;
