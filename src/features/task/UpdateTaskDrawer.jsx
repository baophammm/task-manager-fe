import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  FDateField,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";

import { getSingleTask, updateSingleTask } from "./taskSlice";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Card, CssBaseline, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getProjects, getSingleProject } from "../project/projectSlice";

const taskYupSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
});

export default function UpdateTaskDrawer({
  task,
  isLoading,
  isUpdatingTask,
  // toggleUpdatingTask,
  setIsUpdatingTask,
}) {
  const dispatch = useDispatch();
  const { currentPageProjects, projectsById, selectedProject } = useSelector(
    (state) => state.project
  );

  // Task Field Update
  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );

  let projectOptions = projects.map((project) => ({
    value: project._id,
    label: project.title,
  }));

  projectOptions.unshift({ value: "", label: "None" });

  const projectMembers = selectedProject ? selectedProject.projectMembers : [];

  const projectMembersOptions = projectMembers.map((projectMember) => ({
    value: projectMember._id,
    label: `${projectMember.firstName} ${projectMember.lastName} | ${projectMember.email}`,
  }));

  const TASK_FIELDS = [
    { name: "title", label: "Task title", fieldType: "text" },
    { name: "description", label: "Task description", fieldType: "text" },
    {
      name: "projectId",
      label: "Project",
      fieldType: "select",
      options: projectOptions,
    },
    {
      name: "assigneeId",
      label: "Assignee",
      fieldType: "select",
      options: projectMembersOptions,
    },
    {
      name: "taskStatus",
      label: "Task Status",
      fieldType: "select",
      options: [
        { value: "Backlog", label: "Backlog" },
        { value: "InProgress", label: "In Progress" },
        { value: "WaitingForReview", label: "Waiting For Review" },
        { value: "Reviewed", label: "Reviewed" },
        { value: "Completed", label: "Completed" },
        { value: "Archived", label: "Archived" },
      ],
    },
    {
      name: "priority",
      label: "Priority",
      fieldType: "select",
      options: [
        { value: "Critical", label: "Critical" },
        { value: "High", label: "High" },
        { value: "Medium", label: "Medium" },
        { value: "Low", label: "Low" },
      ],
    },
    { name: "startAt", label: "Start At", fieldType: "date" },
    { name: "dueAt", label: "Due At", fieldType: "date" },
  ];

  const defaultValues = {
    title: task?.title || "",
    description: task?.description || "",
    taskStatus: task?.taskStatus || "Backlog",
    priority: task?.priority || "High",
    assigneeId: task?.assignee?._id || "",
    projectId: task?.project?._id || "",
    startAt: dayjs(task?.startAt).format("DD-MM-YYYY") || "",
    dueAt: dayjs(task?.dueAt).format("DD-MM-YYYY") || "",
    files: task?.files || [],
  };

  const methods = useForm({
    resolver: yupResolver(taskYupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    console.log("UPDATE", data);
    dispatch(updateSingleTask({ taskId: task._id, ...data })).then(() => {
      reset();
      dispatch(getSingleTask(task._id));
    });
    setIsUpdatingTask(false);
  };

  useEffect(() => {
    dispatch(getProjects({ limit: 1000 }));
    if (task.project) {
      dispatch(getSingleProject(task.project._id));
    }
  }, [dispatch, task]);

  const updateTaskForm = () => (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{ width: { xs: "90vw", sm: 600 } }}
        role="presentation"
        // onClick={toggleUpdatingTask(false)}
        // onKeyDown={toggleUpdatingTask(false)}
      >
        <CssBaseline />
        <Card sx={{ p: 3 }}>
          <Typography
            variant="h3"
            sx={{
              mb: "12px",
            }}
          >
            Updating Task {task?.title}
          </Typography>
          <Stack spacing={3} alignItems="flex-end" sx={{ mb: "12px" }}>
            {TASK_FIELDS.map((field) => {
              if (field.fieldType === "text") {
                return (
                  <FTextField
                    key={field.name}
                    name={field.name}
                    placeholder={field.label}
                  />
                );
              } else if (field.fieldType === "select") {
                return (
                  <FSelect
                    key={field.name}
                    name={field.name}
                    label={field.label}
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
                );
              } else if (field.fieldType === "date") {
                return (
                  <FDateField
                    key={field.name}
                    name={field.name}
                    label={field.label}
                  />
                );
              } else {
                return null;
              }
            })}
          </Stack>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting || isLoading}
          >
            Save Task
          </LoadingButton>
        </Card>
      </Box>
    </FormProvider>
  );

  return (
    <div>
      <Drawer
        anchor={"right"}
        open={isUpdatingTask}
        onClose={() => setIsUpdatingTask(false)}
      >
        {updateTaskForm()}
      </Drawer>
    </div>
  );
}
