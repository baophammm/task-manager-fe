import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChecklistOnTask } from "./checklistSlice";

function AddChecklistForm({
  taskId,

  handleCloseAddChecklistFormMenu,
  sx,
}) {
  const [checklistTitle, setChecklistTitle] = useState("Checklist");

  const dispatch = useDispatch();

  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (checklistTitle) {
      dispatch(createChecklistOnTask({ taskId, checklistTitle })).then(() => {
        setChecklistTitle("Checklist");
        // setAddingChecklist(false);
        handleCloseAddChecklistFormMenu();
      });
    } else {
      // setAddingChecklist(false);
      handleCloseAddChecklistFormMenu();
    }
  };
  return (
    <Box
      sx={{ ...sx, px: 1, display: "flex", flexDirection: "column", gap: 1 }}
    >
      <form onSubmit={handleAddChecklist}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            zIndex: 2,
          }}
        >
          <label htmlFor="checklistTitle">Checklist Title</label>
          <input
            type="text"
            id="checklistTitle"
            name="checklistTitle"
            placeholder="Checklist Title"
            value={checklistTitle}
            onChange={(e) => setChecklistTitle(e.target.value)}
            style={{
              lineHeight: "2",
              fontSize: "16px",
              padding: "2px 12px",
            }}
            autoFocus
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              sx={{ borderRadius: "4px" }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default AddChecklistForm;
