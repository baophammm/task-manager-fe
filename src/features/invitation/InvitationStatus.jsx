import { Chip } from "@mui/material";
import React from "react";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

function InvitationStatus({ currentUserId, targetUserId, invitation, sx }) {
  if (currentUserId === targetUserId) return null;
  if (!invitation) return null;

  if (invitation.status === "accepted") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<CheckCircleOutlineRoundedIcon />}
        label="Accepted"
        color="success"
      />
    );
  }

  if (invitation.status === "declined") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<DoNotDisturbOnIcon />}
        label="Declined"
        color="error"
      />
    );
  }

  if (invitation.status === "pending") {
    const { from, to } = invitation;
    if (from === currentUserId && to === targetUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<MarkEmailReadRoundedIcon />}
          label="Invitation sent"
          color="warning"
        />
      );
    } else if (from === targetUserId && to === currentUserId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<PauseCircleOutlineRoundedIcon />}
          label="Waiting for response"
          color="warning"
        />
      );
    }
  }

  return <div>InvitationStatus</div>;
}

export default InvitationStatus;
