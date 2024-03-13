import { Box, Stack } from "@mui/material";
import React from "react";
import UserProfilePicture from "./UserProfilePicture";

function ProjectMemberIconStack({ projectMembers }) {
  return (
    <Box>
      <Stack direction="row">
        {projectMembers.map((projectMember) => (
          <UserProfilePicture
            key={projectMember._id}
            targetUser={projectMember}
          />
        ))}
      </Stack>
    </Box>
  );
}

export default ProjectMemberIconStack;
