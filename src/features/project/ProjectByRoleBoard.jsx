import { ImageList } from "@mui/material";
import React from "react";
import ProjectColumn from "./ProjectColumn";
import useAuth from "../../hooks/useAuth";

const PROJECTS_BY_ROLES = [
  {
    name: "Owner",
    label: "Owning",
    projectField: "projectOwner",
    backgroundColor: "success.main",
  },
  {
    name: "Manager",
    label: "Managing",
    projectField: "projectManagers",
    backgroundColor: "primary.main",
  },
  {
    name: "Member",
    label: "Member in",
    projectField: "projectMembers",
    backgroundColor: "info.main",
  },
];

const PROJECTS_BY_STATUSES = [
  { name: "Planning", label: "Planning", backgroundColor: "info.main" },
  { name: "Ongoing", label: "Ongoing", backgroundColor: "primary.main" },
  { name: "Done", label: "Done", backgroundColor: "success.main" },
];
function ProjectByRoleBoard({ projects }) {
  const { user } = useAuth();

  return (
    <ImageList
      sx={{
        // border: "1px solid orange",
        width: 1,
        // height: {
        //   xs: "calc(100vh - 150px)",
        //   ms: "calc(100vh - 170px)",
        // },
        height: 1,
        md: 0,
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(auto-fill,minmax(320px,1fr)) !important`,
        gridAutoColumns: `minmax(320px, 1fr)`,

        borderRadius: "8px",
      }}
    >
      {PROJECTS_BY_STATUSES.map((projectStatusColumn) => {
        const selectedStatusProjects = projects.filter(
          (project) => project.projectStatus === projectStatusColumn.name
        );

        const column = {
          id: projectStatusColumn.name,
          title: projectStatusColumn.label,
          projectIds: selectedStatusProjects.map((project) => project._id),
        };

        return (
          <ProjectColumn
            key={projectStatusColumn.name}
            column={column}
            projects={selectedStatusProjects}
            backgroundColor={projectStatusColumn.backgroundColor}
          />
        );
      })}
    </ImageList>
  );
}

export default ProjectByRoleBoard;
