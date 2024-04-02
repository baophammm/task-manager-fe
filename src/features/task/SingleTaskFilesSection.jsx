import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  Menu,
  SvgIcon,
  Typography,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useContext, useState } from "react";
import { TaskDetailModalContext } from "./TaskDetailModal";
import { useDispatch } from "react-redux";
import { deleteFileOfTask, getSingleTask } from "../task/taskSlice";
import FileForm from "./FileForm";

function SingleTaskFilesSection() {
  const {
    selectedTask,
    disableUpdateTask,
    isAddingFile,
    setIsAddingFile,
    anchorElAddFileFormMenu,
    setAnchorElAddFileFormMenu,
    handleOpenAddFileFormMenu,
    handleCloseAddFileFormMenu,
    AddFileFormMenu,
  } = useContext(TaskDetailModalContext);

  const taskId = selectedTask._id;

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
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SvgIcon fontSize="medium">
            <AttachFileIcon />
          </SvgIcon>
          <Typography variant="h5">Files</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            disabled={disableUpdateTask}
            // onClick={() => setIsAddingFile(true)}
            onClick={handleOpenAddFileFormMenu}
          >
            Add
          </Button>
          {AddFileFormMenu}
        </Box>
      </Box>
      {selectedTask?.files.length ? (
        <ImageList
          cols={1}
          sx={{
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
              width: 1,
            }}
          >
            {selectedTask?.files.slice(0, 3).map((file, index) => (
              <Grid key={index} item xs={12} md={4}>
                <Box
                  sx={{
                    position: "relative",
                    "&:hover": {
                      cursor: "pointer",
                      "&:hover .delete-button": {
                        visibility: "visible",
                      },
                    },
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
                  {!disableUpdateTask && (
                    <IconButton
                      onClick={handleDeleteFile}
                      className="delete-button"
                      sx={{
                        visibility: "hidden",
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
                </Box>
              </Grid>
            ))}
          </Grid>
        </ImageList>
      ) : (
        <Typography>No file found in this Task</Typography>
      )}
    </Box>
  );
}

export default SingleTaskFilesSection;
