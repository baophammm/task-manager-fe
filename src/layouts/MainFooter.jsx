import { Box, Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Box
      backgroundColor="background.secondary"
      sx={{
        height: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {"Copyright ©"}
        <Link color="inherit" href="#">
          BaoPhammm
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default MainFooter;
