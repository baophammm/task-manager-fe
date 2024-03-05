import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProjectMemberIconStack from "./ProjectMemberIconStack";
import { fDate } from "../../utils/formatTime";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

function ProjectInformation({ selectedProject, location }) {
  const projectId = selectedProject._id;

  const { isOpeningProjectInfo, setIsOpeningProjectInfo } = useContext(
    ProjectDetailPageContext
  );

  const projectInfoCard = (
    <Card
      sx={{
        // border: "1px solid orange",
        height: 1,
      }}
    >
      <CardContent sx={{ height: 1, pt: 0 }}>
        <Stack spacing={2} sx={{}}>
          <Box
            sx={{
              display: "flex",
              direction: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => setIsOpeningProjectInfo(false)}>
              <ArrowBackIosIcon />
            </IconButton>
          </Box>
          <Typography variant="h5">{selectedProject.title}</Typography>
          <Typography>
            <Typography variant="span" fontWeight="bold">
              Description:{" "}
            </Typography>
            {selectedProject.description}
          </Typography>
          <Typography>
            <Typography variant="span" fontWeight="bold">
              Status:{" "}
            </Typography>
            <Chip label={selectedProject.projectStatus} />
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
            >
              <Typography fontWeight="bold">Project Members:</Typography>
              {selectedProject.projectMembers && (
                <Stack alignItems="center" direction="row" spacing={1}>
                  <ProjectMemberIconStack
                    projectMembers={selectedProject.projectMembers}
                  />
                </Stack>
              )}
            </Link>
          </Box>

          {selectedProject.startAt && (
            <Typography>
              <Typography variant="span" fontWeight="bold">
                Start date:{" "}
              </Typography>
              <Typography>{fDate(selectedProject?.startAt)}</Typography>
            </Typography>
          )}

          {selectedProject.dueAt && (
            <Typography>
              <Typography variant="span" fontWeight="bold">
                Due date:{" "}
              </Typography>
              <Typography>{fDate(selectedProject?.dueAt)}</Typography>
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
  return (
    <>
      {isOpeningProjectInfo ? (
        projectInfoCard
      ) : (
        <Box
          sx={{
            // border: "1px solid orange",
            width: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IconButton
            size="small"
            sx={{ mb: 1 }}
            onClick={() => setIsOpeningProjectInfo(true)}
          >
            <ArrowForwardIosIcon />
          </IconButton>
          <Box
            sx={{
              // border: "1px solid green",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography>P</Typography>
            <Typography>r</Typography>
            <Typography>o</Typography>
            <Typography>j</Typography>
            <Typography>e</Typography>
            <Typography>c</Typography>
            <Typography sx={{ mb: 2 }}>t</Typography>

            <Typography>I</Typography>
            <Typography>n</Typography>
            <Typography>f</Typography>
            <Typography>o</Typography>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProjectInformation;
