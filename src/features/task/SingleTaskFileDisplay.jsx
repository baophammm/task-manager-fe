import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ListItem,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

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
      <Stack spacing={1} sx={{ width: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Files</Typography>
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
          <ImageList
            cols={1}
            sx={{
              // border: "1px solid blue",
              width: 1,
              m: 0,
              pt: 3,
              height: 180,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={1}
              sx={{
                //  border: "1px solid red",
                width: 1,
              }}
            >
              {selectedTask?.files.slice(0, 3).map((file, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  md={4}
                  sx={{
                    //  border: "1px solid blue",

                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",

                      height: 160,
                      "& img": { objectFit: "cover", width: 1, height: 1 },
                    }}
                  >
                    <img src={file} alt="file" />
                  </Box>
                  {disableUpdateTask ? (
                    <></>
                  ) : (
                    <IconButton
                      onClick={handleDeleteFile}
                      sx={{
                        zIndex: 9,
                        m: 0,
                        p: 0,
                        position: "absolute",
                        top: -10,
                        right: -10,

                        backgroundColor: "grey.400",
                        color: "#fff",

                        "&:hover": {
                          color: "grey.500",
                        },
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </Grid>
              ))}
            </Grid>
          </ImageList>
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