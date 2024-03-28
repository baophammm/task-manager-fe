import React, { useState } from "react";
import { Box, Button } from "@mui/material";

import { useDispatch } from "react-redux";
import { createChecklistItemOnChecklist } from "./checklistSlice";

function AddChecklistItem({ checklistId }) {
  const [isAddingChecklistItem, setIsAddingChecklistItem] = useState(false);
  const [checklistItemTitle, setChecklistItemTitle] = useState("");

  const dispatch = useDispatch();

  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    if (checklistItemTitle) {
      dispatch(
        createChecklistItemOnChecklist({
          checklistId,
          itemTitle: checklistItemTitle,
        })
      ).then(() => {
        setChecklistItemTitle("");
      });
      setIsAddingChecklistItem(true);
    } else {
      setIsAddingChecklistItem(true);
    }
  };
  return (
    <div>
      {isAddingChecklistItem ? (
        <>
          <div
            onClick={() => setIsAddingChecklistItem(false)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100dvw",
              height: "100dvh",
              zIndex: 0,
            }}
          />
          <form onSubmit={handleAddChecklistItem}>
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
                placeholder="Add Item"
                value={checklistItemTitle}
                onChange={(e) => setChecklistItemTitle(e.target.value)}
                style={{
                  lineHeight: "2",
                  fontSize: "14px",
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
                  onClick={() => setIsAddingChecklistItem(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => setIsAddingChecklistItem(true)}
            sx={{ borderRadius: "4px" }}
          >
            Add Item
          </Button>
        </Box>
      )}
    </div>
  );
}

export default AddChecklistItem;
