import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createNewSubTaskOfSingleTask,
  getSubTasksOfSingleTask,
} from "./subTaskSlice";

function AddSubTask({ taskId }) {
  const [isAddingSubTask, setIsAddingSubTask] = useState(false);
  const [subTaskText, setSubTaskText] = useState("");

  const dispatch = useDispatch();

  const handleAddSubTask = (e) => {
    e.preventDefault();
    if (subTaskText) {
      dispatch(createNewSubTaskOfSingleTask({ taskId, subTaskText })).then(
        () => {
          setSubTaskText("");
          dispatch(getSubTasksOfSingleTask({ taskId }));
        }
      );
      setIsAddingSubTask(true);
    } else {
      setIsAddingSubTask(true);
    }
  };

  return (
    <div>
      {isAddingSubTask ? (
        <>
          <div
            onClick={() => setIsAddingSubTask(false)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100dvw",
              height: "100dvh",
              zIndex: 0,
            }}
          />
          <form onSubmit={handleAddSubTask}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 2,
              }}
            >
              <input
                type="text"
                placeholder="Add Sub Task"
                value={subTaskText}
                onChange={(e) => setSubTaskText(e.target.value)}
                style={{
                  lineHeight: "2",
                  fontSize: "14px",
                  padding: "2px 12px",
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ borderRadius: "4px" }}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  size="small"
                  onClick={() => setIsAddingSubTask(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setIsAddingSubTask(true)}
            sx={{ borderRadius: "4px" }}
          >
            Add Sub Task
          </Button>
        </Box>
      )}
    </div>
  );
}

export default AddSubTask;
