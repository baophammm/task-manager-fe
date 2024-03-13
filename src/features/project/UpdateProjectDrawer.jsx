import React, { useCallback, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { Card, CssBaseline, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateSingleProject } from "../project/projectSlice";

const projectYupSchema = Yup.object().shape({
  title: Yup.string().required("Project title is required"),
});

export default function UpdateProjectDrawer({
  project,
  isLoading,
  isUpdatingProject,
  setIsUpdatingProject,
}) {
  const dispatch = useDispatch();

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
  console.log("CHECKING Prop Project passed in", project);

  console.log("CHECKING prop project title passed in", project?.title);
  const defaultValues = {
    title: project?.title ? project.title : "",
    description: project?.description || "",
    projectStatus: project?.projectStatus || "Planning",

    startAt: project?.startAt
      ? dayjs(project?.startAt).format("YYYY-MM-DD")
      : "",
    dueAt: project?.dueAt ? dayjs(project?.dueAt).format("YYYY-MM-DD") : "",
  };

  console.log("CHECK DEFAULT VALUES:", defaultValues);
  // ERROR: DEFAULT VALUE IS CORRECT BUT VALUE ON FORM INCORRECT (or always loads previous values)

  const methods = useForm({
    // resolver: yupResolver(projectYupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data) => {
    dispatch(updateSingleProject({ projectId: project._id, ...data })).then(
      () => {
        reset();
      }
    );
    setIsUpdatingProject(false);
  };

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
            {/* <FTextField name="title" placeholder="Project Title" /> */}
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
        open={isUpdatingProject}
        onClose={() => setIsUpdatingProject(false)}
      >
        {updateProjectForm()}
      </Drawer>
    </div>
  );
}
