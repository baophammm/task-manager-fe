import React, { useContext } from "react";
import { TaskDetailModalContext } from "./TaskDetailModal";
import { Box, Button, Chip, SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import WatchLaterIcon from "@mui/icons-material/WatchLater";
import QueueIcon from "@mui/icons-material/Queue";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import AddIcon from "@mui/icons-material/Add";
import NotesIcon from "@mui/icons-material/Notes";

import { fDate } from "../../utils/formatTime";
import UserProfilePicture from "../user/UserProfilePicture";

const StyledInfoBoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: 2,
}));
const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const TASK_STATUS_DICTIONARY = [
  {
    taskStatus: "Backlog",
    label: "Backlog",
    backgroundColor: "info.main",
    icon: <QueueIcon color="white" />,
  },
  {
    taskStatus: "InProgress",
    label: "In Progress",
    backgroundColor: "primary.main",
    icon: <PlayCircleIcon color="white" />,
  },
  {
    taskStatus: "Completed",
    label: "Completed",
    backgroundColor: "success.main",
    icon: <CheckCircleIcon color="white" />,
  },
  {
    taskStatus: "Archived",
    label: "Archived",
    backgroundColor: "error.dark",
    icon: <InventoryIcon color="white" />,
  },
];

function SingleTaskGeneralInfoSection() {
  const {
    selectedTask,
    disableUpdateTask,
    handleOpenAddTagFormMenu,
    AddTagFormMenu,
  } = useContext(TaskDetailModalContext);

  let taskOverdue = false;
  if (
    !["Completed", "Archived"].includes(selectedTask.taskStatus) &&
    selectedTask.dueAt
  ) {
    const dueDateDifference =
      new Date().getTime() - new Date(selectedTask.dueAt).getTime();
    if (dueDateDifference > 0) {
      taskOverdue = true;
    }
  }

  return (
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
      <StyledInfoBoxContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography fontWeight="bold">Assignee</Typography>
        <UserProfilePicture targetUser={selectedTask?.assignee} />
      </StyledInfoBoxContainer>
      {selectedTask?.tags.length > 0 && (
        <StyledInfoBoxContainer>
          <Typography fontWeight="bold">Tags</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            {selectedTask.tags.map((tag) => (
              <StyledChip
                key={tag._id}
                label={tag.tagLabel}
                sx={{
                  backgroundColor: `tag.${tag.color}.${tag.colorShade}`,
                  color: `tag.${tag.color}.contrastText`,
                }}
              />
            ))}
            {!disableUpdateTask && (
              <Box>
                <StyledChip
                  onClick={handleOpenAddTagFormMenu}
                  label={
                    <SvgIcon fontSize="small">
                      <AddIcon />
                    </SvgIcon>
                  }
                />
                {AddTagFormMenu}
              </Box>
            )}
          </Box>
        </StyledInfoBoxContainer>
      )}
      <StyledInfoBoxContainer>
        <Typography fontWeight="bold">Effort Estimation</Typography>

        <StyledChip
          label={`${selectedTask?.effort} ${
            selectedTask?.effort <= 1 ? "hour" : "hours"
          }`}
          icon={<WatchLaterIcon />}
        />
      </StyledInfoBoxContainer>
      <StyledInfoBoxContainer>
        <Typography fontWeight="bold">Task Status</Typography>
        <StyledChip
          icon={
            TASK_STATUS_DICTIONARY.filter(
              (status) => status.taskStatus === selectedTask.taskStatus
            )[0].icon
          }
          label={
            TASK_STATUS_DICTIONARY.filter(
              (status) => status.taskStatus === selectedTask.taskStatus
            )[0].label
          }
          sx={{
            backgroundColor: TASK_STATUS_DICTIONARY.filter(
              (status) => status.taskStatus === selectedTask.taskStatus
            )[0].backgroundColor,
            color: "white",
          }}
        />
      </StyledInfoBoxContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {selectedTask?.startAt && (
          <StyledInfoBoxContainer>
            <Typography fontWeight="bold">Start date</Typography>

            <StyledChip label={fDate(selectedTask?.startAt)} />
          </StyledInfoBoxContainer>
        )}
        {selectedTask?.dueAt && (
          <StyledInfoBoxContainer>
            <Typography fontWeight="bold">Due date</Typography>

            <StyledChip
              label={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="subTitle">
                    {fDate(selectedTask?.dueAt)}
                  </Typography>
                  {taskOverdue && (
                    <Typography
                      variant="subTitle"
                      sx={{
                        borderRadius: "2px",
                        p: 0.1,
                        backgroundColor: "error.dark",
                        color: "neutral.200",
                      }}
                    >
                      Overdue
                    </Typography>
                  )}
                </Box>
              }
            />
          </StyledInfoBoxContainer>
        )}
      </Box>
    </Box>
  );
}

export default SingleTaskGeneralInfoSection;
