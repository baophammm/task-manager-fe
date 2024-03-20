import React, { useCallback } from "react";

import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { FormProvider, FTextField, FUploadAvatar } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { fData } from "../utils/numberFormat";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUserProfile } from "../features/user/userSlice";
import LoadingScreen from "../components/LoadingScreen";

function AccountSettingsPage() {
  const { user } = useAuth();
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
      <Container maxWidth="xl">
        <Typography variant="h4">Account Settings</Typography>
        <Card
          sx={{
            minHeight: "100%",
            p: "16px",
            mt: "20px",
          }}
        >
          {isLoading ? (
            <LoadingScreen />
          ) : (
            <Grid container spacing={2} display="flex" flexDirection="column">
              <Grid item xs={12}>
                <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
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
                      Save Changes
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          )}
        </Card>
      </Container>
    </FormProvider>
  );
}

export default AccountSettingsPage;
