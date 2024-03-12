import { Draggable } from "react-beautiful-dnd";

import PropTypes from "prop-types";
import QueueIcon from "@mui/icons-material/Queue";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import FlagIcon from "@mui/icons-material/Flag";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TASK_STATUS_ICONS = [
  {
    taskStatus: "Backlog",
    icon: <QueueIcon />,
    color: "info.main",
  },
  {
    taskStatus: "InProgress",
    icon: <PlayCircleIcon />,
    color: "primary.main",
  },
  {
    taskStatus: "Completed",
    icon: <CheckCircleIcon />,
    color: "success.main",
  },
  {
    taskStatus: "Archived",
    icon: <InventoryIcon />,
    color: "error.dark",
  },
];

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  marginBottom: "8px",
  backgroundColor: theme.palette.background.default,
}));

const Task = (props) => {
  // const navigate = useNavigate();
  const location = useLocation();

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
    <Draggable draggableId={props.task._id} index={props.index}>
      {(provided) => (
        <StyledContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Link
            to={`/tasks/${props.task._id}`}
            state={{ backgroundLocation: location }}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Card
              // onClick={() => navigate(`/tasks/${props.task._id}`)}
              sx={{
                // border: "1px solid red",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                p: 3,
                "&:hover": { cursor: "pointer" },
              }}
            >
              <CardContent
                sx={{
                  // border: "1px solid red",
                  p: 0,
                  pb: 1,
                }}
              >
                <Typography
                  align="left"
                  gutterBottom
                  variant="h6"
                  sx={{
                    // border: "1px solid green",
                    flexGrow: 1,
                  }}
                >
                  {props.task.title}
                </Typography>

                <Typography align="left" variant="body2">
                  <Typography variant="span" fontWeight="bold">
                    Description: 
                  </Typography>
                  {props.task.description}
                </Typography>
                {props.task.project && (
                  <Typography align="left" variant="body2">
                    <Typography variant="span" fontWeight="bold">
                      Project:{" "}
                    </Typography>
                    {props.task.project?.title}
                  </Typography>
                )}
                {props.task.assignee && (
                  <Typography align="left" variant="body2">
                    <Typography variant="span" fontWeight="bold">
                      Assigned to:{" "}
                    </Typography>
                    {props.task.assignee.firstName}{" "}
                    {props.task.assignee.lastName}
                  </Typography>
                )}
              </CardContent>

              <Divider />
              <Grid
                container
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={0}
                sx={{
                  // border: "1px solid red",
                  width: 1,
                  m: 0,
                  p: 0,
                  // px: 2,
                }}
              >
                <Grid item xs={taskOverdue ? 8 : 12}>
                  <Stack alignItems="center" direction="row" spacing={1}>
                    <SvgIcon color="action" fontSize="small">
                      <ClockIcon />
                    </SvgIcon>
                    <Typography display="inline" variant="caption">
                      Updated:{" "}
                      {updatedTimeDifferenceInMinute < 60
                        ? `${updatedTimeDifferenceInMinute} minutes ago`
                        : updatedTimeDifferenceInHour <= 48
                        ? `${updatedTimeDifferenceInHour} hours ago`
                        : `${updatedTimeDifferenceInDay} days ago`}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={4}>
                  {taskOverdue && (
                    <Stack alignItems="center" direction="row" spacing={0}>
                      <SvgIcon color="error" fontSize="small">
                        <PriorityHighIcon />
                      </SvgIcon>

                      <Typography
                        variant="caption"
                        color="error"
                        fontWeight="bold"
                      >
                        Overdue
                      </Typography>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Link>
        </StyledContainer>
      )}
    </Draggable>
  );
};

export default Task;

Task.propTypes = {
  task: PropTypes.object.isRequired,
};
