import React, { useCallback } from "react";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { getSingleTask, uploadFileToTask } from "./taskSlice";

// const yupSchema = Yup.object().shape({
//   file: Yup.string().required("File URL is required"),
// });

const defaultValues = {
  file: "",
};

function FileForm({ taskId, setAddingFile, sx }) {
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
    // console.log({ taskId, ...data });
    // console.log(data.file);
    dispatch(uploadFileToTask({ taskId, ...data })).then(() => {
      reset();
      dispatch(getSingleTask(taskId));
    });
    setAddingFile(false);
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
        <Stack direction="row" spacing={2}>
          <Box flexGrow={1}>
            {/* <FTextField name="file" placeholder="Add New File" /> */}
            {/* <input type="file" ref={fileInput} onChange={handleFile} /> */}
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
              flexGrow: 1,
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