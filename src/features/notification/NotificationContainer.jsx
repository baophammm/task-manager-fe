import { Badge, Box, IconButton, SvgIcon, Tooltip } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import React, { createContext, useEffect, useState } from "react";
import NotificationListMenu from "./NotificationListMenu";
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
    isLoading,
  } = useSelector((state) => state.notification);

  const notifications = currentPageNotifications.map(
    (notificationId) => notificationsById[notificationId]
  );
  // Find if there is unread notification
  let unreadNotificationCount = 0;

  notifications.forEach((notification) => {
    if (notification.isRead === false) {
      unreadNotificationCount += 1;
    }
  });

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
          title={`You have ${unreadNotificationCount} unread ${
            unreadNotificationCount > 1 ? "notifications" : "notification"
          }`}
        >
          <IconButton
            onClick={handleOpenNotificationListMenu}
            sx={{
              border: "2px solid",
              borderColor: "#fff200",
              p: 0.8,
            }}
          >
            <Badge color="error" badgeContent={unreadNotificationCount}>
              <SvgIcon fontSize="medium">
                <NotificationsNoneIcon style={{ color: "#fff200" }} />
              </SvgIcon>
            </Badge>
            {/* )} */}
          </IconButton>
        </Tooltip>

        <NotificationListMenu
          currentPageNotifications={currentPageNotifications}
          notificationsById={notificationsById}
          totalNotifications={totalNotifications}
          isLoading={isLoading}
          notifications={notifications}
          anchorElNotificationList={anchorElNotificationList}
          handleCloseNotificationListMenu={handleCloseNotificationListMenu}
        />
      </Box>
    </NotificationContainerContext.Provider>
  );
}

export default NotificationContainer;
