import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { USER_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  currentPageUsers: [],
  usersById: {},
  totalUsers: 0,
  totalPages: 1,
  updatedProfile: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalPages = totalPages;
      state.totalUsers = count;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updatedProfile = action.payload;
    },
    getProjectAddNewMembersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { users, count, totalPages } = action.payload;
      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalPages = totalPages;
      state.totalUsers = count;
    },
    sendProjectInvitationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { targetUserId, ...invitation } = action.payload;
      state.usersById[targetUserId].invitation = invitation;
    },
    cancelProjectInvitationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { targetUserId } = action.payload;
      state.usersById[targetUserId].invitation = null;
    },
    getProjectMembersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count, totalPages } = action.payload;

      users.forEach((user) => (state.usersById[user._id] = user));
      state.currentPageUsers = users.map((user) => user._id);
      state.totalPages = totalPages;
      state.totalUsers = count;
    },
    addProjectToFavoriteSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const user = action.payload;

      state.updatedProfile = user;
    },
    removeProjectFromFavoriteSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const user = action.payload;

      state.updatedProfile = user;
    },
  },
});

export default slice.reducer;

export const getUsers =
  ({ search, page, limit = USER_PER_PAGE }) =>
  async (dispatch) => {
    try {
      const params = { page, limit };
      if (search) params.search = search;
      const response = await apiService.get("/users", { params });
      dispatch(slice.actions.getUsersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateUserProfile =
  ({ userId, firstName, lastName, profilePictureUrl }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        firstName,
        lastName,
        profilePictureUrl,
      };
      if (profilePictureUrl instanceof File) {
        const imageUrl = await cloudinaryUpload(profilePictureUrl);
        data.profilePictureUrl = imageUrl;
      }
      const response = await apiService.put(`/users/${userId}`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getProjectAddNewMembers =
  ({ projectId, search, page, limit = USER_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (search) params.search = search;
      const response = await apiService.get(
        `/projects/${projectId}/newMembers`,
        {
          params,
        }
      );
      dispatch(slice.actions.getProjectAddNewMembersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendProjectInvitation =
  ({ projectId, targetUserId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(
        `/projects/${projectId}/invitations`,
        {
          to: targetUserId,
        }
      );

      dispatch(
        slice.actions.sendProjectInvitationSuccess({
          ...response.data,
          targetUserId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const cancelProjectInvitation =
  ({ projectId, targetUserId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(
        `/projects/${projectId}/invitations/${targetUserId}`
      );
      dispatch(
        slice.actions.cancelProjectInvitationSuccess({
          ...response.data,
          targetUserId,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getProjectMembers =
  ({ projectId, search, page, limit = USER_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        page,
        limit,
      };
      if (search) data.search = search;

      const response = await apiService.get(
        `projects/${projectId}/projectMembers`,
        data
      );
      dispatch(slice.actions.getProjectMembersSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const addProjectToFavorite =
  ({ userId, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post(
        `users/${userId}/favorite/projects`,
        { projectId }
      );

      dispatch(slice.actions.addProjectToFavoriteSuccess(response.data));
      toast.success("Project added to favorite successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const removeProjectFromFavorite =
  ({ userId, projectId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(
        `users/${userId}/favorite/projects/${projectId}`
      );
      dispatch(slice.actions.removeProjectFromFavoriteSuccess(response.data));
      toast.success("Project removed from favorite successfully!");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
