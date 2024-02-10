import React from "react";

import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import { FormProvider, FTextField } from "../components/form";
import { LoadingButton } from "@mui/lab";
import { fData } from "../utils/numberFormat";

function AccountSettingsPage() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4">Account Settings</Typography>
      <Card
        sx={{
          minHeight: "100%",
          p: "16px",
          mt: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
              {/* <FUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                // onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              /> */}
              <Typography>Profile Update here</Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
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
                <Typography>First Name Input here</Typography>
                <Typography>Last Name Input here</Typography>
                <Typography>Email Input here</Typography>
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                // loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default AccountSettingsPage;
