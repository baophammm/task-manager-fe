import React, { useCallback } from "react";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useForm } from "react-hook-form";

import { Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTask, uploadFileToTask } from "../task/taskSlice";

const defaultValues = {
  file: "",
};

function FileForm({ taskId, setAddingFile, handleCloseAddFileFormMenu, sx }) {
  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const { isLoading } = useSelector((state) => state.task);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(uploadFileToTask({ taskId, ...data })).then(() => {
      reset();
      dispatch(getSingleTask(taskId));
    });
    // setAddingFile(false);
    handleCloseAddFileFormMenu();
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "file",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Box sx={sx}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            px: 1,
          }}
        >
          <Box flexGrow={1}>
            <FUploadImage
              name="file"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              // flexGrow: 1,
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Add File
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Box>
  );
}

export default FileForm;
