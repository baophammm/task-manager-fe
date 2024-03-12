import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography
      variant="body2"
      backgroundColor="background.secondary"
      color="text.secondary"
      align="center"
      p={1}
    >
      {"Copyright ©"}
      <Link color="inherit" href="#">
        BaoPhammm
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
