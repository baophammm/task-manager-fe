import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { TASK_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { useSelector } from "react-redux";
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
      state.selectedTask = newTask;
    },
    deleteSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const taskId = action.payload;
      const index = state.currentPageTasks.indexOf(taskId);
      if (index > -1) {
        state.currentPageTasks.splice(index, 1);
      }
      state.selectedTask = null;
    },
    uploadFileToTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
      state.selectedTask = newTask;
    },
    deleteFileOfTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
      state.selectedTask = newTask;
    },
    addTagToTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
      state.selectedTask = newTask;
    },
    removeTagFromTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, newTask } = action.payload;
      state.tasksById[taskId] = newTask;
      state.selectedTask = newTask;
    },
  },
});

export default slice.reducer;

export const createTask =
  ({
    title,
    description,
    effort,
    taskStatus,
    assigneeId,
    projectId,
    startAt,
    dueAt,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/tasks", {
        title,
        description,
        effort,
        taskStatus,
        assigneeId,
        projectId,
        startAt,
        dueAt,
      });

      dispatch(slice.actions.createTaskSuccess(response.data));
      toast.success(`Create Task ${title} successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getTasks =
  ({
    search,
    taskStatus,
    assigneeId,
    projectId,
    tag,
    effortGreaterThan,
    effortLowerThan,
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
      if (assigneeId) params.assigneeId = assigneeId;
      if (projectId) params.projectId = projectId;
      if (tag) params.tag = tag;
      if (effortGreaterThan) params.effortGreaterThan = effortGreaterThan;
      if (effortLowerThan) params.effortLowerThan = effortLowerThan;
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
    effort,
    taskStatus,
    assigneeId,
    projectId,
    startAt,
    dueAt,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        title,
        description,
        effort,
        taskStatus,
        assigneeId,
        projectId,
        startAt,
        dueAt,
      };

      const response = await apiService.put(`/tasks/${taskId}`, data);
      dispatch(
        slice.actions.updateSingleTaskSuccess({
          taskId,
          newTask: response.data,
        })
      );
      toast.success(`Update task ${response.data.title} successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/tasks/${taskId}`);
    dispatch(slice.actions.deleteSingleTaskSuccess(taskId));
    toast.success("Delete task successfully");
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
      if (file) {
        // upload file to cloudinary (or other middleware that handles files)
        const fileUrl = await cloudinaryUpload(file);

        //Get file list - api way
        const responseGetTask = await apiService.get(`/tasks/${taskId}`);
        const taskFileList = responseGetTask.data.files;

        // useSelector way
        // const { selectedTask } = useSelector((state) => state.task);
        // let taskFileList = selectedTask.files;

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
        toast.success("File uploaded to task successfully");
      } else {
        return;
      }
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

      toast.success("Delete File successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const addTagToTask =
  ({ taskId, tagId }) =>
  async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try {
      // Get tag list of task
      const responseGetTask = await apiService.get(`/tasks/${taskId}`);
      let taskTagList = responseGetTask.data.tags.map((tag) => tag._id);

      // const taskState = getState().task;
      // const selectedTask = taskState.selectedTask;
      // let taskTagList = selectedTask.tags.map((tag) => tag._id);

      // Add tag to tag list
      taskTagList.push(tagId);

      // Replace tag list
      const response = await apiService.put(`/tasks/${taskId}`, {
        tags: taskTagList,
      });

      dispatch(
        slice.actions.addTagToTaskSuccess({
          taskId,
          newTask: response.data,
        })
      );
      toast.success("Tag added to task successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const removeTagFromTask =
  ({ taskId, tagId }) =>
  async (dispatch, getState) => {
    dispatch(slice.actions.startLoading());
    try {
      // Get tag list of task
      // const responseGetTask = await apiService.get(`/tasks/${taskId}`);
      // let taskTagList = responseGetTask.data.tags.map((tag) => tag._id);

      const taskState = getState().task;
      const selectedTask = taskState.selectedTask;
      let taskTagList = selectedTask.tags.map((tag) => tag._id);
      // Remove tag from tag list
      const index = taskTagList.indexOf(tagId);
      if (index > -1) {
        taskTagList.splice(index, 1);
      }

      // Replace tag list
      const response = await apiService.put(`/tasks/${taskId}`, {
        tags: taskTagList,
      });

      dispatch(
        slice.actions.removeTagFromTaskSuccess({
          taskId,
          newTask: response.data,
        })
      );
      toast.success("Tag removed from task successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
