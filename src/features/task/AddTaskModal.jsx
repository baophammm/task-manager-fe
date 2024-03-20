import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { CssBaseline, Box, Typography, Container, Stack } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  FDateField,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";

import { createTask, getTasks } from "./taskSlice";
import { getProjects } from "../project/projectSlice";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  background: theme.palette.action.disabled,

  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",

  WebkitOverflowScrolling: "touch",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows,
  borderRadius: 24,

  minHeight: "80vh",
  width: "80%",
  maxWidth: "800px",
  padding: 12,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const taskYupSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
});

const TASK_FIELDS = [
  { name: "title", label: "Task title", fieldType: "text" },
  { name: "description", label: "Task description", fieldType: "text" },
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

function AddTaskModal() {
  const addTaskLocation = useLocation();
  const from = addTaskLocation.state?.backgroundLocation?.pathname || "/tasks";
  const { isLoading } = useSelector((state) => state.task);
  const { currentPageProjects, projectsById } = useSelector(
    (state) => state.project
  );

  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );
  let projectOptions = projects.map((project) => ({
    value: project._id,
    label: project.title,
  }));

  projectOptions.unshift({ value: "", label: "None" });

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

  const modalRef = useRef();
  const navigate = useNavigate();

  const { user } = useAuth();
  const currentUserId = user._id;

  const defaultValues = {
    title: "",
    description: "",
    taskStatus: "Backlog",
    projectId: "",
    startAt: "",
    dueAt: "",
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects({ limit: 1000 }));
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(createTask(data)).then(() => {
      dispatch(getTasks({ assigneeId: currentUserId }));
      reset();
    });
    navigate(`/tasks`);
  };
  return (
    <ModalWrapperBox
      ref={modalRef}
      onClick={() => navigate(from)} //return to previous location
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Container
          component="main"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <CssBaseline />

          <Typography
            variant="h3"
            sx={{
              mb: "12px",
            }}
          >
            Add New Task
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
              Add Task
            </LoadingButton>
          </FormProvider>
        </Container>
      </ModalBox>
    </ModalWrapperBox>
  );
}

export default AddTaskModal;
