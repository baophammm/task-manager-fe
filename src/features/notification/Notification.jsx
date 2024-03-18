import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteSingleNotification,
  updateReadAndUndreadNotification,
} from "./notificationSlice";
import { Link, useLocation } from "react-router-dom";

function Notification({ notification, handleCloseNotificationListMenu }) {
  const location = useLocation();
  // notification link to

  const notificationLink = (() => {
    switch (notification.targetType) {
      case "Project":
        return `/projects/${notification.targetId}`;
      case "Task":
        return `/tasks/${notification.targetId}`;
      case "Invitation":
        return `/invitations`;
      default:
        return "/";
    }
  })();

  const isRead = notification.isRead;

  const dispatch = useDispatch();

  const handleReadAndUnreadNotification = () => {
    dispatch(
      updateReadAndUndreadNotification({
        notificationId: notification._id,
        isRead: !notification.isRead,
      })
    );
  };

  const handleDeleteNotification = () => {
    dispatch(deleteSingleNotification(notification._id));
  };

  //Time display
  const now = new Date();
  const notificationSendTime = new Date(notification.sendTime);

  const isToday =
    now.getFullYear() === notificationSendTime.getFullYear() &&
    now.getMonth() === notificationSendTime.getMonth() &&
    now.getDate() === notificationSendTime.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const isYesterday =
    yesterday.getFullYear() === notificationSendTime.getFullYear() &&
    yesterday.getMonth() === notificationSendTime.getMonth() &&
    yesterday.getDate() === notificationSendTime.getDate();

  const displayDay = isToday
    ? "Today"
    : isYesterday
    ? "Yesterday"
    : `${notificationSendTime.getDate()}/${notificationSendTime.getMonth()}/${notificationSendTime.getFullYear()}`;

  const displayTime = `${notificationSendTime.getHours() % 12 || 12}:${
    notificationSendTime.getMinutes() < 10
      ? `0${notificationSendTime.getMinutes()}`
      : notificationSendTime.getMinutes()
  } ${notificationSendTime.getHours() >= 12 ? "pm" : "am"}`;

  // Notification Action Menu
  const [anchorElNotificationAction, setAnchorElNotificationAction] =
    useState(null);

  const handleOpenNotificationActionMenu = (event) => {
    setAnchorElNotificationAction(event.currentTarget);
  };

  const handleCloseNotificationActionMenu = () => {
    setAnchorElNotificationAction(null);
  };

  const NotificationActionMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-notificationaction"
      anchorEl={anchorElNotificationAction}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElNotificationAction)}
      onClose={handleCloseNotificationActionMenu}
    >
      <MenuItem
        onClick={() => {
          handleReadAndUnreadNotification();
          handleCloseNotificationActionMenu();
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <SvgIcon fontSize="small">
            <DoneIcon />
          </SvgIcon>
          <Typography>{isRead ? "Mark as unread" : "Mark as read"}</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleDeleteNotification();
          handleCloseNotificationActionMenu();
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          alignItems="center"
        >
          <SvgIcon fontSize="small">
            <ClearIcon />
          </SvgIcon>
          <Typography>Remove this notification</Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        backgroundColor: "neutral.200",
        width: 1,
        height: "100px",
        borderRadius: "4px",
        mb: 0.5,
      }}
    >
      <Box
        sx={{
          height: 1,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            // border: "1px solid red",
            height: 1,
            fullHeight: 1,
            flexGrow: 1,
            pl: 1,
          }}
          onClick={() => {
            if (!isRead) {
              handleReadAndUnreadNotification();
            }
            handleCloseNotificationListMenu();
          }}
        >
          <Link
            to={notificationLink}
            state={
              notification.targetType === "Task"
                ? { backgroundLocation: location }
                : {}
            }
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={
                {
                  // border: "1px solid orange",
                }
              }
            >
              <Typography variant="subtitle1">{notification.title}</Typography>
            </Box>
            <Box
              sx={{
                // border: "1px solid green",
                width: 1,
                maxWidth: "360px",
                height: "3em",
                lineHeight: "1.5em",
                overflow: "hidden",
              }}
            >
              <Typography variant="body2">
                {notification.message.length > 100
                  ? notification.message.slice(0, 100) + "..."
                  : notification.message}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography variant="body2">
                {displayDay} - {displayTime}
              </Typography>
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            width: "30px",
            // border: "1px solid orange",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box>
            <Tooltip>
              <IconButton onClick={handleOpenNotificationActionMenu}>
                <SvgIcon fontSize="small">
                  <MoreHorizIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            {NotificationActionMenu}
          </Box>
          <Tooltip title={isRead ? "Mark as Unread" : "Mark as Read"}>
            <IconButton onClick={handleReadAndUnreadNotification}>
              <SvgIcon fontSize="small" title="Mark as Read">
                {isRead ? (
                  <RadioButtonCheckedIcon color="primary" />
                ) : (
                  <RadioButtonUncheckedIcon color="primary" />
                )}
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider />
    </Box>
  );
}

export default Notification;
