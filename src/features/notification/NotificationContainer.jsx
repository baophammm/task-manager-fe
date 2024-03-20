import { Badge, Box, IconButton, SvgIcon, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { createContext, useEffect, useState } from "react";
import NotificationListMenu from "./NotificationListMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNotifications } from "./notificationSlice";

export const NotificationContainerContext = createContext();

function NotificationContainer({ sx }) {
  const [anchorElNotificationList, setAnchorElNotificationList] =
    useState(null);
  const handleOpenNotificationListMenu = (event) => {
    setAnchorElNotificationList(event.currentTarget);
  };
  const handleCloseNotificationListMenu = () => {
    setAnchorElNotificationList(null);
  };
  const [page, setPage] = useState(1);
  const [checkedUnreadOnly, setCheckedUnreadOnly] = useState(true);

  const {
    currentPageNotifications,
    notificationsById,
    totalNotifications,
    totalUnreadNotifications,
    isLoading,
  } = useSelector((state) => state.notification);

  const notifications = currentPageNotifications.map(
    (notificationId) => notificationsById[notificationId]
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (checkedUnreadOnly) {
      if (page !== 1) {
        setPage(1);
      }
      dispatch(getNotifications({ page, isRead: false }));
    } else {
      dispatch(getNotifications({ page }));
    }
  }, [dispatch, checkedUnreadOnly, page]);

  return (
    <NotificationContainerContext.Provider
      value={{
        page,
        setPage,
        checkedUnreadOnly,
        setCheckedUnreadOnly,
        notifications,
        totalNotifications,
        isLoading,
        anchorElNotificationList,
        handleCloseNotificationListMenu,
      }}
    >
      <Box sx={{ ...sx, flexGrow: 0, mr: { xs: 1, sm: 2 } }}>
        <Tooltip
          title={`You have ${totalUnreadNotifications} unread ${
            totalUnreadNotifications > 1 ? "notifications" : "notification"
          }`}
        >
          <IconButton
            onClick={handleOpenNotificationListMenu}
            sx={{
              p: 0.8,
            }}
          >
            <Badge color="error" badgeContent={totalUnreadNotifications}>
              <SvgIcon fontSize="medium">
                <NotificationsIcon />
              </SvgIcon>
            </Badge>
          </IconButton>
        </Tooltip>

        <NotificationListMenu />
      </Box>
    </NotificationContainerContext.Provider>
  );
}

export default NotificationContainer;
