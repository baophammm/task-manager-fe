import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { PROJECT_PER_PAGE } from "../../app/config";

const initialState = {
  initialState: false,
  error: null,
  currentPageProjects: [],
  projectsById: {},
  totalPages: 1,
};

const slice = createSlice({
  name: "project",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    createProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const newProject = action.payload;
      state.projectsById[newProject._id] = newProject;
      state.currentPageProjects.unshift(newProject._id);
    },
    getProjectsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { projects, count, totalPages } = action.payload;
      projects.forEach(
        (project) => (state.projectsById[project._id] = project)
      );
      state.currentPageProjects = projects.map((project) => project._id);
      state.totalProjects = count;
      state.totalPages = totalPages;
    },
  },
});

export default slice.reducer;

export const createProject =
  ({
    title,
    description,
    projectStatus,
    startAt,
    dueAt,
    projectMemberEmails,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/projects", {
        title,
        description,
        projectStatus,
        startAt,
        dueAt,
        projectMemberEmails,
      });
      dispatch(slice.actions.createProjectSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getProjects =
  ({
    search,
    projectStatus,
    projectOwner,
    startAfter,
    startBefore,
    dueAfter,
    dueBefore,
    page,
    limit = PROJECT_PER_PAGE,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (projectStatus) params.projectStatus = projectStatus;
      if (projectOwner) params.projectOwner = projectOwner;
      if (startAfter) params.startAfter = startAfter;
      if (startBefore) params.startBefore = startBefore;
      if (dueAfter) params.dueAfter = dueAfter;
      if (dueBefore) params.dueBefore = dueBefore;

      const response = await apiService.get("/projects", { params });

      dispatch(slice.actions.getProjectsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
