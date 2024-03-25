import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  currentPageSubtasks: [],
  subTasksById: {},
  totalSubTasks: 0,
};

const slice = createSlice({
  name: "subTask",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createSubTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const newSubTask = action.payload;
      state.subTasksById[newSubTask._id] = newSubTask;
      state.currentPageSubtasks.unshift(newSubTask._id);
    },
    getSubTasksOfSingleTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { subTasks, count } = action.payload;
      subTasks.forEach(
        (subTask) => (state.subTasksById[subTask._id] = subTask)
      );
      state.currentPageSubtasks = subTasks.map((subTask) => subTask._id);
      state.totalSubTasks = count;
    },
    updateSubTaskIsCheckedSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { newSubTask, subTaskId } = action.payload;
      state.subTasksById[subTaskId] = newSubTask;
    },
    deleteSingleSubTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const subTaskId = action.payload;
      delete state.subTasksById[subTaskId];
      const index = state.currentPageSubtasks.indexOf(subTaskId);
      if (index > -1) {
        state.currentPageSubtasks.splice(index, 1);
      }
    },
  },
});

export default slice.reducer;

export const createNewSubTaskOfSingleTask =
  ({ taskId, subTaskText }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/tasks/${taskId}/subtasks`, {
        subTaskText,
      });

      dispatch(slice.actions.createSubTaskSuccess(response.data));
      toast.success(`Create SubTask ${subTaskText} successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSubTasksOfSingleTask =
  ({ taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/tasks/${taskId}/subtasks`);
      dispatch(slice.actions.getSubTasksOfSingleTaskSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateSubTaskIsChecked =
  ({ subTaskId, isChecked }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/subtasks/${subTaskId}`, {
        isChecked,
      });

      dispatch(
        slice.actions.updateSubTaskIsCheckedSuccess({
          newSubTask: response.data,
          subTaskId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleSubTask = (subTaskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/subtasks/${subTaskId}`);
    dispatch(slice.actions.deleteSingleSubTaskSuccess(subTaskId));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
