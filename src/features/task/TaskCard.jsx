import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";

import QueueIcon from "@mui/icons-material/Queue";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PreviewIcon from "@mui/icons-material/Preview";
import GradingIcon from "@mui/icons-material/Grading";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import FlagIcon from "@mui/icons-material/Flag";

import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TASK_STATUS_ICONS = [
  {
    taskStatus: "Backlog",
    icon: <QueueIcon />,
  },
  {
    taskStatus: "InProgress",
    icon: <PlayCircleIcon />,
  },
  {
    taskStatus: "WaitingForReview",
    icon: <PreviewIcon />,
  },
  {
    taskStatus: "Reviewed",
    icon: <GradingIcon />,
  },
  {
    taskStatus: "Completed",
    icon: <CheckCircleIcon />,
  },
  {
    taskStatus: "Archived",
    icon: <InventoryIcon />,
  },
];

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const updatedTimeDifference =
    new Date().getTime() - new Date(task.updatedAt).getTime();
  const updatedTimeDifferenceInMinute = Math.round(
    updatedTimeDifference / 1000 / 60,
    0
  );
  const updatedTimeDifferenceInHour = Math.round(
    updatedTimeDifferenceInMinute / 60,
    0
  );
  const updatedTimeDifferenceInDay = Math.round(
    updatedTimeDifferenceInHour / 24,
    0
  );

  let taskOverdue = false;
  if (!["Completed", "Archived"].includes(task.taskStatus) && task.dueAt) {
    const dueDateDifference =
      new Date().getTime() - new Date(task.dueAt).getTime();
    if (dueDateDifference > 0) {
      taskOverdue = true;
    }
  }

  return (
    <Card
      onClick={() => navigate(`/tasks/${task._id}`)}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",

        "&:hover": { cursor: "pointer" },
      }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="center">
          <Typography
            align="center"
            gutterBottom
            variant="h5"
            sx={{
              flexGrow: 1,
            }}
          >
            {task.title}
          </Typography>
          {taskOverdue && (
            <div title="Task Overdue flagged">
              <FlagIcon sx={{ color: "error.dark" }} />
            </div>
          )}
        </Stack>
        <Typography align="left" variant="body1">
          <Typography variant="span" fontWeight="bold">
            Description: 
          </Typography>
          {task.description}
        </Typography>
        {task.project && (
          <Typography>
            <Typography variant="span" fontWeight="bold">
              Project:{" "}
            </Typography>
            {task.project?.title}
          </Typography>
        )}
        {task.assignee && (
          <Typography>
            <Typography variant="span" fontWeight="bold">
              Assigned to:{" "}
            </Typography>
            {task.assignee.firstName} {task.assignee.lastName}
          </Typography>
        )}
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
              TASK_STATUS_ICONS.filter(
                (icon) => icon.taskStatus === task.taskStatus
              )[0].icon
            }
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {task.taskStatus.replace(/([A-Z])/g, " $1").trim()}
          </Typography>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <SvgIcon color="action" fontSize="small">
            <ClockIcon />
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            Updated:{" "}
            {updatedTimeDifferenceInMinute < 60
              ? `${updatedTimeDifferenceInMinute} minutes ago`
              : updatedTimeDifferenceInHour <= 48
              ? `${updatedTimeDifferenceInHour} hours ago`
              : `${updatedTimeDifferenceInDay} days ago`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
