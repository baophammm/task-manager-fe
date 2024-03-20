import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

import {
  cancelProjectInvitation,
  sendProjectInvitation,
} from "../user/userSlice";
import {
  acceptProjectInvitation,
  declineProjectInvitation,
} from "./invitationSlice";
import { useNavigate } from "react-router-dom";

function ActionButton({
  currentUserId,
  targetUserId,
  invitation,
  projectId,
  sx,
}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  if (currentUserId === targetUserId) return null;

  const btnSendInvitation = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() =>
        dispatch(sendProjectInvitation({ projectId, targetUserId }))
      }
    >
      Send Invitation
    </Button>
  );

  if (!invitation) return btnSendInvitation;

  const btnCancelInvitation = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() =>
        dispatch(cancelProjectInvitation({ projectId, targetUserId }))
      }
    >
      Cancel Invitation
    </Button>
  );

  const btnSeeProjectDetails = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      onClick={() => navigate(`/projects/${projectId}`)}
    >
      See Details
    </Button>
  );

  const btnGroupReact = (
    <Stack direction="row" spacing={1}>
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="contained"
        color="success"
        onClick={() => {
          console.log("Checking current User Id in Button: ", currentUserId);
          dispatch(
            acceptProjectInvitation({ projectId, targetUserId: currentUserId })
          );
        }}
      >
        Accept
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() =>
          dispatch(
            declineProjectInvitation({ projectId, targetUserId: currentUserId })
          )
        }
      >
        Decline
      </Button>
    </Stack>
  );

  if (invitation.status === "accepted") {
    const { from, to } = invitation;
    if (from === currentUserId && to === targetUserId) {
      return null;
    } else if (from === targetUserId && to === currentUserId) {
      return btnSeeProjectDetails;
    }
    return null;
  }

  if (invitation.status === "declined") {
    const { from, to } = invitation;
    if (from === currentUserId && to === targetUserId) {
      return btnSendInvitation;
    } else {
      return null;
    }
  }

  if (invitation.status === "pending") {
    const { from, to } = invitation;
    if (from === currentUserId && to === targetUserId) {
      return btnCancelInvitation;
    } else if (from === targetUserId && to === currentUserId) {
      return btnGroupReact;
    }
  }

  return null;
}

export default ActionButton;
