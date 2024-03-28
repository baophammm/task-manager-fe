import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,

  checklistsById: {},
  checklistsByTask: {},
  totalChecklistsByTask: {},

  checklistItemsById: {},
  checklistItemsByChecklist: {},
  totalChecklistItemsByChecklist: {},
};

const slice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createChecklistOnTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { taskId, newChecklist } = action.payload;
      state.checklistsById[newChecklist._id] = newChecklist;
      state.checklistsByTask[taskId].push(newChecklist._id);
      state.totalChecklistsByTask[taskId] += 1;

      state.checklistItemsByChecklist[newChecklist._id] = [];
      state.totalChecklistItemsByChecklist[newChecklist._id] = 0;
    },
    createChecklistItemOnChecklistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { checklistId, newChecklistItem } = action.payload;

      state.checklistItemsById[newChecklistItem._id] = newChecklistItem;
      state.checklistItemsByChecklist[checklistId].push(newChecklistItem._id);
      state.totalChecklistItemsByChecklist[checklistId] += 1;
    },
    getChecklistsOfTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { taskId, checklists, count } = action.payload;

      state.checklistsByTask[taskId] = checklists.map(
        (checklist) => checklist._id
      );
      state.totalChecklistsByTask[taskId] = count;

      checklists.forEach(({ checklistItems, ...checklist }) => {
        state.checklistsById[checklist._id] = checklist;
        const checklistItemsIds = checklistItems.map(
          (checklistItem) => checklistItem._id
        );
        state.checklistItemsByChecklist[checklist._id] = checklistItemsIds;

        state.totalChecklistItemsByChecklist[checklist._id] =
          checklist.itemCount;

        checklistItems.forEach((checklistItem) => {
          state.checklistItemsById[checklistItem._id] = checklistItem;
        });
      });
    },
    updateSingleChecklistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { checklistId, newChecklist } = action.payload;
      state.checklistsById[checklistId] = newChecklist;
    },
    deleteSingleChecklistSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const checklistId = action.payload;

      delete state.checklistsById[checklistId];

      // find task Id of the checklistId
      const taskId = Object.keys(state.checklistsByTask).find((taskId) =>
        state.checklistsByTask[taskId].includes(checklistId)
      );

      const index = state.checklistsByTask[taskId].indexOf(checklistId);
      if (index > -1) {
        state.checklistsByTask[taskId].splice(index, 1);
      }
    },
    updateSingleChecklistItemIsCheckedSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { checklistItemId, newChecklistItem } = action.payload;
      state.checklistItemsById[checklistItemId] = newChecklistItem;
    },
    updateSingleChecklistItemTitleSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { checklistItemId, newChecklistItem } = action.payload;
      state.checklistItemsById[checklistItemId] = newChecklistItem;
    },
    deleteSingleChecklistItemSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const checklistItemId = action.payload;

      delete state.checklistItemsById[checklistItemId];

      // find checklist Id of the checklistItemId
      const checklistId = Object.keys(state.checklistItemsByChecklist).find(
        (checklistId) =>
          state.checklistItemsByChecklist[checklistId].includes(checklistItemId)
      );

      const index =
        state.checklistItemsByChecklist[checklistId].indexOf(checklistItemId);
      if (index > -1) {
        state.checklistItemsByChecklist[checklistId].splice(index, 1);
      }
    },
  },
});

export default slice.reducer;

export const createChecklistOnTask =
  ({ taskId, checklistTitle }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(`/tasks/${taskId}/checklists`, {
        checklistTitle,
      });
      dispatch(
        slice.actions.createChecklistOnTaskSuccess({
          taskId,
          newChecklist: response.data,
        })
      );
      toast.success("Checklist created successfully");
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const createChecklistItemOnChecklist =
  ({ checklistId, itemTitle }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(
        `/checklists/${checklistId}/checklistItems`,
        {
          itemTitle,
        }
      );
      dispatch(
        slice.actions.createChecklistItemOnChecklistSuccess({
          checklistId,
          newChecklistItem: response.data,
        })
      );
      toast.success("Checklist item created successfully");
      return response.data;
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getChecklistsOfTask = (taskId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/tasks/${taskId}/checklists`);
    dispatch(
      slice.actions.getChecklistsOfTaskSuccess({
        taskId,
        ...response.data,
      })
    );
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSingleChecklist =
  ({ checklistId, checklistTitle }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(`/checklists/${checklistId}`, {
        checklistTitle,
      });

      dispatch(
        slice.actions.updateSingleChecklistSuccess({
          checklistId,
          newChecklist: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      toast.error("Failed to update checklist");
    }
  };

export const deleteSingleChecklist = (checklistId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/checklists/${checklistId}`);
    dispatch(slice.actions.deleteSingleChecklistSuccess(checklistId));
    toast.success("Checklist deleted successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error();
  }
};

export const updateSingleChecklistItemIsChecked =
  ({ checklistItemId, isChecked }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        `/checklistItems/${checklistItemId}`,
        {
          isChecked,
        }
      );

      dispatch(
        slice.actions.updateSingleChecklistItemIsCheckedSuccess({
          checklistItemId,
          newChecklistItem: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateSingleChecklistItemTitle =
  ({ checklistItemId, itemTitle }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        `/checklistItems/${checklistItemId}`,
        {
          itemTitle,
        }
      );

      dispatch(
        slice.actions.updateSingleChecklistItemTitleSuccess({
          checklistItemId,
          newChecklistItem: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleChecklistItem =
  (checklistItemId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(
        `/checklistItems/${checklistItemId}`
      );
      dispatch(slice.actions.deleteSingleChecklistItemSuccess(checklistItemId));
      toast.success("Checklist item deleted successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
