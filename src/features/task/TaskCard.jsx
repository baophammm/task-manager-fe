import { Draggable } from "react-beautiful-dnd";

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
import { styled } from "@mui/material/styles";
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
    taskStatus: "Completed",
    icon: <CheckCircleIcon />,
  },
  {
    taskStatus: "Archived",
    icon: <InventoryIcon />,
  },
];

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  marginBottom: "8px",
  backgroundColor: theme.palette.background.default,
}));

const TaskCard = (props) => {
  const navigate = useNavigate();

  const updatedTimeDifference =
    new Date().getTime() - new Date(props.task.updatedAt).getTime();
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
  if (
    !["Completed", "Archived"].includes(props.task.taskStatus) &&
    props.task.dueAt
  ) {
    const dueDateDifference =
      new Date().getTime() - new Date(props.task.dueAt).getTime();
    if (dueDateDifference > 0) {
      taskOverdue = true;
    }
  }

  return (
    // <Draggable draggableId={props.task._id} index={props.index}>
    //   {(provided) => (
    //     <StyledContainer
    //       {...provided.draggableProps}
    //       {...provided.dragHandleProps}
    //       ref={provided.innerRef}
    //     >
    <Card
      onClick={() => navigate(`/tasks/${props.task._id}`)}
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
            {props.task.title}
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
          {props.task.description}
        </Typography>
        {props.task.project && (
          <Typography>
            <Typography variant="span" fontWeight="bold">
              Project:{" "}
            </Typography>
            {props.task.project?.title}
          </Typography>
        )}
        {props.task.assignee && (
          <Typography>
            <Typography variant="span" fontWeight="bold">
              Assigned to:{" "}
            </Typography>
            {props.task.assignee.firstName} {props.task.assignee.lastName}
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
                (icon) => icon.taskStatus === props.task.taskStatus
              )[0].icon
            }
          </SvgIcon>
          <Typography color="text.secondary" display="inline" variant="body2">
            {props.task.taskStatus.replace(/([A-Z])/g, " $1").trim()}
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
    // {/* {props.task.title} */}
    //     </StyledContainer>
    //   )}
    // </Draggable>
  );
};

export default TaskCard;

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};
