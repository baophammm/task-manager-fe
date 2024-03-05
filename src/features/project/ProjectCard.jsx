import PropTypes from "prop-types";

import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import ProjectMemberIconStack from "./ProjectMemberIconStack";
import { Link, useNavigate } from "react-router-dom";

const PROJECT_STATUS_ICONS = [
  { projectStatus: "Planning", icon: <PendingActionsIcon /> },
  { projectStatus: "Ongoing", icon: <PlayCircleIcon /> },
  { projectStatus: "Done", icon: <CheckCircleIcon /> },
];

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        height: "220px",
      }}
    >
      <CardContent
        sx={{
          height: 1,
          p: "12px",
          pb: "4px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography align="center" gutterBottom variant="h5">
            {project.title}
          </Typography>
          <Typography align="left" variant="body1">
            <Typography variant="span" fontWeight="bold">
              Description:{" "}
            </Typography>
            {project.description}
          </Typography>
          <Typography align="left" variant="body1">
            <Typography variant="span" fontWeight="bold">
              Task count:
            </Typography>{" "}
            {project.taskCount}
          </Typography>
          <Typography align="left" variant="body1">
            <Typography variant="span" fontWeight="bold">
              Project Owner:
            </Typography>{" "}
            {project.projectOwner.firstName} {project.projectOwner.lastName}
          </Typography>
        </Box>

        <Box
          sx={{
            // border: "1px solid green",
            position: "absolute",
            bottom: 6,
            right: 0,
            height: "40px",
            width: "100%",
          }}
        >
          <Divider sx={{ width: 1 }} />
          <Box
            sx={{
              // mt: "6px",
              px: "2px",
              display: "flex",
              justifyContent: "space-between",
              height: 1,
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ height: "100%" }}
            >
              <SvgIcon color="action" fontSize="small">
                {
                  PROJECT_STATUS_ICONS.filter(
                    (icon) => icon.projectStatus === project.projectStatus
                  )[0].icon
                }
              </SvgIcon>
              <Typography
                color="text.secondary"
                display="inline"
                variant="body2"
                textAlign="center"
              >
                {project.projectStatus}
              </Typography>
            </Stack>
            <div>
              <Link to={`/projects/${project._id}`}>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ZoomInIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  See Details
                </Button>
              </Link>
            </div>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
};
