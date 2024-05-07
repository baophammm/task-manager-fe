import React, { use, useState } from "react";
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
    backgroundColor: "warning.main",
    color: "warning.contrastText",
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

  const initialData = {
    tasks,
    columns: {
      Backlog: {
        id: "Backlog",
        title: "Backlog",
        taskIds: tasks
          .filter((task) => task.taskStatus === "Backlog")
          .map((task) => task._id),
        backgroundColor: "info.main",
      },
      InProgress: {
        id: "InProgress",
        title: "In Progress",
        taskIds: tasks
          .filter((task) => task.taskStatus === "InProgress")
          .map((task) => task._id),
        backgroundColor: "warning.main",
      },
      Completed: {
        id: "Completed",
        title: "Completed",
        taskIds: tasks
          .filter((task) => task.taskStatus === "Completed")
          .map((task) => task._id),
        backgroundColor: "success.main",
      },
      Archived: {
        id: "Archived",
        title: "Archived",
        taskIds: tasks
          .filter((task) => task.taskStatus === "Archived")
          .map((task) => task._id),
        backgroundColor: "error.dark",
      },
    },
    columnOrder: ["Backlog", "InProgress", "Completed", "Archived"],
  };

  const [state, setState] = useState(initialData);
  const onDragEnd = (result) => {
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

    // TODO keep new order position of tasks in columns on dispatch (which means backend order too)
    dispatch(
      updateSingleTask({
        taskId: draggableId,
        taskStatus: destination.droppableId,
      })
    );
    // .then(() => {
    //   dispatch(getTasks({ projectId, limit: 1000, ...filters }));
    // });

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...home,
        taskIds: newTaskIds,
      };

      // console.log("CHECKING", newColumn);
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };

    setState(newState);
  };

  // console.log(state);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ImageList
        sx={{
          // p: 1,
          height: {
            xs: "calc(100vh - 160px)",
            md: "calc(100vh - 170px)",
          },

          maxHeight: 1,
          width: 1,
          m: 0,
          gridAutoFlow: "column",

          gridTemplateColumns: {
            xs: `repeat(auto-fill,minmax(320px,1fr)) !important`,
            xl: `repeat(auto-fill,minmax(25%,1fr)) !important`,
          },
          gridAutoColumns: { xs: `minmax(320px, 1fr)`, xl: `minmax(25%, 1fr)` },

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
        {state.columnOrder.map((columnId, index) => {
          const column = state.columns[columnId];
          const selectedTasks = column.taskIds.map((taskId) =>
            tasks.find((task) => task._id === taskId)
          );

          return (
            <TaskColumn
              key={column.id}
              column={column}
              tasks={selectedTasks}
              index={index}
            />
          );
        })}
      </ImageList>
    </DragDropContext>
  );
}

export default TaskByStatusDraggable;
