import React, { useContext, useMemo, useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@mui/material";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
  TimeSeriesScale,
  TimeScale,
  Title,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Title,
  LineController,
  BarController,
  zoomPlugin,
  TimeScale,
  TimeSeriesScale
);

const DATE_FORMAT = "00:00:00 GMT+0700";
const getFormattedDate = (date) =>
  Date.parse(`${date.toISOString().slice(0, 10)} ${DATE_FORMAT}`);
const filterIdealTasksByDate = (tasks, date) =>
  tasks.filter(
    (task) =>
      task.dueAt && new Date(task.dueAt).toISOString().slice(0, 10) === date
  );

const filterActualTasksByDate = (tasks, date) =>
  tasks.filter(
    (task) =>
      task.completedAt &&
      new Date(task.completedAt).toISOString().slice(0, 10) === date
  );

const reduceTasksEffort = (tasks) =>
  tasks.reduce((acc, task) => acc + task.effort, 0);

const initializeData = (dataArray, startDate, effort, totalEffort) => {
  if (dataArray.length === 0) {
    dataArray.push({
      x: getFormattedDate(startDate),
      y: effort === totalEffort ? effort : totalEffort,
    });
  }
};

const updateMiddlePointData = (
  currentDate,
  labelDate,
  endDate,
  actualDataArray,
  actualDataPoint
) => {
  if (
    getFormattedDate(currentDate) === getFormattedDate(new Date(labelDate)) &&
    getFormattedDate(currentDate) !== getFormattedDate(endDate)
  ) {
    actualDataArray.push(actualDataPoint);
  }
};

const handleNewPeriod = (
  idealDataArray,
  actualDataArray,
  endDate,
  labelDate,
  currentDate,
  idealDataPoint,
  actualDataPoint,
  startDate,
  periodType
) => {
  const nextDay = new Date(endDate.getTime());
  nextDay.setDate(nextDay.getDate() + 1);

  if (
    new Date(labelDate).toISOString().slice(0, 10) ===
    nextDay.toISOString().slice(0, 10)
  ) {
    idealDataArray.push(idealDataPoint);

    const previousStartIndex = actualDataArray.findIndex(
      (data) => data.x === getFormattedDate(startDate)
    );

    if (
      nextDay.toISOString().slice(0, 10) <=
      currentDate.toISOString().slice(0, 10)
    ) {
      actualDataArray.splice(previousStartIndex + 1);
    }

    actualDataArray.push(actualDataPoint);

    if (periodType === "week") {
      startDate.setDate(startDate.getDate() + 7);
      endDate.setDate(endDate.getDate() + 7);
    } else if (periodType === "month") {
      startDate.setMonth(startDate.getMonth() + 1);
      startDate.setDate(1);
      endDate.setDate(endDate.getDate() + 45); //make sure it lands in the middle of the month after next one and before the next one
      endDate.setDate(0);
    }
  }
};

const handleLastLabel = (dataArray, labels, labelDate, dataPoint) => {
  if (labels.indexOf(labelDate) === labels.length - 1) {
    dataArray.push(dataPoint);
  }
};

function BurndownChart({ project, tasks }) {
  const { isDisplayingProjectCharts } = useContext(ProjectDetailPageContext);

  const [pointSize, setPointSize] = useState(2);
  let startAt, dueAt, totalEffort;
  if (project) {
    ({ startAt, dueAt, totalEffort } = project);
  }

  const labels = [];

  let currentDate = new Date();
  let startDate = new Date(startAt);
  let dueDate = new Date(dueAt);

  // check beginning date. If there is completed task before start date, then use the first completed date as the beginning date. Else use the start date as the beginning date
  let beginningDate = new Date(startAt);

  const completedTasksBeforeStart = tasks.filter(
    (task) =>
      (task.completedAt && new Date(task.completedAt) < startDate) || false
  );

  if (completedTasksBeforeStart.length) {
    beginningDate = new Date(
      completedTasksBeforeStart.reduce((acc, task) => {
        if (task.completedAt) {
          return task.completedAt < acc ? task.completedAt : acc;
        }
        return acc;
      }).completedAt
    );
  }

  // check ending date label
  // Check if project is finished
  let isProjectFinished = false;

  // check if remaining effort is 0
  const completedTasks = tasks.filter(
    (task) => task.taskStatus === "Completed" || task.taskStatus === "Archived"
  );
  const completedEffort = completedTasks.reduce(
    (acc, task) => acc + task.effort,
    0
  );

  if (completedEffort === totalEffort) {
    isProjectFinished = true;
  }

  // if finished, use last completed date
  let lastCompletedDate = completedTasks.length
    ? new Date(
        completedTasks.reduce((acc, task) => {
          if (task.completedAt) {
            return task.completedAt > acc ? task.completedAt : acc;
          }
          return acc;
        }).completedAt
      )
    : null;

  let isPastProjectDueDate = false;
  if (isProjectFinished) {
    // check if last completed date is greater than dueAt
    // checking all completed tasks, if last completed date is greater than dueAt

    if (lastCompletedDate > dueDate) {
      isPastProjectDueDate = true;
    }
  } else {
    // if not finished, use today
    if (currentDate > dueDate) {
      isPastProjectDueDate = true;
    }
  }

  // find the ending date. If project is finished and past due date or not finished but not yet due date, then use due date as the last date label. If not finished but past due date, then use today as the last date label. If finished and past due date, then use last completed date as the last date label. If not finished and not past due date, then use due date as the last date label
  let endingDate =
    (isProjectFinished && !isPastProjectDueDate) ||
    (!isProjectFinished && !isPastProjectDueDate)
      ? dueDate
      : !isProjectFinished && isPastProjectDueDate
      ? currentDate
      : isProjectFinished && isPastProjectDueDate
      ? lastCompletedDate
      : dueDate;

  while (beginningDate <= endingDate) {
    labels.push(beginningDate.toISOString().slice(0, 10));
    beginningDate.setDate(beginningDate.getDate() + 1);
  }

  // break labels into days, weeks and months, matching the week and month of calendar
  let idealEffort = totalEffort;
  let actualEffort = totalEffort;

  // 1st week start: find the first sunday before labels[0]. If sunday, then labels[0] is the 1st week start, else, 1st week start is the labels[0] - (labels[0].getDay() + 1) days. note that the labels[0] is in string format, so convert it to Date object first.

  let weekStart = new Date(labels[0]);
  const firstWeekStartDay = weekStart.getDay();
  if (firstWeekStartDay !== 0) {
    weekStart.setDate(weekStart.getDate() - firstWeekStartDay);
  }

  let weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);

  // 1st month start: find if date of labels[0] is the 1st day of the month, if not, then find the 1st day of the month of labels[0]
  let monthStart = new Date(labels[0]);
  const firstMonthStartDate = monthStart.getDate();
  if (firstMonthStartDate !== 1) {
    monthStart.setDate(1);
  }

  let monthEnd = new Date(monthStart);
  monthEnd.setMonth(monthEnd.getMonth() + 1);
  monthEnd.setDate(monthEnd.getDate() - 1);

  const calculateEffortDataSets = (labels, tasks, currentDate) => {
    const idealDayData = [];
    const idealWeekData = [];
    const idealMonthData = [];

    const actualDayData = [];
    const actualWeekData = [];
    const actualMonthData = [];

    labels.forEach((labelDate) => {
      const selectedIdealTasks = filterIdealTasksByDate(tasks, labelDate);
      const selectedIdealEffort = reduceTasksEffort(selectedIdealTasks);

      idealEffort -= selectedIdealEffort;

      if (currentDate > new Date(labelDate)) {
        const selectedActualTasks = filterActualTasksByDate(tasks, labelDate);
        const selectedActualEffort = reduceTasksEffort(selectedActualTasks);

        actualEffort -= selectedActualEffort;
      }

      const idealDataPoint = {
        x: getFormattedDate(new Date(labelDate)),
        y: idealEffort,
      };

      const actualDataPoint =
        currentDate > new Date(labelDate)
          ? {
              x: getFormattedDate(new Date(labelDate)),
              y: actualEffort,
            }
          : {};

      // Day data
      idealDayData.push(idealDataPoint);
      actualDayData.push(actualDataPoint);

      // Week data

      // handle 1st week data point.
      initializeData(idealWeekData, weekStart, idealEffort, totalEffort);
      initializeData(actualWeekData, weekStart, actualEffort, totalEffort);
      // update middle of week data point
      updateMiddlePointData(
        currentDate,
        labelDate,
        weekEnd,
        actualWeekData,
        actualDataPoint
      );

      handleNewPeriod(
        idealWeekData,
        actualWeekData,
        weekEnd,
        labelDate,
        currentDate,
        idealDataPoint,
        actualDataPoint,
        weekStart,
        "week"
      );
      // handle last label data point
      handleLastLabel(idealWeekData, labels, labelDate, idealDataPoint);
      handleLastLabel(actualWeekData, labels, labelDate, actualDataPoint);

      // Month data
      // handle 1st month data point.
      initializeData(idealMonthData, monthStart, idealEffort, totalEffort);
      initializeData(actualMonthData, monthStart, actualEffort, totalEffort);
      // update middle of month data point
      // only update data middle of month if it is the current date and not on the end of month
      updateMiddlePointData(
        currentDate,
        labelDate,
        monthEnd,
        actualMonthData,
        actualDataPoint
      );
      // updateData(actualMonthData, monthStart, actualEffort, actualDataPoint);
      // handle each new month data point
      handleNewPeriod(
        idealMonthData,
        actualMonthData,
        monthEnd,
        labelDate,
        currentDate,
        idealDataPoint,
        actualDataPoint,
        monthStart,
        "month"
      );
      // handle last label data point
      handleLastLabel(idealMonthData, labels, labelDate, idealDataPoint);
      handleLastLabel(actualMonthData, labels, labelDate, actualDataPoint);
    });

    return {
      idealDayData,
      actualDayData,
      idealWeekData,
      actualWeekData,
      idealMonthData,
      actualMonthData,
    };
  };

  const {
    idealDayData,
    actualDayData,
    idealWeekData,
    actualWeekData,
    idealMonthData,
    actualMonthData,
  } = useMemo(
    () => calculateEffortDataSets(labels, tasks, currentDate),
    [tasks, labels, currentDate]
  );
  const [scaleTimeOption, setScaleTimeOption] = useState("week");
  const [idealData, setIdealData] = useState(idealDayData);
  const [actualData, setActualData] = useState(actualDayData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        display: true,
        labels: {
          usePointStyle: true,
          boxWidth: 12,
        },
      },

      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",

          onZoom: ({ chart }) => {
            if (chart && chart.scales && chart.scales.x) {
              const xAxis = chart.scales.x;
              const zoomLevel = xAxis.max - xAxis.min;
              const newPointSize = zoomLevel > 30 ? 1 : zoomLevel > 10 ? 3 : 8;
              setPointSize(newPointSize);
            }
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: scaleTimeOption,
        },
      },
      y: {
        title: {
          display: true,
          text: "Effort (hrs)",
        },
        beginAtZero: true,
      },
    },
    layout: {
      padding: {
        top: 10,
        right: 10,
        left: 10,
        bottom: 50,
      },
    },
  };

  // setup
  const data = {
    datasets: [
      {
        label: "Ideal (hrs)",
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
        data: idealData,
        pointRadius: isDisplayingProjectCharts ? pointSize : 0,
      },
      {
        label: "Actual (hrs)",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        data: actualData,
        pointRadius: isDisplayingProjectCharts ? pointSize : 0,
      },
    ],
  };

  const handleTimeFrame = (period) => {
    setScaleTimeOption(period);
    if (period === "day") {
      setIdealData(idealDayData);
      setActualData(actualDayData);
    } else if (period === "week") {
      setIdealData(idealWeekData);
      setActualData(actualWeekData);
    } else if (period === "month") {
      setIdealData(idealMonthData);
      setActualData(actualMonthData);
    }
  };

  const timeframeOptionSelectionButtons = (
    <Box
      sx={{
        position: "absolute",
        left: 2,
        top: 2,
        display: { xs: "none", md: "flex" },
        gap: 1,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => handleTimeFrame("day")}
        size="small"
        sx={{
          border: "1.5px solid",
          p: 0,
          height: "30px !important",
          backgroundColor: scaleTimeOption === "day" ? "primary.main" : "",
          color: scaleTimeOption === "day" ? "primary.contrastText" : "",
          borderColor: scaleTimeOption === "day" ? "primary.dark" : "",
        }}
      >
        Day
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleTimeFrame("week")}
        size="small"
        sx={{
          border: "1.5px solid",
          p: 0,
          height: "30px !important",
          backgroundColor: scaleTimeOption === "week" ? "primary.main" : "",
          color: scaleTimeOption === "week" ? "primary.contrastText" : "",
          borderColor: scaleTimeOption === "week" ? "primary.dark" : "",
        }}
      >
        Week
      </Button>
      <Button
        variant="outlined"
        onClick={() => handleTimeFrame("month")}
        size="small"
        sx={{
          border: "1.5px solid",
          p: 0,
          height: "30px !important",
          backgroundColor: scaleTimeOption === "month" ? "primary.main" : "",
          color: scaleTimeOption === "month" ? "primary.contrastText" : "",
          borderColor: scaleTimeOption === "month" ? "primary.dark" : "",
        }}
      >
        Month
      </Button>
    </Box>
  );

  const [menuPosition, setMenuPosition] = useState(null);

  const handleOpenTimeframeOptionSelectionMenu = (event) => {
    if (event) {
      const rect = event.currentTarget.getBoundingClientRect();
      setMenuPosition({ top: rect.top, left: rect.right });
    }
  };

  const handleCloseTimeframeOptionSelectionMenu = () => {
    setMenuPosition(null);
  };

  const TimeframeOptionSelectionMenu = (
    <Menu
      id="menu-timeframeoption"
      anchorReference="anchorPosition"
      anchorPosition={menuPosition}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={Boolean(menuPosition)}
      onClose={handleCloseTimeframeOptionSelectionMenu}
      sx={{
        mt: "35px",
        ml: "-30px",
        display: { xs: "block" },
      }}
    >
      <MenuItem
        onClick={() => {
          handleTimeFrame("day");
          handleCloseTimeframeOptionSelectionMenu();
        }}
        sx={{
          fontSize: "0.8rem",
        }}
      >
        Day
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleTimeFrame("week");
          handleCloseTimeframeOptionSelectionMenu();
        }}
        sx={{
          fontSize: "0.8rem",
        }}
      >
        Week
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleTimeFrame("month");
          handleCloseTimeframeOptionSelectionMenu();
        }}
        sx={{
          fontSize: "0.8rem",
        }}
      >
        Month
      </MenuItem>
    </Menu>
  );

  const timeframeOptionSelection = (
    <Box
      sx={{
        width: "30px",
        position: "absolute",
        left: 3,
        top: 3,
        display: { xs: "flex", md: "none" },
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        size="small"
        variant="outlined"
        onClick={handleOpenTimeframeOptionSelectionMenu}
        sx={{
          border: "1.5px solid",
          p: 0,
          minWidth: "32px !important",
          width: "32px !important",
          height: "32px !important",

          fontSize: "1.1rem",
        }}
      >
        {scaleTimeOption === "day"
          ? "D"
          : scaleTimeOption === "week"
          ? "W"
          : "M"}
      </Button>
      {TimeframeOptionSelectionMenu}
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        border: "2px solid",
        borderColor: "background.secondary",
        width: 1,
        borderRadius: "4px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        height: 1,
      }}
    >
      {isDisplayingProjectCharts && (
        <>
          {timeframeOptionSelectionButtons}
          {timeframeOptionSelection}
        </>
      )}

      <Typography
        variant="h5"
        sx={{
          px: "36px",
        }}
      >
        {isDisplayingProjectCharts ? "Burndown Chart" : "Progress"}
      </Typography>
      <Line options={options} data={data} />
    </Box>
  );
}

export default BurndownChart;
