import React, { useCallback, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fDate } from "../utils/formatTime";
import {
  deleteSingleTask,
  getSingleTask,
  updateSingleTask,
} from "../features/task/taskSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  ImageList,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import ClearIcon from "@mui/icons-material/Clear";

import LoadingScreen from "../components/LoadingScreen";
import UserProfilePicture from "../features/user/UserProfilePicture";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FSelect, FTextField, FormProvider } from "../components/form";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import {
  getProjectMembers,
  getProjects,
} from "../features/project/projectSlice";
import UpdateTaskDrawer from "../features/task/UpdateTaskDrawer";
import FileUpload from "../components/FileUpload";
import FileForm from "../features/task/FileForm";
import SingleTaskGeneralInfo from "../features/task/SingleTaskGeneralInfo";
import SingleTaskFileDisplay from "../features/task/SingleTaskFileDisplay";
import TaskDetailPageControl from "../features/task/TaskDetailPageControl";

function TaskDetailPage() {
  const { user } = useAuth();
  const currentUserId = user._id;
  const params = useParams();
  const taskId = params.taskId;
  const navigate = useNavigate();

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
    <Box
      component="main"
      sx={{
        height: { xs: "calc(100vh - 120px)", md: "calc(100vh - 110px)" },
        flexGrow: 1,
      }}
    >
      <Container
        maxWidth={1}
        sx={{
          height: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card>
          <CardContent sx={{ p: 3, height: 1 }}>
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
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default TaskDetailPage;
