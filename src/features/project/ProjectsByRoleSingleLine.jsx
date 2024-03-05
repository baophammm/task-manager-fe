import {
  Box,
  Card,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import ProjectCard from "./ProjectCard";

const RootBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  height: "100%",
  // minHeight: "80vh",
  maxWidth: "100%",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  overflow: "auto",
}));

const PROJECTS_BY_ROLES = [
  { name: "Owner", label: "Owning", projectField: "projectOwner" },
  { name: "Manager", label: "Managing", projectField: "projectManagers" },
  { name: "Member", label: "Member in", projectField: "projectMembers" },
];
function ProjectsByRoleSingleLine({ user, projects }) {
  return (
    <RootBox>
      <ImageList
        sx={{
          // border: "1px solid blue",
          height: "calc(100vh - 220px)",
          gridAutoFlow: "column",
          gridTemplateColumns: {
            xs: `repeat(auto-fill,minmax(100vw,1fr)) !important`,
            sm: `repeat(auto-fill,minmax(400px,1fr)) !important`,
            md: `repeat(auto-fill,minmax(300px,1fr)) !important`,
          },
          gridAutoColumns: {
            xs: `minmax(100vw, 1fr)`,
            sm: `minmax(400px, 1fr)`,
            md: `minmax(300px, 1fr)`,
          },

          borderRadius: "8px",
        }}
      >
        {PROJECTS_BY_ROLES.map((projectRole) => {
          const selectedRoleProjects = projects.filter((project) => {
            if (projectRole.name === "Owner") {
              return project[projectRole.projectField]._id === user._id;
            } else if (projectRole.name === "Manager") {
              return project[projectRole.projectField].includes(user._id);
            } else if (projectRole.name === "Member") {
              return (
                project.projectMembers.includes(user._id) &&
                !project.projectManagers.includes(user._id) &&
                project.projectOwner._id !== user._id
              );
            }
            return false;
          });

          if (selectedRoleProjects.length) {
            return (
              <ListItem
                key={projectRole.name}
                sx={{
                  // border: "1px solid green",
                  padding: "0",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "",
                }}
              >
                <Box
                  sx={{
                    minHeight: "80%",
                    maxHeight: "80%",
                    width: "100%",
                  }}
                >
                  <Stack spacing={0.5} alignItems="center">
                    <Typography variant="h6">{projectRole.label}</Typography>
                    <List
                      sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "auto",
                      }}
                    >
                      {selectedRoleProjects.map((project) => (
                        <ImageListItem
                          key={project._id}
                          cols={1}
                          sx={{ mb: 1 }}
                        >
                          <ProjectCard project={project} />
                        </ImageListItem>
                      ))}
                    </List>
                  </Stack>
                </Box>
              </ListItem>
            );
          } else {
            return null;
          }
        })}
      </ImageList>
    </RootBox>
  );
}

export default ProjectsByRoleSingleLine;
