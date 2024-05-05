import React, { createContext, useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Button,
  Menu,
  IconButton,
  SvgIcon,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { getSingleTask } from "./taskSlice";
import LoadingScreen from "../../components/LoadingScreen";
import TaskDetailPageControl from "./TaskDetailPageControl";
import TaskDetailDisplay from "./TaskDetailDisplay";
import UpdateTaskDrawer from "./UpdateTaskDrawer";
import FileForm from "./FileForm";
import TagForm from "../tag/TagForm";

export const TaskDetailModalContext = createContext();

const ModalWrapperBox = styled(Box)(({ theme }) => ({
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
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows,
  borderRadius: theme.shape.borderRadius,

  height: "95dvh",
  width: "95%",
  maxWidth: "800px",

  padding: "4px 2px",

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

  const { selectedTask, isLoading, error } = useSelector((state) => state.task);

  // states
  const [isUpdatingTask, setIsUpdatingTask] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);

  // anchorEl states
  const [anchorElAddFileFormMenu, setAnchorElAddFileFormMenu] = useState(null);
  const [anchorElAddTagFormMenu, setAnchorElAddTagFormMenu] = useState(null);

  // dispatches
  const dispatch = useDispatch();

  useEffect(() => {
    if (taskId) {
      dispatch(getSingleTask(taskId));
    }
  }, [dispatch, taskId]);

  let disableUpdateTask = false;

  if (selectedTask?.project) {
    disableUpdateTask =
      selectedTask.project?.projectLeads?.includes(currentUserId) ||
      selectedTask.project.projectOwner === currentUserId
        ? false
        : true;
  }

  // Menus
  // Add File Form Menu
  const handleOpenAddFileFormMenu = (event) => {
    if (event) {
      setAnchorElAddFileFormMenu(event.currentTarget);
    }
  };

  const handleCloseAddFileFormMenu = () => {
    setAnchorElAddFileFormMenu(null);
  };

  const AddFileFormMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-addfileform"
      anchorEl={anchorElAddFileFormMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElAddFileFormMenu)}
      onClose={handleCloseAddFileFormMenu}
    >
      <Box>
        <FileForm
          taskId={taskId}
          handleCloseAddFileFormMenu={handleCloseAddFileFormMenu}
          sx={{ width: 400 }}
        />
      </Box>
    </Menu>
  );

  // Add Tag Form Menu
  const [menuPosition, setMenuPosition] = useState(null);
  const [isCreatingNewTag, setIsCreatingNewTag] = useState(false);
  const [tagSearchText, setTagSearchText] = useState("");
  const [newTagError, setNewTagError] = useState("");

  const handleOpenAddTagFormMenu = (event) => {
    if (event) {
      // setAnchorElAddTagFormMenu(event.currentTarget);
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({ top: rect.top, left: rect.right });
    }
  };

  const handleCloseAddTagFormMenu = () => {
    // setAnchorElAddTagFormMenu(null);
    setMenuPosition(null);
    setIsCreatingNewTag(false);
    setTagSearchText("");
    setNewTagError("");
  };

  const AddTagFormMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-addtagform"
      // anchorEl={anchorElAddTagFormMenu}
      anchorReference="anchorPosition"
      anchorPosition={menuPosition}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menuPosition)}
      onClose={handleCloseAddTagFormMenu}
    >
      <Box>
        <TagForm
          task={selectedTask}
          isCreatingNewTag={isCreatingNewTag}
          setIsCreatingNewTag={setIsCreatingNewTag}
          tagSearchText={tagSearchText}
          setTagSearchText={setTagSearchText}
          newTagError={newTagError}
          setNewTagError={setNewTagError}
          sx={{ width: "300px" }}
        />
      </Box>
    </Menu>
  );
  return (
    <TaskDetailModalContext.Provider
      value={{
        from,
        taskId,
        selectedTask,
        isLoading,
        error,
        isUpdatingTask,
        setIsUpdatingTask,
        disableUpdateTask,
        isAddingFile,
        setIsAddingFile,

        anchorElAddFileFormMenu,
        setAnchorElAddFileFormMenu,
        handleOpenAddFileFormMenu,
        handleCloseAddFileFormMenu,
        AddFileFormMenu,

        anchorElAddTagFormMenu,
        setAnchorElAddTagFormMenu,
        menuPosition,
        setMenuPosition,
        handleOpenAddTagFormMenu,
        handleCloseAddTagFormMenu,
        AddTagFormMenu,
      }}
    >
      <ModalWrapperBox
        ref={modalRef}
        onClick={() => navigate(from)} // return to previous location
      >
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <Container
            component="main"
            sx={{
              height: 1,
              width: 1,
              p: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <CssBaseline />
            {error === "Task not found or unauthorized to view task" ? (
              <Box
                sx={{
                  height: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h3">404 Page not found!</Typography>
                <Typography variant="body1" color="error">
                  {error}
                </Typography>

                <Button variant="contained" onClick={() => navigate(from)}>
                  GO BACK
                </Button>
              </Box>
            ) : isLoading ? (
              <Box
                sx={{
                  width: 1,
                  height: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingScreen />
              </Box>
            ) : (
              selectedTask && (
                <Box sx={{ width: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography variant="h4">
                          {selectedTask?.title}
                        </Typography>
                        <IconButton onClick={() => navigate(from)}>
                          <SvgIcon fontSize="large">
                            <ClearIcon />
                          </SvgIcon>
                        </IconButton>
                      </Box>
                      {selectedTask?.project && (
                        <Typography>
                          In project:{" "}
                          <Typography
                            variant="span"
                            fontWeight="bold"
                            onClick={() =>
                              navigate(`/projects/${selectedTask?.project._id}`)
                            }
                            sx={{
                              "&:hover": {
                                cursor: "pointer",
                                textDecoration: "underline",
                              },
                            }}
                          >
                            {selectedTask?.project.title}
                          </Typography>
                        </Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        width: 1,
                        display: "flex",
                        flexDirection: "row",
                        gap: 1,
                      }}
                    >
                      <TaskDetailDisplay sx={{ flexGrow: 1 }} />
                      <TaskDetailPageControl />
                    </Box>
                  </Box>

                  <UpdateTaskDrawer
                    task={selectedTask}
                    isLoading={isLoading}
                    isUpdatingTask={isUpdatingTask}
                    setIsUpdatingTask={setIsUpdatingTask}
                  />
                </Box>
              )
            )}
          </Container>
        </ModalBox>
      </ModalWrapperBox>
    </TaskDetailModalContext.Provider>
  );
}

export default TaskDetailModal;
