import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  error: null,
  currentPageProjects: [],
  projectsById: {},
  totalProjectInvitations: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getIncomingInvitationsSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      const { projects, count, totalPages } = action.payload;
      projects.forEach(
        (project) => (state.projectsById[project._id] = project)
      );
      state.currentPageProjects = projects.map((project) => project._id);
      state.totalProjects = count;
      state.totalPages = totalPages;
    },

    declineProjectInvitationSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      const { projectId, ...invitation } = action.payload;
      state.projectsById[projectId].invitation = invitation;
    },

    acceptProjectInvitationSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      const { projectId, ...invitation } = action.payload;
      state.projectsById[projectId].invitation = invitation;
    },
  },
});

export default slice.reducer;

export const getIncomingInvitations = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/invitations/incoming");
    dispatch(slice.actions.getIncomingInvitationsSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const declineProjectInvitation =
  ({ projectId, targetUserId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await apiService.put(
        `/projects/${projectId}/invitations/${targetUserId}`,
        {
          status: "declined",
        }
      );

      dispatch(
        slice.actions.declineProjectInvitationSuccess({
          ...response.data,
          projectId,
        })
      );

      toast.success("Deline Project Invitation successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const acceptProjectInvitation =
  ({ projectId, targetUserId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      console.log("Check user ID in reducer:", targetUserId);
      const response = await apiService.put(
        `/projects/${projectId}/invitations/${targetUserId}`,
        {
          status: "accepted",
        }
      );

      dispatch(
        slice.actions.acceptProjectInvitationSuccess({
          ...response.data,
          projectId,
        })
      );

      toast.success("Accept Project Invitation successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
