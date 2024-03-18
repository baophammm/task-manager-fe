import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  SvgIcon,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DoneIcon from "@mui/icons-material/Done";

import ViewListIcon from "@mui/icons-material/ViewList";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteManyNotifications,
  getNotifications,
  updateReadAndUndreadAllNotifications,
} from "./notificationSlice";
import { LoadingButton } from "@mui/lab";
import Notification from "./Notification";
import { Link } from "react-router-dom";

import { NotificationContainerContext } from "./NotificationContainer";
import { NOTIFICATION_PER_PAGE } from "../../app/config";

function NotificationListMenu() {
  const {
    page,
    setPage,
    checkedUnreadOnly,
    setCheckedUnreadOnly,
    notifications,
    totalNotifications,
    totalUnreadNotifications,
    isLoading,
    anchorElNotificationList,
    handleCloseNotificationListMenu,
  } = useContext(NotificationContainerContext);

  const [anchorElNotificationListAction, setAnchorElNotificationListAction] =
    useState(null);

  const handleOpenNotificationListActionMenu = (event) => {
    setAnchorElNotificationListAction(event.currentTarget);
  };

  const handleCloseNotificationListActionMenu = () => {
    setAnchorElNotificationListAction(null);
  };

  const dispatch = useDispatch();
  const markAllNotificationsRead = () => {
    dispatch(updateReadAndUndreadAllNotifications({ isRead: true })).then(() =>
      dispatch(
        getNotifications({ page, isRead: checkedUnreadOnly ? false : null })
      )
    );
  };

  // TODO check notification refresh after updates
  const handleDeleteAllReadNotifications = () => {
    const result = window.confirm("Delete all read notifications?");

    if (result) {
      const newPage = Math.ceil(
        totalUnreadNotifications / NOTIFICATION_PER_PAGE
      );

      dispatch(deleteManyNotifications({ isRead: true, page })).then(
        dispatch(
          getNotifications({
            page: newPage,
            isRead: checkedUnreadOnly ? false : null,
          })
        )
      );
    }
  };

  const NotificationListActionMenu = (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-notificatiolistaction"
      anchorEl={anchorElNotificationListAction}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElNotificationListAction)}
      onClose={handleCloseNotificationListActionMenu}
    >
      <MenuItem
        onClick={() => {
          markAllNotificationsRead();
          handleCloseNotificationListActionMenu();
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
          <Typography>Mark all as read</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleDeleteAllReadNotifications();
          handleCloseNotificationListActionMenu();
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
          <Typography>Delete all read</Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );
  return (
    <Menu
      sx={{ mt: "45px" }}
      id="menu-notificationlist"
      anchorEl={anchorElNotificationList}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorElNotificationList)}
      onClose={handleCloseNotificationListMenu}
    >
      <Box
        sx={{
          // border: "1px solid red",
          width: 1,
          px: 1,
          // maxHeight: "600px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Notifications</Typography>
          <Stack direction="row" alignItems="center">
            {/* <FormGroup> */}
            <FormControlLabel
              control={
                <Switch
                  checked={checkedUnreadOnly}
                  onChange={() => setCheckedUnreadOnly(!checkedUnreadOnly)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Unread only"
            />
            {/* </FormGroup> */}
            <Box>
              <Tooltip>
                <IconButton onClick={handleOpenNotificationListActionMenu}>
                  <MoreHorizIcon />
                </IconButton>
              </Tooltip>
              {NotificationListActionMenu}
            </Box>
          </Stack>
        </Stack>
        <Divider />

        <Box
          sx={{
            width: { sx: "90vw", sm: "400px" },

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {notifications.map((notification) => (
            <Notification
              key={notification._id}
              notification={notification}
              handleCloseNotificationListMenu={handleCloseNotificationListMenu}
            />
          ))}
        </Box>
        <Box sx={{ width: "400px", display: "flex", justifyContent: "center" }}>
          {totalNotifications ? (
            <LoadingButton
              variant="outlined"
              size="small"
              loading={isLoading}
              onClick={() => setPage((page) => page + 1)}
              disabled={
                Boolean(totalNotifications) &&
                notifications.length >= totalNotifications
              }
            >
              Load More
            </LoadingButton>
          ) : (
            <Typography variant="body1">No Notification</Typography>
          )}
        </Box>
      </Box>
    </Menu>
  );
}

export default NotificationListMenu;
