import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import {
  Avatar,
  CssBaseline,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Stack,
  Card,
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
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
import dayjs from "dayjs";
import { createTask } from "./taskSlice";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  background: theme.palette.background.paper,
  // opacity: "60%",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  // overflowY: 'scroll',
  WebkitOverflowScrolling: "touch",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.neutral[600],
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  minHeight: "80vh",
  width: "95%",
  maxWidth: "800px",
  padding: 10,

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

function AddTaskModal() {
  const { isLoading } = useSelector((state) => state.task);

  const modalRef = useRef();
  const navigate = useNavigate();

  const { user } = useAuth();

  const defaultValues = {
    title: "",
    description: "",
    taskStatus: "Backlog",
    priority: "High",
    // assigneeId: null,
    // projectId: null,
    startAt: null,
    dueAt: null,
    // files: [],
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

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(createTask(data)).then(() => reset());
    navigate(`/tasks`);
  };
  return (
    <ModalWrapperBox ref={modalRef} onClick={() => navigate("/tasks")}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Container component="main">
          <CssBaseline />
          <Card sx={{ p: 3 }}>
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
          </Card>
        </Container>
      </ModalBox>
    </ModalWrapperBox>
  );
}

export default AddTaskModal;
