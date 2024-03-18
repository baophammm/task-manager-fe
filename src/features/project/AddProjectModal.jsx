import React, { useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import { CssBaseline, Box, Typography, Container, Stack } from "@mui/material";

import { LoadingButton } from "@mui/lab";
import {
  FDateField,
  FormProvider,
  FSelect,
  FTextField,
} from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";

import useAuth from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "./projectSlice";
import dayjs from "dayjs";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  background: theme.palette.action.disabled,
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

const projectYupSchema = Yup.object().shape({
  title: Yup.string().required("Project title is required"),
  description: Yup.string().required("Project description is required"),
});

const PROJECT_FIELDS = [
  { name: "title", label: "Project title", fieldType: "text" },
  { name: "description", label: "Project description", fieldType: "text" },
  {
    name: "projectStatus",
    label: "Project Status",
    fieldType: "select",
    options: [
      { value: "Planning", label: "Planning" },
      { value: "Ongoing", label: "Ongoing" },
      { value: "Done", label: "Done" },
    ],
  },
  { name: "startAt", label: "Start At", fieldType: "date" },
  { name: "dueAt", label: "Due At", fieldType: "date" },
];
export default function AddProjectModal() {
  const addProjectLocation = useLocation();
  const from =
    addProjectLocation.state?.backgroundLocation?.pathname || "/projects";

  const { isLoading, selectedProject } = useSelector((state) => state.project);
  const [newlyCreatedProject, setNewlyCreatedProject] = useState(false);

  const modalRef = useRef();
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    description: "",
    projectStatus: "Planning",
    startAt: null,
    dueAt: null,
    projectMemberEmails: [],
  };

  const methods = useForm({
    resolver: yupResolver(projectYupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    const observeRefValue = modalRef.current;
    disableBodyScroll(observeRefValue);
    return () => {
      if (observeRefValue) {
        enableBodyScroll(observeRefValue);
      }
    };
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(createProject(data)).then(() => setNewlyCreatedProject(true));
    } catch (error) {
      setNewlyCreatedProject(false);
    }
  };

  useEffect(() => {
    if (newlyCreatedProject) {
      setNewlyCreatedProject(false);
      navigate(`/projects/${selectedProject?._id}`);
    }
  }, [newlyCreatedProject, selectedProject, navigate]);

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
            Add New Project
          </Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} alignItems="flex-end" sx={{ mb: "12px" }}>
              {PROJECT_FIELDS.map((field) => {
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
              Add Project
            </LoadingButton>
          </FormProvider>
        </Container>
      </ModalBox>
    </ModalWrapperBox>
  );
}
