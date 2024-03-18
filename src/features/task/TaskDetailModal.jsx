import React, { useContext, useEffect, useRef, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Card,
  ImageList,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { getSingleTask } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import TaskDetailPageControl from "./TaskDetailPageControl";
import SingleTaskGeneralInfo from "./SingleTaskGeneralInfo";
import SingleTaskFileDisplay from "./SingleTaskFileDisplay";
import UpdateTaskDrawer from "./UpdateTaskDrawer";
import SingleTaskCommentSection from "../comment/SingleTaskCommentSection";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  // background: alpha(theme.palette.background.paper, 0.9),
  background: theme.palette.action.disabled,

  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",

  WebkitOverflowScrolling: "touch",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows,
  borderRadius: theme.shape.borderRadius,

  minHeight: "80vh",
  width: "80%",
  maxWidth: "800px",
  padding: 12,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

function TaskDetailModal() {
  const taskDetailLocation = useLocation();
  const from =
    taskDetailLocation.state?.backgroundLocation?.pathname || "/tasks";

  const modalRef = useRef();
  const navigate = useNavigate();

  const params = useParams();
  const taskId = params.taskId;

  const { user } = useAuth();
  const currentUserId = user._id;

  const { selectedTask, isLoading } = useSelector((state) => state.task);

  //states
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleTask(taskId));
  }, [dispatch, taskId]);

  let disableUpdateTask = false;

  if (selectedTask?.project) {
    disableUpdateTask =
      selectedTask.project?.projectManagers?.includes(currentUserId) ||
      selectedTask.project.projectOwner === currentUserId
        ? false
        : true;
  }

  return (
    <ModalWrapperBox
      ref={modalRef}
      onClick={() => navigate(from)} // return to previous location
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Container
          component="main"
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <CssBaseline />
          {isLoading ? (
            <LoadingScreen />
          ) : (
            selectedTask && (
              <>
                <Stack
                  spacing={2}
                  sx={
                    {
                      // border: "1px solid red",
                    }
                  }
                >
                  <TaskDetailPageControl
                    from={from}
                    selectedTask={selectedTask}
                    disableUpdateTask={disableUpdateTask}
                    setIsUpdatingTask={setIsUpdatingTask}
                  />
                  <ImageList
                    cols={1}
                    sx={{
                      // border: "1px solid green",
                      maxHeight: "calc(100vh - 140px)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <Typography variant="h4">
                        {selectedTask?.title}
                      </Typography>
                    </Box>

                    <SingleTaskGeneralInfo selectedTask={selectedTask} />

                    <SingleTaskFileDisplay
                      selectedTask={selectedTask}
                      disableUpdateTask={disableUpdateTask}
                    />
                    <SingleTaskCommentSection taskId={taskId} />
                  </ImageList>
                </Stack>

                <UpdateTaskDrawer
                  task={selectedTask}
                  isLoading={isLoading}
                  isUpdatingTask={isUpdatingTask}
                  setIsUpdatingTask={setIsUpdatingTask}
                />
              </>
            )
          )}
        </Container>
      </ModalBox>
    </ModalWrapperBox>
  );
}

export default TaskDetailModal;
