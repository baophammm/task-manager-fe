import {
  Box,
  Card,
  CardContent,
  Chip,
  CssBaseline,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ProjectMemberIconStack from "./ProjectMemberIconStack";
import { fDate } from "../../utils/formatTime";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

function ProjectInformationDrawer({ project, location }) {
  const projectId = project._id;

  const { isOpeningProjectInfo, setIsOpeningProjectInfo } = useContext(
    ProjectDetailPageContext
  );

  return (
    <div>
      <Drawer
        anchor="left"
        open={isOpeningProjectInfo}
        onClose={() => setIsOpeningProjectInfo(false)}
      >
        <Box
          sx={{
            height: 1,
            width: 300,
            p: 1,
          }}
          role="presentation"
        >
          <CssBaseline />
          <Card
            sx={{
              height: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">{project.title}</Typography>
                <Typography>
                  <Typography variant="span" fontWeight="bold">
                    Description:{" "}
                  </Typography>
                  {project.description}
                </Typography>
                <Typography>
                  <Typography variant="span" fontWeight="bold">
                    Status:{" "}
                  </Typography>
                  <Chip label={project.projectStatus} />
                </Typography>
                <Box
                  sx={{
                    "&:hover": {
                      color: "info.dark",
                    },
                  }}
                >
                  <Link
                    to={`/projects/${projectId}/projectMembers`}
                    state={{ backgroundLocation: location }}
                    style={{ textDecoration: "none", color: "inherit" }}
                    onClick={() => setIsOpeningProjectInfo(false)}
                  >
                    <Typography fontWeight="bold">Project Members:</Typography>
                    {project.projectMembers && (
                      <Stack alignItems="center" direction="row" spacing={1}>
                        <ProjectMemberIconStack
                          projectMembers={project.projectMembers}
                        />
                      </Stack>
                    )}
                  </Link>
                </Box>

                {project.startAt && (
                  <Typography>
                    <Typography variant="span" fontWeight="bold">
                      Start date:{" "}
                    </Typography>
                    <Typography>{fDate(project?.startAt)}</Typography>
                  </Typography>
                )}

                {project.dueAt && (
                  <Typography>
                    <Typography variant="span" fontWeight="bold">
                      Due date:{" "}
                    </Typography>
                    <Typography>{fDate(project?.dueAt)}</Typography>
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Drawer>
    </div>
  );
}

export default ProjectInformationDrawer;
