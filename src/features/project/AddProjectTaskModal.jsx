import React, { useContext, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import { CssBaseline, Box, Typography, Container, Stack } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import {
  FDateField,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";
import dayjs from "dayjs";
import { createTask, getTasks } from "../task/taskSlice";
import { getSingleProject } from "./projectSlice";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  // background: alpha(theme.palette.background.paper, 0.36),
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
  description: Yup.string().required("Task description is required"),
});

function AddProjectTaskModal() {
  const { isLoading } = useSelector((state) => state.task);

  const modalRef = useRef();
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId;

  const dispatch = useDispatch();
  const { selectedProject, isLoading: isLoadingProject } = useSelector(
    (state) => state.project
  );

  useEffect(() => {
    if (projectId) dispatch(getSingleProject(projectId));
  }, [projectId, dispatch]);

  //Assignee Options => matching users and project member id
  const selectedProjectAssigneeOptions = selectedProject.projectMembers.map(
    (projectMember) => ({
      value: projectMember._id,
      label: `${projectMember.firstName} ${projectMember.lastName} | ${projectMember.email}`,
    })
  );

  // console.log(selectedProjectAssigneeOptions);
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
    {
      name: "assigneeId",
      label: "Assignee",
      fieldType: "select",
      options: selectedProjectAssigneeOptions,
    },
    { name: "startAt", label: "Start At", fieldType: "date" },
    { name: "dueAt", label: "Due At", fieldType: "date" },
  ];

  const defaultValues = {
    title: "",
    description: "",
    taskStatus: "Backlog",
    assigneeId: "",
    projectId: projectId,
    startAt: "",
    dueAt: "",
    files: [""],
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

  const onSubmit = async (data) => {
    dispatch(createTask(data)).then(() => {
      getTasks({ projectId, limit: 1000 });
      reset();
    });
    navigate(`/projects/${projectId}`);
  };
  return (
    <ModalWrapperBox
      ref={modalRef}
      onClick={() => navigate(`/projects/${projectId}`)}
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
            Add New Task to Project {selectedProject?.title}
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

export default AddProjectTaskModal;
