import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",
  // overflowY: 'scroll',
  WebkitOverflowScrolling: "touch",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: "95%",
  maxWidth: "800px",
  padding: 10,
}));

const StyledAddProjectBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: "100%",
  marginTop: 8,
  padding: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  background: theme.palette.secondary.dark,
  "&:hover": {
    background: theme.palette.secondary.darker,
  },
}));
function AddProjectModal() {
  return <div>AddProjectModal</div>;
}

export default AddProjectModal;
