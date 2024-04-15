import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import {
  FDateField,
  FNumberField,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";

import { updateSingleTask } from "../task/taskSlice";
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
  effort: Yup.number("Effort Estimation must be number").required(
    "Effort Estimation is required"
  ),
  startAt: Yup.string()
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Start date must be in the format YYYY-MM-DD"
    )
    .required("Start date is required"),
  dueAt: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Due date must be in the format YYYY-MM-DD")
    .required("Due date is required"),
});

export default function UpdateTaskDrawer({
  task,
  isLoading,
  isUpdatingTask,
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
    { name: "effort", label: "Effort Estimation (hours)", fieldType: "number" },
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
        { value: "Completed", label: "Completed" },
        { value: "Archived", label: "Archived" },
      ],
    },

    { name: "startAt", label: "Start At", fieldType: "date" },
    { name: "dueAt", label: "Due At", fieldType: "date" },
  ];

  const defaultValues = {
    title: task?.title || "",
    description: task?.description || "",
    effort: task?.effort || null,
    taskStatus: task?.taskStatus || "Backlog",
    assigneeId: task?.assignee?._id || null,
    projectId: task?.project?._id || null,
    startAt: task?.startAt ? dayjs(task?.startAt).format("YYYY-MM-DD") : null,
    dueAt: task?.dueAt ? dayjs(task?.dueAt).format("YYYY-MM-DD") : null,
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
    dispatch(updateSingleTask({ taskId: task._id, ...data })).then(() => {
      reset();
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
        sx={{
          height: "100vh",
          width: { xs: "90vw", sm: 600 },
        }}
        role="presentation"
      >
        <CssBaseline />
        <Card sx={{ height: 1, p: 3 }}>
          <Typography
            variant="h5"
            sx={{
              mb: "12px",
            }}
          >
            Updating Task: {task?.title}
          </Typography>
          <Stack spacing={2} alignItems="flex-end" sx={{ mb: "12px" }}>
            {TASK_FIELDS.map((field) => {
              if (field.fieldType === "text") {
                return (
                  <FTextField
                    key={field.name}
                    name={field.name}
                    placeholder={field.label}
                  />
                );
              } else if (field.fieldType === "number") {
                return (
                  <FNumberField
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
          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting || isLoading}
            >
              Save
            </LoadingButton>
          </Box>
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
