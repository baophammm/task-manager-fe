import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { COMMENT_PER_TASK } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  commentsById: {},

  commentsByTask: {},
  currentPageByTask: {},
  totalCommentsByTask: {},

  commentsByProject: {},
  currentPageByProject: {},
  totalCommentsByProject: {},
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    createCommentOnTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = action.payload;

      const newComment = action.payload;
      // TO CHECK
      // state.commentsById[newComment._id] = newComment;
      // state.commentsByTask.unshift(newComment._id);
      // state.totalCommentsByTask[newComment._id] =
      //   state.totalCommentsByTask[newComment._id] + 1 || 1;
    },

    getCommentsOfTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { taskId, comments, count, page } = action.payload;
      comments.forEach(
        (comment) => (state.commentsById[comment._id] = comment)
      );
      state.commentsByTask[taskId] = comments.map((comment) => comment._id);
      // .reverse();
      state.totalCommentsByTask[taskId] = count;
      state.currentPageByTask[taskId] = page;
    },

    deleteCommentOfTaskSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { commentId, taskId } = action.payload;
      delete state.commentsById[commentId];

      const index = state.commentsByTask[taskId].indexOf(commentId);
      if (index > -1) {
        state.commentsByTask[taskId].splice(index, 1);
      }
    },
  },
});

export default slice.reducer;

export const createCommentOnTask =
  ({ taskId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log(taskId);
      const response = await apiService.post("/comments", {
        targetType: "Task",
        targetId: taskId,
        content,
      });
      dispatch(slice.actions.createCommentOnTaskSuccess(response.data));
      dispatch(getCommentsOfTask({ taskId }));

      toast.success("Create comment successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getCommentsOfTask =
  ({ taskId, page = 1, limit = COMMENT_PER_TASK }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        page,
        limit,
      };

      const response = await apiService.get(`/tasks/${taskId}/comments`, {
        params,
      });

      dispatch(
        slice.actions.getCommentsOfTaskSuccess({
          ...response.data,
          taskId,
          page,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteCommentOfTask =
  ({ commentId, taskId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(`/comments/${commentId}`);
      dispatch(slice.actions.deleteCommentOfTaskSuccess({ commentId, taskId }));
      toast.success("Comment deleted");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
