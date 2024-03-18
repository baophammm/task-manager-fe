import { Box, Chip, Stack, Typography } from "@mui/material";
import QueueIcon from "@mui/icons-material/Queue";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ClearIcon from "@mui/icons-material/Clear";
import PreviewIcon from "@mui/icons-material/Preview";
import GradingIcon from "@mui/icons-material/Grading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
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
          // border: "1px solid red",
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
      <Stack
        direction="row"
        spacing={3}
        flexWrap="wrap"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          mb: 1,
        }}
      >
        <Box>
          <Typography fontWeight="bold">Assignee</Typography>
          <UserProfilePicture targetUser={selectedTask?.assignee} />
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
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h5">Description</Typography>
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
