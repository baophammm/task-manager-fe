import { Chip } from "@mui/material";
import React from "react";

function ProjectRole({ project, targetUserId, sx }) {
  const projectOwnerId = project.projectOwner._id;
  const projectLeadIds = project.projectLeads;
  const projectMemberIds = project.projectMembers.map((projectMember) => {
    if (
      !projectLeadIds.includes(projectMember._id) &&
      projectOwnerId !== projectMember._id
    ) {
      return projectMember._id;
    }
    return null;
  });

  if (projectMemberIds.includes(targetUserId)) {
    return <Chip sx={{ ...sx }} icon={<></>} label="Member" color="default" />;
  }

  if (projectLeadIds.includes(targetUserId)) {
    return <Chip sx={{ ...sx }} icon={<></>} label="Lead" color="default" />;
  }

  if (projectOwnerId === targetUserId) {
    return <Chip sx={{ ...sx }} icon={<></>} label="Owner" color="default" />;
  }

  return (
    <Chip sx={{ ...sx }} icon={<></>} label="Not a member" color="default" />
  );
}

export default ProjectRole;
