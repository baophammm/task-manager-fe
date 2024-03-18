import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TaskColumn from "./TaskColumn";
import { ImageList } from "@mui/material";
import { useDispatch } from "react-redux";
import { getTasks, updateSingleTask } from "./taskSlice";
import { useParams } from "react-router-dom";

const TASKS_BY_STATUSES = [
  {
    name: "Backlog",
    label: "Backlog",
    backgroundColor: "info.main",
    color: "info.contrastText",
  },
  {
    name: "InProgress",
    label: "In Progress",
    backgroundColor: "primary.main",
    color: "primary.contrastText",
  },
  {
    name: "Completed",
    label: "Completed",
    backgroundColor: "success.main",
    color: "success.contrastText",
  },
  {
    name: "Archived",
    label: "Archived",
    backgroundColor: "error.dark",
    color: "error.contrastText",
  },
];

function TaskByStatusDraggable({ tasks, filters }) {
  const params = useParams();
  const projectId = params.projectId;
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    //TODO reorder our column
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      updateSingleTask({
        taskId: draggableId,
        taskStatus: destination.droppableId,
      })
    ).then(() => {
      dispatch(getTasks({ projectId, limit: 1000, ...filters }));
    });

    //TODO update position of tasks in columns
  };
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      // style={{ maxHeight: "100%" }}
    >
      <ImageList
        sx={{
          // border: "1px solid red",
          p: 1,
          height: {
            xs: "calc(100vh - 170px)",
            md: "calc(100vh - 170px)",
          },
          // height: 1,
          maxHeight: 1,
          width: 1,
          m: 0,
          gridAutoFlow: "column",
          gridTemplateColumns: `repeat(auto-fill,minmax(320px,1fr)) !important`,
          gridAutoColumns: `minmax(320px, 1fr)`,

          borderRadius: "8px",

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
        {TASKS_BY_STATUSES.map((taskStatusColumn) => {
          const selectedStatusTasks = tasks.filter(
            (task) => task.taskStatus === taskStatusColumn.name
          );

          const column = {
            id: taskStatusColumn.name,
            title: taskStatusColumn.label,
            taskIds: selectedStatusTasks.map((task) => task._id),
          };

          // if (selectedStatusTasks.length) {
          return (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={selectedStatusTasks}
              backgroundColor={taskStatusColumn.backgroundColor}
            />
          );
          // } else {
          //   return null;
          // }
        })}
      </ImageList>
    </DragDropContext>
  );
}

export default TaskByStatusDraggable;
