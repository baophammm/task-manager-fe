import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h3">404 Page not found!</Typography>
      <Typography variant="body1">
        Sorry, we couldn't find the page you requested
      </Typography>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Button variant="contained">GO TO HOME</Button>
      </Link>
    </Box>
  );
}

export default NotFoundPage;
