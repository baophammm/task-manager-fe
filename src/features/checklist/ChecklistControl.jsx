import React from "react";
import { useDispatch } from "react-redux";
import { deleteSingleChecklist } from "./checklistSlice";
import { Box, Button } from "@mui/material";

function ChecklistControl({ checklist }) {
  const dispatch = useDispatch();

  const handleDeleteChecklist = () => {
    const result = window.confirm(
      "Are you sure you want to delete this checklist?"
    );
    if (result) {
      dispatch(deleteSingleChecklist(checklist._id));
    }
  };

  return (
    <Box>
      <Button
        onClick={handleDeleteChecklist}
        variant="outlined"
        color="error"
        size="small"
      >
        Delete
      </Button>
    </Box>
  );
}

export default ChecklistControl;
