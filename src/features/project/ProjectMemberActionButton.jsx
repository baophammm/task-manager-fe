import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  changeProjectRoleManagerToMember,
  changeProjectRoleMemberToManger,
  getSingleProject,
  removeMemberFromProject,
} from "./projectSlice";
import { getProjectMembers } from "../user/userSlice";
import useAuth from "../../hooks/useAuth";

function ProjectMemberActionButton({ project, targetUserId, sx }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const dispatch = useDispatch();

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

  const isProjectOwner = projectOwnerId === currentUserId;

  const btnChangeRoleMemberToManager = (
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
      To Manager
    </Button>
  );

  const btnChangeRoleManagerToMember = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      disabled={!isProjectOwner}
      onClick={() =>
        dispatch(
          changeProjectRoleManagerToMember({
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

  if (projectManagerIds.includes(targetUserId)) {
    return (
      <Stack direction="row" spacing={1}>
        {btnChangeRoleManagerToMember}
        {btnRemoveMemberFromProject}
      </Stack>
    );
  }

  if (projectMemberIds.includes(targetUserId)) {
    return (
      <Stack direction="row" spacing={1}>
        {btnChangeRoleMemberToManager}
        {btnRemoveMemberFromProject}
      </Stack>
    );
  }
  return null;
}

export default ProjectMemberActionButton;