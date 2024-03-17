import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { PROJECT_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  currentPageProjects: [],
  projectsById: {},
  totalProjects: 0,
  totalPages: 1,
  selectedProject: null,
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
      state.selectedProject = newProject;
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
    getSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.selectedProject = action.payload;
    },
    updateSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { projectId, newProject } = action.payload;
      state.projectsById[projectId] = newProject;
      state.selectedProject = newProject;
    },
    deleteSingleProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const projectId = action.payload;

      delete state.projectsById.projectId;
      const index = state.currentPageProjects.indexOf(projectId);
      if (index > -1) {
        state.currentPageProjects.splice(index, 1);
      }
      state.selectedProject = null;
    },
    changeProjectRoleMemberToMangerSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const projectId = action.payload._id;

      state.projectsById[projectId] = action.payload;
    },
    changeProjectRoleLeadToMemberSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const projectId = action.payload._id;

      state.projectsById[projectId] = action.payload;
    },
    removeMemberFromProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { projectId, memberId } = action.payload;

      const memberIndex =
        state.projectsById[projectId].projectMembers.indexOf(memberId);

      if (memberIndex > -1) {
        state.projectsById[projectId].projectMembers.slice(memberIndex, 1);
      }

      if (state.projectsById[projectId].projectLeads.includes(memberId)) {
        const leadIndex =
          state.projectsById[projectId].projectLeads.indexOf(memberId);

        if (leadIndex > -1) {
          state.projectsById[projectId].projectLeads.slice(leadIndex, 1);
        }
      }
    },

    leaveProjectSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { projectId, memberId } = action.payload;
      console.log(state.projectsById[projectId].projectMembers);

      const projectIndex = state.currentPageProjects.indexOf(projectId);
      if (projectIndex > -1) {
        state.currentPageProjects.splice(projectIndex, 1);
      }
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

      toast.success(`Create Project ${title} successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getProjects =
  ({
    search,
    projectStatus,
    currentUserRole,
    startAfter,
    startBefore,
    dueAfter,
    dueBefore,
    sortBy,
    page,
    limit = PROJECT_PER_PAGE,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (projectStatus) params.projectStatus = projectStatus;
      if (currentUserRole) params.currentUserRole = currentUserRole;
      if (startAfter) params.startAfter = startAfter;
      if (startBefore) params.startBefore = startBefore;
      if (dueAfter) params.dueAfter = dueAfter;
      if (dueBefore) params.dueBefore = dueBefore;
      if (sortBy) params.sortBy = sortBy;

      const response = await apiService.get("/projects", { params });

      dispatch(slice.actions.getProjectsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getSingleProject = (projectId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/projects/${projectId}`);
    dispatch(slice.actions.getSingleProjectSuccess(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateSingleProject =
  ({ projectId, title, description, projectStatus, startAt, dueAt }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        title,
        description,
        projectStatus,
        startAt,
        dueAt,
      };

      const response = await apiService.put(`/projects/${projectId}`, data);

      dispatch(
        slice.actions.updateSingleProjectSuccess({
          projectId,
          newProject: response.data,
        })
      );

      toast.success(`Updating Project ${response.data.title} successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleProject = (projectId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/projects/${projectId}`);
    dispatch(slice.actions.deleteSingleProjectSuccess(projectId));
    toast.success(`Delete Project ${response.data.title} successfully`);
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const changeProjectRoleMemberToManger =
  ({ projectId, memberId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        `/projects/${projectId}/projectMembers/${memberId}`,
        { isNewLead: true }
      );
      dispatch(
        slice.actions.changeProjectRoleMemberToMangerSuccess(response.data)
      );

      const member = response.data.projectMembers.find(
        (projectMember) => projectMember._id === memberId
      );
      const memberName = member.firstName + " " + member.lastName;
      console.log("MEMBER NAME PROJECT SLICE", memberName);
      toast.success(`Change member ${memberName} role to Lead successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
export const changeProjectRoleLeadToMember =
  ({ projectId, memberId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put(
        `/projects/${projectId}/projectMembers/${memberId}`,
        { isNewLead: false }
      );
      dispatch(
        slice.actions.changeProjectRoleLeadToMemberSuccess(response.data)
      );

      const member = response.data.projectMembers.find(
        (projectMember) => projectMember._id === memberId
      );
      const memberName = member.firstName + " " + member.lastName;
      console.log("MEMBER NAME PROJECT SLICE", memberName);
      toast.success(`Change member ${memberName} role to Member successfully`);
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const removeMemberFromProject =
  ({ projectId, memberId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(
        `/projects/${projectId}/projectMembers/${memberId}`
      );
      dispatch(
        slice.actions.removeMemberFromProjectSuccess({ projectId, memberId })
      );
      toast.success("Remove member from project successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const leaveProject =
  ({ projectId, memberId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(
        `/projects/${projectId}/projectMembers/${memberId}`
      );
      dispatch(slice.actions.leaveProjectSuccess({ projectId, memberId }));
      toast.success("Leave project successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.messag));
      toast.error(error.message);
    }
  };
