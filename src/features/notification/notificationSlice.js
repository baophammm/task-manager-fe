import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";
import { toast } from "react-toastify";
import { NOTIFICATION_PER_PAGE } from "../../app/config";

const initialState = {
  isLoading: false,
  error: null,
  currentPageNotifications: [],
  notificationsById: {},
  totalNotifications: 0,
  totalUnreadNotifications: 0,
  totalPages: 1,
};

const slice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const { notifications, count, totalPages, countUnread } = action.payload;
      notifications.forEach((notification) => {
        state.notificationsById[notification._id] = notification;
        if (!state.currentPageNotifications.includes(notification._id)) {
          state.currentPageNotifications.push(notification._id);
        }
      });
      state.totalNotifications = count;
      state.totalUnreadNotifications = countUnread;
      state.totalPages = totalPages;
    },

    resetNotifications(state) {
      state.notificationsById = {};
      state.currentPageNotifications = [];
    },

    updateReadAndUndreadNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { notificationId, newNotification } = action.payload;
      state.notificationsById[notificationId] = newNotification;
    },
    updateReadAndUndreadAllNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { notifications } = action.payload;
      // only replace notifications currently shown
      state.currentPageNotifications.map(
        (notificationId) =>
          (state.notificationsById[notificationId] = notifications.find(
            (notification) => notification._id === notificationId
          ))
      );
    },
    deleteSingleNotificationSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const notificationId = action.payload;

      delete state.notificationsById.notificationId;
      const index = state.currentPageNotifications.indexOf(notificationId);
      if (index > -1) {
        state.currentPageNotifications.splice(index, 1);
      }
    },
    deleteManyNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { notifications, totalPages, count } = action.payload;
      state.notificationsById = {};
      state.currentPageNotifications = [];
      notifications.forEach((notification) => {
        state.notificationsById[notification._id] = notification;
        if (!state.currentPageNotifications.includes(notification._id)) {
          state.currentPageNotifications.push(notification._id);
        }
      });
      state.totalNotifications = count;
      state.totalPages = totalPages;
    },
  },
});

export default slice.reducer;

export const getNotifications =
  ({ isRead, type, targetType, page, limit = NOTIFICATION_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { page, limit };
      if ([true, false].includes(isRead)) params.isRead = isRead;
      if (type) params.type = type;
      if (targetType) params.targetType = targetType;
      const response = await apiService.get("/notifications", { params });

      if (page === 1) dispatch(slice.actions.resetNotifications());

      dispatch(slice.actions.getNotificationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateReadAndUndreadNotification =
  ({ notificationId, isRead }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        isRead,
      };
      const response = await apiService.put(
        `/notifications/${notificationId}`,
        data
      );

      dispatch(
        slice.actions.updateReadAndUndreadNotificationSuccess({
          notificationId,
          newNotification: response.data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const updateReadAndUndreadAllNotifications =
  ({ isRead, page, limit = NOTIFICATION_PER_PAGE * page }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        isRead,
        page,
        limit,
      };
      const response = await apiService.put("/notifications", data);
      dispatch(
        slice.actions.updateReadAndUndreadAllNotificationsSuccess(response.data)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteSingleNotification =
  (notificationId) => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete(
        `/notifications/${notificationId}`
      );
      dispatch(slice.actions.deleteSingleNotificationSuccess(notificationId));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteManyNotifications =
  ({ isRead, page, limit = NOTIFICATION_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = {
        isRead,
        page,
        limit: limit * page,
      };
      const response = await apiService.delete(
        `/notifications?isRead=${isRead}&page=${page}&limit=${limit}`
      );
      dispatch(slice.actions.deleteManyNotificationsSuccess(response.data));

      toast.success("Delete multiple notifications successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
