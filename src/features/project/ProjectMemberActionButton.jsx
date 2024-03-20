import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  changeProjectRoleLeadToMember,
  changeProjectRoleMemberToManger,
  getSingleProject,
  removeMemberFromProject,
} from "./projectSlice";
import useAuth from "../../hooks/useAuth";

function ProjectMemberActionButton({ project, targetUserId, sx }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const dispatch = useDispatch();

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

  const isProjectOwner = projectOwnerId === currentUserId;

  const btnChangeRoleMemberToLead = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      disabled={!isProjectOwner}
      onClick={() =>
        dispatch(
          changeProjectRoleMemberToManger({
            projectId: project._id,
            memberId: targetUserId,
          })
        ).then(() => dispatch(getSingleProject(project._id)))
      }
    >
      To Lead
    </Button>
  );

  const btnChangeRoleLeadToMember = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      disabled={!isProjectOwner}
      onClick={() =>
        dispatch(
          changeProjectRoleLeadToMember({
            projectId: project._id,
            memberId: targetUserId,
          })
        ).then(() => dispatch(getSingleProject(project._id)))
      }
    >
      To Member
    </Button>
  );

  const btnRemoveMemberFromProject = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      disabled={!isProjectOwner}
      color="error"
      onClick={() => {
        const result = window.confirm(
          "Are you sure you want to remove this user?"
        );

        if (result) {
          dispatch(
            removeMemberFromProject({
              projectId: project._id,
              memberId: targetUserId,
            })
          ).then(() => dispatch(getSingleProject(project._id)));
        }
      }}
    >
      Remove
    </Button>
  );

  if (projectLeadIds.includes(targetUserId)) {
    return (
      <Stack direction="row" spacing={1}>
        {btnChangeRoleLeadToMember}
        {btnRemoveMemberFromProject}
      </Stack>
    );
  }

  if (projectMemberIds.includes(targetUserId)) {
    return (
      <Stack direction="row" spacing={1}>
        {btnChangeRoleMemberToLead}
        {btnRemoveMemberFromProject}
      </Stack>
    );
  }
  return null;
}

export default ProjectMemberActionButton;
