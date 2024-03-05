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
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import QueueIcon from "@mui/icons-material/Queue";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ClearIcon from "@mui/icons-material/Clear";
import PreviewIcon from "@mui/icons-material/Preview";
import GradingIcon from "@mui/icons-material/Grading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

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

  const handleDeleteTask = () => {
    const result = window.confirm(
      "Are you sure that you want to delete this task?"
    );
    if (result) {
      dispatch(deleteSingleTask(taskId)).then(() => navigate("/tasks"));
    }
  };

  let disableUpdateTask = false;

  if (selectedTask?.project) {
    disableUpdateTask =
      selectedTask.project.projectManagers.includes(currentUserId) ||
      selectedTask.project.projectOwner === currentUserId
        ? false
        : true;
  }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Card>
          <CardContent>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              selectedTask && (
                <>
                  <Stack spacing={3}>
                    <Stack spacing={4}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={1}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Box>
                            <Typography variant="h4">
                              {selectedTask?.title}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <Button
                            variant="contained"
                            // sx={{ border: "1px solid red", zIndex: 10 }}
                            onClick={() => setIsUpdatingTask(true)}
                            disabled={disableUpdateTask}
                          >
                            Update Task
                          </Button>
                        </Box>
                        <Box>
                          <Button
                            startIcon={
                              <SvgIcon fontSize="small">
                                <ClearIcon />
                              </SvgIcon>
                            }
                            type="submit"
                            variant="contained"
                            sx={{
                              backgroundColor: "error.main",
                              "&:hover": { backgroundColor: "error.dark" },
                            }}
                            onClick={handleDeleteTask}
                            disabled={disableUpdateTask}
                          >
                            Delete Task
                          </Button>
                        </Box>
                      </Stack>
                      <SingleTaskGeneralInfo selectedTask={selectedTask} />

                      <SingleTaskFileDisplay
                        selectedTask={selectedTask}
                        disableUpdateTask={disableUpdateTask}
                      />
                    </Stack>
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
