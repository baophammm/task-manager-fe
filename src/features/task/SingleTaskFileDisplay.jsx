import {
  Box,
  Button,
  ListItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import React, { useState } from "react";
import FileForm from "./FileForm";
import { useDispatch } from "react-redux";
import { deleteFileOfTask, getSingleTask } from "./taskSlice";

function SingleTaskFileDisplay({ selectedTask, disableUpdateTask }) {
  const taskId = selectedTask._id;

  const [addingFile, setAddingFile] = useState(false);

  const dispatch = useDispatch();

  const handleDeleteFile = (fileIndex) => {
    const result = window.confirm("Are you sure you want to remove this File?");

    if (result) {
      dispatch(deleteFileOfTask({ taskId, fileIndex })).then(() =>
        dispatch(getSingleTask(taskId))
      );
    }
  };

  return (
    <>
      <Stack
        spacing={1}
        sx={
          {
            // border: "1px solid red"
          }
        }
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">Files</Typography>
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
            disabled={disableUpdateTask}
            onClick={() => setAddingFile(true)}
          >
            Add File
          </Button>
        </Stack>
        {selectedTask?.files.length ? (
          <Stack flexDirection="row" alignItems="baseline" flexWrap="wrap">
            {selectedTask?.files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  // border: "1px solid blue",
                  height: 1,
                  m: 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 100,
                    width: 200,
                    marginRight: "5px",
                    "& img": {
                      objectFit: "cover",
                      width: 1,
                      height: 1,
                    },
                  }}
                >
                  <img src={file} alt="file" />
                </Box>
                <Stack spacing={2} direction="row" sx={{ height: 30 }}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteFile(index)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : (
          <Typography>No file found in this Task</Typography>
        )}
      </Stack>
      {addingFile && (
        <>
          <div
            onClick={() => setAddingFile(false)}
            style={{
              // border: "1px solid red",
              position: "absolute",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
            }}
          />
          <FileForm
            taskId={taskId}
            setAddingFile={setAddingFile}
            sx={{ zIndex: 1 }}
          />
        </>
      )}
    </>
  );
}

export default SingleTaskFileDisplay;
