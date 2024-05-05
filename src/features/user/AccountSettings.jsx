import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "./userSlice";
import { FTextField, FUploadAvatar, FormProvider } from "../../components/form";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import { fData } from "../../utils/numberFormat";
import { LoadingButton } from "@mui/lab";

function AccountSettings({ user }) {
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    profilePictureUrl: user?.profilePictureUrl || "",
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "profilePictureUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          height: "100%",
          minHeight: "500px",
          p: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Grid container spacing={2} display="flex" flexDirection="column">
            <Grid item xs={12}>
              <Card sx={{ py: 6, px: 2, textAlign: "center" }}>
                <FUploadAvatar
                  name="profilePictureUrl"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  helperText={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: "auto",
                        display: "block",
                        textAlign: "center",
                        color: "text.primary",
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <Typography>Profile Update here</Typography>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card sx={{ p: 3 }}>
                <Box
                  sx={{
                    mb: "16px",
                    display: "grid",
                    rowGap: 3,
                    columnGap: 2,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(2, 1fr)",
                    },
                  }}
                >
                  <FTextField name="firstName" label="First Name" />
                  <FTextField name="lastName" label="Last Name" />
                </Box>
                <Box
                  sx={{
                    // width: 1,
                    display: "flex",
                    justifyContent: "flex-end",
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
            </Grid>
          </Grid>
        )}
      </Box>
    </FormProvider>
  );
}

export default AccountSettings;
