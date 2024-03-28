import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChecklistOnTask } from "./checklistSlice";

function AddChecklistForm({ taskId, addingChecklist, setAddingChecklist }) {
  const [checklistTitle, setChecklistTitle] = useState("");

  const dispatch = useDispatch();

  const handleAddChecklist = (e) => {
    e.preventDefault();
    if (checklistTitle) {
      dispatch(createChecklistOnTask({ taskId, checklistTitle })).then(() => {
        setChecklistTitle("");
        setAddingChecklist(false);
      });
    } else {
      setAddingChecklist(false);
    }
  };
  return (
    <div
      style={{
        marginTop: "4px",
      }}
    >
      {addingChecklist && (
        <>
          <div
            onClick={() => setAddingChecklist(false)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100vw",
              height: "100vh",
              zIndex: 0,
            }}
          />
          <form onSubmit={handleAddChecklist}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                zIndex: 2,
              }}
            >
              <input
                type="text"
                placeholder="Checklist Title"
                value={checklistTitle}
                onChange={(e) => setChecklistTitle(e.target.value)}
                style={{
                  lineHeight: "2",
                  fontSize: "16px",
                  padding: "2px 12px",
                  zIndex: 2,
                }}
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
                <Button
                  type="button"
                  size="small"
                  onClick={() => setAddingChecklist(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </>
      )}
    </div>
  );
}

export default AddChecklistForm;
