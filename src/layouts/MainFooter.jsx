import { Box, Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Box
      sx={{
        height: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <Typography variant="body2">
        {"Created by Bao Pham "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default MainFooter;
