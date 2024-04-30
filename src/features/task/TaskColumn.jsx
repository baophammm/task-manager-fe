import React from "react";
import { Box, Container, ImageList, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

const StyledTaskList = styled(Box)(({ theme }) => ({
  padding: "6px",
}));
function TaskColumn(props) {
  return (
    <Box
      sx={{
        color: props.column.backgroundColor,
        height: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          height: "30px",
          textAlign: "center",
        }}
      >
        {props.column.title} ({props.column.taskIds.length})
      </Typography>

      <Droppable droppableId={props.column.id}>
        {(provided) => (
          <ImageList
            cols={1}
            sx={{
              width: 1,

              height: {
                xs: "calc(100vh - 206px)",
                md: "calc(100vh - 220px)",
              },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StyledTaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {props.tasks.map((task, index) => (
                <Task key={task._id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </StyledTaskList>
          </ImageList>
        )}
      </Droppable>
    </Box>
  );
}

export default TaskColumn;
