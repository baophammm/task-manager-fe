import { Avatar, Box, Stack } from "@mui/material";
import React from "react";
import UserProfilePicture from "./UserProfilePicture";

function ProjectMemberIconStack({ projectMembers }) {
  return (
    <Box>
      {projectMembers.length > 3 ? (
        <Stack direction="row">
          {projectMembers.slice(0, 3).map((projectMember) => (
            <UserProfilePicture
              key={projectMember._id}
              targetUser={projectMember}
            />
          ))}
          <Box>
            <Avatar>+{projectMembers.length - 3}</Avatar>
          </Box>
        </Stack>
      ) : (
        <Stack direction="row">
          {projectMembers.map((projectMember) => (
            <UserProfilePicture
              key={projectMember._id}
              targetUser={projectMember}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default ProjectMemberIconStack;
