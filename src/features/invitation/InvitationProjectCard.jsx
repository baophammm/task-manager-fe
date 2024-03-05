import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";
import useAuth from "../../hooks/useAuth";

const PROJECT_STATUS_ICONS = [
  { projectStatus: "Planning", icon: <PendingActionsIcon /> },
  { projectStatus: "Ongoing", icon: <PlayCircleIcon /> },
  { projectStatus: "Done", icon: <CheckCircleIcon /> },
];

function InvitationProjectCard({ project }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const currentUserId = user._id;
  const { _id: projectId, title, projectOwner, invitation } = project;

  // console.log(currentUserId);
  const actionButton = (
    <ActionButton
      currentUserId={currentUserId}
      targetUserId={invitation.from}
      invitation={project.invitation}
      projectId={projectId}
    />
  );
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography align="center" gutterBottom variant="h5">
          <Typography variant="span" fontWeight="bold">
            Project:{" "}
          </Typography>
          {title}
        </Typography>

        <Typography align="left" variant="body1">
          <Typography variant="span" fontWeight="bold">
            Project Owner:
          </Typography>{" "}
          {projectOwner.firstName} {projectOwner.lastName}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 2 }}
      >
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            {
              PROJECT_STATUS_ICONS.filter(
                (icon) => icon.projectStatus === project.projectStatus
              )[0].icon
            }
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {project.projectStatus}
          </Typography>
        </Stack>
        {actionButton}
      </Stack>
    </Card>
  );
}

export default InvitationProjectCard;
