import { Chip } from "@mui/material";
import React from "react";

function ProjectRole({ project, targetUserId, sx }) {
  const projectOwnerId = project.projectOwner._id;
  const projectManagerIds = project.projectManagers;
  const projectMemberIds = project.projectMembers.map((projectMember) => {
    if (
      !projectManagerIds.includes(projectMember._id) &&
      projectOwnerId !== projectMember._id
    ) {
      return projectMember._id;
    }
    return null;
  });

  if (projectMemberIds.includes(targetUserId)) {
    return <Chip sx={{ ...sx }} icon={<></>} label="Member" color="default" />;
  }

  if (projectManagerIds.includes(targetUserId)) {
    return <Chip sx={{ ...sx }} icon={<></>} label="Manager" color="default" />;
  }

  if (projectOwnerId === targetUserId) {
    return <Chip sx={{ ...sx }} icon={<></>} label="Owner" color="default" />;
  }

  return (
    <Chip sx={{ ...sx }} icon={<></>} label="Not a member" color="default" />
  );
}

export default ProjectRole;
