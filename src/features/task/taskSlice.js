import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { TASK_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
const initialState = {
  isLoading: false,
  error: null,
  currentPageTasks: [],
  tasksById: {},
  totalPages: 1,
  selectedTask: null,
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newTask = action.payload;
      state.tasksById[newTask._id] = newTask;
      state.currentPageTasks.unshift(newTask._id);
    },
    getTasksSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { tasks, count, totalPages } = action.payload;
      tasks.forEach((task) => (state.tasksById[task._id] = task));
      state.currentPageTasks = tasks.map((task) => task._id);
      state.totalTasks = count;
      state.totalPages = totalPages;
    },
    getSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedTask = action.payload;
    },
    updateSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
    },
    deleteSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const taskId = action.payload;
      const index = state.currentPageTasks.indexOf(taskId);
      if (index > -1) {
        state.currentPageTasks.splice(index, 1);
      }
    },
    uploadFileToTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
    },
    deleteFileOfTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
    },
  },
});

export default slice.reducer;

export const createTask =
  ({
    title,
    description,
    taskStatus,
    taskPriority,
    assigneeId,
    projectId,
    startAt,
    dueAt,
    files,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/tasks", {
        title,
        description,
        taskStatus,
        taskPriority,
        assigneeId,
        projectId,
        startAt,
        dueAt,
      });

      dispatch(slice.actions.createTaskSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getTasks =
  ({
    search,
    taskStatus,
    priority,
    assigneeId,
    projectId,
    startBefore,
    startAfter,
    dueBefore,
    dueAfter,
    page,
    limit = TASK_PER_PAGE,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (taskStatus) params.taskStatus = taskStatus;
      if (priority) params.priority = priority;
      if (assigneeId) params.assigneeId = assigneeId;
      if (projectId) params.projectId = projectId;
      if (startAfter) params.startAfter = startAfter;
      if (startBefore) params.startBefore = startBefore;
      if (dueAfter) params.dueAfter = dueAfter;
      if (dueBefore) params.dueBefore = dueBefore;

      const response = await apiService.get("/tasks", { params });

      dispatch(slice.actions.getTasksSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/tasks/${taskId}`);
    dispatch(slice.actions.getSingleTaskSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSingleTask =
  ({
    taskId,
    title,
    description,
    taskStatus,
    priority,
    assigneeId,
    projectId,
    startAt,
    dueAt,
    // files,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        title,
        description,
        taskStatus,
        priority,
        assigneeId,
        projectId,
        startAt,
        dueAt,
      };
      console.log("DATA IN TASK SLICE", data);
      const response = await apiService.put(`/tasks/${taskId}`, data);
      console.log("UPDATE TASK RESPONSE", response);
      dispatch(
        slice.actions.updateSingleTaskSuccess({
          taskId,
          newTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`tasks/${taskId}`);
    dispatch(slice.actions.deleteSingleTaskSuccess(taskId));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const uploadFileToTask =
  ({ taskId, file }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // upload file to cloudinary (or other middleware that handles files)
      const fileUrl = await cloudinaryUpload(file);

      //Get file list
      const responseGetTask = await apiService.get(`/tasks/${taskId}`);
      const taskFileList = responseGetTask.data.files;

      //add to file list
      taskFileList.unshift(fileUrl);

      //replace file list
      const response = await apiService.put(`/tasks/${taskId}`, {
        files: taskFileList,
      });
      dispatch(
        slice.actions.uploadFileToTaskSuccess({
          taskId,
          newTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteFileOfTask =
  ({ taskId, fileIndex }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      //Get file list
      const responseGetTask = await apiService.get(`/tasks/${taskId}`);
      let taskFileList = responseGetTask.data.files;
      //Remove task by task index
      taskFileList.splice(fileIndex, 1);

      const response = await apiService.put(`/tasks/${taskId}`, {
        files: taskFileList,
      });

      dispatch(
        slice.actions.deleteFileOfTaskSuccess({
          taskId,
          newTask: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
