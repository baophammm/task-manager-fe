import React, { useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import {
  FDateField,
  FSelect,
  FTextField,
  FormProvider,
} from "../../components/form";

import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Card, CssBaseline, Stack, SvgIcon, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateSingleProject } from "../project/projectSlice";

import { Link, useParams } from "react-router-dom";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { useContext } from "react";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";

const projectYupSchema = Yup.object().shape({
  title: Yup.string().required("Project title is required"),
  description: Yup.string().required("Project description is required"),
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

export default function UpdateProjectDrawer() {
  const {
    selectedProject: project,
    isLoadingProject: isLoading,
    isUpdatingProject,
    setIsUpdatingProject,
    location,
  } = useContext(ProjectDetailPageContext);

  const dispatch = useDispatch();

  const params = useParams();
  const projectId = params.projectId;
  // Project Field Update

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

  const defaultValues = useMemo(
    () => ({
      title: project?.title ? project.title : "Default title",
      description: project?.description || "",
      projectStatus: project?.projectStatus || "Planning",

      startAt: project?.startAt
        ? dayjs(project?.startAt).format("YYYY-MM-DD")
        : null,
      dueAt: project?.dueAt ? dayjs(project?.dueAt).format("YYYY-MM-DD") : null,
    }),
    [project]
  );

  const methods = useForm({
    resolver: yupResolver(projectYupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateSingleProject({ projectId: project._id, ...data })).then(
      () => {
        reset();
      }
    );
    setIsUpdatingProject(false);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);
  const updateProjectForm = () => (
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
            Updating Project: {project?.title}
          </Typography>

          <Stack spacing={2} alignItems="flex-end" sx={{ mb: "12px" }}>
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

          <Box
            sx={{
              width: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to={`/projects/${projectId}/projectMembers/new`}
              state={{ backgroundLocation: location }}
              onClick={() => setIsUpdatingProject(false)}
            >
              <LoadingButton
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
                loading={isLoading}
                sx={{ p: 1 }}
              >
                Member
              </LoadingButton>
            </Link>
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
        open={isUpdatingProject}
        onClose={() => setIsUpdatingProject(false)}
      >
        {updateProjectForm()}
      </Drawer>
    </div>
  );
}
