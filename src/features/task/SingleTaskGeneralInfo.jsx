import { Box, Chip, Stack, SvgIcon, Typography } from "@mui/material";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import QueueIcon from "@mui/icons-material/Queue";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import NotesIcon from "@mui/icons-material/Notes";
import React from "react";
import { fDate } from "../../utils/formatTime";
import { useNavigate } from "react-router-dom";
import UserProfilePicture from "../user/UserProfilePicture";

const TASK_STATUS_DICTIONARY = [
  {
    taskStatus: "Backlog",
    label: "Backlog",
    icon: <QueueIcon />,
  },
  {
    taskStatus: "InProgress",
    label: "In Progress",
    icon: <PlayCircleIcon />,
  },
  {
    taskStatus: "Completed",
    label: "Completed",
    icon: <CheckCircleIcon />,
  },
  {
    taskStatus: "Archived",
    label: "Archived",
    icon: <InventoryIcon />,
  },
];

function SingleTaskGeneralInfo({ selectedTask }) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        {selectedTask?.project && (
          <Typography>
            In project:{" "}
            <Typography
              variant="span"
              fontWeight="bold"
              onClick={() => navigate(`/projects/${selectedTask?.project._id}`)}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                },
              }}
            >
              {selectedTask?.project.title}
            </Typography>
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 2,
          mb: 1,
        }}
      >
        <Box>
          <Typography fontWeight="bold">Assignee</Typography>
          <UserProfilePicture targetUser={selectedTask?.assignee} />
        </Box>
        <Box>
          <Typography fontWeight="bold">Effort Estimation</Typography>

          <Chip
            label={`${selectedTask?.effort} ${
              selectedTask?.effort <= 1 ? "hour" : "hours"
            }`}
            icon={<WatchLaterIcon />}
          />
        </Box>
        <Box>
          <Typography fontWeight="bold">Task Status</Typography>
          <Chip
            label={
              TASK_STATUS_DICTIONARY.filter(
                (status) => status.taskStatus === selectedTask.taskStatus
              )[0].label
            }
          />
        </Box>

        {selectedTask?.startAt && (
          <Box>
            <Typography fontWeight="bold">Start date</Typography>

            <Chip label={fDate(selectedTask?.startAt)} />
          </Box>
        )}
        {selectedTask?.dueAt && (
          <Box>
            <Typography fontWeight="bold">Due date</Typography>

            <Chip label={fDate(selectedTask?.dueAt)} />
          </Box>
        )}
      </Box>
      <Stack spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            gap: 1,
          }}
        >
          <SvgIcon fontSize="medium">
            <NotesIcon />
          </SvgIcon>
          <Typography variant="h5">Description</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {selectedTask?.description && (
            <Typography
              sx={{
                p: "4px",
                width: "100%",
                minHeight: "50px",
              }}
            >
              {selectedTask.description}
            </Typography>
          )}
        </Box>
      </Stack>
    </>
  );
}

export default SingleTaskGeneralInfo;
