import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,

  tagsById: {},
  tagsByProject: {},
  totalTagsByProject: {},

  selectedTag: null,
};

const slice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createProjectTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { projectId, newTag } = action.payload;

      state.tagsById[newTag._id] = newTag;
      state.tagsByProject[projectId].push(newTag._id);
      state.totalTagsByProject[projectId] += 1;

      state.selectedTag = newTag;
    },
    getTagsByProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { projectId, tags, count } = action.payload;

      tags.forEach((tag) => (state.tagsById[tag._id] = tag));
      state.tagsByProject[projectId] = tags.map((tag) => tag._id);
      state.totalTagsByProject[projectId] = count;
    },
    updateSingleTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const newTag = action.payload;
      state.tagsById[newTag._id] = newTag;
    },
    deleteSingleTagSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const tagId = action.payload;

      delete state.tagsById[tagId];

      // find project id of the tag
      const projectId = Object.keys(state.tagsByProject).find((projectId) =>
        state.tagsByProject[projectId].includes(tagId)
      );

      const index = state.tagsByProject[projectId].indexOf(tagId);
      if (index > -1) {
        state.tagsByProject[projectId].splice(index, 1);
        state.totalTagsByProject[projectId] -= 1;
      }
    },
  },
});

export default slice.reducer;

export const createProjectTag =
  ({ projectId, tagLabel, color, colorShade }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        tagLabel,
        color,
        colorShade,
        projectId,
      };

      const response = await apiService.post(`/tags`, data);
      dispatch(
        slice.actions.createProjectTagSuccess({
          projectId,
          newTag: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getTagsByProject =
  ({ projectId, search }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      let params = {};
      if (search) params.search = search;
      if (projectId) params.projectId = projectId;
      const response = await apiService.get(`/tags`, {
        params,
      });
      dispatch(
        slice.actions.getTagsByProjectSuccess({ projectId, ...response.data })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateSingleTag =
  ({ tagId, tagLabel, color, colorShade }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { tagLabel, color, colorShade };
      const response = await apiService.put(`/tags/${tagId}`, data);
      dispatch(slice.actions.updateSingleTagSuccess(response.data));
      toast.success("Tag updated successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleTag = (tagId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/tags/${tagId}`);
    dispatch(slice.actions.deleteSingleTagSuccess(tagId));
    toast.success("Tag deleted successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
