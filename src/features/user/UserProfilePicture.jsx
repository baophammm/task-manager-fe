import { Avatar, Box } from "@mui/material";
import React from "react";

function UserProfilePicture({ targetUser }) {
  const avatar = targetUser.profilePictureUrl ? (
    <Avatar
      alt={`${targetUser.firstName} ${targetUser.lastName}`}
      src={targetUser.profilePictureUrl}
    />
  ) : (
    <Avatar>
      {targetUser.firstName.slice(0, 1).toUpperCase()}
      {targetUser.lastName.slice(0, 1).toUpperCase()}
    </Avatar>
  );

  const hoverText = `${targetUser.firstName} ${targetUser.lastName} | ${targetUser.email}`;
  return <Box title={hoverText}>{avatar}</Box>;
}

export default UserProfilePicture;
